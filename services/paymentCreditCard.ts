import { CreateCreditCardDonationDto, Donation } from '../models/Donation.ts';
import axios, { AxiosRequestConfig } from "npm:axios";
import { Decimal } from 'npm:decimal.js';

const API_KEY = "$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDA1MDkzNTE6OiRhYWNoX2ZlNDJlZjg4LTgyNWYtNGI5OS04NmViLTZhMGU2YzU0YTA4OQ==";
const API_URL = "https://api.asaas.com/v3";

const httpConfig: AxiosRequestConfig = {
    baseURL: API_URL,
    headers: {
        access_token: API_KEY,
    },
};

const insertCustomer = (donation: Donation): Promise<string> => {
    const payload = {
        name: donation.donor.name,
        cpfCnpj: donation.donor.document,
        externalReference: donation.id,
    }

    return axios.post('/customers', payload, httpConfig)
        .then(x => x.data.id)
        .catch(err => {
            console.error('Asaas adapter error');
            console.error(`Error creating customer. ${JSON.stringify(payload)}`);
            console.error(err.response.data)
            console.error(err.response.status)

            if(err.response.status === 401){
                throw new Error('Invalid API key');
            }
            console.error(err.response.headers)

            const {errors, ...error} = err.response.data;
            throw new Error(errors? errors[0].description : error);
        });
};

export const createPayment = async (donation: Donation, dto: CreateCreditCardDonationDto, remoteIp: string): Promise<string> => {
    const {cardInfo, payerInfo} = dto;

    const amount = new Decimal(donation.qtyQuotas).times(donation.gift.price).toNumber();
    const payload = {
        customer: await insertCustomer(donation),
        billingType: "CREDIT_CARD",
        value: amount,
        dueDate: new Date().toISOString().substring(0, 10),
        remoteIp,
        creditCard: {
            ccv: cardInfo.ccv,
            expiryMonth: cardInfo.expiration.substring(0, 2),
            expiryYear: cardInfo.expiration.slice(-2),
            holderName: payerInfo.name,
            number: cardInfo.number,
        },
        creditCardHolderInfo: {
            name: donation.donor.name,
            cpfCnpj: payerInfo.document,
            email: 'any-email-goes-here@gmail.com',
            phone: '61985891092',
            postalCode: '06543001',
            addressNumber: '2113'
        }
    }

    return axios.post('/payments', payload, httpConfig)
        .then(x => x.data.id)
        .catch(err => {
            console.error('Asaas adapter error');
            console.error(`Error creating payment. ${JSON.stringify(payload)}`);
            console.error(err.response.data)
            console.error(err.response.status)
            console.error(err.response.headers)
            throw new Error(err.response.data.errors[0].description);
        });
}
