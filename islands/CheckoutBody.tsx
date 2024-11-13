import { useState } from "preact/hooks";
import { Gift } from "../services/gifts.ts";
import { GiftForm } from "./GiftForm.tsx";
import { FieldPrice } from './utils/FieldPrice.tsx';

interface CheckoutProps {
    product: Gift;
}

export const CheckoutBody = (props: CheckoutProps) => {
    const [total, setTotal] = useState(props.product.price);

    return (
        <>
            <GiftForm id={props.product.id} price={total} />
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
                        <FieldPrice onChange={setTotal} placeHolder='23,51' value={total} />
                    </span>
                </div>

                <div className="total">
                    <span>Total</span>
                    <span>
                        {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(total)}</span>
                </div>

                {/*<div className="card-info">*/}
                {/*    <span>Parcele em até 6x no cartão</span>*/}
                {/*    <img src="/icon/cards.svg" alt="" />*/}
                {/*</div>*/}
            </div>
        </>
    );
};
