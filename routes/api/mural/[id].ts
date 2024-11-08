import { FreshContext, Handlers } from "$fresh/server.ts";
import { deletePost } from '../../../services/mural.ts';

export const handler: Handlers = {
    async DELETE(_req: Request, _ctx: FreshContext): Promise<Response> {
        const { id } = _ctx.params;

        await deletePost(id);

        return new Response('ok');
    }
}
