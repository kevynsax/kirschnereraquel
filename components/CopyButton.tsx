import { IconButton } from "./IconButton.tsx";

interface Props {
    label: string;
    value: string;
}
export const CopyButton = (props: Props) => {
    const copy = () => {
        navigator.clipboard.writeText(props.value);
        alert(`Copiado com sucesso`);
    };

    return (
        <IconButton
            icon="copy"
            onClick={copy}
            styleWeight='default'
            className='copy-button'
        />
    );
};
