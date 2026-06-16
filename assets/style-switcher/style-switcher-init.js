/**
 * SPurno Style Switcher
 * Controls CSS custom properties on :root for theme customization.
 * Persists selection in localStorage.
 */
(function($) {
    'use strict';

    var $switcher = $('.u-ss');
    var STORAGE_KEY = 'spurno-theme';

    // Predefined color themes
    var themes = {
        // ===== Solid Color Themes =====
        'theme-gold': {
            primary: '#f7b731',
            primaryDark: '#d97706',
            accent: '#f7931e',
            primaryRgb: '247, 183, 49',
            accentRgb: '247, 147, 30',
            primaryDarkRgb: '217, 119, 6'
        },
        'theme-blue': {
            primary: '#4facfe',
            primaryDark: '#2d7dd2',
            accent: '#3d8bfd',
            primaryRgb: '79, 172, 254',
            accentRgb: '61, 139, 253',
            primaryDarkRgb: '45, 125, 210'
        },
        'theme-purple': {
            primary: '#a855f7',
            primaryDark: '#7c3aed',
            accent: '#8b5cf6',
            primaryRgb: '168, 85, 247',
            accentRgb: '139, 92, 246',
            primaryDarkRgb: '124, 58, 237'
        },
        'theme-green': {
            primary: '#34d399',
            primaryDark: '#059669',
            accent: '#10b981',
            primaryRgb: '52, 211, 153',
            accentRgb: '16, 185, 129',
            primaryDarkRgb: '5, 150, 105'
        },
        'theme-pink': {
            primary: '#f472b6',
            primaryDark: '#e11d8f',
            accent: '#ec4899',
            primaryRgb: '244, 114, 182',
            accentRgb: '236, 72, 153',
            primaryDarkRgb: '225, 29, 143'
        },
        'theme-cyan': {
            primary: '#22d3ee',
            primaryDark: '#0891b2',
            accent: '#06b6d4',
            primaryRgb: '34, 211, 238',
            accentRgb: '6, 182, 212',
            primaryDarkRgb: '8, 145, 178'
        },
        'theme-red': {
            primary: '#f87171',
            primaryDark: '#dc2626',
            accent: '#ef4444',
            primaryRgb: '248, 113, 113',
            accentRgb: '239, 68, 68',
            primaryDarkRgb: '220, 38, 38'
        },
        'theme-orange': {
            primary: '#fb923c',
            primaryDark: '#ea580c',
            accent: '#f97316',
            primaryRgb: '251, 146, 60',
            accentRgb: '249, 115, 22',
            primaryDarkRgb: '234, 88, 12'
        },
        // New solid colors
        'theme-coral': {
            primary: '#ff6b6b',
            primaryDark: '#e55a5a',
            accent: '#ff8787',
            primaryRgb: '255, 107, 107',
            accentRgb: '255, 135, 135',
            primaryDarkRgb: '229, 90, 90'
        },
        'theme-teal': {
            primary: '#2dd4bf',
            primaryDark: '#14b8a6',
            accent: '#5eead4',
            primaryRgb: '45, 212, 191',
            accentRgb: '94, 234, 212',
            primaryDarkRgb: '20, 184, 166'
        },
        'theme-rose': {
            primary: '#fb7185',
            primaryDark: '#e55a6e',
            accent: '#fda4af',
            primaryRgb: '251, 113, 133',
            accentRgb: '253, 164, 175',
            primaryDarkRgb: '229, 90, 110'
        },
        'theme-lime': {
            primary: '#84cc16',
            primaryDark: '#65a30d',
            accent: '#a3e635',
            primaryRgb: '132, 204, 22',
            accentRgb: '163, 230, 53',
            primaryDarkRgb: '101, 163, 13'
        },
        'theme-indigo': {
            primary: '#6366f1',
            primaryDark: '#4548d3',
            accent: '#818cf8',
            primaryRgb: '99, 102, 241',
            accentRgb: '129, 140, 248',
            primaryDarkRgb: '69, 72, 211'
        },
        'theme-amber': {
            primary: '#f59e0b',
            primaryDark: '#d97706',
            accent: '#fbbf24',
            primaryRgb: '245, 158, 11',
            accentRgb: '251, 191, 36',
            primaryDarkRgb: '217, 119, 6'
        },
        // ===== Gradient Pair Themes (contrasting primary/accent) =====
        'gradient-sunset': {
            primary: '#a855f7',
            primaryDark: '#8a37d9',
            accent: '#f472b6',
            primaryRgb: '168, 85, 247',
            accentRgb: '244, 114, 182',
            primaryDarkRgb: '138, 55, 217'
        },
        'gradient-ocean': {
            primary: '#2dd4bf',
            primaryDark: '#0fb6a1',
            accent: '#3b82f6',
            primaryRgb: '45, 212, 191',
            accentRgb: '59, 130, 246',
            primaryDarkRgb: '15, 182, 161'
        },
        'gradient-fire': {
            primary: '#fb923c',
            primaryDark: '#dd741e',
            accent: '#ef4444',
            primaryRgb: '251, 146, 60',
            accentRgb: '239, 68, 68',
            primaryDarkRgb: '221, 116, 30'
        },
        'gradient-forest': {
            primary: '#22c55e',
            primaryDark: '#04a740',
            accent: '#059669',
            primaryRgb: '34, 197, 94',
            accentRgb: '5, 150, 105',
            primaryDarkRgb: '4, 167, 64'
        },
        'gradient-midnight': {
            primary: '#6366f1',
            primaryDark: '#4548d3',
            accent: '#8b5cf6',
            primaryRgb: '99, 102, 241',
            accentRgb: '139, 92, 246',
            primaryDarkRgb: '69, 72, 211'
        },
        'gradient-aurora': {
            primary: '#22d3ee',
            primaryDark: '#04b5d0',
            accent: '#a855f7',
            primaryRgb: '34, 211, 238',
            accentRgb: '168, 85, 247',
            primaryDarkRgb: '4, 181, 208'
        }
    };

    function applyTheme(colors) {
        var root = document.documentElement;
        root.style.setProperty('--color-primary', colors.primary);
        root.style.setProperty('--color-primary-dark', colors.primaryDark);
        root.style.setProperty('--color-accent', colors.accent);
        root.style.setProperty('--color-primary-rgb', colors.primaryRgb);
        root.style.setProperty('--color-accent-rgb', colors.accentRgb);
        root.style.setProperty('--color-primary-dark-rgb', colors.primaryDarkRgb);
    }

    function getSavedTheme() {
        try {
            var saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch(e) {}
        return null;
    }

    function saveTheme(colors) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
        } catch(e) {}
    }

    function resetTheme() {
        localStorage.removeItem(STORAGE_KEY);
        // Reset to default (CSS defaults in spurno3d.css)
        var root = document.documentElement;
        root.style.removeProperty('--color-primary');
        root.style.removeProperty('--color-primary-dark');
        root.style.removeProperty('--color-accent');
        root.style.removeProperty('--color-primary-rgb');
        root.style.removeProperty('--color-accent-rgb');
        root.style.removeProperty('--color-primary-dark-rgb');
        $('.u-ss-color').prop('checked', false);
        $('#theme-gold').prop('checked', true);
    }

    // Apply saved theme on load
    var savedTheme = getSavedTheme();
    if (savedTheme) {
        applyTheme(savedTheme);
        // Check the matching radio button
        for (var key in themes) {
            var t = themes[key];
            if (t.primary === savedTheme.primary) {
                $('#' + key).prop('checked', true);
                break;
            }
        }
    }

    // ===== PANEL TOGGLE =====
    $('.u-ss-toggler').on('click', function(e) {
        e.preventDefault();
        $('.u-ss').toggleClass('u-ss_opened');
    });

    // ===== COLOR THEME SELECTION =====
    $('.u-ss-color').on('change', function() {
        if (!this.checked) return;
        var themeKey = $(this).val();
        var colors = themes[themeKey];
        if (!colors) return;

        applyTheme(colors);
        saveTheme(colors);

        // Update spectrum color picker
        if ($.fn.spectrum) {
            $('#customColorPicker').spectrum('set', colors.primary);
            $('#customColorInput').val(colors.primary);
        }

        // Auto-hide the style switcher after selecting a color
        autoHideSwitcher();
    });

    // ===== CUSTOM COLOR PICKER =====
    if ($.fn.spectrum) {
        $('#customColorPicker').spectrum({
            color: savedTheme ? savedTheme.primary : '#f7b731',
            change: function(color) {
                var hex = color.toHexString();
                var r = parseInt(color._r, 10);
                var g = parseInt(color._g, 10);
                var b = parseInt(color._b, 10);

                // Derive darker shade
                var dr = Math.max(0, r - 30);
                var dg = Math.max(0, g - 30);
                var db = Math.max(0, b - 30);

                // Derive accent (shift hue slightly)
                var ar = Math.min(255, r + 10);
                var ag = Math.max(0, g - 20);
                var ab = Math.max(0, b - 10);

                var customColors = {
                    primary: hex,
                    primaryDark: '#' + [dr, dg, db].map(function(c) {
                        return c.toString(16).padStart(2, '0');
                    }).join(''),
                    accent: '#' + [ar, ag, ab].map(function(c) {
                        return c.toString(16).padStart(2, '0');
                    }).join(''),
                    primaryRgb: r + ', ' + g + ', ' + b,
                    accentRgb: ar + ', ' + ag + ', ' + ab,
                    primaryDarkRgb: dr + ', ' + dg + ', ' + db
                };

                applyTheme(customColors);
                saveTheme(customColors);
                $('#customColorInput').val(hex);
                $('.u-ss-color').prop('checked', false);

                // Auto-hide the style switcher after picking a custom color
                autoHideSwitcher();
            }
        });

        $('#customColorInput').on('change', function() {
            var val = $(this).val();
            if (/^#[0-9a-f]{6}$/i.test(val)) {
                $('#customColorPicker').spectrum('set', val);
            }
        });
    }

    // ===== AUTO-HIDE FUNCTION =====
    function autoHideSwitcher() {
        setTimeout(function() {
            $switcher.removeClass('u-ss_opened');
        }, 400);
    }

    // ===== RESET =====
    $('.js-ss-reset').on('click', function() {
        resetTheme();
        // Re-apply the default theme explicitly
        var def = themes['theme-gold'];
        applyTheme(def);
        saveTheme(def);
        $('.u-ss-color').prop('checked', false);
        $('#theme-gold').prop('checked', true);
        if ($.fn.spectrum) {
            $('#customColorPicker').spectrum('set', def.primary);
            $('#customColorInput').val(def.primary);
        }
    });

})(jQuery);
