import { FreshContext } from "$fresh/server.ts";
import { listAllPosts } from '../../services/mural.ts';

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    const lst = await listAllPosts();

    const payload = JSON.stringify(lst);
    return new Response(payload, {
        headers: {
            'content-type': 'application/json',
        },
    });
}
