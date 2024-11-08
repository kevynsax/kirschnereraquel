interface PostCardProps {
    afterCreation: VoidFunction;
}

export const NewPostCard = (prop: PostCardProps) => {
    return (
        <div className="newPost">
            <div className="icon">
                <img src="./icon/chat.svg" />
            </div>
            <div className="input">
                <input type="text" placeholder="Conte uma história ou deixe um recado para o Kirschner e Raquel" />
            </div>

        </div>
    )
}
