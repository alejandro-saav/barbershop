import EmailTemplate from "@/utilitys/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { emailTo, referencia } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "oacastro999@gmail.com",
      to: [emailTo],
      subject: "Hello world",
      react: <EmailTemplate firstName="Oskar" />,
    });

    if (error) {
      console.error("Resend API error:", error);
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Catch block error:", error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
