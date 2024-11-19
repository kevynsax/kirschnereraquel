import { Button } from "../components/Button.tsx";
import { GiftWithStock } from "../models/Gift.ts";
import { useCallback, useState } from "preact/hooks";
import { Decimal } from 'npm:decimal.js';

const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

interface Props {
    products: GiftWithStock[];
}

export const Gifts = (props: Props) => {
    return (
        <div className="gifts" id='gifts'>
            <h1>Presentes</h1>

            <div className="gift-cover">
                <img src="/gift-cover.jpg" alt="Presentes" />
                <span>
                    Estamos vivendo um momento único e cheio de gratidão, e é
                    uma alegria poder celebrá-lo ao lado de pessoas tão
                    especiais como você! Sua companhia e suas orações já são um
                    presente valioso para nós. Mas, se desejar nos abençoar de
                    outra forma, preparamos algumas ideias de presentes ou, se
                    preferir, deixamos também a opção do nosso PIX:{" "}
                    <b>raquelekirschner2024@gmail.com</b>
                </span>
            </div>

            <div className="products">
                {props.products.map((product) => {
                    return <Gift key={product.id} gift={product} />;
                })}
            </div>
        </div>
    );
};

const Gift = (props: { gift: GiftWithStock }) => {
    const [qtyQuotas, setQtyQuotas] = useState(1);

    const increaseQuotas = useCallback(() => {
        if(qtyQuotas >= props.gift.availableQuotas)
            return;

        setQtyQuotas(qtyQuotas + 1);
    }, [setQtyQuotas, qtyQuotas, props.gift.availableQuotas]);

    const decreaseQuotas = useCallback(() => {
        if(qtyQuotas <= 1)
            return;

        setQtyQuotas(qtyQuotas - 1);
    }, [setQtyQuotas, qtyQuotas]);

    const increaseIsDisabled = qtyQuotas >= props.gift.availableQuotas;
    const decreaseIsDisabled = qtyQuotas <= 1;

    const decreaseStyle = decreaseIsDisabled ? "decrease disabled" : "decrease";
    const increaseStyle = increaseIsDisabled ? "increase disabled" : "increase";

    const {availableQuotas, ...gift} = props.gift;

    const isDisabled = !availableQuotas;
    const disabledStyle = isDisabled ? "disabled" : "";

    const price = gift.price * qtyQuotas;

    const percentageAvailable = new Decimal(availableQuotas).div(gift.qtyQuotas).times(100).toNumber();

    return (
        <div className={`product ${disabledStyle}`}>
            <div className="image">
                <img src={gift.image} alt={gift.name} />
                <span className="quota-overlay" style={{height: `${100 - percentageAvailable}%`}}></span>
            </div>

            <span className="name">{gift.name}</span>
            <span className="description">{gift.description}</span>
            <span className="price">{formatter.format(price)}</span>

            {gift.qtyQuotas > 1 && !isDisabled && (
                <div className="quotas">
                    <div className={decreaseStyle} onClick={decreaseQuotas}>-</div>
                    <span>{qtyQuotas}</span>
                    <div className={increaseStyle} onClick={increaseQuotas}>+</div>
                </div>
            )}

            <Button
                disabled={isDisabled}
                onClick={() => window.location.href = `checkout/${gift.id}?qtyQuotas=${qtyQuotas}`}
            >
                Presentear
            </Button>
        </div>
    );
}
