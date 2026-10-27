import { CONTACT_EMAIL } from './shared';

const fi = {
    meta: {
        title: 'VOON IQ – Tekoälypohjainen markkinointi, design ja web',
        description:
            'VOON IQ on suomalainen tekoälypohjainen markkinointi- ja designstudio: markkinatutkimus, brändi, mainosvisuaalit, somekampanjat, verkkosivut ja web-sovellukset.',
    },

    languageLabel: 'Kieli',
    theme: { label: 'Teema', system: 'Järjestelmä', light: 'Vaalea', dark: 'Tumma' },

    nav: {
        aria: 'Päävalikko',
        home: 'VOON IQ etusivu',
        links: ['Palvelut', 'AI-studio', 'Työt', 'Web', 'Hinnat', 'UKK'],
        cta: 'Varaa kartoitus',
        mobileCta: 'Varaa maksuton kartoitus',
        openMenu: 'Avaa valikko',
        closeMenu: 'Sulje valikko',
    },

    loader: 'Ladataan',

    hero: {
        aria: 'VOON IQ esittely',
        eyebrow: 'Tekoälypohjainen markkinointi- ja designstudio · Suomi',
        title: ['Markkinointi, visuaalit', 'ja verkko —', 'tekoälyn voimalla.'],
        subtitle:
            'Tutkimme markkinasi, rakennamme brändisi ja tuotamme kampanjat, jotka pysäyttävät. Nopeammin kuin perinteinen toimisto, läpinäkyvämmin kuin pelkkä työkalu.',
        primaryCta: 'Varaa maksuton kartoitus',
        secondaryCta: 'Katso mitä teemme',
        scrollHint: 'Vieritä ja katso, kun idea rakentuu',
        building: 'Rakentuu',
        prev: 'Edellinen konsepti',
        next: 'Seuraava konsepti',
        slides: ['Kiinteistö & arkkitehtuuri', 'Tuote & food', 'Automotive & lanseeraus'],
        story: [
            {
                title: 'Jokainen kampanja alkaa tyhjästä.',
                subtitle: 'Ensin data: markkina, kilpailijat ja asiakkaasi. Tekoäly kartoittaa ne päivissä, ei viikoissa.',
            },
            {
                title: 'Sitten rakenne.',
                subtitle: 'Strategia, viestit ja kanavat rakennetaan tutkitun tiedon päälle, ei arvausten.',
            },
            {
                title: 'Lopuksi visuaalit, jotka pysäyttävät.',
                subtitle: 'Mainoskuvat, motion ja verkkosivut: tekoälyllä tuotettu, ihmisen silmällä viimeistelty.',
            },
            {
                title: 'Tämä on VOON IQ.',
                subtitle: 'Markkinointimanageri, designstudio ja web-tiimi samassa paketissa.',
            },
        ],
    },

    marquee: [
        'Markkinatutkimus',
        'Brändi-identiteetti',
        'Mainosvisuaalit',
        'Motion & video',
        'Somesisällöt',
        'Meta- & Google-kampanjat',
        'Verkkosivut',
        'Web-sovellukset',
        'SEO',
        'Analytiikka',
    ],

    intro: {
        eyebrow: 'Miksi VOON IQ',
        titleStart: 'Yksi kumppani',
        titleAccent: 'koko kasvuputkeen.',
        body:
            'Useimmat yritykset ostavat markkinatutkimuksen yhdeltä, logon toiselta, mainokset kolmannelta ja verkkosivut neljänneltä. VOON IQ yhdistää ne yhdeksi tekoälyavusteiseksi prosessiksi: sama data ohjaa strategiaa, visuaaleja ja kampanjoita, joten jokainen euro tekee töitä samaan suuntaan.',
        facts: [
            { icon: 'palette', label: 'Vahva tausta graafisessa ja UX-suunnittelussa' },
            { icon: 'code', label: 'Omat verkkopalvelut tuotannossa' },
            { icon: 'globe', label: 'Suomesta kansainvälisille markkinoille' },
            { icon: 'radar', label: 'Tekoälyavusteinen kampanjaseuranta' },
        ],
    },

    values: [
        {
            icon: 'shield',
            title: 'Tietoturva edellä',
            body: 'GDPR-yhteensopiva tekeminen. Asiakasdataasi ei syötetä julkisiin malleihin ilman sopimusta.',
        },
        {
            icon: 'user',
            title: 'Ihminen päättää',
            body: 'Tekoäly avustaa, ei päätä. Jokainen julkaistava työ tarkistetaan ja viimeistellään käsin.',
        },
        {
            icon: 'eye',
            title: 'Joustava hinnoittelu',
            body: 'Hinta sovitaan tarpeen ja laajuuden mukaan. Saat aina selkeän tarjouksen ennen kuin työ alkaa.',
        },
        {
            icon: 'globe',
            title: 'Suomalainen, kansainvälinen',
            body: 'Toimimme Suomesta ja palvelemme suomeksi, englanniksi ja ruotsiksi, myös kansainvälisillä markkinoilla.',
        },
    ],

    services: {
        eyebrow: 'Palvelut',
        title: 'Kaikki mitä kasvu vaatii. Yhdeltä tiimiltä.',
        subtitle:
            'Tutkimuksesta visuaaleihin ja kampanjoista verkkosivuihin. Valitse yksittäinen palvelu tai anna meidän hoitaa kokonaisuus.',
        items: [
            {
                icon: 'radar',
                title: 'AI-markkinatutkimus',
                body: 'Tekoäly käy läpi kilpailijat, hakutrendit ja asiakaspalautteen ja tiivistää ne päätöksiksi, joihin voit luottaa.',
                bullets: ['Kilpailija- ja hintakartoitus', 'Kohderyhmät ja personat', 'Hakusana- ja trendianalyysi'],
            },
            {
                icon: 'palette',
                title: 'Brändi & visuaalinen ilme',
                body: 'Logo, värit, typografia ja sävy, joka erottuu. Saat ohjeiston, jolla ilme pysyy samana kaikissa kanavissa.',
                bullets: ['Logo ja tunnus', 'Brändiohjeisto', 'Mallipohjat someen ja printtiin'],
            },
            {
                icon: 'sparkles',
                title: 'AI-mainosvisuaalit & motion',
                body: 'Tuotekuvat, konseptit ja liikkuva kuva ilman raskasta studiokuvausta, valmiina jokaiseen formaattiin.',
                bullets: ['Tuote- ja konseptikuvat', '3D- ja motion-videot', 'Kaikki some- ja mainosformaatit'],
            },
            {
                icon: 'calendar',
                title: 'Some & sisällöntuotanto',
                body: 'Sisältökalenteri, tekstit ja visuaalit valmiiksi suunniteltuna. Sinä hyväksyt, me julkaisemme.',
                bullets: ['Kuukausittainen sisältökalenteri', 'Tekstit suomeksi, englanniksi ja ruotsiksi', 'Julkaisu ja yhteisön seuranta'],
            },
            {
                icon: 'trending',
                title: 'Kampanjat & kasvu',
                body: 'Meta-, Google-, LinkedIn- ja TikTok-kampanjat, joita optimoidaan jatkuvasti datan perusteella.',
                bullets: ['Kohdennus ja A/B-testaus', 'Konversioseuranta', 'Selkeä kuukausiraportti'],
            },
            {
                icon: 'code',
                title: 'Verkkosivut & web-sovellukset',
                body: 'Nopeat, hakukoneystävälliset sivustot ja räätälöidyt web-sovellukset, joihin tekoäly on rakennettu sisään.',
                bullets: ['Laskeutumis- ja yrityssivut', 'Asiakasportaalit ja varausjärjestelmät', 'AI-integraatiot ja automaatio'],
            },
        ],
    },

    studio: {
        eyebrow: 'AI-studio',
        title: 'Näin tekoäly työskentelee puolestasi.',
        subtitle: 'Viisi vaihetta, yksi näkymä. Näet koko ajan, mitä tehdään ja miksi.',
        note: 'Havainnollistava esimerkkinäkymä',
        tabsLabel: 'AI-studion vaiheet',
        live: 'AI työssä',
        brand: 'Kaakao & Co',
        steps: [
            { id: 'research', label: 'Tutki', title: 'Markkina auki päivissä', body: 'Kilpailijat, hinnat, hakutrendit ja asiakkaiden kieli kootaan yhteen näkymään.' },
            { id: 'plan', label: 'Suunnittele', title: 'Strategia datan päälle', body: 'Kohderyhmät, ydinviestit ja kanavajako perustellaan tutkimuksella.' },
            { id: 'create', label: 'Luo', title: 'Visuaalit ja tekstit', body: 'Tekoäly tuottaa vaihtoehdot, suunnittelija valitsee ja viimeistelee parhaat.' },
            { id: 'publish', label: 'Julkaise', title: 'Oikea kanava, oikea hetki', body: 'Sisällöt aikataulutetaan kanaville, joissa asiakkaasi oikeasti ovat.' },
            { id: 'optimize', label: 'Optimoi', title: 'Jatkuva parantaminen', body: 'Heikot mainokset karsitaan ja budjetti siirretään toimiviin.' },
        ],
        research: {
            interest: 'Hakukiinnostus · premium-suklaa',
            trend: 'Kasvussa',
            share: 'Näkyvyysosuus',
            competitors: ['Kilpailija A', 'Kilpailija B', 'Sinun brändisi', 'Kilpailija C'],
            language: 'Asiakkaiden kieli',
            words: ['laadukas', 'lahjaksi', 'reilu kauppa', 'vegaaninen', 'kotimainen', 'liian kallis'],
            insight: 'Mahdollisuus: lahjapakkaukset ennen joulua.',
        },
        plan: {
            personas: [
                { name: 'Laatutietoinen lahjanantaja', meta: 'Kaupunkilainen · Instagram' },
                { name: 'Arjen herkuttelija', meta: 'Opiskelija · TikTok' },
            ],
            channels: 'Kanavajako',
            channelNames: ['Instagram', 'Google', 'TikTok', 'Uutiskirje'],
            message: 'Ydinviesti',
            quote: '”Pieni hetki, joka maistuu isolta.”',
        },
        create: {
            visual: 'Visuaali',
            best: 'Paras ennuste',
            alternative: 'Vaihtoehto',
            copies: ['Pieni hetki, joka maistuu isolta.', 'Suomalaista suklaata, reilusti tehty.'],
            chosen: 'Valittu',
        },
        publish: {
            days: ['Ma', 'Ti', 'Ke', 'To', 'Pe', 'La', 'Su'],
            posts: ['IG Reels', 'Google-mainos', 'TikTok', 'IG Story', 'Uutiskirje', 'IG Karuselli', 'TikTok'],
            always: 'jatkuva',
        },
        optimize: {
            kpis: [
                { label: 'Klikkausprosentti', trend: 'Nousussa', dir: 'up' },
                { label: 'Hinta per klikkaus', trend: 'Laskussa', dir: 'down' },
                { label: 'Mainostuotto', trend: 'Nousussa', dir: 'up' },
            ],
            chart: 'Konversiot viikoittain',
            log: 'Visuaali A keräsi selvästi enemmän klikkauksia. Budjetti siirretty automaattisesti, B poistettu käytöstä.',
        },
    },

    work: {
        eyebrow: 'Työt & konseptit',
        title: 'Visuaaleja, joita ei tarvinnut kuvata.',
        subtitle:
            'Kaikki alla olevat kuvat ja videot on tuotettu tekoälyavusteisesti: ei kuvausryhmää, ei rakennustyömaata, ei prototyyppiä. Vain idea, ohjaus ja viimeistely.',
        items: [
            { title: 'Järvenrannan huvila', tag: 'Kiinteistömarkkinointi' },
            { title: 'Suklaan anatomia', tag: 'Tuotelanseeraus' },
            { title: 'Rakenteesta muotoon', tag: 'Automotive · motion' },
            { title: 'Rakentuva tila', tag: 'Arkkitehtuurivisualisointi' },
            { title: 'Hetken räjähdys', tag: 'Mainosvisuaali' },
            { title: 'Lanseerauskuva', tag: 'Tuotekuva' },
        ],
        ctaKicker: 'Seuraavaksi',
        ctaTitleStart: 'Sinun brändisi',
        ctaTitleAccent: 'tässä?',
        ctaLink: 'Aloitetaan projekti',
    },

    web: {
        eyebrow: 'Verkkosivut & web-sovellukset',
        title: 'Rakennamme omat tuotteemme itse. Samalla osaamisella rakennamme sinun.',
        body:
            'VOON IQ ei ole pelkkä mainostoimisto. Olemme suunnitelleet, koodanneet ja julkaisseet omat tekoälypalvelumme. Sama tiimi tekee yrityksellesi sivuston, joka latautuu nopeasti, löytyy hausta ja muuttaa kävijät asiakkaiksi.',
        capabilities: [
            'Responsiiviset yritys- ja kampanjasivut',
            'Räätälöidyt web-sovellukset ja portaalit',
            'Tekoälyavustajat ja automaatiot',
            'Hakukoneoptimointi ja analytiikka',
            'Tietosuoja (GDPR) ja käyttöoikeudet kunnossa',
        ],
        browserPath: 'voon.fi / tuotteet',
        products: [
            'Tekoäly tunnistaa osaamisen omin sanoin kirjoitetusta tekstistä ja näyttää polut työhön ja koulutukseen.',
            'Urapalvelu Suomeen muuttaneille: ESCO-pohjainen CV, Talent Pathway ja vertaismentorointi.',
            'Kevyt toiminnanohjaus pk-yrityksille: kuittien OCR, eräpäivät ja automaattiset raportit.',
            'Muutto- ja asettautumisneuvonta Suomeen tekoälyavusteisella tapausarvioinnilla.',
        ],
    },

    process: {
        eyebrow: 'Prosessi',
        title: 'Neljä askelta ideasta tuloksiin.',
        stepLabel: 'Vaihe',
        steps: [
            { title: 'Maksuton kartoitus', body: 'Lyhyt keskustelu tavoitteistasi, nykytilasta ja budjetista. Ei sitoumuksia.' },
            { title: 'AI-tutkimus & strategia', body: 'Kartoitamme markkinan ja kilpailijat ja kokoamme selkeän suunnitelman kanavista ja viesteistä.' },
            { title: 'Tuotanto & julkaisu', body: 'Visuaalit, tekstit, kampanjat ja tarvittaessa verkkosivut. Sinä hyväksyt ennen julkaisua.' },
            { title: 'Mittaus & optimointi', body: 'Seuraamme tuloksia jatkuvasti ja raportoimme selkokielellä, mitä parannamme seuraavaksi.' },
        ],
    },

    pricing: {
        eyebrow: 'Hinnat',
        title: 'Joustavat paketit. Hinta tarpeen mukaan.',
        subtitle:
            'Jokainen yritys on erilainen. Valitse sopiva lähtökohta, niin teemme selkeän tarjouksen tarpeesi ja laajuuden mukaan.',
        choose: 'Valitse',
        plans: [
            {
                name: 'Start',
                price: 'Sopimuksen mukaan',
                period: 'kertaluonteinen projekti',
                desc: 'AI-markkinakartoitus ja kasvusuunnitelma.',
                features: [
                    'Markkina- ja kilpailija-analyysi',
                    'Kohderyhmät ja personat',
                    'Kanava- ja viestisuunnitelma',
                    'Brändin mukaiset kampanjavisuaalit',
                ],
                needIndex: 0,
            },
            {
                name: 'Growth',
                price: 'Sopimuksen mukaan',
                period: 'kuukausipalvelu',
                desc: 'Markkinointimanageri kuukausipalveluna.',
                features: [
                    'Somejulkaisut tekstein ja visuaalein sovitulla tahdilla',
                    'Mainoskampanjoiden hallinta ja optimointi',
                    'Kuukausiraportti ja kehitysehdotukset',
                    'Brändin mukaiset mallipohjat',
                ],
                badge: 'Suosituin',
                highlight: true,
                needIndex: 3,
            },
            {
                name: 'Web',
                price: 'Sopimuksen mukaan',
                period: 'räätälöity tarjous',
                desc: 'Verkkosivu tai web-sovellus avaimet käteen.',
                features: [
                    'Responsiivinen sivusto tai sovellus',
                    'SEO-perusta ja analytiikka',
                    'Yhteydenottolomake ja integraatiot',
                    'Ylläpito ja jatkokehitys valinnaisena',
                ],
                needIndex: 5,
            },
        ],
        enterprise: {
            title: 'Isommat kokonaisuudet ja julkinen sektori',
            body: 'Räätälöidyt ratkaisut yrityksille ja organisaatioille. Hinnoittelu sopimuksen mukaan.',
            cta: 'Pyydä tarjous',
        },
        note: 'Tarjous on maksuton ja sitoumukseton. Mainosbudjetti maksetaan mainosalustoille erikseen.',
    },

    faq: {
        eyebrow: 'UKK',
        title: 'Usein kysyttyä.',
        subtitle: 'Etkö löytänyt vastausta? Kysy suoraan, vastaamme mielellämme.',
        items: [
            {
                q: 'Korvaako tekoäly suunnittelijan?',
                a: 'Ei. Tekoäly nopeuttaa tutkimusta ja tuotantoa, mutta jokainen julkaistava työ on suunnittelijan valitsema, tarkistama ja viimeistelemä. Saat nopeuden ilman, että laatu tai brändisi kärsii.',
            },
            {
                q: 'Kenelle visuaalit ja sisällöt kuuluvat?',
                a: 'Sinulle. Luovutamme valmiiden töiden käyttöoikeudet yrityksellesi, ja saat myös lähdetiedostot ja mallipohjat.',
            },
            {
                q: 'Miten tietosuoja huomioidaan?',
                a: 'Toimimme GDPR:n mukaisesti. Asiakas- ja yritysdataasi ei syötetä julkisiin tekoälymalleihin ilman erillistä sopimusta, ja käyttöoikeudet rajataan aina tarpeen mukaan.',
            },
            {
                q: 'Kuinka nopeasti pääsemme alkuun?',
                a: 'Maksuton kartoitus järjestyy yleensä saman viikon aikana. Sen jälkeen ensimmäiset konseptit ja visuaalit valmistuvat nopeasti, aikataulu sovitaan yhdessä.',
            },
            {
                q: 'Mitä palvelut maksavat?',
                a: 'Hinnoittelu sovitaan aina tarpeen ja laajuuden mukaan. Kartoituksen jälkeen saat selkeän, sitoumuksettoman tarjouksen. Mainosbudjetti maksetaan suoraan mainosalustoille (esim. Meta tai Google), joten näet tarkalleen, mihin rahat menevät.',
            },
            {
                q: 'Toimitteko myös Suomen ulkopuolella?',
                a: 'Kyllä. Toimimme Suomesta, mutta palvelemme suomeksi, englanniksi ja ruotsiksi ja tuotamme sisältöjä myös kansainvälisille kohderyhmille.',
            },
        ],
    },

    contact: {
        eyebrow: 'Yhteys',
        titleStart: 'Kerro tavoitteesi.',
        titleAccent: 'Me teemme siitä suunnitelman.',
        subtitle: 'Varaa maksuton kartoitus. Vastaamme yleensä 1–2 arkipäivän kuluessa.',
        cards: { email: 'Sähköposti', location: 'Sijainti', locationValue: 'Jyväskylä, Suomi', site: 'Pääsivusto' },
        fields: {
            company: 'Yritys',
            companyPlaceholder: 'Yritys Oy',
            name: 'Nimi',
            namePlaceholder: 'Etunimi Sukunimi',
            email: 'Sähköposti',
            emailPlaceholder: 'nimi@yritys.fi',
            phone: 'Puhelin',
            phonePlaceholder: '+358 40 123 4567',
            need: 'Mihin tarvitset apua?',
            budget: 'Arvioitu budjetti',
            budgetPlaceholder: 'Valitse (vapaaehtoinen)',
            message: 'Viesti',
            messagePlaceholder: 'Kerro lyhyesti yrityksestäsi, tavoitteistasi ja aikataulusta.',
            website: 'Verkkosivu',
            consent:
                'Hyväksyn, että VOON IQ käyttää tietojani yhteydenottoon vastaamiseen. Tietoja ei luovuteta kolmansille osapuolille.',
        },
        needs: [
            'AI-markkinatutkimus',
            'Brändi & visuaalinen ilme',
            'Mainosvisuaalit & motion',
            'Some & sisällöt',
            'Mainoskampanjat',
            'Verkkosivut / web-sovellus',
            'Kokonaisuus – en ole vielä varma',
        ],
        budgets: ['Alle 1 000 €', '1 000–3 000 €', '3 000–10 000 €', 'Yli 10 000 €', 'En tiedä vielä'],
        submit: 'Lähetä viesti',
        sending: 'Lähetetään…',
        newMessage: 'Lähetä uusi viesti',
        success: 'Kiitos yhteydenotostasi!',
        successBody:
            'Viestisi on vastaanotettu, ja lähetimme vahvistuksen sähköpostiisi. Palaamme sinuun 1–2 arkipäivän kuluessa.',
        error: 'Hups, lähetys epäonnistui.',
        errorBody: `Yritä uudelleen tai lähetä viesti suoraan osoitteeseen ${CONTACT_EMAIL}.`,
    },

    footer: {
        ctaStart: 'Tehdään jotain,',
        ctaAccent: 'mikä pysäyttää.',
        cta: 'Varaa maksuton kartoitus',
        tagline: 'Tekoälypohjainen markkinointi-, design- ja web-studio Suomesta.',
        company: 'VOON IQ Oy',
        location: 'Jyväskylä, Suomi',
        columns: { services: 'Palvelut', site: 'Sivusto', products: 'Tuotteemme' },
        contactLink: 'Yhteys',
        cookieSettings: 'Evästeasetukset',
    },

    cookie: {
        aria: 'Evästeasetukset',
        title: 'Käytämme evästeitä',
        body:
            'Sivusto käyttää vain toiminnan kannalta välttämättömiä tietoja. Mahdollinen analytiikka otetaan käyttöön vain suostumuksellasi. Voit muuttaa valintaasi milloin tahansa sivun alaosasta.',
        decline: 'Vain välttämättömät',
        accept: 'Hyväksy kaikki',
    },
};

export default fi;
