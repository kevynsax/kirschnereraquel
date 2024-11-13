import { useCallback, useEffect, useState } from "preact/hooks";
import { Field } from "./Field.tsx";

interface Props {
    value?: number;
    onChange: (val: number) => void;
    label?: string;
    placeHolder: string;
    disabled?: boolean;
    max?: number;
}

export const formatFromNumber = (val: number | undefined | null): string => {
    if (val === null || val === undefined) {
        return "";
    }

    return val.toString().replace(".", ",");
};

export const onlyValidChars = (val: string | undefined): string =>
    val?.match(/(\d|,)/g)?.join("") || "";

const isValidValue = (val: string): boolean => {
    const newVal = onlyValidChars(val);

    if (newVal.includes(",")) {
        const parts = newVal.split(",");
        if (parts.length > 2) {
            return false;
        }

        if (parts[1].length > 2) {
            return false;
        }
    }

    return newVal === val;
};

export const FieldPrice = (props: Props) => {
    const [val, setVal] = useState("");

    useEffect(() => {
        const newVal = formatFromNumber(props.value || 0);
        if (val === newVal) {
            return;
        }

        setVal(newVal);
    }, [props.value]);

    const handleChange = useCallback((value: string) => {
        setVal(value);

        const newVal = Number(value.replace(",", "."));
        props.onChange(newVal);
    }, [setVal, props, val]);

    return (
        <Field
            label={props.label}
            placeholder={props.placeHolder}
            value={val}
            onChange={handleChange}
            validator={isValidValue}
            prefix="R$"
        />
    );
};
