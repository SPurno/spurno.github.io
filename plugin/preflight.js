/* Preflight Auditor — documentation pages
   Progressive enhancement only: the pages work without this file. */

(function () {
  "use strict";

  document.documentElement.classList.add("js-ready");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Sticky header state, driven by an intersection sentinel (no scroll handler). */
  var bar = document.querySelector(".topbar");
  if (bar && "IntersectionObserver" in window) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;height:1px;width:1px;";
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(function (entries) {
      bar.classList.toggle("is-stuck", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* Table of contents: mirror the section currently in view. */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".toc a[href^='#']"));
  if (tocLinks.length && "IntersectionObserver" in window) {
    var sections = tocLinks
      .map(function (link) {
        return document.getElementById(link.getAttribute("href").slice(1));
      })
      .filter(Boolean);

    var setActive = function (id) {
      tocLinks.forEach(function (link) {
        link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
      });
    };

    var visible = {};
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting;
        });
        for (var i = 0; i < sections.length; i++) {
          if (visible[sections[i].id]) {
            setActive(sections[i].id);
            return;
          }
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
    setActive(sections[0].id);
  }

  /* Close the mobile contents disclosure after choosing a section. */
  document.querySelectorAll(".toc-mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      var disclosure = link.closest("details");
      if (disclosure) disclosure.open = false;
    });
  });

  /* Reveal blocks once, on first view. */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-in");
      });
    } else {
      var revealer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            obs.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
      );
      reveals.forEach(function (el) {
        revealer.observe(el);
      });
    }
  }

  /* Print every answer, not just the ones left open on screen. */
  var faqs = Array.prototype.slice.call(document.querySelectorAll(".faq details"));
  if (faqs.length) {
    var reopened = [];
    window.addEventListener("beforeprint", function () {
      reopened = faqs.filter(function (item) {
        if (!item.open) {
          item.open = true;
          return true;
        }
        return false;
      });
    });
    window.addEventListener("afterprint", function () {
      reopened.forEach(function (item) {
        item.open = false;
      });
      reopened = [];
    });
  }
})();
