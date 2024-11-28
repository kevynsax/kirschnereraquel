import { FreshContext, Handlers } from "$fresh/server.ts";
import { deleteDonation, getDonation, markPixAsReceived } from '../../../services/donation.ts';

interface MarkAsReceivedPayload{
    password: string;
    donationId: string;
}

export const handler: Handlers = {
    async GET(_req: Request, _ctx: FreshContext): Promise<Response> {
        const id = _ctx.params.id;

        const result = await getDonation(id);

        return new Response(JSON.stringify(result));
    },
    async PUT(_req: Request, _ctx: FreshContext): Promise<Response> {
        const form = await _req.json() as MarkAsReceivedPayload;

        try {
            await markPixAsReceived(form.donationId, form.password);

            return new Response('ok');
        }catch (err) {
            return new Response((err as any).message, { status: 400 });
        }
    },
    async DELETE(_req: Request, _ctx: FreshContext): Promise<Response> {
        const form = await _req.json() as MarkAsReceivedPayload;

        try {
            await deleteDonation(form.donationId, form.password, _ctx.url.origin);

            return new Response('ok');
        }catch (err) {
            return new Response((err as any).message, { status: 400 });
        }
    }

}
