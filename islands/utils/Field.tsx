import { useCallback, useEffect, useRef, useState } from "preact/hooks";

interface FieldProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    qtdLines?: number;
    prefix?: string;
    validator?: (value: string) => boolean;
    type?: "text" | "password";
}

export const Field = (props: FieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [val, setVal] = useState(props.value);

    useEffect(() => {
        if (props.value === val) {
            return;
        }

        setVal(props.value);
    }, [props.value]);

    const handleChange = useCallback((e: any) => {
        const newVal = e.target.value;

        if (props.validator && !props.validator(newVal)) {
            inputRef.current!.value = val;
            return;
        }

        setVal(newVal);
        props.onChange(newVal);
    }, [setVal, props.onChange, val]);

    const Component = props.qtdLines ? "textarea" : "input";

    return (
        <div className="field">
            {props.label && <span className="label">{props.label}</span>}

            <div className="input">
                {props.prefix && <span className="prefix">{props.prefix}</span>}
                <Component
                    type={props.type}
                    ref={inputRef}
                    placeholder={props.placeholder}
                    value={val}
                    onInput={handleChange}
                    rows={props.qtdLines}
                />
            </div>
        </div>
    );
};
