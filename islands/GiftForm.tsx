import { Field } from "./utils/Field.tsx";
import { useCallback, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { FieldPhoneNumber } from "./utils/FieldPhoneNumber.tsx";
import { Gift } from "../services/gifts.ts";

interface Props {
    product: Gift;
    price: number;
    onFormWasSent: () => void;
}

export const GiftForm = (props: Props) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [qrCode, setQrCode] = useState("");

    const [step, setStep] = useState(0);

    const increaseStep = useCallback(() => {
        setStep(step + 1);
        props.onFormWasSent();
    }, [step, setStep]);

    const createPixDonation = useCallback(async () => {
        const req = await fetch('/api/donate', {
            method: 'POST',
            body: JSON.stringify({
                giftId: props.product.id,
                donor: {name, phone},
                message,
                amount: props.price,
                type: 'pix'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const donation = await req.json();

        props.onFormWasSent();
        setStep(4);
        setQrCode(donation.pixQrCode);

    }, [step, setStep, name, phone, message, props.product])

    const isDisabled = !name || !phone;

    return (
        <div className="form">
            {step === 0 && (
                <>
                    <div className="title">Insira seus dados</div>
                    <Field
                        label="Quem está dando o presente?"
                        placeholder="João e Familia"
                        value={name}
                        onChange={setName}
                    />
                    <FieldPhoneNumber
                        label="Seu telefone"
                        value={phone}
                        onChange={setPhone}
                    />
                    <Field
                        label="Deixe uma mensagem especial (opcional)"
                        placeholder="Escolha a sua mensagem"
                        value={message}
                        onChange={setMessage}
                        qtdLines={5}
                    />
                    <Button
                        onClick={increaseStep}
                        disabled={isDisabled}
                        class="action"
                    >
                        Selecionar pagamento
                    </Button>
                </>
            )}
            {step === 1 && (
                <>
                    <div className="title">Selecione o meio de pagamento</div>

                    <div className="pix payment-option" onClick={createPixDonation}>
                        <div className="icon">
                            <img src="/icon/pix.svg" />
                        </div>
                        <div className="text">
                            <span>PIX</span>
                            <span>Transferência instantânea</span>
                        </div>
                    </div>

                    <div className="card payment-option">
                        <div className="icon">
                            <img src="/icon/card.svg" />
                        </div>
                        <div className="text">
                            <span>Cartão de crédito</span>
                            <span>Parcelamento em até 12x</span>
                        </div>
                        <div className="suffix">
                            <img src="/icon/cards.svg" />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
