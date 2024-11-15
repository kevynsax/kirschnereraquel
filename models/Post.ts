
export interface CreatePostDto {
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
