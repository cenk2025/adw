import { CONTACT_EMAIL } from './shared';

const sv = {
    meta: {
        title: 'VOON IQ – AI-driven marknadsföring, design och webb',
        description:
            'VOON IQ är en finländsk AI-driven marknadsförings- och designstudio: marknadsundersökningar, varumärke, annonsbilder, sociala kampanjer, webbplatser och webbappar.',
    },

    languageLabel: 'Språk',
    theme: { label: 'Tema', system: 'System', light: 'Ljust', dark: 'Mörkt' },

    nav: {
        aria: 'Huvudmeny',
        home: 'VOON IQ startsida',
        links: ['Tjänster', 'AI-studio', 'Arbeten', 'Webb', 'Priser', 'FAQ'],
        cta: 'Boka kartläggning',
        mobileCta: 'Boka en kostnadsfri kartläggning',
        openMenu: 'Öppna menyn',
        closeMenu: 'Stäng menyn',
    },

    loader: 'Laddar',

    hero: {
        aria: 'VOON IQ presentation',
        eyebrow: 'AI-driven marknadsförings- och designstudio · Finland',
        title: ['Marknadsföring, bilder', 'och webb —', 'med kraften i AI.'],
        subtitle:
            'Vi undersöker din marknad, bygger ditt varumärke och tar fram kampanjer som får folk att stanna upp. Snabbare än en traditionell byrå, mer transparent än ett verktyg.',
        primaryCta: 'Boka en kostnadsfri kartläggning',
        secondaryCta: 'Se vad vi gör',
        scrollHint: 'Skrolla och se idén ta form',
        building: 'Byggs',
        prev: 'Föregående koncept',
        next: 'Nästa koncept',
        slides: ['Fastigheter & arkitektur', 'Produkt & mat', 'Fordon & lansering'],
        story: [
            {
                title: 'Varje kampanj börjar från noll.',
                subtitle: 'Först data: marknaden, konkurrenterna och dina kunder. AI kartlägger dem på dagar, inte veckor.',
            },
            {
                title: 'Sedan strukturen.',
                subtitle: 'Strategi, budskap och kanaler byggs på undersökt kunskap, inte gissningar.',
            },
            {
                title: 'Till sist bilder som stoppar flödet.',
                subtitle: 'Annonsbilder, motion och webbplatser: skapade med AI, färdigställda av ett mänskligt öga.',
            },
            {
                title: 'Det här är VOON IQ.',
                subtitle: 'Marknadschef, designstudio och webbteam i ett och samma paket.',
            },
        ],
    },

    marquee: [
        'Marknadsundersökning',
        'Varumärkesidentitet',
        'Annonsbilder',
        'Motion & video',
        'Sociala medier',
        'Meta- & Google-kampanjer',
        'Webbplatser',
        'Webbappar',
        'SEO',
        'Analys',
    ],

    intro: {
        eyebrow: 'Varför VOON IQ',
        titleStart: 'En partner',
        titleAccent: 'för hela tillväxtkedjan.',
        body:
            'De flesta företag köper marknadsundersökningen av en leverantör, logotypen av en annan, annonserna av en tredje och webbplatsen av en fjärde. VOON IQ samlar allt i en AI-stödd process: samma data styr strategi, bilder och kampanjer, så att varje euro drar åt samma håll.',
        facts: [
            { icon: 'palette', label: 'Stark bakgrund inom grafisk design och UX' },
            { icon: 'code', label: 'Egna webbtjänster i produktion' },
            { icon: 'globe', label: 'Från Finland till internationella marknader' },
            { icon: 'radar', label: 'AI-stödd kampanjuppföljning' },
        ],
    },

    values: [
        {
            icon: 'shield',
            title: 'Datasäkerhet först',
            body: 'GDPR-kompatibelt arbete. Din kunddata matas aldrig in i offentliga modeller utan avtal.',
        },
        {
            icon: 'user',
            title: 'Människan bestämmer',
            body: 'AI hjälper till, men bestämmer inte. Allt vi publicerar granskas och färdigställs för hand.',
        },
        {
            icon: 'eye',
            title: 'Flexibel prissättning',
            body: 'Priset avtalas utifrån behov och omfattning. Du får alltid en tydlig offert innan arbetet börjar.',
        },
        {
            icon: 'globe',
            title: 'Finländsk, internationell',
            body: 'Vi verkar från Finland och arbetar på finska, engelska och svenska, även på internationella marknader.',
        },
    ],

    services: {
        eyebrow: 'Tjänster',
        title: 'Allt som tillväxt kräver. Från ett och samma team.',
        subtitle:
            'Från undersökning till bilder, från kampanjer till webbplatser. Välj en enskild tjänst eller låt oss sköta helheten.',
        items: [
            {
                icon: 'radar',
                title: 'AI-marknadsundersökning',
                body: 'AI går igenom konkurrenter, söktrender och kundfeedback och sammanfattar dem i beslut du kan lita på.',
                bullets: ['Kartläggning av konkurrenter och priser', 'Målgrupper och personas', 'Sökords- och trendanalys'],
            },
            {
                icon: 'palette',
                title: 'Varumärke & visuell identitet',
                body: 'Logotyp, färger, typografi och tonläge som sticker ut, plus riktlinjer som håller uttrycket enhetligt i alla kanaler.',
                bullets: ['Logotyp och symbol', 'Varumärkesmanual', 'Mallar för sociala medier och tryck'],
            },
            {
                icon: 'sparkles',
                title: 'AI-annonsbilder & motion',
                body: 'Produktbilder, koncept och rörligt material utan tung studiofotografering, klart för alla format.',
                bullets: ['Produkt- och konceptbilder', '3D- och motionvideor', 'Alla format för sociala medier och annonser'],
            },
            {
                icon: 'calendar',
                title: 'Sociala medier & innehåll',
                body: 'Innehållskalender, texter och bilder planerade i förväg. Du godkänner, vi publicerar.',
                bullets: ['Månatlig innehållskalender', 'Texter på finska, engelska och svenska', 'Publicering och bevakning av communityn'],
            },
            {
                icon: 'trending',
                title: 'Kampanjer & tillväxt',
                body: 'Meta-, Google-, LinkedIn- och TikTok-kampanjer som optimeras kontinuerligt utifrån data.',
                bullets: ['Målgruppsstyrning och A/B-test', 'Konverteringsspårning', 'Tydlig månadsrapport'],
            },
            {
                icon: 'code',
                title: 'Webbplatser & webbappar',
                body: 'Snabba, sökmotorvänliga webbplatser och skräddarsydda webbappar med inbyggd AI.',
                bullets: ['Landnings- och företagssidor', 'Kundportaler och bokningssystem', 'AI-integrationer och automation'],
            },
        ],
    },

    studio: {
        eyebrow: 'AI-studio',
        title: 'Så arbetar AI för dig.',
        subtitle: 'Fem steg, en vy. Du ser hela tiden vad som görs och varför.',
        note: 'Illustrativ exempelvy',
        tabsLabel: 'AI-studions steg',
        live: 'AI arbetar',
        brand: 'Kakao & Co',
        steps: [
            { id: 'research', label: 'Undersök', title: 'Marknaden kartlagd på dagar', body: 'Konkurrenter, priser, söktrender och kundernas språk samlade i en vy.' },
            { id: 'plan', label: 'Planera', title: 'Strategi byggd på data', body: 'Målgrupper, kärnbudskap och kanalmix underbyggda av undersökningen.' },
            { id: 'create', label: 'Skapa', title: 'Bilder och texter', body: 'AI tar fram alternativ, en designer väljer och finslipar de bästa.' },
            { id: 'publish', label: 'Publicera', title: 'Rätt kanal, rätt tid', body: 'Innehållet schemaläggs i de kanaler där dina kunder faktiskt finns.' },
            { id: 'optimize', label: 'Optimera', title: 'Ständig förbättring', body: 'Svaga annonser sållas bort och budgeten flyttas till dem som fungerar.' },
        ],
        research: {
            interest: 'Sökintresse · premiumchoklad',
            trend: 'Växer',
            share: 'Synlighetsandel',
            competitors: ['Konkurrent A', 'Konkurrent B', 'Ditt varumärke', 'Konkurrent C'],
            language: 'Kundernas språk',
            words: ['hög kvalitet', 'som present', 'rättvisemärkt', 'vegansk', 'inhemsk', 'för dyr'],
            insight: 'Möjlighet: presentaskar inför julen.',
        },
        plan: {
            personas: [
                { name: 'Kvalitetsmedveten presentgivare', meta: 'Stadsbo · Instagram' },
                { name: 'Vardagsgodisälskare', meta: 'Student · TikTok' },
            ],
            channels: 'Kanalmix',
            channelNames: ['Instagram', 'Google', 'TikTok', 'Nyhetsbrev'],
            message: 'Kärnbudskap',
            quote: '”En liten stund som smakar stort.”',
        },
        create: {
            visual: 'Bild',
            best: 'Bästa prognos',
            alternative: 'Alternativ',
            copies: ['En liten stund som smakar stort.', 'Finländsk choklad, rättvist gjord.'],
            chosen: 'Vald',
        },
        publish: {
            days: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
            posts: ['IG Reels', 'Google-annons', 'TikTok', 'IG Story', 'Nyhetsbrev', 'IG Karusell', 'TikTok'],
            always: 'löpande',
        },
        optimize: {
            kpis: [
                { label: 'Klickfrekvens', trend: 'Stigande', dir: 'up' },
                { label: 'Kostnad per klick', trend: 'Sjunkande', dir: 'down' },
                { label: 'Avkastning på annonser', trend: 'Stigande', dir: 'up' },
            ],
            chart: 'Konverteringar per vecka',
            log: 'Bild A fick tydligt fler klick. Budgeten flyttades automatiskt och B stängdes av.',
        },
    },

    work: {
        eyebrow: 'Arbeten & koncept',
        title: 'Bilder som aldrig behövde fotograferas.',
        subtitle:
            'Alla bilder och videor nedan är skapade med hjälp av AI: inget filmteam, ingen byggarbetsplats, ingen prototyp. Bara en idé, regi och finputs.',
        items: [
            { title: 'Villa vid sjön', tag: 'Fastighetsmarknadsföring' },
            { title: 'Chokladens anatomi', tag: 'Produktlansering' },
            { title: 'Från stomme till form', tag: 'Fordon · motion' },
            { title: 'Ett rum tar form', tag: 'Arkitekturvisualisering' },
            { title: 'Ett ögonblicks explosion', tag: 'Annonsbild' },
            { title: 'Lanseringsbild', tag: 'Produktbild' },
        ],
        ctaKicker: 'Härnäst',
        ctaTitleStart: 'Ditt varumärke',
        ctaTitleAccent: 'här?',
        ctaLink: 'Starta ett projekt',
    },

    web: {
        eyebrow: 'Webbplatser & webbappar',
        title: 'Vi bygger våra egna produkter. Med samma kunnande bygger vi dina.',
        body:
            'VOON IQ är mer än en reklambyrå. Vi har designat, kodat och lanserat våra egna AI-tjänster. Samma team bygger en webbplats åt ditt företag som laddar snabbt, syns i sökningar och gör besökare till kunder.',
        capabilities: [
            'Responsiva företags- och kampanjsidor',
            'Skräddarsydda webbappar och portaler',
            'AI-assistenter och automation',
            'Sökmotoroptimering och analys',
            'Dataskydd (GDPR) och behörigheter i ordning',
        ],
        browserPath: 'voon.fi / produkter',
        products: [
            'AI känner igen kompetens i fritt formulerad text och visar vägar till jobb och utbildning.',
            'Karriärtjänst för personer som flyttat till Finland: ESCO-baserat CV, Talent Pathway och mentorskap.',
            'Lätt verksamhetsstyrning för små och medelstora företag: kvitto-OCR, förfallodagar och automatiska rapporter.',
            'Rådgivning för flytt och etablering i Finland med AI-stödd ärendebedömning.',
        ],
    },

    process: {
        eyebrow: 'Process',
        title: 'Fyra steg från idé till resultat.',
        stepLabel: 'Steg',
        steps: [
            { title: 'Kostnadsfri kartläggning', body: 'Ett kort samtal om dina mål, nuläge och budget. Inga förpliktelser.' },
            { title: 'AI-undersökning & strategi', body: 'Vi kartlägger marknaden och konkurrenterna och tar fram en tydlig plan för kanaler och budskap.' },
            { title: 'Produktion & publicering', body: 'Bilder, texter, kampanjer och vid behov webbplatser. Du godkänner innan något publiceras.' },
            { title: 'Mätning & optimering', body: 'Vi följer resultaten kontinuerligt och rapporterar i klartext vad vi förbättrar härnäst.' },
        ],
    },

    pricing: {
        eyebrow: 'Priser',
        title: 'Flexibla paket. Pris efter behov.',
        subtitle:
            'Varje företag är olika. Välj en lämplig utgångspunkt så tar vi fram en tydlig offert utifrån dina behov och omfattningen.',
        choose: 'Välj',
        plans: [
            {
                name: 'Start',
                price: 'Enligt avtal',
                period: 'engångsprojekt',
                desc: 'AI-kartläggning av marknaden och tillväxtplan.',
                features: [
                    'Marknads- och konkurrentanalys',
                    'Målgrupper och personas',
                    'Kanal- och budskapsplan',
                    'Kampanjbilder enligt varumärket',
                ],
                needIndex: 0,
            },
            {
                name: 'Growth',
                price: 'Enligt avtal',
                period: 'månadstjänst',
                desc: 'En marknadschef som månadstjänst.',
                features: [
                    'Inlägg i sociala medier med text och bild i avtalad takt',
                    'Hantering och optimering av annonskampanjer',
                    'Månadsrapport och förbättringsförslag',
                    'Mallar enligt varumärket',
                ],
                badge: 'Populärast',
                highlight: true,
                needIndex: 3,
            },
            {
                name: 'Web',
                price: 'Enligt avtal',
                period: 'skräddarsydd offert',
                desc: 'En webbplats eller webbapp nyckelfärdig.',
                features: [
                    'Responsiv webbplats eller app',
                    'SEO-grund och analys',
                    'Kontaktformulär och integrationer',
                    'Underhåll och vidareutveckling som tillval',
                ],
                needIndex: 5,
            },
        ],
        enterprise: {
            title: 'Större helheter och offentlig sektor',
            body: 'Skräddarsydda lösningar för företag och organisationer. Prissättning enligt avtal.',
            cta: 'Begär offert',
        },
        note: 'Offerten är kostnadsfri och förpliktar inte. Annonsbudgeten betalas separat till annonsplattformarna.',
    },

    faq: {
        eyebrow: 'FAQ',
        title: 'Vanliga frågor.',
        subtitle: 'Hittade du inte svaret? Fråga oss direkt, vi hjälper gärna till.',
        items: [
            {
                q: 'Ersätter AI designern?',
                a: 'Nej. AI snabbar upp undersökning och produktion, men allt som publiceras väljs, granskas och färdigställs av en designer. Du får snabbheten utan att kvaliteten eller ditt varumärke blir lidande.',
            },
            {
                q: 'Vem äger bilderna och innehållet?',
                a: 'Du. Vi överlåter nyttjanderätten till det färdiga materialet till ditt företag, och du får även källfiler och mallar.',
            },
            {
                q: 'Hur hanteras dataskyddet?',
                a: 'Vi följer GDPR. Din kund- och företagsdata matas aldrig in i offentliga AI-modeller utan separat avtal, och behörigheter begränsas alltid efter behov.',
            },
            {
                q: 'Hur snabbt kan vi komma igång?',
                a: 'Den kostnadsfria kartläggningen kan oftast ordnas samma vecka. Därefter blir de första koncepten och bilderna klara snabbt; tidtabellen kommer vi överens om tillsammans.',
            },
            {
                q: 'Vad kostar tjänsterna?',
                a: 'Priset avtalas alltid utifrån behov och omfattning. Efter kartläggningen får du en tydlig offert utan förpliktelser. Annonsbudgeten betalas direkt till annonsplattformarna (t.ex. Meta eller Google), så du ser exakt vart pengarna går.',
            },
            {
                q: 'Arbetar ni även utanför Finland?',
                a: 'Ja. Vi verkar från Finland men arbetar på finska, engelska och svenska och tar fram innehåll även för internationella målgrupper.',
            },
        ],
    },

    contact: {
        eyebrow: 'Kontakt',
        titleStart: 'Berätta om ditt mål.',
        titleAccent: 'Vi gör en plan av det.',
        subtitle: 'Boka en kostnadsfri kartläggning. Vi svarar vanligtvis inom 1–2 arbetsdagar.',
        cards: { email: 'E-post', location: 'Ort', locationValue: 'Jyväskylä, Finland', site: 'Huvudsajt' },
        fields: {
            company: 'Företag',
            companyPlaceholder: 'Företag Ab',
            name: 'Namn',
            namePlaceholder: 'Förnamn Efternamn',
            email: 'E-post',
            emailPlaceholder: 'namn@foretag.se',
            phone: 'Telefon',
            phonePlaceholder: '+358 40 123 4567',
            need: 'Vad behöver du hjälp med?',
            budget: 'Uppskattad budget',
            budgetPlaceholder: 'Välj (valfritt)',
            message: 'Meddelande',
            messagePlaceholder: 'Berätta kort om ditt företag, dina mål och tidtabellen.',
            website: 'Webbplats',
            consent:
                'Jag godkänner att VOON IQ använder mina uppgifter för att svara på förfrågan. Uppgifterna lämnas inte ut till tredje part.',
        },
        needs: [
            'AI-marknadsundersökning',
            'Varumärke & visuell identitet',
            'Annonsbilder & motion',
            'Sociala medier & innehåll',
            'Annonskampanjer',
            'Webbplats / webbapp',
            'Helheten – jag vet inte ännu',
        ],
        budgets: ['Under 1 000 €', '1 000–3 000 €', '3 000–10 000 €', 'Över 10 000 €', 'Vet inte ännu'],
        submit: 'Skicka meddelande',
        sending: 'Skickar…',
        newMessage: 'Skicka ett nytt meddelande',
        success: 'Tack för att du hörde av dig!',
        successBody:
            'Ditt meddelande har tagits emot och vi har skickat en bekräftelse till din e-post. Vi återkommer inom 1–2 arbetsdagar.',
        error: 'Hoppsan, det gick inte att skicka.',
        errorBody: `Försök igen eller skicka e-post direkt till ${CONTACT_EMAIL}.`,
    },

    footer: {
        ctaStart: 'Låt oss skapa något',
        ctaAccent: 'som får folk att stanna.',
        cta: 'Boka en kostnadsfri kartläggning',
        tagline: 'AI-driven marknadsförings-, design- och webbstudio från Finland.',
        company: 'VOON IQ Oy',
        location: 'Jyväskylä, Finland',
        columns: { services: 'Tjänster', site: 'Webbplats', products: 'Våra produkter' },
        contactLink: 'Kontakt',
        cookieSettings: 'Cookie-inställningar',
    },

    cookie: {
        aria: 'Cookie-inställningar',
        title: 'Vi använder cookies',
        body:
            'Webbplatsen använder endast data som är nödvändig för att den ska fungera. Eventuell analys aktiveras endast med ditt samtycke. Du kan ändra ditt val när som helst längst ned på sidan.',
        decline: 'Endast nödvändiga',
        accept: 'Godkänn alla',
    },
};

export default sv;
