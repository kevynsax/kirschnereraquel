import { GiftForm } from "./GiftForm.tsx";
import { Gift } from '../models/Gift.ts';
import { Decimal } from 'npm:decimal.js';

interface CheckoutProps {
    product: Gift;
    qtyQuotas?: number;
}

export const CheckoutBody = (props: CheckoutProps) => {
    const qtyQuotas = props.qtyQuotas || 1;

    const uniquePrice = props.product.price;
    const price = new Decimal(uniquePrice).times(qtyQuotas).toNumber();
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const total = formatter.format(price);

    return (
        <>
            <GiftForm product={props.product} qtyQuotas={qtyQuotas} />
            <div className="summary">
                <div className="header">
                    <div className="avatar">
                        <img src="/avatar.jpg" alt="" />
                    </div>
                    <div className="title">
                        Presente para Raquel & Kirschner
                    </div>
                </div>

                <div className="product">
                    <span className="name">{props.product.name}</span>
                    <span className="price">
                        {qtyQuotas}x&nbsp;
                        {formatter.format(uniquePrice)}
                    </span>
                </div>

                <div className="total">
                    <span>Total</span>
                    <span>{total}</span>
                </div>

                <div className="card-info">
                    <span>Pode usar esses cartões</span>
                    <img src="/icon/cards.svg" alt="" />
                </div>
            </div>
        </>
    );
};
