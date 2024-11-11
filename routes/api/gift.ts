import { FreshContext, Handlers } from "$fresh/server.ts";
import { createGift, listAllGifts } from '../../services/gifts.ts';

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const lst = await listAllGifts();

        return new Response(JSON.stringify(lst));
    },

    async POST(_req: Request, _ctx: FreshContext): Promise<Response> {
        const form = await _req.json();

        const post = await createGift(form);

        return new Response(JSON.stringify(post));
    },
}
