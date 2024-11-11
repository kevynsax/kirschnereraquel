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
    return null;
    return (
        <div className='gifts'>
            <h1>Presentes</h1>

            <div className='products'>
                {products.map(product => (
                    <div className='product'>
                        <img src={product.image} />
                        <h6>{product.name}</h6>
                        <span>{product.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
