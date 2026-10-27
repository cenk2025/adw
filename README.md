# VOON IQ – markkinointi-, design- ja web-studio

Lähdekoodi sivustolle [ads.voon.fi](https://ads.voon.fi). Vite + React -sivusto, joka esittelee VOON IQ:n
tekoälypohjaiset markkinointi-, visuaali- ja web-palvelut.

## Rakenne

- `src/i18n/` – sivuston tekstit kolmella kielellä: `fi.js` (oletus, `/`), `en.js` (`/en`) ja `sv.js` (`/sv`).
  Kielestä riippumaton data (kuvat, tuotelinkit, hero-kuvasarjat) on tiedostossa `shared.js`.
- `src/components/` – osiot (hero, palvelut, AI-studio, työt, web, prosessi, hinnat, UKK, yhteys, footer).
- `src/components/VoonScrollExperience.jsx` – vierityksellä ohjattu hero. Kuvasarjat ovat kansioissa
  `public/voonarc`, `public/voonc` ja `public/voona`; reunojen mustat palkit ja vesileima rajataan pois piirrettäessä.
- `public/work/` – töiden galleriassa käytetyt, valmiiksi rajatut WebP-kuvat.
- `api/send-email.js` – Vercel-funktio yhteydenottolomakkeelle (Resend), sama malli kuin voon.fi:ssä.

## Kehitys

```bash
npm install
npm run dev      # käyttöliittymä (lomakkeen API ei ole käytössä Viten kehityspalvelimessa)
npx vercel dev   # käyttöliittymä + /api/send-email paikallisesti
npm run lint
npm run build
```

## Ympäristömuuttujat (Vercel)

| Muuttuja         | Kuvaus                                                                 |
| ---------------- | ---------------------------------------------------------------------- |
| `RESEND_API_KEY` | Resendin API-avain (sama kuin voon.fi-projektissa).                    |
| `RESEND_FROM`    | Lähettäjä Resendissä vahvistetusta domainista, esim. `VOON IQ <info@voon.fi>`. |
| `CONTACT_TO`     | Valinnainen. Vastaanottaja, oletuksena `info@voon.fi`.                 |

## Uutiskirje

Tilaajat liittyvät sivun alaosan lomakkeella (fi/en/sv). Tilaus vahvistetaan kahdessa vaiheessa:
lomake lähettää vahvistuslinkin, ja vasta linkin klikkaus lisää osoitteen Resendin segmenttiin
(`/api/newsletter/subscribe` → `/api/newsletter/confirm`). Lähetykset tehdään sivulta
`/uutiskirje-admin.html`, joka on suojattu salasanalla. Sivulla voi esikatsella, lähettää testin,
lähettää heti tai ajastaa, ja se näyttää aiemmat lähetykset. Lähetys kulkee Resend Broadcasts -palvelun kautta, joka
hoitaa myös peruutuslinkin ja -listan.

| Muuttuja | Kuvaus |
| --- | --- |
| `NEWSLETTER_FROM` | Lähettäjä, esim. `VOON IQ <uutiset@uutiset.voon.fi>` (domain vahvistettuna Resendissä). |
| `NEWSLETTER_SEGMENT_ID` | Resendin segmentti, johon kaikki tilaajat lisätään ja jolle lähetetään. |
| `NEWSLETTER_SEGMENT_ID_FI` / `_EN` / `_SV` | Valinnaiset kielikohtaiset segmentit. |
| `NEWSLETTER_SECRET` | Satunnainen, vähintään 32 merkkiä. Allekirjoittaa vahvistuslinkit. |
| `NEWSLETTER_ADMIN_PASSWORD` | Admin-sivun salasana, vähintään 12 merkkiä. |
| `SITE_URL` | Valinnainen, oletus `https://ads.voon.fi`. |

`RESEND_API_KEY`:llä on oltava **Full access** -oikeus, koska pelkkä lähetysoikeus ei riitä
kontakteihin ja broadcasteihin.

Uutiskirjepohjan säännöt (`newsletter/`):
- Kuvien on oltava https-osoitteissa (esim. `public/newsletter/<kk>/`). Gmail estää `data:`-kuvat.
- Peruutuslinkki on `href="{{{RESEND_UNSUBSCRIBE_URL}}}"`.
- Koko on alle 100 kt, koska Gmail leikkaa pidemmät viestit.
