import { getCollection } from './database.ts';
import { CreateGiftDto, Gift } from '../models/Gift.ts';

const db = getCollection<Gift>('gifts');

export const resetProducts = async () => {
    await db.clean();

    const products: Gift[] = [
        {
            id: crypto.randomUUID(),
            name: 'Furadeira',
            price: 210.31,
            image: '/gifts/furadeira.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Banquetas',
            price: 260,
            image: '/gifts/chair.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Chave de ferramenta',
            price: 200,
            image: '/gifts/caixa-de-ferramenta.png',
            createdAt: new Date()
        },
        {
            id: crypto.randomUUID(),
            name: 'Kit utensílios de churrasco',
            price: 238.99,
            image: '/gifts/utensilio-churrasco.png',
            createdAt: new Date()
        }
    ];

    for(const product of products) {
        await db.set(product);
    }
}


export const getGift = async (id: string): Promise<Gift> => {
    const gift = await db.get(id);
    if (!gift || !!gift.deletedAt) {
        throw new Error('Gift not found with id ' + id);
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
