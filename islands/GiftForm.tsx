import { Field } from "./utils/Field.tsx";
import { useCallback, useState } from "preact/hooks";
import { Button } from '../components/Button.tsx';
import { FieldPhoneNumber } from './utils/FieldPhoneNumber.tsx';

interface HasId {
    id: string;
    price: number;
}

export const GiftForm = (props: HasId) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const [step, setStep] = useState(0);
    
    const increaseStep = useCallback(() => {
        setStep(step + 1);
    }, [step, setStep]);

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
                    <Button onClick={increaseStep} disabled={isDisabled} class='action'>Selecionar pagamento</Button>
                </>
            )}
        </div>
    );
};
