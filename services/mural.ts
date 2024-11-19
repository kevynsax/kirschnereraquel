import { getCollection } from "./database.ts";
import { resetProducts } from "./gifts.ts";
import { CreatePostDto, Post } from '../models/Post.ts';
import { migrateDonations } from './donation.ts';

const db = getCollection<Post>("mural");

const deleteAllPosts = db.clean;

const allCommands = [
    {
        command: "delete-all",
        action: deleteAllPosts,
    },
    {
        command: "reset-products",
        action: resetProducts,
    },
    {
        command: 'migrate-donations',
        action: migrateDonations
    }
];

export const listAllPosts = async () => {
    const result = await db.list();
    return result.filter((x) => !x.deletedAt);
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
    if(allCommands.some(x => x.command === post.author)) {
        await allCommands.find(x => x.command === post.author)!.action();

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
