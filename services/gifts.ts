import { getCollection } from './database.ts';
import { CreateGiftDto, Gift, GiftWithStock } from '../models/Gift.ts';
import { lstDonations } from './donation.ts';
import { DonationStatus } from '../models/Donation.ts';
import { thirdGifts } from './constants.ts';

const db = getCollection<Gift>('gifts');


export const addProducts = async () => {
    const products: Gift[] = [...thirdGifts];

    for(const product of products) {
        await db.set(product);
    }
}

export const updateProduct = <K extends keyof Gift>(attribute: K) => async (id: string, value: any): Promise<void> => {
    const product = await db.get(id);
    product[attribute] = value;

    await db.set(product);
}


export const getGift = async (id: string): Promise<Gift> => {
    const gift = await db.get(id);
    if (!gift || !!gift.deletedAt) {
        throw new Error('Gift not found with id ' + id);
    }

    return gift;
}

export const listAllGifts = async (): Promise<GiftWithStock[]> => {
    const result = await db.list();
    const lst = result.filter(x => !x.deletedAt);

    const purchases = await lstDonations();

    const dicPurchase = new Map<string, number>();

    for(const purchase of purchases) {
        if(purchase.status !== DonationStatus.PAID)
            continue;

        const key = purchase.gift.id;
        dicPurchase.set(key, (dicPurchase.get(key) || 0) + Number(purchase.qtyQuotas));
    }

    return lst.map(x => {
        const availableQuotas = x.qtyQuotas - (dicPurchase.get(x.id) || 0);

        return {
            ...x,
            availableQuotas,
        }
    }).sort((a, b) => {
        if(!a.availableQuotas && !!b.availableQuotas)
            return 1;

        if(!!a.availableQuotas && !b.availableQuotas)
            return -1;

        if(a.price < b.price)
            return -1;

        if(a.price > b.price)
            return 1;

        return 0;
    })
};

export const createGift = async (dto: CreateGiftDto): Promise<Gift> => {
    const newGift: Gift = {
        id: crypto.randomUUID(),
        name: dto.name,
        description: dto.description,
        price: dto.price,
        image: dto.image,
        qtyQuotas: dto.qtyQuotas,
        createdAt: new Date(),
    }

    await db.set(newGift);

    return newGift;
}
