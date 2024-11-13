import { Post } from '../services/mural.ts';
import { PostCard } from './PostCard.tsx';
import { useSignal } from "@preact/signals";
import { useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';
import { getLocally, setLocally } from './repo.ts';
import { Field } from './utils/Field.tsx';

interface MuralProps {
    posts: Post[];
}

const key = 'myNewlyCreatedPosts';

export default function Mural(props: MuralProps) {
    const [message, setMessage] = useState('');
    const [author, setAuthor] = useState('');
    const [posts, setPosts] = useState(props.posts);
    const myNewlyCreatedPosts = useSignal<string[]>(getLocally(key) ?? []);

    const handleSubmit = async () => {
        const newPost = await fetch('/api/mural', {
            method: 'POST',
            body: JSON.stringify({
                message: message,
                author: author
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
        const posts = await lst.json();
        setPosts(posts);

        setMessage('');
        setAuthor('');
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
            setLocally(key, myNewlyCreatedPosts.value);

            const lst = await fetch('/api/mural');
            const posts = await lst.json();

            setPosts(posts);
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
                        <Field
                            qtdLines={4}
                            placeholder="Conte uma história ou deixe um recado para o Kirschner e Raquel"
                            value={message}
                            onChange={setMessage}
                        />
                        <Field
                            placeholder='Seu nome'
                            value={author}
                            onChange={setAuthor}
                        />
                        <Button onClick={handleSubmit}>Enviar</Button>
                    </div>
                </div>

                {posts
                    .sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
                    .map(post => <PostCard post={post} onDelete={getDeletePost(post.id)} />)}
            </div>
        </div>
    )
}
