import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { nombre, empresa, email, telefono, mensaje } = await request.json();

    if (!nombre || !email || !mensaje) {
      return Response.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: 'Formulario Web <contacto@techstackcol.com>',
      to: 'contacto@techstackcol.com',
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre}${empresa ? ` — ${empresa}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f9fafb; border-radius: 12px;">
          <h2 style="color: #1a1a2e; margin-bottom: 24px;">Nuevo mensaje desde el sitio web</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Nombre</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${nombre}</td>
            </tr>
            ${empresa ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Empresa</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${empresa}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${email}</td>
            </tr>
            ${telefono ? `
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Teléfono</td>
              <td style="padding: 10px 0; color: #111827; font-weight: 600;">${telefono}</td>
            </tr>` : ''}
            <tr>
              <td colspan="2" style="padding: 20px 0 8px; color: #6b7280; font-size: 14px;">Mensaje</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 16px; background: #ffffff; border-radius: 8px; color: #111827; line-height: 1.6; border: 1px solid #e5e7eb;">
                ${mensaje.replace(/\n/g, '<br>')}
              </td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #9ca3af;">
            Este mensaje fue enviado desde el formulario de contacto de techstackcol.com
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Error al enviar el correo.' }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return Response.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
