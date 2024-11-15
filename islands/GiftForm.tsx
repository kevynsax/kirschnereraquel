import { Field } from './utils/Field.tsx';
import { useCallback, useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';
import { FieldPhoneNumber } from './utils/FieldPhoneNumber.tsx';
import { Loading } from '../components/Loading.tsx';
import { QrCode } from './utils/QrCode.tsx';
import { SnackBar } from '../components/SnackBar.tsx';
import { Gift } from '../models/Gift.ts';
import { Donation, DonationStatus, PixDonation, } from '../models/Donation.ts';

interface Props {
    product: Gift;
    price: number;
    onFormWasSent: () => void;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const GiftForm = (props: Props) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

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
        const req = await fetch("/api/donate", {
            method: "POST",
            body: JSON.stringify({
                giftId: props.product.id,
                donor: { name, phone },
                message,
                amount: props.price,
                type: "pix",
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).finally(() => setIsLoading(false));

        const donation = await req.json();

        props.onFormWasSent();
        setNewDonation(donation);

        return keepUpdatingUntilIsPaid(donation.id);
    };

    const isDisabled = !name || !phone;

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

                <div className="payment-option">
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
