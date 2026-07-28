const https = require('https');
const fs = require('fs');
const path = require('path');

const API_URL = 'https://spurno-auth.ispurno.workers.dev/api/products';
const FEED_PATH = path.join(__dirname, '..', 'merchant-products-feed.xml');
const SITE_URL = 'https://spurno.github.io';
const MARKETPLACE_URL = 'https://pixabanimation.github.io';

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function escapeXML(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function buildFeed(products) {
  const items = products.map(p => {
    const id = p.slug || p.id;
    const price = parseFloat(p.price).toFixed(2);
    const availability = p.stock > 0 ? 'in_stock' : 'out_of_stock';
    const imageLink = p.image_url ? p.image_url.replace(/^http:\/\//i, 'https://') : '';
    const link = `${MARKETPLACE_URL}/#/product/${id}`;
    const category = p.category_name || 'Motion Graphics';
    const description = p.preview_description || `${p.name} — ${category}`;

    const gpc = category === 'Adobe After Effect Plugins' || category === 'Adobe After Effects Templates'
      ? 'Software > Computer Software > Multimedia & Design Software > Animation Editing Software'
      : 'Media > DVDs & Videos > Film & Television Digital Downloads';

    return `    <item>
      <g:id>${escapeXML(id)}</g:id>
      <g:title>${escapeXML(p.name)}</g:title>
      <g:description>${escapeXML(description)}</g:description>
      <g:link>${escapeXML(link)}</g:link>
      <g:image_link>${escapeXML(imageLink)}</g:image_link>
      <g:price>${price} USD</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>SPurno Animation Studio</g:brand>
      <g:google_product_category>${gpc}</g:google_product_category>
      <g:product_type>${escapeXML(category)}</g:product_type>
      <g:shipping>
        <g:country>US</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>GB</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>DE</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>CA</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>AU</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>FR</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>JP</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>BR</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:shipping>
        <g:country>IN</g:country>
        <g:service>Digital Delivery</g:service>
        <g:price>0.00 USD</g:price>
      </g:shipping>
      <g:tax>
        <g:country>US</g:country>
        <g:rate>0.00</g:rate>
      </g:tax>
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>SPurno Animation Studio - Products</title>
    <link>${escapeXML(SITE_URL)}</link>
    <description>Premium motion background videos, animated templates, and stock footage</description>
${items}
  </channel>
</rss>`;
}

async function main() {
  try {
    const products = await fetchJSON(API_URL);
    if (!Array.isArray(products) || products.length === 0) {
      console.error('No products found from API');
      process.exit(1);
    }
    const feed = buildFeed(products);
    fs.writeFileSync(FEED_PATH, feed, 'utf-8');
    console.log(`Feed generated: ${FEED_PATH} (${products.length} products)`);
  } catch (err) {
    console.error('Failed to generate feed:', err.message);
    process.exit(1);
  }
}

main();
