import { CONTACT_EMAIL } from './shared';

const en = {
    meta: {
        title: 'VOON IQ – AI-powered marketing, design and web',
        description:
            'VOON IQ is a Finnish AI-powered marketing and design studio: market research, branding, ad visuals, social campaigns, websites and web apps.',
    },

    languageLabel: 'Language',
    theme: { label: 'Theme', system: 'System', light: 'Light', dark: 'Dark' },

    nav: {
        aria: 'Main menu',
        home: 'VOON IQ home',
        links: ['Services', 'AI studio', 'Work', 'Web', 'Pricing', 'FAQ'],
        cta: 'Book a consultation',
        mobileCta: 'Book a free consultation',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
    },

    loader: 'Loading',

    hero: {
        aria: 'VOON IQ introduction',
        eyebrow: 'AI-powered marketing & design studio · Finland',
        title: ['Marketing, visuals', 'and web —', 'powered by AI.'],
        subtitle:
            'We research your market, build your brand and produce campaigns that stop the scroll. Faster than a traditional agency, more transparent than a tool alone.',
        primaryCta: 'Book a free consultation',
        secondaryCta: 'See what we do',
        scrollHint: 'Scroll and watch the idea take shape',
        building: 'Building',
        prev: 'Previous concept',
        next: 'Next concept',
        slides: ['Real estate & architecture', 'Product & food', 'Automotive & launch'],
        story: [
            {
                title: 'Every campaign starts from nothing.',
                subtitle: 'Data first: your market, competitors and customers. AI maps them in days, not weeks.',
            },
            {
                title: 'Then comes the structure.',
                subtitle: 'Strategy, messages and channels are built on research, not guesswork.',
            },
            {
                title: 'Finally, visuals that stop people.',
                subtitle: 'Ad images, motion and websites: produced with AI, finished by a human eye.',
            },
            {
                title: 'This is VOON IQ.',
                subtitle: 'Marketing manager, design studio and web team in one package.',
            },
        ],
    },

    marquee: [
        'Market research',
        'Brand identity',
        'Ad visuals',
        'Motion & video',
        'Social content',
        'Meta & Google campaigns',
        'Websites',
        'Web apps',
        'SEO',
        'Analytics',
    ],

    intro: {
        eyebrow: 'Why VOON IQ',
        titleStart: 'One partner',
        titleAccent: 'for your whole growth pipeline.',
        body:
            'Most companies buy market research from one vendor, a logo from another, ads from a third and a website from a fourth. VOON IQ brings them together in one AI-assisted process: the same data drives strategy, visuals and campaigns, so every euro pulls in the same direction.',
        facts: [
            { icon: 'palette', label: 'Strong background in graphic and UX design' },
            { icon: 'code', label: 'Our own web services in production' },
            { icon: 'globe', label: 'From Finland to international markets' },
            { icon: 'radar', label: 'AI-assisted campaign monitoring' },
        ],
    },

    values: [
        {
            icon: 'shield',
            title: 'Security first',
            body: 'GDPR-compliant by default. Your customer data is never fed into public models without an agreement.',
        },
        {
            icon: 'user',
            title: 'People decide',
            body: 'AI assists, it does not decide. Every piece we publish is reviewed and finished by hand.',
        },
        {
            icon: 'eye',
            title: 'Flexible pricing',
            body: 'Pricing is agreed according to your needs and scope. You always get a clear quote before work starts.',
        },
        {
            icon: 'globe',
            title: 'Finnish, international',
            body: 'Based in Finland, working in Finnish, English and Swedish, including on international markets.',
        },
    ],

    services: {
        eyebrow: 'Services',
        title: 'Everything growth needs. From one team.',
        subtitle:
            'From research to visuals, from campaigns to websites. Pick a single service or let us handle the whole thing.',
        items: [
            {
                icon: 'radar',
                title: 'AI market research',
                body: 'AI goes through competitors, search trends and customer feedback and condenses them into decisions you can trust.',
                bullets: ['Competitor and price mapping', 'Target groups and personas', 'Keyword and trend analysis'],
            },
            {
                icon: 'palette',
                title: 'Brand & visual identity',
                body: 'A logo, colours, typography and tone that stand out, plus guidelines that keep the look consistent across channels.',
                bullets: ['Logo and mark', 'Brand guidelines', 'Templates for social and print'],
            },
            {
                icon: 'sparkles',
                title: 'AI ad visuals & motion',
                body: 'Product shots, concepts and motion without a heavy studio shoot, ready for every format.',
                bullets: ['Product and concept images', '3D and motion videos', 'Every social and ad format'],
            },
            {
                icon: 'calendar',
                title: 'Social media & content',
                body: 'Content calendar, copy and visuals planned in advance. You approve, we publish.',
                bullets: ['Monthly content calendar', 'Copy in Finnish, English and Swedish', 'Publishing and community monitoring'],
            },
            {
                icon: 'trending',
                title: 'Campaigns & growth',
                body: 'Meta, Google, LinkedIn and TikTok campaigns, continuously optimised based on data.',
                bullets: ['Targeting and A/B testing', 'Conversion tracking', 'Clear monthly report'],
            },
            {
                icon: 'code',
                title: 'Websites & web apps',
                body: 'Fast, search-friendly websites and custom web apps with AI built in.',
                bullets: ['Landing and company pages', 'Customer portals and booking systems', 'AI integrations and automation'],
            },
        ],
    },

    studio: {
        eyebrow: 'AI studio',
        title: 'How AI works for you.',
        subtitle: 'Five steps, one view. You always see what is being done and why.',
        note: 'Illustrative example view',
        tabsLabel: 'AI studio steps',
        live: 'AI at work',
        brand: 'Cacao & Co',
        steps: [
            { id: 'research', label: 'Research', title: 'The market, mapped in days', body: 'Competitors, prices, search trends and customer language in one view.' },
            { id: 'plan', label: 'Plan', title: 'Strategy built on data', body: 'Target groups, core messages and channel mix backed by research.' },
            { id: 'create', label: 'Create', title: 'Visuals and copy', body: 'AI produces options, a designer picks and polishes the best.' },
            { id: 'publish', label: 'Publish', title: 'Right channel, right time', body: 'Content is scheduled for the channels where your customers actually are.' },
            { id: 'optimize', label: 'Optimise', title: 'Continuous improvement', body: 'Weak ads are cut and budget moves to the ones that work.' },
        ],
        research: {
            interest: 'Search interest · premium chocolate',
            trend: 'Growing',
            share: 'Share of voice',
            competitors: ['Competitor A', 'Competitor B', 'Your brand', 'Competitor C'],
            language: 'How customers talk',
            words: ['high quality', 'as a gift', 'fair trade', 'vegan', 'local', 'too expensive'],
            insight: 'Opportunity: gift boxes before Christmas.',
        },
        plan: {
            personas: [
                { name: 'Quality-minded gift giver', meta: 'Urban · Instagram' },
                { name: 'Everyday treat seeker', meta: 'Student · TikTok' },
            ],
            channels: 'Channel mix',
            channelNames: ['Instagram', 'Google', 'TikTok', 'Newsletter'],
            message: 'Core message',
            quote: '“A small moment that tastes big.”',
        },
        create: {
            visual: 'Visual',
            best: 'Best forecast',
            alternative: 'Alternative',
            copies: ['A small moment that tastes big.', 'Finnish chocolate, fairly made.'],
            chosen: 'Chosen',
        },
        publish: {
            days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            posts: ['IG Reels', 'Google ad', 'TikTok', 'IG Story', 'Newsletter', 'IG Carousel', 'TikTok'],
            always: 'always on',
        },
        optimize: {
            kpis: [
                { label: 'Click-through rate', trend: 'Rising', dir: 'up' },
                { label: 'Cost per click', trend: 'Falling', dir: 'down' },
                { label: 'Return on ad spend', trend: 'Rising', dir: 'up' },
            ],
            chart: 'Weekly conversions',
            log: 'Visual A earned clearly more clicks. Budget moved automatically, B switched off.',
        },
    },

    work: {
        eyebrow: 'Work & concepts',
        title: 'Visuals that never needed a photo shoot.',
        subtitle:
            'Every image and video below was produced with AI: no film crew, no construction site, no prototype. Just an idea, direction and finishing.',
        items: [
            { title: 'Lakeside villa', tag: 'Real estate marketing' },
            { title: 'Anatomy of chocolate', tag: 'Product launch' },
            { title: 'From frame to form', tag: 'Automotive · motion' },
            { title: 'A space taking shape', tag: 'Architectural visualisation' },
            { title: 'A moment of impact', tag: 'Ad visual' },
            { title: 'Launch shot', tag: 'Product image' },
        ],
        ctaKicker: 'Up next',
        ctaTitleStart: 'Your brand',
        ctaTitleAccent: 'here?',
        ctaLink: 'Start a project',
    },

    web: {
        eyebrow: 'Websites & web apps',
        title: 'We build our own products. With the same skills, we build yours.',
        body:
            'VOON IQ is more than an ad agency. We have designed, coded and launched our own AI services. The same team builds your company a site that loads fast, ranks in search and turns visitors into customers.',
        capabilities: [
            'Responsive company and campaign sites',
            'Custom web apps and portals',
            'AI assistants and automation',
            'Search engine optimisation and analytics',
            'Data protection (GDPR) and access control done right',
        ],
        browserPath: 'voon.fi / products',
        products: [
            'AI recognises skills from free-text descriptions and shows paths to jobs and education.',
            'Career service for people who have moved to Finland: ESCO-based CV, Talent Pathway and peer mentoring.',
            'Lightweight business management for SMEs: receipt OCR, due dates and automatic reports.',
            'Relocation and settling-in advice for moving to Finland, with AI-assisted case assessment.',
        ],
    },

    process: {
        eyebrow: 'Process',
        title: 'Four steps from idea to results.',
        stepLabel: 'Step',
        steps: [
            { title: 'Free consultation', body: 'A short conversation about your goals, current situation and budget. No commitment.' },
            { title: 'AI research & strategy', body: 'We map the market and competitors and put together a clear plan for channels and messages.' },
            { title: 'Production & publishing', body: 'Visuals, copy, campaigns and websites where needed. You approve before anything goes live.' },
            { title: 'Measure & optimise', body: 'We track results continuously and report in plain language what we improve next.' },
        ],
    },

    pricing: {
        eyebrow: 'Pricing',
        title: 'Flexible packages. Priced to your needs.',
        subtitle:
            'Every business is different. Pick a starting point and we will put together a clear quote based on your needs and scope.',
        choose: 'Choose',
        plans: [
            {
                name: 'Start',
                price: 'By agreement',
                period: 'one-off project',
                desc: 'AI market mapping and growth plan.',
                features: [
                    'Market and competitor analysis',
                    'Target groups and personas',
                    'Channel and message plan',
                    'On-brand campaign visuals',
                ],
                needIndex: 0,
            },
            {
                name: 'Growth',
                price: 'By agreement',
                period: 'monthly service',
                desc: 'A marketing manager as a monthly service.',
                features: [
                    'Social posts with copy and visuals at an agreed pace',
                    'Ad campaign management and optimisation',
                    'Monthly report and recommendations',
                    'On-brand templates',
                ],
                badge: 'Most popular',
                highlight: true,
                needIndex: 3,
            },
            {
                name: 'Web',
                price: 'By agreement',
                period: 'custom quote',
                desc: 'A turnkey website or web app.',
                features: [
                    'Responsive site or app',
                    'SEO foundation and analytics',
                    'Contact form and integrations',
                    'Optional maintenance and further development',
                ],
                needIndex: 5,
            },
        ],
        enterprise: {
            title: 'Larger projects and the public sector',
            body: 'Tailored solutions for companies and organisations. Pricing by agreement.',
            cta: 'Request a quote',
        },
        note: 'Quotes are free and without obligation. Ad budget is paid to the ad platforms separately.',
    },

    faq: {
        eyebrow: 'FAQ',
        title: 'Frequently asked.',
        subtitle: 'Didn’t find your answer? Just ask, we are happy to help.',
        items: [
            {
                q: 'Does AI replace the designer?',
                a: 'No. AI speeds up research and production, but every published piece is chosen, reviewed and finished by a designer. You get the speed without compromising quality or your brand.',
            },
            {
                q: 'Who owns the visuals and content?',
                a: 'You do. We transfer the usage rights of finished work to your company, and you also get the source files and templates.',
            },
            {
                q: 'How is data protection handled?',
                a: 'We follow the GDPR. Your customer and company data is never fed into public AI models without a separate agreement, and access is always limited to what is needed.',
            },
            {
                q: 'How quickly can we get started?',
                a: 'The free consultation can usually be arranged within the same week. After that, the first concepts and visuals come together quickly; we agree on the schedule together.',
            },
            {
                q: 'What do the services cost?',
                a: 'Pricing is always agreed according to your needs and scope. After the consultation you receive a clear quote with no obligation. Ad budget is paid directly to the ad platforms (e.g. Meta or Google), so you see exactly where the money goes.',
            },
            {
                q: 'Do you work outside Finland?',
                a: 'Yes. We are based in Finland but work in Finnish, English and Swedish and produce content for international audiences as well.',
            },
        ],
    },

    contact: {
        eyebrow: 'Contact',
        titleStart: 'Tell us your goal.',
        titleAccent: 'We will turn it into a plan.',
        subtitle: 'Book a free consultation. We usually reply within 1–2 business days.',
        cards: { email: 'Email', location: 'Location', locationValue: 'Jyväskylä, Finland', site: 'Main site' },
        fields: {
            company: 'Company',
            companyPlaceholder: 'Company Ltd',
            name: 'Name',
            namePlaceholder: 'First Last',
            email: 'Email',
            emailPlaceholder: 'name@company.com',
            phone: 'Phone',
            phonePlaceholder: '+358 40 123 4567',
            need: 'What do you need help with?',
            budget: 'Estimated budget',
            budgetPlaceholder: 'Select (optional)',
            message: 'Message',
            messagePlaceholder: 'Tell us briefly about your company, goals and timeline.',
            website: 'Website',
            consent:
                'I agree that VOON IQ may use my details to respond to this enquiry. The details are not shared with third parties.',
        },
        needs: [
            'AI market research',
            'Brand & visual identity',
            'Ad visuals & motion',
            'Social media & content',
            'Ad campaigns',
            'Website / web app',
            'The whole package – not sure yet',
        ],
        budgets: ['Under €1,000', '€1,000–3,000', '€3,000–10,000', 'Over €10,000', 'Not sure yet'],
        submit: 'Send message',
        sending: 'Sending…',
        newMessage: 'Send another message',
        success: 'Thank you for getting in touch!',
        successBody:
            'Your message has been received and we sent a confirmation to your email. We will get back to you within 1–2 business days.',
        error: 'Oops, sending failed.',
        errorBody: `Please try again or email us directly at ${CONTACT_EMAIL}.`,
    },

    footer: {
        ctaStart: 'Let’s make something',
        ctaAccent: 'that stops people.',
        cta: 'Book a free consultation',
        tagline: 'AI-powered marketing, design and web studio from Finland.',
        company: 'VOON IQ Oy',
        location: 'Jyväskylä, Finland',
        columns: { services: 'Services', site: 'Site', products: 'Our products' },
        contactLink: 'Contact',
        cookieSettings: 'Cookie settings',
    },

    newsletter: {
        title: 'Newsletter',
        body: 'AI, marketing and the web – practical tips and news about once a month.',
        placeholder: 'you@company.com',
        submit: 'Subscribe',
        consent: 'I want the VOON IQ newsletter. I can unsubscribe at any time from the link in every email.',
        sending: 'Sending…',
        sent: 'Almost done! Confirm your subscription from the link we just emailed you.',
        error: 'Subscription failed. Check the address and try again.',
        notice: {
            ok: 'Thank you! Your newsletter subscription is confirmed.',
            invalid: 'The confirmation link has expired or is invalid. Please subscribe again at the bottom of the page.',
            error: 'We could not confirm your subscription. Please try again shortly.',
            close: 'Close',
        },
    },

    cookie: {
        aria: 'Cookie settings',
        title: 'We use cookies',
        body:
            'This site only uses data that is essential for it to work. Any analytics is enabled only with your consent. You can change your choice at any time at the bottom of the page.',
        decline: 'Essential only',
        accept: 'Accept all',
    },
};

export default en;
