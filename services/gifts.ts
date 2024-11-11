import { getCollection } from './database.ts';

export interface CreateGiftDto {
    name: string;
    price: number;
    image: string;
}

export interface Gift {
    id: string;
    name: string;
    price: number;
    image: string;
    createdAt: Date;
    deletedAt?: Date;
}

export interface GiftWithStock extends Gift {
    alreadyBought: number;
}

const db = getCollection<Gift>('gifts');

export const listAllGifts = async (): Promise<Gift[]> => {
    const result = await db.list();
    return result.filter(x => !x.deletedAt);
};

export const createGift = async (dto: CreateGiftDto): Promise<Gift> => {
    const newGift: Gift = {
        id: crypto.randomUUID(),
        name: dto.name,
        price: dto.price,
        image: dto.image,
        createdAt: new Date(),
    }

    await db.set(newGift);

    return newGift;
}
