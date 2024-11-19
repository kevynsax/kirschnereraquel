import { Button } from "../components/Button.tsx";
import { GiftWithStock } from "../models/Gift.ts";

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
                {props.products.map((product) => (
                    <div
                        className={`product ${
                            !product.availableQuotas ? "disabled" : ""
                        }`}
                    >
                        <img src={product.image} />
                        <span className="name">{product.name}</span>
                        <span className="description">
                            {product.description}
                        </span>
                        <span className="price">
                            {formatter.format(product.price)}
                        </span>
                        <Button
                            disabled={!product.availableQuotas}
                            onClick={() =>
                                window.location.href = `checkout/${product.id}`}
                        >
                            Presentear
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};
