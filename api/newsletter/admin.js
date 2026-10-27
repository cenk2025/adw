import { Resend } from 'resend';
import { EMAIL_RE, NEWSLETTER_FROM, passwordMatches, readJsonBody } from '../_lib/newsletter.js';

const MAX_HTML = 900 * 1024;

// POST /api/newsletter/admin – used by /uutiskirje-admin.html.
// Body: { password, action: 'check' | 'list' | 'test' | 'send', ... }
export default async function handler(req, res) {
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = readJsonBody(req);
    if (!body) return res.status(400).json({ error: 'Invalid JSON' });
    if (!passwordMatches(body.password)) {
        // Slow down password guessing a little.
        await new Promise((r) => setTimeout(r, 800));
        return res.status(401).json({ error: 'Väärä salasana tai NEWSLETTER_ADMIN_PASSWORD puuttuu' });
    }
    if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'RESEND_API_KEY puuttuu' });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const segmentId = (typeof body.segmentId === 'string' && body.segmentId.trim()) || process.env.NEWSLETTER_SEGMENT_ID;

    try {
        if (body.action === 'check') {
            return res.status(200).json({ ok: true, from: NEWSLETTER_FROM, segmentConfigured: Boolean(segmentId) });
        }

        if (body.action === 'list') {
            const { data, error } = await resend.broadcasts.list();
            if (error) return res.status(502).json({ error: error.message });
            return res.status(200).json({ broadcasts: data?.data ?? [] });
        }

        const subject = typeof body.subject === 'string' ? body.subject.trim().slice(0, 200) : '';
        const html = typeof body.html === 'string' ? body.html : '';
        const previewText = typeof body.previewText === 'string' ? body.previewText.trim().slice(0, 200) : '';
        if (!subject) return res.status(400).json({ error: 'Aihe puuttuu' });
        if (!html.trim()) return res.status(400).json({ error: 'HTML puuttuu' });
        if (html.length > MAX_HTML) return res.status(400).json({ error: 'HTML on liian suuri (yli 900 kt) – siirrä kuvat palvelimelle' });
        if (/src=["']data:/i.test(html)) {
            return res.status(400).json({ error: 'HTML sisältää data:-kuvia. Gmail ja Outlook estävät ne – käytä https-osoitteita.' });
        }

        if (body.action === 'test') {
            const to = typeof body.testTo === 'string' ? body.testTo.trim() : '';
            if (!EMAIL_RE.test(to)) return res.status(400).json({ error: 'Testiosoite puuttuu tai on virheellinen' });
            // Resend fills the unsubscribe link only in broadcasts; point it at the site in tests.
            const testHtml = html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', '#').replace(/\{\{\{contact\.[a-z_]+\|?([^}]*)\}\}\}/g, '$1');
            const { data, error } = await resend.emails.send({
                from: NEWSLETTER_FROM,
                to,
                subject: `[TESTI] ${subject}`,
                html: testHtml,
            });
            if (error) return res.status(502).json({ error: error.message });
            return res.status(200).json({ ok: true, id: data?.id });
        }

        if (body.action === 'send') {
            if (!segmentId) return res.status(400).json({ error: 'NEWSLETTER_SEGMENT_ID puuttuu' });
            if (!html.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) {
                return res.status(400).json({ error: 'HTML:stä puuttuu peruutuslinkki {{{RESEND_UNSUBSCRIBE_URL}}} – se on lain mukaan pakollinen' });
            }
            const scheduledAt = typeof body.scheduledAt === 'string' && body.scheduledAt ? body.scheduledAt : undefined;
            if (scheduledAt && Number.isNaN(Date.parse(scheduledAt))) {
                return res.status(400).json({ error: 'Ajastusaika on virheellinen' });
            }
            const { data, error } = await resend.broadcasts.create({
                segmentId,
                from: NEWSLETTER_FROM,
                subject,
                html,
                previewText: previewText || undefined,
                name: (typeof body.name === 'string' && body.name.trim()) || subject,
                send: true,
                scheduledAt,
            });
            if (error) return res.status(502).json({ error: error.message });
            return res.status(200).json({ ok: true, id: data?.id, scheduledAt: scheduledAt ?? null });
        }

        return res.status(400).json({ error: 'Unknown action' });
    } catch (err) {
        console.error('Newsletter admin error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
