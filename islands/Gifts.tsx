import { Gift } from '../services/gifts.ts';
import { Button } from '../components/Button.tsx';

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

const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

export const Gifts = () => {
    return (
        <div className='gifts'>
            <h1>Presentes</h1>

            <div className='products'>
                {products.map(product => (
                    <div className='product'>
                        <img src={product.image} />
                        <span className="name">{product.name}</span>
                        <span className="price">{formatter.format(product.price)}</span>
                        <Button>Presentear</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
