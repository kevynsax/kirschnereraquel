import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getDonation } from '../services/donation.ts';
import { QrCode } from '../islands/utils/QrCode.tsx';
import {QrCodePix as Pix} from 'npm:qrcode-pix'

export const handler: Handlers = {
    GET: async (_req: Request, _ctx: FreshContext): Promise<Response> => {

        const pix = Pix({
            version: '01',
            key: 'raquelekirschner2024@gmail.com',
            message: 'abacate quando nasce',
            name: 'Kirschner Klava',
            city: 'Brasilia',
            transactionId: '123123312312',
            value: 100.00,
        })

        return _ctx.render({ qrCode: pix.payload() });
    }
}

interface Props{
    qrCode: string
}

export default function MyPix(props: PageProps<Props>){
    return (
        <div>
            {props.data.qrCode}
            <QrCode text={props.data.qrCode} />
        </div>
    )
}
