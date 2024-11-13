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

const lst = await db.list();

if(lst.length === 0) {
    const products: Gift[] = [
        {
            id: crypto.randomUUID(),
            name: 'Furadeira',
            price: 210.31,
            image: './gifts/furadeira.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Banquetas',
            price: 260,
            image: './gifts/chair.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Chave de ferramenta',
            price: 200,
            image: './gifts/caixa-de-ferramenta.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Kit utensílios de churrasco',
            price: 238.99,
            image: './gifts/utensilio-churrasco.png',
            createdAt: new Date()
        }
    ];

    for(const product of products) {
        await db.set(product);
    }
}

export const getGift = async (id: string): Promise<Gift> => {
    const gift = await db.get(id);
    if (!gift || gift.deletedAt) {
        throw new Error('Gift not found');
    }

    return gift;
}

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
