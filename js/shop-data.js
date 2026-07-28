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
      return data;
    })
    .catch(function () {
      window.products = [];
    });
})();
