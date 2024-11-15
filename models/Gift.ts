
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
