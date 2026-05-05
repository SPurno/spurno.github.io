(function() {
    'use strict';

    var ADS_CLIENT = 'ca-pub-9371167470298440';
    var ADS_SLOT = '6814031410';
    var MAX_ADS_PER_PAGE = 5;

    function addAdStyles() {
        if (document.getElementById('spurno-auto-ad-styles')) {
            return;
        }

        var style = document.createElement('style');
        style.id = 'spurno-auto-ad-styles';
        style.textContent = [
            '.spurno-auto-ad {',
            '  clear: both;',
            '  width: min(100%, 1120px);',
            '  min-height: 120px;',
            '  margin: 28px auto;',
            '  padding: 8px 0;',
            '  overflow: hidden;',
            '  text-align: center;',
            '}',
            '.spurno-auto-ad .adsbygoogle {',
            '  display: block;',
            '  width: 100%;',
            '}',
            '@media (max-width: 767.98px) {',
            '  .spurno-auto-ad {',
            '    min-height: 100px;',
            '    margin: 22px auto;',
            '    padding-left: 12px;',
            '    padding-right: 12px;',
            '  }',
            '}'
        ].join('\n');
        document.head.appendChild(style);
    }

    function createAdUnit(index) {
        var wrapper = document.createElement('div');
        wrapper.className = 'spurno-auto-ad';
        wrapper.setAttribute('data-spurno-auto-ad', String(index));

        var ad = document.createElement('ins');
        ad.className = 'adsbygoogle';
        ad.style.display = 'block';
        ad.setAttribute('data-ad-client', ADS_CLIENT);
        ad.setAttribute('data-ad-slot', ADS_SLOT);
        ad.setAttribute('data-ad-format', 'auto');
        ad.setAttribute('data-full-width-responsive', 'true');

        wrapper.appendChild(ad);
        return wrapper;
    }

    function pushAd(ad) {
        try {
            window.adsbygoogle = window.adsbygoogle || [];
            window.adsbygoogle.push({});
        } catch (error) {
            ad.setAttribute('data-ad-push-error', 'true');
        }
    }

    function getTarget() {
        return document.querySelector('main') || document.body;
    }

    function getInsertionRefs(target) {
        var refs = [];
        var header = target.querySelector(':scope > header');
        var footer = target.querySelector(':scope > footer');
        var children = Array.prototype.slice.call(target.children).filter(function(child) {
            return !child.matches('script, style, link, meta, header, footer, .spurno-auto-ad, .u-outer-spaces-helper, .js-go-to');
        });

        if (header) {
            refs.push({ type: 'after', node: header });
        }

        if (children.length) {
            refs.push({ type: 'after', node: children[Math.floor(children.length * 0.25)] });
            refs.push({ type: 'after', node: children[Math.floor(children.length * 0.50)] });
            refs.push({ type: 'after', node: children[Math.floor(children.length * 0.75)] });
        }

        if (footer) {
            refs.push({ type: 'before', node: footer });
        }

        return refs.filter(function(ref, index, allRefs) {
            return ref.node && allRefs.findIndex(function(candidate) {
                return candidate.type === ref.type && candidate.node === ref.node;
            }) === index;
        });
    }

    function insertAd(target, ad, ref) {
        if (!ref || !ref.node || !ref.node.parentNode) {
            target.appendChild(ad);
            return;
        }

        if (ref.type === 'before') {
            ref.node.parentNode.insertBefore(ad, ref.node);
            return;
        }

        ref.node.parentNode.insertBefore(ad, ref.node.nextSibling);
    }

    function initAds() {
        if (document.documentElement.hasAttribute('data-disable-spurno-ads')) {
            return;
        }

        var existingAds = document.querySelectorAll('ins.adsbygoogle').length;
        var missingAds = Math.max(0, MAX_ADS_PER_PAGE - existingAds);

        if (!missingAds) {
            return;
        }

        addAdStyles();

        var target = getTarget();
        var refs = getInsertionRefs(target);

        for (var index = 0; index < missingAds; index += 1) {
            var ad = createAdUnit(existingAds + index + 1);
            insertAd(target, ad, refs[index]);
            pushAd(ad);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAds);
    } else {
        initAds();
    }
}());
