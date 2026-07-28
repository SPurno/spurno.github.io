(function () {
  'use strict';

  var API = 'https://spurno-auth.ispurno.workers.dev/api/products';

  window.products = [];

  window.productsReady = fetch(API)
    .then(function (r) {
      if (!r.ok) throw new Error('Failed to fetch products');
      return r.json();
    })
    .then(function (data) {
      window.products = data || [];
      injectProductStructuredData(data);
      return data;
    })
    .catch(function () {
      window.products = [];
    });

  function injectProductStructuredData(products) {
    if (!products || !products.length) return;
    var items = products.map(function (p) {
      return {
        "@type": "ListItem",
        "position": p.id,
        "item": {
          "@type": "Product",
          "@id": "https://pixabanimation.github.io/#/product/" + p.slug,
          "name": p.name,
          "description": p.preview_description || p.name + " — " + p.category_name,
          "image": p.image_url,
          "category": p.category_name,
          "offers": {
            "@type": "Offer",
            "price": p.price,
            "priceCurrency": "USD",
            "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": "https://pixabanimation.github.io/#/product/" + p.slug,
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]
          }
        }
      };
    });

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Motion Graphics Products from SPurno Animation Studio",
      "description": "Premium motion background videos, animated templates, and stock footage assets.",
      "url": "https://spurno.github.io/",
      "numberOfItems": products.length,
      "itemListOrder": "http://schema.org/ItemListOrderDescending",
      "itemListElement": items
    });
    document.head.appendChild(script);
  }
})();
