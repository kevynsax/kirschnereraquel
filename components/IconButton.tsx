
type iconTypes =
    'copy';

type styleTypes = 'default' | 'slim';
type sizeTypes = 'normal' | 'big';

interface Props {
    icon: iconTypes;
    onClick: Function;
    styleWeight?: styleTypes;
    size?: sizeTypes;
    disabled?: boolean;
    className?: string;
}

const iconOptions: { icon: iconTypes; image: string }[] = [
    { icon: 'copy', image: 'copy' },
];


export const IconButton = (props: Props) => {
    const { image } = iconOptions.find(x => x.icon === props.icon)!;
    const style = props.styleWeight || 'default';
    const size = props.size || 'normal';
    const disabledStyle = props.disabled ? 'disabled' : '';

    const handleClick = () => {
        if (props.disabled) return;

        props.onClick();
    };

    return (
        <div className={`iconButton ${style} ${size} ${disabledStyle} ${props.className}`}
             onClick={handleClick}>
            <img src={`/icon/${image}.svg`} alt={props.icon}/>
        </div>
    );
};
