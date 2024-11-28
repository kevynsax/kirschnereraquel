import { Field } from './utils/Field.tsx';
import { useCallback, useState, useRef } from "preact/hooks";
import { QrCode } from './utils/QrCode.tsx';
import { Donation } from '../models/Donation.ts';

interface Props{
    donation: Donation
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
});

export const DonationDetailed = (props: Props) => {
    const {donor, gift, status, ...donation} = props.donation;
    const amount = donation.qtyQuotas * gift.price;

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const codeRef = useRef();

    const markAsPaid = useCallback(async () => {
        setLoading(true);

        const response = await fetch(`/api/donate/${donation.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                donationId: donation.id
            })
        }).finally(() => setLoading(false));

        if (!response.ok) {
            const body = await response.text();
            alert(`Failed to update status.\n${body}`);

            return;
        }

        window.location.reload();
    }, [donation.id, password]);

    const markAsUnpaid = useCallback(async () => {
        setLoading(true);

        const response = await fetch(`/api/donate/${donation.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                donationId: donation.id
            })
        }).finally(() => setLoading(false));

        if (!response.ok) {
            const body = await response.text();
            alert(`Failed to update status.\n${body}`);

            return;
        }

        window.location.reload();
    }, [donation.id, password]);

    return (
        <>
            <div>Name: {donor.name}</div>
            <div>Phone Number: {donor.phone}</div>
            <div>Amount: {formatter.format(amount)}</div>
            <div>Message: {donation.message}</div>

            <div>Gift: {gift.name} ({formatter.format(gift.price)})</div>

            <div>Status: {status}</div>

            <Field value={password} onChange={setPassword} placeholder='Digite sua senha' type='password' />

            {status === 'pending' && (
                <button style={{ margin: '16px 0' }} onClick={markAsPaid}>Confirmar recebimento</button>
            )}

            {status === 'paid' && (
                <button style={{ margin: '16px 0', border: '1px solid red' }} onClick={markAsUnpaid}>Marcar como não recebido</button>
            )}

            {donation.type === 'pix' && status == 'pending' && (
                <>
                    <div>Pix: {donation.pixQrCode}</div>
                    <QrCode text={donation.pixQrCode} />
                </>
            )}
        </>
    )
}
