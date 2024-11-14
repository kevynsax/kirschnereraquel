const COMTELE_TOKEN = '55ec6772-c003-49a2-aead-5518644d4f8c';

export const sendSms = async (phoneNumber: string, message: string) => {
  const response = await fetch('https://sms.comtele.com.br/api/v2/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-key': COMTELE_TOKEN,
    },
    body: JSON.stringify({
        Sender: 'John',
        Receivers: '+55' + phoneNumber,
        Content: message,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send SMS');
  }
};
