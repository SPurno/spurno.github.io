(function (window, document) {
    'use strict';

    var resources = {
        en: {
            translation: {
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
                language: {
                    current: 'English',
                    en: 'English',
                    es: 'Spanish',
                    ru: 'Russian',
                    de: 'German'
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
                language: {
                    current: 'Espanol',
                    en: 'Ingles',
                    es: 'Espanol',
                    ru: 'Ruso',
                    de: 'Aleman'
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
                language: {
                    current: 'Russkiy',
                    en: 'Angliyskiy',
                    es: 'Ispanskiy',
                    ru: 'Russkiy',
                    de: 'Nemetskiy'
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
                language: {
                    current: 'Deutsch',
                    en: 'Englisch',
                    es: 'Spanisch',
                    ru: 'Russisch',
                    de: 'Deutsch'
                },
                social: {
                    facebook: 'Like uns auf Facebook',
                    twitter: 'Folge uns auf Twitter',
                    youtube: 'Abonniere unseren YouTube-Kanal',
                    instagram: 'Folge uns auf Instagram',
                    rss: 'RSS'
                }
            }
        }
    };

    var languages = ['en', 'es', 'ru', 'de'];
    var googleLanguages = {
        en: 'en',
        es: 'es',
        ru: 'ru',
        de: 'de'
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

    function configureLanguageMenu($footer) {
        var $menu = $footer.find('.btn-group.dropup .dropdown-menu').last();
        var $button = $menu.siblings('button').first();

        if (!$menu.length || !$button.length) {
            return;
        }

        $button.contents().filter(function () {
            return this.nodeType === 3 && this.nodeValue.trim();
        }).first().replaceWith(' ');

        if (!$button.find('[data-i18n="language.current"]').length) {
            $button.find('.fa-caret-up').before('<span class="js-current-language" data-i18n="language.current"></span> ');
        }

        $menu.find('.dropdown-item').each(function (index) {
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

    function localizeFooter() {
        var $ = window.jQuery;
        var $footer = $('footer');

        if (!$footer.length) {
            return;
        }

        if ($.fn.localize) {
            $footer.localize();
        } else {
            $footer.find('[data-i18n]').each(function () {
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

        $('footer').on('click', '[data-language]', function (event) {
            event.preventDefault();

            var language = $(this).data('language');

            if (languages.indexOf(language) === -1) {
                return;
            }

            window.i18next.changeLanguage(language, function () {
                setStoredLanguage(language);
                localizeFooter();
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

        $('footer').each(function () {
            var $footer = $(this);
            annotateFooter($footer);
            configureLanguageMenu($footer);
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

            localizeFooter();

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
