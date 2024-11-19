import { Button } from '../components/Button.tsx';
import { GiftWithStock } from '../models/Gift.ts';


const formatter = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'});

interface Props {
    products: GiftWithStock[];
}

export const Gifts = (props: Props) => {
    return (
        <div className='gifts'>
            <h1>Presentes</h1>

            <div className='products'>
                {props.products.map(product => (
                    <div className={`product ${!product.availableQuotas ? 'disabled': ''}`}>
                        <img src={product.image} />
                        <span className="name">{product.name}</span>
                        <span className="description">{product.description}</span>
                        <span className="price">{formatter.format(product.price)}</span>
                        <Button disabled={!product.availableQuotas} onClick={() => window.location.href = `checkout/${product.id}`}>Presentear</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
