interface Props{
    text?: string;
}

export const SnackBar = (props: Props) => {

    const showStyle = props.text ? 'show' : '';
    return <div className={`snack ${showStyle}`}>{props.text}</div>
}
