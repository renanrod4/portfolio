"use server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: {
    name: string;
    email: string;
    telephone: string;
    message: string
}) {
    if (!formData.email || !formData.message) {
        return { success: false, error: "Dados inválidos" };
    }
    
    try {
        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: 'renanrdemeneses@gmail.com',
            subject: `Novo contato: ${formData.name}`,
            replyTo: formData.email,
            text: `
        Nome: ${formData.name}
        E-mail: ${formData.email}
        Telefone: ${formData.telephone}
        Mensagem: ${formData.message}
      `,
        });
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false };
    }
}