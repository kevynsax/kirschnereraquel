import { Post } from "../services/mural.ts";
import { effect, useSignal } from "@preact/signals";

interface PostCardProps {
    post: Post;
    onDelete?: VoidFunction;
}

const createdAtLabel = (createdAt: Date): string => {
    const yearsSinceCreation = new Date().getFullYear() -
        createdAt.getFullYear();
    if (yearsSinceCreation === 1) {
        return "1 ano atrás";
    }
    if (yearsSinceCreation > 1) {
        return `${yearsSinceCreation} anos atrás`;
    }

    const monthsSinceCreation = new Date().getMonth() - createdAt.getMonth();
    if (monthsSinceCreation === 1) {
        return "1 mês atrás";
    }
    if (monthsSinceCreation > 1) {
        return `${monthsSinceCreation} meses atrás`;
    }

    const daysSinceCreation = new Date().getDate() - createdAt.getDate();
    if (daysSinceCreation === 1) {
        return "1 dia atrás";
    }
    if (daysSinceCreation > 1) {
        return `${daysSinceCreation} dias atrás`;
    }

    const hoursSinceCreation = new Date().getHours() - createdAt.getHours();
    if (hoursSinceCreation === 1) {
        return "1 hora atrás";
    }
    if (hoursSinceCreation > 1) {
        return `${hoursSinceCreation} horas atrás`;
    }

    const minutesSinceCreation = new Date().getMinutes() -
        createdAt.getMinutes();
    if (minutesSinceCreation === 1) {
        return "1 minuto atrás";
    }
    if (minutesSinceCreation > 1) {
        return `${minutesSinceCreation} minutos atrás`;
    }

    const secondsSinceCreation = new Date().getSeconds() -
        createdAt.getSeconds();
    if (secondsSinceCreation === 1) {
        return "1 segundo atrás";
    }

    return "";
};

export function PostCard(props: PostCardProps) {
    const timeSinceCreation = useSignal("");

    effect(() => {
        const interval = setInterval(() => {
            timeSinceCreation.value = createdAtLabel(
                new Date(props.post.createdAt),
            );
        }, 1000);

        return () => clearInterval(interval);
    });

    const { post } = props;

    const initials = post.author.split(" ").map((name) => name[0]).join("");

    return (
        <div class="post">
            <div className="header">
                <div className="avatar">{initials}</div>
                <div className="info">
                    <span>{post.author}</span>
                    <span>
                        <img src="./icon/clock.svg" />
                        {timeSinceCreation.value}
                    </span>
                </div>
                {props.onDelete && (
                    <div className="delete icon">
                        <img src="./icon/trash.svg" onClick={props.onDelete} />
                    </div>
                )}
            </div>
            <div class="message">{post.message}</div>
        </div>
    );
}
