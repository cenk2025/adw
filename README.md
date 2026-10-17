# VOON IQ – markkinointi-, design- ja web-studio

Lähdekoodi sivustolle [ads.voon.fi](https://ads.voon.fi). Vite + React -sivusto, joka esittelee VOON IQ:n
tekoälypohjaiset markkinointi-, visuaali- ja web-palvelut.

## Rakenne

- `src/content.js` – kaikki sivuston tekstit, hinnat ja UKK yhdessä paikassa.
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
