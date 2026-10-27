import { Resend } from 'resend';
import { SITE_URL, segmentIds, sitePath, verifyToken } from '../_lib/newsletter.js';

// GET /api/newsletter/confirm?token=… – step 2 of double opt-in: add the contact to the newsletter
// segment(s) in Resend, then send the visitor back to the site with a status notice.
export default async function handler(req, res) {
    const back = (locale, status) => {
        res.setHeader('Cache-Control', 'no-store');
        res.writeHead(302, { Location: `${SITE_URL}${sitePath(locale)}?uutiskirje=${status}` });
        res.end();
    };

    let data = null;
    try {
        data = verifyToken(req.query?.token);
    } catch (err) {
        console.error('Newsletter confirm misconfigured:', err.message);
    }
    if (!data) return back('fi', 'invalid');

    const { email, locale } = data;
    const segments = segmentIds(locale);
    if (!process.env.RESEND_API_KEY || segments.length === 0) {
        console.error('Newsletter confirm: RESEND_API_KEY or NEWSLETTER_SEGMENT_ID missing');
        return back(locale, 'error');
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const created = await resend.contacts.create({
            email,
            unsubscribed: false,
            segments: segments.map((id) => ({ id })),
        });

        if (created.error) {
            // Most likely the contact already exists (earlier subscriber, or one who unsubscribed and is
            // now opting in again): re-activate it and make sure it is in the segment(s).
            const updated = await resend.contacts.update({ email, unsubscribed: false });
            if (updated.error) {
                console.error('Newsletter confirm failed:', created.error, updated.error);
                return back(locale, 'error');
            }
            for (const segmentId of segments) {
                const added = await resend.contacts.segments.add({ email, segmentId });
                if (added.error) console.warn('Segment add skipped:', segmentId, added.error.message);
            }
        }

        console.log('Newsletter subscriber confirmed', { locale, at: new Date().toISOString() });
        return back(locale, 'ok');
    } catch (err) {
        console.error('Newsletter confirm error:', err);
        return back(locale, 'error');
    }
}
