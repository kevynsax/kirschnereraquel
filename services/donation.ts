import { getCollection } from './database.ts';
import { getGift, Gift } from './gifts.ts';
import { sendSms } from './smsService.ts';
import Pix from './pix.ts';

export enum DonationStatus{
    PENDING = 'pending',
    PAID = 'paid',
}

export enum DonationType{
    PIX = 'pix',
    CREDIT_CARD = 'credit_card',
}

export interface BaseDonation{
    id: string;
    gift: Gift;
    donor: {
        name: string;
        phone: string;
    },
    message: string;
    amount: number;
    status: DonationStatus;
    type: DonationType;
    createdAt: Date;
    updatedAt: Date;
}

export interface PixDonation extends BaseDonation{
    type: DonationType.PIX;
    pixQrCode: string;
}

export interface CreditCardDonation extends BaseDonation{
    type: DonationType.CREDIT_CARD;
    qtdInstallments: number;
}

export type Donation = PixDonation | CreditCardDonation;

export interface BaseCreateDonationDto{
    giftId: string;
    donor: {
        name: string;
        phone: string;
    },
    message: string;
    amount: number;
    type: DonationType;
}

export interface CreatePixDonationDto extends BaseCreateDonationDto {
    type: DonationType.PIX;
}

export interface CreateCreditCardDonationDto extends BaseCreateDonationDto {
    type: DonationType.CREDIT_CARD;

    cardInfo: {
        ccv: string;
        number: string;
        expiration: string;
        nameOnTheCard: string;
    }
}

export type CreateDonationDto = CreatePixDonationDto | CreateCreditCardDonationDto;

const db = getCollection<Donation>('donations');

export const getDonation = async (id: string): Promise<Donation> => {
    const result = await db.get(id);

    if(!result){
        throw new Error('Donation not found with id ' + id);
    }

    return result;
}

export const markPixAsReceived = async (id: string, password: string): Promise<void> => {
    if(password !== 'KirschnerKlava2024'){
        throw new Error('Invalid password');
    }

    const donation = await getDonation(id);

    donation.status = DonationStatus.PAID;
    donation.updatedAt = new Date();

    await db.set(donation);
}

export const createDonation = (payload: CreateDonationDto, origin: string): Promise<Donation> => {
    const handler  = {
        [DonationType.PIX]: createPixDonation,
        [DonationType.CREDIT_CARD]: createCreditCardDonation,
    }[payload.type]!;

    return handler(payload as any, origin);
}

const createPixDonation = async (payload: CreatePixDonationDto, origin: string): Promise<Donation> => {
    const gift = await getGift(payload.giftId);

    const id = crypto.randomUUID();

    const qrCode = new Pix({
        pixKey: "raquelekirschner2024@gmail.com",
        description: 'Presente casamento - ' + gift.name,
        merchantName: 'Kirschner Klava',
        merchantCity: 'Brasilia',
        txId: 'txId-' + id,
        amount: payload.amount
    })

    const donation: Donation = {
        id,
        gift,
        donor: {
            name: payload.donor.name,
            phone: payload.donor.phone
        },
        message: payload.message,
        amount: payload.amount,
        status: DonationStatus.PENDING,
        type: DonationType.PIX,
        createdAt: new Date(),
        updatedAt: new Date(),
        pixQrCode: qrCode.getPayload(),
    };

    const message: string = 'Someone made a donation using pix. Please hurry to approve in the link: ' + origin + '/donation/' + donation.id;
    const phoneNumber = '11934721092'

    await sendSms(phoneNumber, message);

    await db.set(donation);

    return donation;
}

const createCreditCardDonation = async (payload: CreateCreditCardDonationDto): Promise<Donation> => {
    throw new Error('not implemented')
}
