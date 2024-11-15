import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getGift, Gift } from "../../services/gifts.ts";
import { Logo } from "../../components/Logo.tsx";
import { GiftForm } from "../../islands/GiftForm.tsx";
import { CheckoutBody } from "../../islands/CheckoutBody.tsx";

const linkWhatsapp =
    "https://api.whatsapp.com/send?phone=5561985891092&text=Hey%2C%20estou%20dando%20um%20presente%20para%20o%20Kirschner%20e%20a%20Raquel%2C%20e%20estou%20precisando%20de%20ajuda";

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const { id } = _ctx.params;
        const product = await getGift(id);

        return _ctx.render({ product });
    },
};

export default function Checkout(props: PageProps<{ product: Gift }>) {
    return (
        <div className="checkout">
            <div className="app-bar">
                <div className="content">
                    <Logo />
                </div>
            </div>

            <div className="warning">
                <span>Precisa de ajuda?</span>{" "}
                <a target="_blank" href={linkWhatsapp}>Clique aqui</a>
                <span>
                    que a gente tira todas as suas dúvidas! Você também pode
                    falar com a gente pelo WhatsApp:{" "}
                    <a target="_blank" href={linkWhatsapp}>(61) 9 8589-1092</a>
                </span>
            </div>

            <div className="body">
                <CheckoutBody product={props.data.product} />
            </div>
        </div>
    );
}
