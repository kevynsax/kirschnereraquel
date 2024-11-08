import { Post } from '../services/mural.ts';
import { PostCard } from './PostCard.tsx';
import { effect, useSignal } from "@preact/signals";
import { Button } from '../components/Button.tsx';
import { getLocally, setLocally } from './repository.ts';

interface MuralProps {
    posts: Post[];
}

const key = 'myNewlyCreatedPosts';

export default function Mural(props: MuralProps) {
    const message = useSignal('');
    const author = useSignal('');
    const posts = useSignal(props.posts);
    const myNewlyCreatedPosts = useSignal<string[]>(getLocally(key) ?? []);

    const handleSubmit = async () => {
        const newPost = await fetch('/api/mural', {
            method: 'POST',
            body: JSON.stringify({
                message: message.value,
                author: author.value
            })
        }).then(x => {
            if(x.status >= 300) {
                throw new Error('Failed to post');
            }

            return x.json() as unknown as Post;
        })

        myNewlyCreatedPosts.value = [...myNewlyCreatedPosts.value, newPost.id];
        setLocally(key, myNewlyCreatedPosts.value);

        const lst = await fetch('/api/mural');
        posts.value = await lst.json();

        message.value = '';
        author.value = '';
    }

    const getDeletePost = (id: string): undefined | VoidFunction => {
        if(!myNewlyCreatedPosts.value.includes(id)) {
            return undefined;
        }

        return async () => {
            await fetch(`/api/mural/${id}`, {
                method: 'DELETE'
            });

            myNewlyCreatedPosts.value = myNewlyCreatedPosts.value.filter(x => x !== id);
            await setLocally(key, myNewlyCreatedPosts.value);

            const lst = await fetch('/api/mural');
            posts.value = await lst.json();
        }
    }

    return (
        <div className="mural">
            <h6 className="title">Mural de Recados</h6>

            <div className="posts">
                <div className="newPost">
                    <div className="icon">
                        <img src="./icon/chat.svg" />
                    </div>
                    <div className="form">
                        <textarea
                            rows={4}
                            placeholder="Conte uma história ou deixe um recado para o Kirschner e Raquel"
                            value={message.value}
                            onInput={e => message.value = (e.target as HTMLInputElement).value}
                        />
                        <input
                            type='text'
                            placeholder='Seu nome'
                            value={author.value}
                            onInput={e => author.value = (e.target as HTMLInputElement).value}
                        />
                        <Button onClick={handleSubmit}>Enviar</Button>
                    </div>
                </div>

                {posts.value.map(post => <PostCard post={post} onDelete={getDeletePost(post.id)} />)}
            </div>
        </div>
    )
}
