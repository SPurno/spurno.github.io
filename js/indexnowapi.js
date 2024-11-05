const data = {
    host: "https://spurno.github.io",
    key: "c384cb56b5ae4ab48ff69377f1373fa3",
    keyLocation: "https://spurno.github.io/c384cb56b5ae4ab48ff69377f1373fa3.txt",
    urlList: [
            "https://spurno.github.io/index",
            "https://spurno.github.io/about-us",
            "https://spurno.github.io/adobe-after-effect-animation-tutorial",
            "https://spurno.github.io/adobe-after-effect-plugins",
            "https://spurno.github.io/background-animation",
            "https://spurno.github.io/animated-background-stock-video-footage-for-premium-download",
            "https://spurno.github.io/contact-us",
            "https://spurno.github.io/digital-marketing",
            "https://spurno.github.io/digital-wallpaper",
            "https://spurno.github.io/how-to-make-freelancing",
            "https://spurno.github.io/how-to-make-money-online",
            "https://spurno.github.io/infographic",
            "https://spurno.github.io/learn-graphics-design",
            "https://spurno.github.io/learn-seo-search-engine-optimization",
            "https://spurno.github.io/loading-bar-animation",
            "https://spurno.github.io/motion-graphics",
            "https://spurno.github.io/presentation-slides",
            "https://spurno.github.io/presentation-templates",
            "https://spurno.github.io/progress-bar-animation",
            "https://spurno.github.io/typography",
            "https://spurno.github.io/3d-infographic",
            "https://spurno.github.io/advertisement-design",
            "https://spurno.github.io/black-friday-sale",
            "https://spurno.github.io/web-design-with-ui-and-ux",
            "https://spurno.github.io/desktop-mockup",
            "https://spurno.github.io/desktop-wallpaper",
            "https://spurno.github.io/device-mockup",
            "https://spurno.github.io/desktop-wallpaper",
            "https://spurno.github.io/green-screen-mockup",
            "https://spurno.github.io/infographic",
            "https://spurno.github.io/infographics",
            "https://spurno.github.io/infographic-template",
            "https://spurno.github.io/iphone-mockup",
            "https://spurno.github.io/laptop-mockup",
            "https://spurno.github.io/desktop-mockup",
            "https://spurno.github.io/motion-graphics-animated-background",
            "https://spurno.github.io/motion-graphics-background",
            "https://spurno.github.io/pitch-deck",
            "https://spurno.github.io/presentation-slides",
            "https://spurno.github.io/sale-banner",
            "https://spurno.github.io/shop-now-button",
            "https://spurno.github.io/animation-studio-after-effects"
    ]
  };
  
  fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log("Success:", data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
  