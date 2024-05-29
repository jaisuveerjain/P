import client from '@/config/postmark';

export async function POST(request: Request) {
  const body = await request.json();

  // Type assertion
  const fromEmail: string = process.env.EMAIL_FROM as string;
  const toEmail: string = process.env.EMAIL_TO as string;

  try {
    await client.sendEmail({
      From: fromEmail,
      To: toEmail,
      Subject: 'Portfolio Contact Form',
      HtmlBody: `
        <h1>Portfolio Contact Form</h1>
        <p><strong>Name:</strong> ${body.person_name}</p>
        <p><strong>Company:</strong> ${body.company}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
      ReplyTo: body.email,
    });

    return new Response('ok', { status: 200 });
  } catch (e) {
    console.error('Error sending email:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
