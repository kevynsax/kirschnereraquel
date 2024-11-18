import { getCollection } from './database.ts';
import { getGift } from './gifts.ts';
import { sendSms } from './smsService.ts';
import { QrCodePix as Pix } from 'npm:qrcode-pix';
import {
    CreateCreditCardDonationDto,
    CreateDonationDto,
    CreatePixDonationDto,
    Donation,
    DonationStatus,
    DonationType
} from '../models/Donation.ts';
import { createPayment, CreditCardInfo } from './paymentCreditCard.ts';


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

    const message = 'Pagamento recebido com sucesso! Agradecemos de coração pelo presente para o casamento de Raquel e Kirschner. Seu carinho e generosidade tornam esse momento ainda mais especial.';
    await sendSms(donation.donor.phone, message);
}

export const createDonation = (payload: CreateDonationDto, origin: string, remoteIp: string): Promise<Donation> => {
    const handler  = {
        [DonationType.PIX]: createPixDonation,
        [DonationType.CREDIT_CARD]: createCreditCardDonation,
    }[payload.type]!;

    return handler(payload as any, origin, remoteIp);
}

const createPixDonation = async (payload: CreatePixDonationDto, origin: string): Promise<Donation> => {
    const gift = await getGift(payload.giftId);

    const qrCode = Pix({
        version: '01',
        key: 'raquelekirschner2024@gmail.com',
        message: 'Presente casamento - ',
        name: 'Kirschner Klava',
        city: 'Brasilia',
        value: payload.amount,
    })

    const donation: Donation = {
        id: crypto.randomUUID(),
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
        pixQrCode: qrCode.payload(),
    };

    const message: string = 'Someone made a donation using pix. Please hurry to approve in the link: ' + origin + '/donation/' + donation.id;
    const phoneNumber = '11934721092'

    if(!origin.includes('localhost'))
        await sendSms(phoneNumber, message);

    await db.set(donation);

    return donation;
}

const createCreditCardDonation = async (payload: CreateCreditCardDonationDto, origin: string, remoteIp: string): Promise<Donation> => {
    const donation: Donation = {
        id: crypto.randomUUID(),
        gift: await getGift(payload.giftId),
        donor: {
            name: payload.payerInfo.name,
            phone: payload.donor.phone,
            document: payload.payerInfo.document,
        },
        message: payload.message,
        amount: payload.amount,
        status: DonationStatus.PENDING,
        type: DonationType.CREDIT_CARD,
        createdAt: new Date(),
        updatedAt: new Date(),
        qtdInstallments: payload.qtdInstallments,
    }

    await db.set(donation);

    const message: string = 'Someone made a donation using credit card. You can see in the link: ' + origin + '/donation/' + donation.id;
    const phoneNumber = '11934721092';

    if(!origin.includes('localhost'))
        await sendSms(phoneNumber, message);

    await createPayment(donation, payload, remoteIp);

    donation.status = DonationStatus.PAID;
    donation.updatedAt = new Date();
    await db.set(donation);

    return donation;
}
