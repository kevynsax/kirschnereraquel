import { useState } from "preact/hooks";
import { GiftForm } from "./GiftForm.tsx";
import { FieldPrice } from './utils/FieldPrice.tsx';
import { Gift } from '../models/Gift.ts';

interface CheckoutProps {
    product: Gift;
}

export const CheckoutBody = (props: CheckoutProps) => {
    const total = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(props.product.price);

    return (
        <>
            <GiftForm product={props.product} qtyQuotas={1} />
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
                        {total}
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
