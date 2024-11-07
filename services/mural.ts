import { getCollection } from './database.ts';

export interface Post {
    id: string;
    message: string;
    author: string;
    createdAt: Date;
    deletedAt?: Date;
}

const db = getCollection<Post>('mural');

const list = await db.list();

if(list.length === 0) {
    console.log('No murals found');

    const newPost: Post = {
        id: crypto.randomUUID(),
        message: "Muito feliz com essa nova familia que esta se formando! Amo muito vocês!",
        author: "Kevyn Klava",
        createdAt: new Date(),
    }

    await db.set(newPost);
}

export const listAllPosts = (): Promise<Post[]> => db.list();
