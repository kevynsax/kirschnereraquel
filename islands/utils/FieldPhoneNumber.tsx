import { extractNumber, FieldMasked } from './FieldMasked.tsx';

const allDDD =
    [61, 62, 64, 65, 66, 67, 82, 71, 73, 74, 75, 77, 85, 88, 98, 99, 83, 81, 87, 86, 89, 84, 79,
     68, 96, 92, 97, 91, 93, 94, 69, 95, 63, 27, 28, 31, 32, 33, 34, 35, 37, 38, 21, 22, 24, 11,
     12, 13, 14, 15, 16, 17, 18, 19, 41, 42, 43, 44, 45, 46, 51, 53, 54, 55, 47, 48, 49];

interface Props {
    label?: string;
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}

export const phoneInputFormatter = (phoneNumber: string | null | undefined): string => {
    if (!phoneNumber) return '';
    const num = extractNumber(phoneNumber);

    //61985891092
    const slice = (start: number, end: number): string => num.slice(start, end);
    const firstBloc = slice(0, 2);
    const secondBloc = slice(2, 3);
    const thirdBloc = slice(3, 7);
    const fourthBloc = slice(7, 11);

    //(61) 9 8589 1092

    if (!!fourthBloc.length)
        return `(${firstBloc}) ${secondBloc} ${thirdBloc} ${fourthBloc}`;

    if (!!thirdBloc.length)
        return `(${firstBloc}) ${secondBloc} ${thirdBloc}`;

    if (!!secondBloc.length)
        return `(${firstBloc}) ${secondBloc}`;

    return `(${firstBloc}`;
};

export const validPhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber) return false;

    const num = extractNumber(phoneNumber);
    if (num.length !== 11)
        return false;

    const ddd = num.slice(0, 2);
    return allDDD.some(x => x.toString() === ddd);
};

export const FieldPhoneNumber = (props: Props) => {
    return (
        <FieldMasked
            {...props}
            label={props.label || 'Telefone'}
            placeholder="(61) 9 8327 3504"
            formatter={phoneInputFormatter}
            validator={validPhoneNumber} />
    );
};
