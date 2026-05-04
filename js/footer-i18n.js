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

    function getStoredLanguage() {
        var stored = window.localStorage && window.localStorage.getItem('spurnoLanguage');
        return languages.indexOf(stored) === -1 ? 'en' : stored;
    }

    function setStoredLanguage(language) {
        if (window.localStorage) {
            window.localStorage.setItem('spurnoLanguage', language);
        }
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
            });
        });
    }

    function initFooterTranslation() {
        var $ = window.jQuery;

        createFallbackI18next();

        if (!$ || !window.i18next) {
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
            bindLanguageMenu();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFooterTranslation);
    } else {
        initFooterTranslation();
    }
})(window, document);
