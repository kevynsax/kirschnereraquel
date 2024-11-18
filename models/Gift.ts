
export interface CreateGiftDto {
    name: string;
    description: string;
    price: number;
    image: string;
    qtyQuotas: number;
}

export interface Gift {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    qtyQuotas: number;
    createdAt: Date;
    deletedAt?: Date;
}

export interface GiftWithStock extends Gift {
    availableQuotas: number;
}
