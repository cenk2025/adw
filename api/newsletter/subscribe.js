import { Resend } from 'resend';
import {
    CONFIRM_EMAIL,
    EMAIL_RE,
    LOCALES,
    NEWSLETTER_FROM,
    SITE_URL,
    confirmEmailHtml,
    readJsonBody,
    signToken,
} from '../_lib/newsletter.js';

// POST /api/newsletter/subscribe – step 1 of double opt-in: email the visitor a confirmation link.
// Nobody is added to the list until they click it, so a typo or someone else's address costs nothing.
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = readJsonBody(req);
    if (!body) return res.status(400).json({ error: 'Invalid JSON' });

    // Honeypot filled in: pretend success so bots do not retry.
    if (body.website) return res.status(200).json({ success: true });

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 160) : '';
    const locale = LOCALES.includes(body.locale) ? body.locale : 'fi';
    if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Invalid email' });
    if (body.consent !== true) return res.status(400).json({ error: 'Consent required' });

    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set');
        return res.status(500).json({ error: 'Email service not configured' });
    }

    try {
        const link = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(signToken(email, locale))}`;
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
            from: NEWSLETTER_FROM,
            to: email,
            subject: CONFIRM_EMAIL[locale].subject,
            html: confirmEmailHtml(locale, link),
        });
        if (error) {
            console.error('Newsletter confirmation email failed:', error);
            return res.status(500).json({ error: 'Failed to send confirmation' });
        }
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('Newsletter subscribe error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
