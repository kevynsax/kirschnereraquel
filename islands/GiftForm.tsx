import { Field } from "./utils/Field.tsx";
import { TextField } from "./utils/TextField.tsx";
import { useCallback, useEffect, useState } from "preact/hooks";
import { Button } from '../components/Button.tsx';

interface HasId {
    id: string;
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
                    <Field
                        label="Seu telefone"
                        placeholder="joao@example.com"
                        value={phone}
                        onChange={setPhone}
                    />
                    <TextField
                        label="Deixe uma mensagem especial"
                        placeholder="Escolha a sua mensagem"
                        value={message}
                        onChange={setMessage}
                        qtdLines={5}
                    />
                    {isDisabled && <span className="warning">Preencha os campos obrigatórios</span>}
                    <Button onClick={increaseStep} disabled={isDisabled} class='action'>Selecionar pagamento</Button>
                </>
            )}
        </div>
    );
};
