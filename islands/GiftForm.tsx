import { Field } from "./utils/Field.tsx";
import { useCallback, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { FieldPhoneNumber } from "./utils/FieldPhoneNumber.tsx";
import { Loading } from "../components/Loading.tsx";
import { QrCode } from "./utils/QrCode.tsx";
import { SnackBar } from "../components/SnackBar.tsx";
import { Gift } from "../models/Gift.ts";
import {
    CreateCreditCardDonationDto,
    CreatePixDonationDto,
    Donation,
    DonationStatus,
    DonationType,
    PixDonation,
} from "../models/Donation.ts";
import { FieldMasked } from "./utils/FieldMasked.tsx";
import { FieldCardNumber } from "./utils/FieldCardNumber.tsx";

interface Props {
    product: Gift;
    price: number;
    onFormWasSent: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GiftForm = (props: Props) => {
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiration, setCardExpiration] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [document, setDocument] = useState("");

    const [newDonation, setNewDonation] = useState<Donation | null>(null);

    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const increaseStep = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

    const keepUpdatingUntilIsPaid = async (id: string) => {
        const donation: Donation = await fetch(`/api/donate/${id}`)
            .then((res) => res.json());

        if (donation.status === DonationStatus.PAID) {
            setNewDonation(donation);
            return;
        }

        await delay(1000);
        return keepUpdatingUntilIsPaid(id);
    };

    const createPixDonation = async () => {
        setIsLoading(true);
        const payload: CreatePixDonationDto = {
            giftId: props.product.id,
            donor: { name, phone },
            message,
            amount: props.price,
            type: DonationType.PIX,
        };

        const req = await fetch("/api/donate", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => setIsLoading(false));

        const donation = await req.json();

        props.onFormWasSent();
        setNewDonation(donation);

        return keepUpdatingUntilIsPaid(donation.id);
    };

    const createCardDonation = async () => {
        setIsLoading(true);
        const payload: CreateCreditCardDonationDto = {
            giftId: props.product.id,
            donor: { name, phone },
            message,
            amount: props.price,
            type: DonationType.CREDIT_CARD,
            payerInfo: {
                document,
                name: cardName,
            },
            cardInfo: {
                number: cardNumber,
                expiration: cardExpiration,
                ccv: cardCvv,
            },
            qtdInstallments: 1,
        };

        const req = await fetch("/api/donate", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .catch(error => {
                setError(error.message);
                throw error;
            })
            .finally(() => setIsLoading(false));

        if(req.status !== 200){
            const error = await req.json();
            setError(error.message);
            return;
        }

        const donation = await req.json();

        props.onFormWasSent();
        setNewDonation(donation);
    };

    const isDisabled = !name || !phone ||
        (step === 2 &&
            (!cardNumber || !cardName || !cardExpiration || !cardCvv ||
                !document));

    if (newDonation) {
        return <NewlyCreatedDonation data={newDonation} />;
    }

    if (isLoading) {
        return (
            <div className="form isLoading">
                <Loading isLoading={isLoading} />
            </div>
        );
    }

    if (step === 0) {
        return (
            <div className="form">
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
            </div>
        );
    }

    if (step === 1) {
        return (
            <div className="form">
                <div className="title">Selecione o meio de pagamento</div>

                <div
                    className="payment-option"
                    onClick={createPixDonation}
                >
                    <div className="icon">
                        <img src="/icon/pix.svg" />
                    </div>
                    <div className="text">
                        <span>PIX</span>
                        <span>Transferência instantânea</span>
                    </div>
                </div>

                <div className="payment-option" onClick={increaseStep}>
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
            </div>
        );
    }

    if (step === 2) {
        return (
            <div className="form">
                {error && <div className="error">{error}</div>}
                <div className="title">Dados do cartão</div>
                <FieldCardNumber
                    value={cardNumber}
                    onChange={setCardNumber}
                />

                <div className="card-details">
                    <FieldMasked
                        label="Validade"
                        placeholder="MM/AA"
                        value={cardExpiration}
                        onChange={setCardExpiration}
                        formatter={(val) =>
                            val.replace(/(\d{2})(\d{2})/, "$1/$2")}
                        validator={(val) => val.length === 5}
                    />
                    <FieldMasked
                        label="CVV"
                        placeholder="123"
                        value={cardCvv}
                        onChange={setCardCvv}
                        formatter={(val) => val.replace(/\D/g, "")}
                        validator={(val) => val.length === 3}
                    />
                </div>
                <Field
                    label="Nome impresso no cartão"
                    placeholder="João da Silva"
                    value={cardName}
                    onChange={setCardName}
                />
                <FieldMasked
                    label="CPF"
                    placeholder="000.000.000-00"
                    value={document}
                    onChange={setDocument}
                    formatter={(val) =>
                        val.replace(
                            /(\d{3})(\d{3})(\d{3})(\d{2})/,
                            "$1.$2.$3-$4",
                        )}
                    validator={(val) => val.length === 14}
                />
                <Button
                    onClick={createCardDonation}
                    disabled={isDisabled}
                    class="action"
                >
                    Confirmar pagamento
                </Button>
            </div>
        );
    }

    return (
        <div className="form">
            <span>Don't know how you got here</span>
        </div>
    );
};

const NewlyCreatedDonation = (props: { data: Donation }) => {
    const newDonation = props.data;
    const { pixQrCode } = newDonation as PixDonation;

    const [snack, setSnack] = useState("");

    const copyPixQrCodeToClipboard = useCallback(() => {
        if (newDonation?.type !== "pix") {
            return;
        }

        navigator.clipboard.writeText(newDonation.pixQrCode);
        setSnack("Código copiado");

        setTimeout(() => {
            setSnack("");
        }, 1300);
    }, [newDonation, snack, setSnack]);

    if (newDonation.status === "paid") {
        return (
            <div className="newDonation">
                <div className="success">
                    <img src="/icon/check.svg" alt="Success" />
                </div>
                <div className="title">Obrigado pelo presente!</div>

                <div className="message">
                    <span>Seu presente foi enviado com sucesso!</span>
                </div>
            </div>
        );
    }

    return (
        <div className="newDonation">
            <div className="title">Pague o presente com PIX</div>
            <QrCode text={pixQrCode} />

            <div className="pix-message">
                <span>Abra o aplicativo do seu banco e escaneie o QR Code</span>
                <span>Código Pix</span>
                <div className="pix-code">
                    <span>{pixQrCode}</span>
                </div>
                <Button onClick={copyPixQrCodeToClipboard}>
                    Copiár codigo pix
                </Button>
            </div>

            <SnackBar text={snack} />
        </div>
    );
};
