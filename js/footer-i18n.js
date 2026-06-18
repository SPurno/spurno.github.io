(function (window, document) {
    'use strict';

    var resources = {
        en: {
            translation: {
                nav: {
                    about: 'About',
                    services: 'Services',
                    portfolio: 'Portfolio',
                    videos: 'Videos',
                    explore: 'Explore',
                    contact: 'Contact',
                    shopNow: 'Shop Now'
                },
                footer: {
                    subscribePlaceholder: 'Enter your email address',
                    subscribeButton: 'Subscribe',
                    contact: 'Contact Us',
                    work: 'Work with Us',
                    advertise: 'Advertise',
                    privacy: 'Privacy',
                    terms: 'Terms of Use',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: 'Company',
                    aboutUs: 'About Us',
                    home: 'Home',
                    policies: 'Policies',
                    privacyPolicy: 'Privacy Policy',
                    termsOfUse: 'Terms of Use',
                    stockSites: 'Stock Sites',
                    footerDesc: 'SPurno Animation Studio creates premium motion background videos, animated templates, and stock footage used by creators worldwide. Based in Dhaka, Bangladesh.',
                    email: 'Email: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. All rights reserved.'
                },
                language: {
                    current: 'English',
                    en: 'English',
                    es: 'Spanish',
                    fr: 'French',
                    de: 'German',
                    pt: 'Portuguese',
                    ja: 'Japanese',
                    ru: 'Russian',
                    'zh-CN': 'Chinese (Simplified)'
                },
                social: {
                    facebook: 'Like Us on Facebook',
                    twitter: 'Follow Us on Twitter',
                    youtube: 'Subscribe to Our YouTube Channel',
                    instagram: 'Follow Us on Instagram',
                    rss: 'RSS'
                }
            }
        },
        es: {
            translation: {
                nav: {
                    about: 'Acerca de',
                    services: 'Servicios',
                    portfolio: 'Portafolio',
                    videos: 'Videos',
                    explore: 'Explorar',
                    contact: 'Contacto',
                    shopNow: 'Comprar ahora'
                },
                footer: {
                    subscribePlaceholder: 'Introduce tu correo electronico',
                    subscribeButton: 'Suscribirse',
                    contact: 'Contactanos',
                    work: 'Trabaja con nosotros',
                    advertise: 'Publicidad',
                    privacy: 'Privacidad',
                    terms: 'Terminos de uso',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: 'Empresa',
                    aboutUs: 'Sobre nosotros',
                    home: 'Inicio',
                    policies: 'Pol\u00edticas',
                    privacyPolicy: 'Pol\u00edtica de privacidad',
                    termsOfUse: 'T\u00e9rminos de uso',
                    stockSites: 'Sitios de stock',
                    footerDesc: 'SPurno Animation Studio crea videos de fondo animados premium, plantillas animadas y material de archivo utilizado por creadores de todo el mundo. Con sede en Dhaka, Bangladesh.',
                    email: 'Correo: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. Todos los derechos reservados.'
                },
                language: {
                    current: 'Espanol',
                    en: 'Ingles',
                    es: 'Espanol',
                    fr: 'Frances',
                    de: 'Aleman',
                    pt: 'Portugues',
                    ja: 'Japones',
                    ru: 'Ruso',
                    'zh-CN': 'Chino (Simplificado)'
                },
                social: {
                    facebook: 'Danos me gusta en Facebook',
                    twitter: 'Siguenos en Twitter',
                    youtube: 'Suscribete a nuestro canal de YouTube',
                    instagram: 'Siguenos en Instagram',
                    rss: 'RSS'
                }
            }
        },
        ru: {
            translation: {
                nav: {
                    about: '\u041e \u043d\u0430\u0441',
                    services: '\u0423\u0441\u043b\u0443\u0433\u0438',
                    portfolio: '\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e',
                    videos: '\u0412\u0438\u0434\u0435\u043e',
                    explore: '\u0418\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u044c',
                    contact: '\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b',
                    shopNow: '\u041a\u0443\u043f\u0438\u0442\u044c'
                },
                footer: {
                    subscribePlaceholder: 'Vvedite adres elektronnoy pochty',
                    subscribeButton: 'Podpisatsya',
                    contact: 'Svyazatsya s nami',
                    work: 'Rabota s nami',
                    advertise: 'Reklama',
                    privacy: 'Konfidentsialnost',
                    terms: 'Usloviya ispolzovaniya',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: '\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u044f',
                    aboutUs: '\u041e \u043d\u0430\u0441',
                    home: '\u0413\u043b\u0430\u0432\u043d\u0430\u044f',
                    policies: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430',
                    privacyPolicy: '\u041f\u043e\u043b\u0438\u0442\u0438\u043a\u0430 \u043a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u0438',
                    termsOfUse: '\u0423\u0441\u043b\u043e\u0432\u0438\u044f \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u044f',
                    stockSites: '\u0424\u043e\u0442\u043e\u0431\u0430\u043d\u043a\u0438',
                    footerDesc: 'SPurno Animation Studio \u0441\u043e\u0437\u0434\u0430\u0435\u0442 \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0444\u043e\u043d\u043e\u0432\u044b\u0435 \u0432\u0438\u0434\u0435\u043e, \u0430\u043d\u0438\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u0448\u0430\u0431\u043b\u043e\u043d\u044b \u0438 \u0441\u0442\u043e\u043a\u043e\u0432\u044b\u0435 \u043c\u0430\u0442\u0435\u0440\u0438\u0430\u043b\u044b, \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c\u044b\u0435 \u0442\u0432\u043e\u0440\u0446\u0430\u043c\u0438 \u043f\u043e \u0432\u0441\u0435\u043c\u0443 \u043c\u0438\u0440\u0443. \u0411\u0430\u0437\u0438\u0440\u0443\u0435\u0442\u0441\u044f \u0432 \u0414\u0430\u043a\u043a\u0435, \u0411\u0430\u043d\u0433\u043b\u0430\u0434\u0435\u0448.',
                    email: 'Email: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. \u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b.'
                },
                language: {
                    current: 'Russkiy',
                    en: 'Angliyskiy',
                    es: 'Ispanskiy',
                    fr: 'Frantsuzskiy',
                    de: 'Nemetskiy',
                    pt: 'Portugalskiy',
                    ja: 'Yaponskiy',
                    ru: 'Russkiy',
                    'zh-CN': 'Kitayskiy (uproshchennyy)'
                },
                social: {
                    facebook: 'Postavte nam layk v Facebook',
                    twitter: 'Chitayte nas v Twitter',
                    youtube: 'Podpishites na nash kanal YouTube',
                    instagram: 'Chitayte nas v Instagram',
                    rss: 'RSS'
                }
            }
        },
        de: {
            translation: {
                nav: {
                    about: '\u00dcber uns',
                    services: 'Dienstleistungen',
                    portfolio: 'Portfolio',
                    videos: 'Videos',
                    explore: 'Erkunden',
                    contact: 'Kontakt',
                    shopNow: 'Jetzt kaufen'
                },
                footer: {
                    subscribePlaceholder: 'E-Mail-Adresse eingeben',
                    subscribeButton: 'Abonnieren',
                    contact: 'Kontakt',
                    work: 'Mit uns arbeiten',
                    advertise: 'Werben',
                    privacy: 'Datenschutz',
                    terms: 'Nutzungsbedingungen',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: 'Unternehmen',
                    aboutUs: '\u00dcber uns',
                    home: 'Startseite',
                    policies: 'Richtlinien',
                    privacyPolicy: 'Datenschutz',
                    termsOfUse: 'Nutzungsbedingungen',
                    stockSites: 'Stock-Seiten',
                    footerDesc: 'SPurno Animation Studio erstellt erstklassige animierte Hintergrundvideos, animierte Vorlagen und Archivmaterial, das von Kreativen auf der ganzen Welt genutzt wird. Mit Sitz in Dhaka, Bangladesch.',
                    email: 'E-Mail: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. Alle Rechte vorbehalten.'
                },
                language: {
                    current: 'Deutsch',
                    en: 'Englisch',
                    es: 'Spanisch',
                    fr: 'Franz\u00f6sisch',
                    de: 'Deutsch',
                    pt: 'Portugiesisch',
                    ja: 'Japanisch',
                    ru: 'Russisch',
                    'zh-CN': 'Chinesisch (Vereinfacht)'
                },
                social: {
                    facebook: 'Like uns auf Facebook',
                    twitter: 'Folge uns auf Twitter',
                    youtube: 'Abonniere unseren YouTube-Kanal',
                    instagram: 'Folge uns auf Instagram',
                    rss: 'RSS'
                }
            }
        },
        fr: {
            translation: {
                nav: {
                    about: '\u00c0 propos',
                    services: 'Services',
                    portfolio: 'Portfolio',
                    videos: 'Vid\u00e9os',
                    explore: 'Explorer',
                    contact: 'Contact',
                    shopNow: 'Acheter'
                },
                footer: {
                    subscribePlaceholder: 'Entrez votre adresse e-mail',
                    subscribeButton: "S'abonner",
                    contact: 'Contactez-nous',
                    work: 'Travaillez avec nous',
                    advertise: 'Publicit\u00e9',
                    privacy: 'Confidentialit\u00e9',
                    terms: "Conditions d'utilisation",
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: 'Entreprise',
                    aboutUs: '\u00c0 propos',
                    home: 'Accueil',
                    policies: 'Politiques',
                    privacyPolicy: 'Politique de confidentialit\u00e9',
                    termsOfUse: "Conditions d'utilisation",
                    stockSites: 'Sites de stock',
                    footerDesc: "SPurno Animation Studio cr\u00e9e des vid\u00e9os de fond anim\u00e9es premium, des mod\u00e8les anim\u00e9s et des images d'archives utilis\u00e9s par des cr\u00e9ateurs du monde entier. Bas\u00e9 \u00e0 Dacca, Bangladesh.",
                    email: 'E-mail: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. Tous droits r\u00e9serv\u00e9s.'
                },
                language: {
                    current: 'Fran\u00e7ais',
                    en: 'Anglais',
                    es: 'Espagnol',
                    fr: 'Fran\u00e7ais',
                    de: 'Allemand',
                    pt: 'Portugais',
                    ja: 'Japonais',
                    ru: 'Russe',
                    'zh-CN': 'Chinois (Simplifi\u00e9)'
                },
                social: {
                    facebook: 'Aimez-nous sur Facebook',
                    twitter: 'Suivez-nous sur Twitter',
                    youtube: 'Abonnez-vous \u00e0 notre cha\u00eene YouTube',
                    instagram: 'Suivez-nous sur Instagram',
                    rss: 'RSS'
                }
            }
        },
        pt: {
            translation: {
                nav: {
                    about: 'Sobre',
                    services: 'Servi\u00e7os',
                    portfolio: 'Portf\u00f3lio',
                    videos: 'V\u00eddeos',
                    explore: 'Explorar',
                    contact: 'Contato',
                    shopNow: 'Comprar'
                },
                footer: {
                    subscribePlaceholder: 'Digite seu endere\u00e7o de e-mail',
                    subscribeButton: 'Inscrever-se',
                    contact: 'Fale conosco',
                    work: 'Trabalhe conosco',
                    advertise: 'Anuncie',
                    privacy: 'Privacidade',
                    terms: 'Termos de uso',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: 'Empresa',
                    aboutUs: 'Sobre n\u00f3s',
                    home: 'In\u00edcio',
                    policies: 'Pol\u00edticas',
                    privacyPolicy: 'Pol\u00edtica de privacidade',
                    termsOfUse: 'Termos de uso',
                    stockSites: 'Sites de stock',
                    footerDesc: 'O SPurno Animation Studio cria v\u00eddeos de fundo animados premium, modelos animados e imagens de arquivo usados por criadores em todo o mundo. Baseado em Dhaka, Bangladesh.',
                    email: 'Email: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. Todos os direitos reservados.'
                },
                language: {
                    current: 'Portugu\u00eas',
                    en: 'Ingl\u00eas',
                    es: 'Espanhol',
                    fr: 'Franc\u00eas',
                    de: 'Alem\u00e3o',
                    pt: 'Portugu\u00eas',
                    ja: 'Japon\u00eas',
                    ru: 'Russo',
                    'zh-CN': 'Chin\u00eas (Simplificado)'
                },
                social: {
                    facebook: 'Curta-nos no Facebook',
                    twitter: 'Siga-nos no Twitter',
                    youtube: 'Inscreva-se no nosso canal do YouTube',
                    instagram: 'Siga-nos no Instagram',
                    rss: 'RSS'
                }
            }
        },
        ja: {
            translation: {
                nav: {
                    about: '\u6982\u8981',
                    services: '\u30b5\u30fc\u30d3\u30b9',
                    portfolio: '\u30dd\u30fc\u30c8\u30d5\u30a9\u30ea\u30aa',
                    videos: '\u52d5\u753b',
                    explore: '\u63a2\u3059',
                    contact: '\u304a\u554f\u3044\u5408\u308f\u305b',
                    shopNow: '\u8cfc\u5165\u3059\u308b'
                },
                footer: {
                    subscribePlaceholder: '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u3092\u5165\u529b',
                    subscribeButton: '\u767b\u9332\u3059\u308b',
                    contact: '\u304a\u554f\u3044\u5408\u308f\u305b',
                    work: '\u5171\u306b\u50cd\u304f',
                    advertise: '\u5e83\u544a\u3092\u63b2\u8f09',
                    privacy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc',
                    terms: '\u5229\u7528\u898f\u7d04',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: '\u4f1a\u793e\u60c5\u5831',
                    aboutUs: '\u6982\u8981',
                    home: '\u30db\u30fc\u30e0',
                    policies: '\u30dd\u30ea\u30b7\u30fc',
                    privacyPolicy: '\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc',
                    termsOfUse: '\u5229\u7528\u898f\u7d04',
                    stockSites: '\u30b9\u30c8\u30c3\u30af\u30b5\u30a4\u30c8',
                    footerDesc: 'SPurno Animation Studio\u306f\u3001\u30af\u30ea\u30a8\u30a4\u30bf\u30fc\u304c\u4e16\u754c\u4e2d\u3067\u4f7f\u7528\u3059\u308b\u30d7\u30ec\u30df\u30a2\u30e0\u306a\u30e2\u30fc\u30b7\u30e7\u30f3\u30d0\u30c3\u30af\u30b0\u30e9\u30a6\u30f3\u30c9\u30d3\u30c7\u30aa\u3001\u30a2\u30cb\u30e1\u30fc\u30b7\u30e7\u30f3\u30c6\u30f3\u30d7\u30ec\u30fc\u30c8\u3001\u30b9\u30c8\u30c3\u30af\u30d5\u30c3\u30c8\u30fc\u30b8\u3092\u4f5c\u6210\u3057\u3066\u3044\u307e\u3059\u3002\u30d0\u30f3\u30b0\u30e9\u30c7\u30b7\u30e5\u3001\u30c0\u30c3\u30ab\u306b\u672c\u793e\u3092\u7f6e\u304d\u307e\u3059\u3002',
                    email: '\u30e1\u30fc\u30eb: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. \u5168\u4fdd\u7559\u3055\u308c\u3066\u3044\u307e\u3059\u3002'
                },
                language: {
                    current: '\u65e5\u672c\u8a9e',
                    en: '\u82f1\u8a9e',
                    es: '\u897f\u73ed\u7259\u8a9e',
                    fr: '\u30d5\u30e9\u30f3\u30b9\u8a9e',
                    de: '\u30c9\u30a4\u30c4\u8a9e',
                    pt: '\u30dd\u30eb\u30c8\u30ac\u30eb\u8a9e',
                    ja: '\u65e5\u672c\u8a9e',
                    ru: '\u30ed\u30b7\u30a2\u8a9e',
                    'zh-CN': '\u4e2d\u56fd\u8a9e\uff08\u7c21\u4f53\uff09'
                },
                social: {
                    facebook: 'Facebook\u3067\u3044\u3044\u306d\u3092\u304a\u9858\u3044\u3057\u307e\u3059',
                    twitter: 'Twitter\u3067\u30d5\u30a9\u30ed\u30fc',
                    youtube: 'YouTube\u30c1\u30e3\u30f3\u30cd\u30eb\u3092\u767b\u9332',
                    instagram: 'Instagram\u3067\u30d5\u30a9\u30ed\u30fc',
                    rss: 'RSS'
                }
            }
        },
        'zh-CN': {
            translation: {
                nav: {
                    about: '\u5173\u4e8e',
                    services: '\u670d\u52a1',
                    portfolio: '\u4f5c\u54c1\u96c6',
                    videos: '\u89c6\u9891',
                    explore: '\u63a2\u7d22',
                    contact: '\u8054\u7cfb',
                    shopNow: '\u7acb\u5373\u8d2d\u4e70'
                },
                footer: {
                    subscribePlaceholder: '\u8f93\u5165\u60a8\u7684\u7535\u5b50\u90ae\u7bb1',
                    subscribeButton: '\u8ba2\u9605',
                    contact: '\u8054\u7cfb\u6211\u4eec',
                    work: '\u4e0e\u6211\u4eec\u5408\u4f5c',
                    advertise: '\u5e7f\u544a\u5408\u4f5c',
                    privacy: '\u9690\u79c1\u653f\u7b56',
                    terms: '\u4f7f\u7528\u6761\u6b3e',
                    copyright: '\u00a9 2010-2026 SPurno Animation Studio - Faruk Ahmed'
                },
                indexFooter: {
                    company: '\u516c\u53f8',
                    aboutUs: '\u5173\u4e8e\u6211\u4eec',
                    home: '\u9996\u9875',
                    policies: '\u653f\u7b56',
                    privacyPolicy: '\u9690\u79c1\u653f\u7b56',
                    termsOfUse: '\u4f7f\u7528\u6761\u6b3e',
                    stockSites: '\u7d20\u6750\u7ad9\u70b9',
                    footerDesc: 'SPurno Animation Studio \u521b\u4f5c\u9ad8\u7ea7\u52a8\u6001\u80cc\u666f\u89c6\u9891\u3001\u52a8\u753b\u6a21\u677f\u548c\u7d20\u6750\u5e93\uff0c\u4f9b\u5168\u7403\u521b\u4f5c\u8005\u4f7f\u7528\u3002\u603b\u90e8\u4f4d\u4e8e\u5b5f\u52a0\u62c9\u56fd\u8fbe\u5361\u5e02\u3002',
                    email: '\u7535\u5b50\u90ae\u4ef6: spurno@icloud.com',
                    copyright: '\u00a9 2026 SPurno Animation Studio. \u4fdd\u7559\u6240\u6709\u6743\u5229\u3002'
                },
                language: {
                    current: '\u4e2d\u6587\uff08\u7b80\u4f53\uff09',
                    en: '\u82f1\u8bed',
                    es: '\u897f\u73ed\u7259\u8bed',
                    fr: '\u6cd5\u8bed',
                    de: '\u5fb7\u8bed',
                    pt: '\u8461\u8404\u7259\u8bed',
                    ja: '\u65e5\u8bed',
                    ru: '\u4fc4\u8bed',
                    'zh-CN': '\u4e2d\u6587\uff08\u7b80\u4f53\uff09'
                },
                social: {
                    facebook: '\u5728Facebook\u4e0a\u5173\u6ce8\u6211\u4eec',
                    twitter: '\u5728Twitter\u4e0a\u5173\u6ce8\u6211\u4eec',
                    youtube: '\u8ba2\u9605\u6211\u4eec\u7684YouTube\u9891\u9053',
                    instagram: '\u5728Instagram\u4e0a\u5173\u6ce8\u6211\u4eec',
                    rss: 'RSS'
                }
            }
        }
    };

    var languages = ['en', 'es', 'fr', 'de', 'pt', 'ja', 'ru', 'zh-CN'];
    var googleLanguages = {
        en: 'en',
        es: 'es',
        fr: 'fr',
        de: 'de',
        pt: 'pt',
        ja: 'ja',
        ru: 'ru',
        'zh-CN': 'zh-CN'
    };
    var googleTranslateCallbacks = [];
    var googleTranslateReady = false;
    var googleTranslateLoading = false;

    function getStoredLanguage() {
        var stored;

        try {
            stored = window.localStorage && window.localStorage.getItem('spurnoLanguage');
        } catch (error) {
            stored = null;
        }

        return languages.indexOf(stored) === -1 ? 'en' : stored;
    }

    function setStoredLanguage(language) {
        try {
            if (window.localStorage) {
                window.localStorage.setItem('spurnoLanguage', language);
            }
        } catch (error) {
            document.documentElement.setAttribute('data-spurno-storage-error', 'true');
        }
    }

    function ensureGoogleTranslateHost() {
        var host = document.getElementById('spurno-google-translate');

        if (host) {
            return host;
        }

        host = document.createElement('div');
        host.id = 'spurno-google-translate';
        host.setAttribute('aria-hidden', 'true');
        host.style.position = 'absolute';
        host.style.left = '-9999px';
        host.style.top = '0';
        host.style.width = '1px';
        host.style.height = '1px';
        host.style.overflow = 'hidden';
        document.body.appendChild(host);

        return host;
    }

    function runGoogleTranslateCallbacks(success) {
        var callbacks = googleTranslateCallbacks.slice();
        googleTranslateCallbacks = [];

        callbacks.forEach(function (callback) {
            callback(success);
        });
    }

    function loadGoogleTranslate(callback) {
        if (typeof callback === 'function') {
            googleTranslateCallbacks.push(callback);
        }

        if (googleTranslateReady) {
            runGoogleTranslateCallbacks(true);
            return;
        }

        if (googleTranslateLoading) {
            return;
        }

        googleTranslateLoading = true;
        ensureGoogleTranslateHost();

        window.spurnoGoogleTranslateReady = function () {
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                new window.google.translate.TranslateElement({
                    pageLanguage: 'en',
                    includedLanguages: languages.map(function (language) {
                        return googleLanguages[language];
                    }).join(','),
                    autoDisplay: false
                }, 'spurno-google-translate');

                googleTranslateReady = true;
                runGoogleTranslateCallbacks(true);
                return;
            }

            runGoogleTranslateCallbacks(false);
        };

        if (document.getElementById('spurno-google-translate-script')) {
            return;
        }

        var script = document.createElement('script');
        script.id = 'spurno-google-translate-script';
        script.async = true;
        script.src = 'https://translate.google.com/translate_a/element.js?cb=spurnoGoogleTranslateReady';
        script.onerror = function () {
            googleTranslateLoading = false;
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            runGoogleTranslateCallbacks(false);
        };
        document.head.appendChild(script);
    }

    function setGoogleTranslateCookie(language) {
        var googleLanguage = googleLanguages[language] || 'en';
        var value = '/en/' + googleLanguage;
        var expires = '; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        var cookie = 'googtrans=' + value + expires + '; path=/';

        document.cookie = cookie;

        if (window.location.hostname && window.location.hostname.indexOf('.') !== -1) {
            document.cookie = cookie + '; domain=' + window.location.hostname;
        }
    }

    function hasGoogleTranslateCookie() {
        return /(?:^|;\s*)googtrans=/.test(document.cookie);
    }

    function triggerChange(element) {
        var event;

        if (typeof window.Event === 'function') {
            event = new window.Event('change', {
                bubbles: true
            });
        } else {
            event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
        }

        element.dispatchEvent(event);
    }

    function waitForGoogleCombo(callback, attempts) {
        var combo = document.querySelector('.goog-te-combo');

        if (combo) {
            callback(combo);
            return;
        }

        if (attempts <= 0) {
            callback(null);
            return;
        }

        window.setTimeout(function () {
            waitForGoogleCombo(callback, attempts - 1);
        }, 100);
    }

    function translatePage(language) {
        var googleLanguage = googleLanguages[language];

        if (!googleLanguage) {
            return;
        }

        document.documentElement.setAttribute('lang', language);
        setGoogleTranslateCookie(language);

        loadGoogleTranslate(function (loaded) {
            if (!loaded) {
                document.documentElement.setAttribute('data-spurno-translate-error', 'true');
                return;
            }

            waitForGoogleCombo(function (combo) {
                if (!combo) {
                    document.documentElement.setAttribute('data-spurno-translate-error', 'true');
                    return;
                }

                if (language === 'en' && !combo.querySelector('option[value="en"]')) {
                    googleLanguage = '';
                }

                combo.value = googleLanguage;
                triggerChange(combo);
            }, 80);
        });
    }

    function createFallbackI18next() {
        if (window.i18next) {
            return;
        }

        var currentLanguage = getStoredLanguage();

        window.i18next = {
            init: function (options, callback) {
                currentLanguage = options.lng || currentLanguage;
                if (typeof callback === 'function') {
                    callback();
                }
            },
            changeLanguage: function (language, callback) {
                currentLanguage = language;
                if (typeof callback === 'function') {
                    callback();
                }
            },
            t: function (key) {
                var parts = key.split('.');
                var value = resources[currentLanguage] && resources[currentLanguage].translation;

                for (var i = 0; i < parts.length; i++) {
                    value = value && value[parts[i]];
                }

                if (typeof value === 'undefined') {
                    value = resources.en.translation;

                    for (var j = 0; j < parts.length; j++) {
                        value = value && value[parts[j]];
                    }
                }

                return typeof value === 'undefined' ? key : value;
            }
        };
    }

    function t(key) {
        return window.i18next && window.i18next.t ? window.i18next.t(key) : key;
    }

    function annotateFooter($footer) {
        $footer.find('input[type="email"]').attr('data-i18n', '[placeholder]footer.subscribePlaceholder');
        $footer.find('button[type="submit"]').attr('data-i18n', 'footer.subscribeButton');
        $footer.find('a[href="contact-us.html"]').attr('data-i18n', 'footer.contact');
        $footer.find('a[href="about-us.html"]').attr('data-i18n', 'footer.work');
        $footer.find('a[href="advertisement-design.html"]').attr('data-i18n', 'footer.advertise');
        $footer.find('a[href="privacy-policy.html"]').attr('data-i18n', 'footer.privacy');
        $footer.find('a[href="terms-of-use.html"]').attr('data-i18n', 'footer.terms');
        $footer.find('p').filter(function () {
            return this.textContent.indexOf('SPurno Animation Studio - Faruk Ahmed') !== -1;
        }).attr('data-i18n', 'footer.copyright');

        $footer.find('[title*="Facebook"]').attr('data-i18n', '[title]social.facebook');
        $footer.find('[title*="Twitter"]').attr('data-i18n', '[title]social.twitter');
        $footer.find('[title*="YouTube"]').attr('data-i18n', '[title]social.youtube');
        $footer.find('[title*="Instagram"]').attr('data-i18n', '[title]social.instagram');
        $footer.find('[title="RSS"]').attr('data-i18n', '[title]social.rss');
    }

    function configureLanguageMenu($container) {
        var $menu = $container.find('.language-selector .lang-dropdown');
        var $button = $container.find('.language-selector > .lang-btn');

        // Fallback: support Bootstrap .btn-group.dropup structure (legacy pages)
        if (!$menu.length || !$button.length) {
            $menu = $container.find('.btn-group.dropup .dropdown-menu').last();
            $button = $menu.siblings('button').first();
        }

        if (!$menu.length || !$button.length) {
            return;
        }

        // For Bootstrap-style button, inject current language indicator
        if ($container.find('.btn-group.dropup').length) {
            $button.contents().filter(function () {
                return this.nodeType === 3 && this.nodeValue.trim();
            }).first().replaceWith(' ');

            if (!$button.find('[data-i18n="language.current"]').length) {
                $button.find('.fa-caret-up').before('<span class="js-current-language" data-i18n="language.current"></span> ');
            }
        } else {
            // For .language-selector: also set data-i18n on the button text
            $button.contents().filter(function () {
                return this.nodeType === 3 && this.nodeValue.trim();
            }).first().replaceWith(' ');

            if (!$button.find('[data-i18n="language.current"]').length) {
                $button.append(' <span class="js-current-language" data-i18n="language.current"></span>');
            }
        }

        $menu.find('.lang-option').each(function (index) {
            var language = languages[index];
            if (!language) {
                return;
            }

            var $item = window.jQuery(this);
            $item.attr({
                href: '#',
                'data-language': language
            });

            $item.contents().filter(function () {
                return this.nodeType === 3 && this.nodeValue.trim();
            }).remove();

            if (!$item.find('[data-i18n="language.' + language + '"]').length) {
                $item.append(' <span data-i18n="language.' + language + '"></span>');
            }
        });
    }

    function localizePage() {
        var $ = window.jQuery;

        if ($.fn.localize) {
            $('footer, nav').localize();
        } else {
            $('[data-i18n]').each(function () {
                var $el = $(this);
                var key = $el.attr('data-i18n');
                var attrMatch = key.match(/^\[([^\]]+)\](.+)$/);

                if (attrMatch) {
                    $el.attr(attrMatch[1], t(attrMatch[2]));
                } else {
                    $el.text(t(key));
                }
            });
        }
    }

    function bindLanguageMenu() {
        var $ = window.jQuery;

        // Toggle language dropdown on button click (supports mobile where :hover is unreliable)
        $(document).on('click', '.lang-btn', function (event) {
            event.stopPropagation();
            var $selector = $(this).closest('.language-selector');
            // Close all other open language menus first
            $('.language-selector').not($selector).removeClass('open');
            $selector.toggleClass('open');
        });

        // Close open language dropdown when clicking outside
        $(document).on('click', function (event) {
            if (!$(event.target).closest('.language-selector').length) {
                $('.language-selector').removeClass('open');
            }
        });

        $(document).on('click', '[data-language]', function (event) {
            event.preventDefault();

            var language = $(this).data('language');

            if (languages.indexOf(language) === -1) {
                return;
            }

            // Close dropdown after selecting a language
            $(this).closest('.language-selector').removeClass('open');

            window.i18next.changeLanguage(language, function () {
                setStoredLanguage(language);
                localizePage();
                translatePage(language);
            });
        });
    }

    function initFooterTranslation() {
        var $ = window.jQuery;
        var storedLanguage = getStoredLanguage();

        createFallbackI18next();

        if (!$ || !window.i18next) {
            if (storedLanguage !== 'en' || hasGoogleTranslateCookie()) {
                translatePage(storedLanguage);
            } else {
                document.documentElement.setAttribute('lang', storedLanguage);
            }

            return;
        }

        // Annotate footer elements and configure language selectors in nav and footer
        $('footer').each(function () {
            annotateFooter($(this));
        });

        // Configure language menus in both nav and footer
        $('nav, footer').each(function () {
            configureLanguageMenu($(this));
        });

        window.i18next.init({
            lng: getStoredLanguage(),
            fallbackLng: 'en',
            resources: resources
        }, function () {
            if (window.jqueryI18next) {
                window.jqueryI18next.init(window.i18next, $, {
                    useOptionsAttr: true
                });
            }

            localizePage();

            if (storedLanguage !== 'en' || hasGoogleTranslateCookie()) {
                translatePage(storedLanguage);
            } else {
                document.documentElement.setAttribute('lang', storedLanguage);
            }

            bindLanguageMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterTranslation);
    } else {
        initFooterTranslation();
    }
})(window, document);
