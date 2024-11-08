import { effect, useSignal } from "@preact/signals";
import { NewPostCard } from './NewPostCard.tsx';
import { PostCard } from './PostCard.tsx';
import { Post } from '../services/mural.ts';

export const Posts = () => {
    const posts = useSignal<Post[]>([])

    const updatePosts = () => {
        fetch('/api/mural')
            .then((response) => response.json())
            .then((data) => posts.value = data)
    }

    effect(() => {
        const interval = setInterval(updatePosts, 3000)
        return () => clearInterval(interval)
    })

    return (
        <div className="mural">
            <h6 className="title">Mural de Recados</h6>
            <div className="posts">
                <NewPostCard afterCreation={updatePosts} />
                {posts.value.map(post => <PostCard post={post} />)}
            </div>
        </div>
    )
}
