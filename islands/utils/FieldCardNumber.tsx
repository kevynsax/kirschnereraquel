import {FieldMasked} from './FieldMasked.tsx'

const formatCardNumber = (val: string): string => {
    return val
        .replace(/\D/g, '')
        .slice(0, 16)
        .match(/.{1,4}/g)
        ?.join(' ')
        || '';
}

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export const FieldCardNumber = (props: Props) => {
    return (
        <FieldMasked
            label="Número do cartão"
            placeholder="0000 0000 0000 0000"
            value={props.value}
            onChange={props.onChange}
            formatter={formatCardNumber}
            validator={x => x.replace(/\D/g, '').length === 16}
        />
    );
}