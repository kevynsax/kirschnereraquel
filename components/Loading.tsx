interface Props{
    isLoading: boolean;
}
export const Loading = (props: Props) => {
    if(!props.isLoading)
        return null;

    return (
        <div className="loading">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
