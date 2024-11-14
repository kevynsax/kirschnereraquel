import { FreshContext, Handlers } from "$fresh/server.ts";
import { markPixAsReceived } from '../../../services/donation.ts';

interface MarkAsReceivedPayload{
    password: string;
    donationId: string;
}

export const handler: Handlers = {
    async PUT(_req: Request, _ctx: FreshContext): Promise<Response> {
        const form = await _req.json() as MarkAsReceivedPayload;

        try {
            await markPixAsReceived(form.donationId, form.password);

            return new Response('ok');
        }catch (err) {
            return new Response(err.message, { status: 400 });
        }
    }

}
