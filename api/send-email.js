import { Resend } from 'resend';

// Vercel serverless function behind the contact form (POST /api/send-email).
// Same Resend setup as voon.fi: set RESEND_API_KEY and RESEND_FROM in the Vercel project.
// RESEND_FROM must be an address on a domain verified in Resend, e.g. "VOON IQ <info@voon.fi>".
const FROM_ADDRESS = process.env.RESEND_FROM || 'VOON IQ <onboarding@resend.dev>';
const TO_ADDRESS = process.env.CONTACT_TO || 'info@voon.fi';

const LIMITS = { company: 120, name: 120, email: 160, phone: 40, need: 80, budget: 40, message: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

const row = (label, value) =>
    value
        ? `<tr><td style="padding:10px 0;color:#6b7383;font-size:13px;width:130px;vertical-align:top">${label}</td>
           <td style="padding:10px 0;color:#0b0f16;font-size:15px">${escapeHtml(value).replace(/\n/g, '<br>')}</td></tr>`
        : '';

const shell = (title, inner) => `<!DOCTYPE html>
<html><body style="margin:0;background:#f3f5f8;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:600px;margin:0 auto;padding:24px">
    <div style="background:#07090d;color:#fff;padding:28px 30px;border-radius:14px 14px 0 0">
      <div style="font-size:20px;letter-spacing:4px;font-weight:300">VOON <b style="color:#00f0ff">IQ</b></div>
      <div style="margin-top:8px;font-size:15px;opacity:.85">${title}</div>
    </div>
    <div style="background:#fff;padding:28px 30px;border-radius:0 0 14px 14px">${inner}</div>
  </div>
</body></html>`;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try {
            body = JSON.parse(body);
        } catch {
            return res.status(400).json({ error: 'Invalid JSON' });
        }
    }
    body = body || {};

    // Honeypot filled in: pretend success so bots do not retry.
    if (body.website) {
        return res.status(200).json({ success: true });
    }

    const data = Object.fromEntries(Object.entries(LIMITS).map(([key, max]) => [key, clean(body[key], max)]));

    if (!data.company || !data.name || !data.email || !data.need) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    if (!EMAIL_RE.test(data.email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const submitted = new Date().toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' });

    try {
        const { data: sent, error } = await resend.emails.send({
            from: FROM_ADDRESS,
            to: TO_ADDRESS,
            replyTo: data.email,
            subject: `Uusi yhteydenotto (ads.voon.fi): ${data.company} – ${data.need}`,
            html: shell(
                'Uusi yhteydenotto VOON IQ -markkinointisivustolta',
                `<table style="width:100%;border-collapse:collapse">
                    ${row('Yritys', data.company)}
                    ${row('Nimi', data.name)}
                    ${row('Sähköposti', data.email)}
                    ${row('Puhelin', data.phone)}
                    ${row('Tarve', data.need)}
                    ${row('Budjetti', data.budget)}
                    ${row('Viesti', data.message)}
                </table>
                <p style="margin-top:24px;color:#6b7383;font-size:12px">Lähetetty ${escapeHtml(submitted)}</p>`,
            ),
        });

        if (error) {
            console.error('Resend error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        // The team notification already went out, so a failed auto-reply must not fail the request.
        const { error: replyError } = await resend.emails.send({
            from: FROM_ADDRESS,
            to: data.email,
            subject: 'Kiitos yhteydenotostasi – VOON IQ',
            html: shell(
                'Kiitos yhteydenotostasi!',
                `<p style="font-size:17px;color:#0b0f16">Hei ${escapeHtml(data.name)},</p>
                <p style="color:#3b4250;line-height:1.7">Olemme vastaanottaneet viestisi. Käymme sen läpi ja palaamme sinuun
                yleensä <b>1–2 arkipäivän kuluessa</b> sopiaksemme maksuttoman kartoituksen.</p>
                <div style="margin:24px 0;padding:18px 20px;background:#f3f5f8;border-left:4px solid #00c2d1;border-radius:8px">
                    <table style="width:100%;border-collapse:collapse">
                        ${row('Yritys', data.company)}
                        ${row('Tarve', data.need)}
                        ${row('Viesti', data.message)}
                    </table>
                </div>
                <p style="color:#3b4250;line-height:1.7">Kiirellisissä asioissa voit vastata tähän viestiin tai kirjoittaa
                osoitteeseen <a href="mailto:info@voon.fi" style="color:#0096a3">info@voon.fi</a>.</p>
                <p style="color:#6b7383;font-size:13px;margin-top:28px">VOON IQ Oy · Jyväskylä · voon.fi</p>`,
            ),
        });
        if (replyError) {
            console.error('Resend auto-reply error:', replyError);
        }

        return res.status(200).json({ success: true, messageId: sent?.id });
    } catch (err) {
        console.error('Server error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
