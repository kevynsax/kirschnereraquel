import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { DonationDetailed } from "../../islands/DonationDetailed.tsx";
import { getDonation } from '../../services/donation.ts';
import { Donation } from '../../models/Donation.ts';

export const handler: Handlers = {
    GET: async (_req: Request, _ctx: FreshContext): Promise<Response> => {
        const donation = await getDonation(_ctx.params.id);

        return _ctx.render({ donation });
    }
}

interface Props{
    donation: Donation
}

export default function DonationPage(props: PageProps<Props>) {
    return (
        <div className="donation" style={{margin: 32}}>
            <DonationDetailed donation={props.data.donation}  />
        </div>
    );

}
