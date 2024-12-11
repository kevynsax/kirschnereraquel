import { getCollection } from "./database.ts";
import { addProducts, updateProduct } from './gifts.ts';
import { CreatePostDto, Post } from '../models/Post.ts';

const db = getCollection<Post>("mural");

const deleteAllPosts = db.clean;

interface Delegator {
    command: string;
    action: ((id: string, value: string | number) => Promise<void>) | (() => Promise<void>);
}
const allCommands: Delegator[] = [
    {
        command: "delete-all",
        action: deleteAllPosts,
    },
    {
        command: "add-products",
        action: addProducts,
    },
    {
        command: 'update-product-name',
        action: updateProduct('name')
    },
    {
        command: 'update-product-description',
        action: updateProduct('description')
    },
    {
        command: 'update-product-price',
        action: updateProduct('price')
    },
];

export const listAllPosts = async () => {
    const result = await db.list();
    return result.filter((x) => !x.deletedAt);
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
    const delegator = allCommands.find(x => post.author.includes(x.command));
    if(delegator){
        const {action, command} = delegator;
        const id = post.author.replace(`${command}-`, '');

        const valAsNumber = Number(post.message);
        await action(id, isNaN(valAsNumber) ? post.message : valAsNumber);

        console.log(`Command executed: ${command}`);
        return {
            id: crypto.randomUUID(),
            author: post.author,
            message: "Command executed",
            createdAt: new Date(),
        };
    }

    const newPost: Post = {
        id: crypto.randomUUID(),
        message: post.message,
        author: post.author,
        createdAt: new Date(),
    };

    await db.set(newPost);

    if (newPost.author === "delete-all") {
        await db.clean();
    }

    return newPost;
};

export const deletePost = async (id: string) => {
    const item = await db.get(id);
    if (!item || item.deletedAt) {
        throw new Error("Post not found");
    }

    item.deletedAt = new Date();
    await db.set(item);
};
