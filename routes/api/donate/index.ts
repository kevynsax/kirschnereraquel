import { FreshContext, Handlers } from "$fresh/server.ts";
import { createDonation } from "../../../services/donation.ts";

export const handler: Handlers = {
    POST: async (_req: Request, _ctx: FreshContext): Promise<Response> => {
        const form = await _req.json();

        const ip = _ctx.remoteAddr.hostname;

        try {
            const result = await createDonation(form, _ctx.url.origin, ip);

            return new Response(JSON.stringify(result));
        } catch (err) {
            return new Response(
                JSON.stringify({ message: (err as any).message }),
                { status: 400 },
            );
        }
    },
};
