import { Donation } from '../services/donation.ts';
import { Field } from './utils/Field.tsx';
import { useCallback, useState } from "preact/hooks";

interface Props{
    donation: Donation
}

const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency', currency: 'BRL'
});

export const DonationDetailed = (props: Props) => {
    const {id, donor, gift, amount, status} = props.donation;

    const [password, setPassword] = useState('');

    const updateStatus = useCallback(async () => {
        const response = await fetch(`/api/donate/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password,
                donationId: id
            })
        });

        if (!response.ok) {
            const body = await response.text();
            alert(`Failed to update status.\n${body}`);

            return;
        }

        window.location.reload();
    }, [id, password]);


    return (
        <>
            <div>Name: {donor.name}</div>
            <div>Phone Number: {donor.phone}</div>
            <div>Amount: {formatter.format(amount)}</div>

            <div>Gift: {gift.name} ({formatter.format(gift.price)})</div>

            <div>Status: {status}</div>

            <Field value={password} onChange={setPassword} placeholder='Digite sua senha' type='password'/>

            {status === 'pending' && (
                <button style={{ margin: '16px 0' }} onClick={updateStatus}>Confirmar recebimento</button>
            )}
        </>
    )
}
