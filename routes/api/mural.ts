import { FreshContext, Handlers } from "$fresh/server.ts";
import { createPost, deletePost, listAllPosts } from '../../services/mural.ts';

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const lst = await listAllPosts();

        return new Response(JSON.stringify(lst));
    },

    async POST(_req: Request, _ctx: FreshContext): Promise<Response> {
        const form = await _req.json();

        const post = await createPost(form);

        return new Response(JSON.stringify(post));
    },

    async DELETE(_req: Request, _ctx: FreshContext): Promise<Response> {
        const { id } = _ctx.params;

        await deletePost(id);

        return new Response('ok');
    }
}
