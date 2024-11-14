import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { DonationDetailed } from "../../islands/DonationDetailed.tsx";
import { Donation as DonationModel, getDonation } from '../../services/donation.ts';
import { errno } from 'npm:fast-glob@3.3.2/out/utils';

export const handler: Handlers = {
    GET: async (_req: Request, _ctx: FreshContext): Promise<Response> => {
        const donation = await getDonation(_ctx.params.id);

        return _ctx.render({ donation });
    }
}

interface Props{
    donation: DonationModel
}

export default function Donation(props: PageProps<Props>) {
    return (
        <div className="donation" style={{margin: 32}}>
            <DonationDetailed donation={props.data.donation}  />
        </div>
    );

}
