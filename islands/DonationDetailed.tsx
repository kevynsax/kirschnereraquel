import { Donation } from '../services/donation.ts';
import { Field } from './utils/Field.tsx';
import { useCallback, useState, useRef, useEffect } from "preact/hooks";
import { QrCode } from './utils/QrCode.tsx';

interface Props{
    donation: Donation
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
});

export const DonationDetailed = (props: Props) => {
    const {donor, gift, amount, status, ...donation} = props.donation;

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');

    const codeRef = useRef();

    const updateStatus = useCallback(async () => {
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
                <button style={{ margin: '16px 0' }} onClick={updateStatus}>Confirmar recebimento</button>
            )}

            {donation.type === 'pix' && (<>

                    <div>Pix: {donation.pixQrCode}</div>
                    <QrCode text={donation.pixQrCode} /></>
            )
            }
        </>
    )
}
