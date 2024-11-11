import { Gift } from '../services/gifts.ts';

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
]

export const Gifts = () => {
    return (
        <div>
            <h1>.</h1>
        </div>
    );
}
