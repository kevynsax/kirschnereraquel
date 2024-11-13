import {useCallback, useEffect, useState} from "preact/hooks";
import { Field } from './Field.tsx';

interface Props {
    value?: string;
    onChange: (val: string) => void;
    label: string;
    placeHolder: string;
    formatter: (val: string) => string;
    validator: (val: string) => boolean;
    disabled?: boolean;
}

export const extractNumber = (val: string | undefined): string =>
    val?.match(/(\d)/g)?.join("") || "";

export const FieldMasked = (props: Props) => {
    const [val, setVal] = useState('');

    const handleChange = useCallback((value: string) => {
        const onlyNumbers = extractNumber(value);

        const newVal = props.formatter(onlyNumbers);

        setVal(newVal);

        const validValue = props.validator(newVal) ? onlyNumbers : '';
        props.onChange(validValue);
    }, [setVal, props]);

    useEffect(() => {
        const newVal = props.formatter(extractNumber(props.value));

        if (val === newVal)
            return;

        setVal(newVal);
    }, [setVal, props]);

    return (
        <Field
            label={props.label}
            placeholder={props.placeHolder}
            value={val}
            onChange={handleChange}
        />
    );
};
