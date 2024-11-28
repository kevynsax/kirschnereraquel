import { getCollection } from './database.ts';
import { getGift } from './gifts.ts';
import { sendSms } from './smsService.ts';
import { QrCodePix as Pix } from 'npm:qrcode-pix';
import { Decimal } from 'npm:decimal.js';
import {
    CreateCreditCardDonationDto,
    CreateDonationDto,
    CreatePixDonationDto,
    Donation,
    DonationStatus,
    DonationType
} from '../models/Donation.ts';
import { createPayment } from './paymentCreditCard.ts';


const db = getCollection<Donation>('donations');

export const migrateDonations = async () => {
    const lst = await db.list();

    for(const donation of lst){
        if(!!donation.qtyQuotas)
            continue;

        donation.qtyQuotas = (donation as any).amount / donation.gift.price;
        if(donation.qtyQuotas !== Math.floor(donation.qtyQuotas)){
            console.log('Error migrating donation with id ' + donation.id);
            console.log(donation);
            console.log('Amount: ' + (donation as any).amount);
            console.log('Price: ' + donation.gift.price);
            console.log('QtyQuotas: ' + donation.qtyQuotas);
            // throw new Error(`Invalid amount.`);

            donation.qtyQuotas = 0;
        }
        await db.set(donation);
    }
}

export const getDonation = async (id: string): Promise<Donation> => {
    const result = await db.get(id);

    if(!result){
        throw new Error('Donation not found with id ' + id);
    }

    return result;
}

export const lstDonations = async (): Promise<Donation[]> => {
    return await db.list();
}

export const markPixAsReceived = async (id: string, password: string): Promise<void> => {
    if(password !== 'KirschnerKlava2024'){
        throw new Error('Invalid password');
    }

    const donation = await getDonation(id);

    donation.status = DonationStatus.PAID;
    donation.updatedAt = new Date();

    await db.set(donation);

    await sendClientMessage(donation);
}

const sendClientMessage = async (donation: Donation): Promise<void> => {
    const message = 'Pagamento recebido com sucesso! Agradecemos de coração pelo presente para o casamento de Raquel e Kirschner. Seu carinho e generosidade tornam esse momento ainda mais especial.';
    await sendSms(donation.donor.phone, message);
}

const validateStock = async (giftId: string, qtyQuotas: number): Promise<void> => {
    const gift = await getGift(giftId);

    const purchases = await lstDonations();

    const dicPurchase = new Map<string, number>();

    for(const purchase of purchases) {
        if(purchase.status !== DonationStatus.PAID)
            continue;

        const key = purchase.gift.id;
        dicPurchase.set(key, (dicPurchase.get(key) || 0) + purchase.qtyQuotas);
    }

    const availableQuotas = gift.qtyQuotas - (dicPurchase.get(gift.id) || 0);

    if(availableQuotas < qtyQuotas){
        throw new Error('Presente já foi comprado! Por favor, escolha outro presente.');
    }
}

export const createDonation = async (payload: CreateDonationDto, origin: string, remoteIp: string): Promise<Donation> => {
    await validateStock(payload.giftId, payload.qtyQuotas);

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
        value: new Decimal(gift.price).times(payload.qtyQuotas).toNumber(),
    })

    const donation: Donation = {
        id: crypto.randomUUID(),
        gift,
        donor: {
            name: payload.donor.name,
            phone: payload.donor.phone
        },
        message: payload.message,
        qtyQuotas: payload.qtyQuotas,
        status: DonationStatus.PENDING,
        type: DonationType.PIX,
        createdAt: new Date(),
        updatedAt: new Date(),
        pixQrCode: qrCode.payload(),
    };

    const message: string = 'Someone made a donation using pix. Please hurry to approve in the link: ' + origin + '/donation/' + donation.id;
    const phoneNumber = '11934721092'

    console.log(message);

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
        qtyQuotas: payload.qtyQuotas,
        status: DonationStatus.PENDING,
        type: DonationType.CREDIT_CARD,
        createdAt: new Date(),
        updatedAt: new Date(),
        qtdInstallments: payload.qtdInstallments,
    }

    await db.set(donation);

    const message: string = 'Someone made a donation using credit card. You can see in the link: ' + origin + '/donation/' + donation.id;
    const phoneNumber = '11934721092';

    console.log(message);

    await createPayment(donation, payload, remoteIp);

    if(!origin.includes('localhost'))
        await sendSms(phoneNumber, message);

    donation.status = DonationStatus.PAID;
    donation.updatedAt = new Date();
    await db.set(donation);

    await sendClientMessage(donation);

    return donation;
}
