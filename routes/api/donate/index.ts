import { FreshContext, Handlers } from "$fresh/server.ts";
import { createDonation } from '../../../services/donation.ts';

export const handler: Handlers = {
    GET: async (_req: Request, _ctx: FreshContext): Promise<Response> => {
        console.log(_ctx)
        return new Response('ok');
    },
    POST: async (_req: Request, _ctx: FreshContext): Promise<Response> => {
        const form = await _req.json();

        const result = await createDonation(form, _ctx.url.origin);

        return new Response(JSON.stringify(result));
    }
}
