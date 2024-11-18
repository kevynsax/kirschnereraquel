import { Gift } from './Gift.ts';

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
        document?: string;
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

    qtdInstallments: number;

    payerInfo: {
        document: string;
        name: string;
    }

    cardInfo: {
        ccv: string;
        number: string;
        expiration: string;
    }
}

export type CreateDonationDto = CreatePixDonationDto | CreateCreditCardDonationDto;
