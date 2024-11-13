import { useEffect, useState, useCallback } from "preact/hooks";

interface FieldProps{
    label: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
}

export const Field = (props: FieldProps) => {
    const [val, setVal] = useState(props.value);

    useEffect(() => {
        if(props.value === val)
            return;

        setVal(props.value);
    }, [props.value]);

    const handleChange = useCallback((e: any) => {
        setVal(e.target.value);
        props.onChange(e.target.value);
    }, [props.onChange]);

    return (
        <div className='field'>
            <span className='label'>{props.label}</span>
            <input type='text' placeholder={props.placeholder} value={val} onChange={handleChange} />
        </div>
    );
}
