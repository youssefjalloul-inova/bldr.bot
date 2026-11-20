/* Cookie consent for bldr.bot (same standard as inovasolutions.ai and youssefjalloul.com)
 * Opt-in by default for everyone, everywhere (GDPR / UK GDPR / ePrivacy standard, which also satisfies
 * CCPA/CPRA, Australia's Privacy Act, UAE and Saudi PDPL, LGPD, PIPEDA and Quebec Law 25).
 * Nothing that tracks loads until the visitor says yes. "Reject all" is as easy as "Accept all".
 * Global Privacy Control (GPC) is honoured as an opt-out of advertising.
 *
 * To switch a tracker on, paste its ID below. Empty = never loaded.
 */
(function () {
  var IDS = {
    ga4: '',          // Google Analytics 4, e.g. 'G-XXXXXXXXXX'
    googleAds: '',    // Google Ads / Google tag, e.g. 'AW-XXXXXXXXX'
    metaPixel: '',    // Meta (Facebook) Pixel ID, e.g. '123456789012345'
    clarity: ''       // Microsoft Clarity project ID, e.g. 'abcd1234ef'
  };
  var KEY = 'bldr-consent', VERSION = 3, d = document, w = window;
  var gpc = navigator.globalPrivacyControl === true;
  var AR = d.documentElement.lang === 'ar';
  function T(en, ar) { return AR ? ar : en; }

  function read() { try { var v = JSON.parse(localStorage.getItem(KEY)); return v && v.v === VERSION ? v : null; } catch (e) { return null; } }
  function save(c) { c.v = VERSION; c.ts = new Date().toISOString(); try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }

  w.dataLayer = w.dataLayer || [];
  function gtag() { w.dataLayer.push(arguments); }
  w.gtag = w.gtag || gtag;

  function inject(src, attrs) { var s = d.createElement('script'); s.async = true; s.src = src; if (attrs) for (var k in attrs) s.setAttribute(k, attrs[k]); d.head.appendChild(s); }
  var loaded = {};

  function apply(c) {
    w.gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied'
    });
    var gid = (c.analytics && IDS.ga4) || (c.marketing && IDS.googleAds);
    if (gid && !loaded.gtag) {
      loaded.gtag = 1; inject('https://www.googletagmanager.com/gtag/js?id=' + gid);
      w.gtag('js', new Date());
    }
    if (c.analytics && IDS.ga4 && !loaded.ga4) { loaded.ga4 = 1; w.gtag('config', IDS.ga4, { anonymize_ip: true }); }
    if (c.marketing && IDS.googleAds && !loaded.ads) { loaded.ads = 1; w.gtag('config', IDS.googleAds); }
    if (c.analytics && IDS.clarity && !loaded.clarity) {
      loaded.clarity = 1;
      w.clarity = w.clarity || function () { (w.clarity.q = w.clarity.q || []).push(arguments); };
      inject('https://www.clarity.ms/tag/' + IDS.clarity);
      w.clarity('consent');
    }
    if (c.marketing && IDS.metaPixel && !loaded.meta) {
      loaded.meta = 1;
      var f = w.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
      if (!w._fbq) w._fbq = f; f.push = f; f.loaded = true; f.version = '2.0'; f.queue = [];
      inject('https://connect.facebook.net/en_US/fbevents.js');
      w.fbq('consent', 'grant'); w.fbq('init', IDS.metaPixel); w.fbq('track', 'PageView');
    } else if (!c.marketing && w.fbq) { w.fbq('consent', 'revoke'); }
  }

  var el;
  function render(open) {
    if (el) el.remove();
    var cur = read() || { analytics: false, marketing: false };
    el = d.createElement('div');
    el.className = 'ck' + (open ? ' ck-open' : '');
    el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'false'); el.setAttribute('aria-labelledby', 'ck-h');
    el.innerHTML =
      '<div class="ck-in">' +
      '<p class="ck-h" id="ck-h">' + T('Cookies on bldr.bot', 'ملفات تعريف الارتباط على موقعنا') + '</p>' +
      (AR ? '<p class="ck-p">نستخدم تخزيناً ضرورياً لعمل الموقع فقط. وبموافقتك، نستخدم أدوات التحليلات والإعلانات لفهم ما يفيد الزوار. لا تُحمَّل أي أداة تتبّع قبل اختيارك. <a href="https://inovasolutions.ai/privacy.html">سياسة الخصوصية</a>.</p>' : '<p class="ck-p">Strictly necessary storage keeps the site working. With your consent, we also use analytics (Google Analytics, Microsoft Clarity) to understand what helps visitors, and advertising tags (Meta Pixel, Google Ads) to measure campaigns. Nothing that tracks loads until you choose. <a href="https://inovasolutions.ai/privacy.html">Privacy &amp; cookie policy</a>.</p>') +
      (gpc ? '<p class="ck-gpc">Your browser sends a Global Privacy Control signal, so advertising stays off.</p>' : '') +
      '<div class="ck-opts">' +
      '<label class="ck-o"><input type="checkbox" checked disabled><span><b>Strictly necessary</b> Remembers your choices and keeps the site secure. Always on.</span></label>' +
      '<label class="ck-o"><input type="checkbox" id="ck-a"' + (cur.analytics ? ' checked' : '') + '><span><b>Analytics</b> Google Analytics 4 and Microsoft Clarity: anonymous usage, heatmaps and session insights.</span></label>' +
      '<label class="ck-o"><input type="checkbox" id="ck-m"' + (cur.marketing && !gpc ? ' checked' : '') + (gpc ? ' disabled' : '') + '><span><b>Advertising</b> Meta Pixel and Google Ads: measure and personalise ads, including on other sites.</span></label>' +
      '</div>' +
      '<div class="ck-b">' +
      '<button type="button" class="ck-btn" data-ck="reject">' + T('Reject all', 'رفض الكل') + '</button>' +
      '<button type="button" class="ck-btn ck-cust" data-ck="custom">' + T('Customise', 'تخصيص') + '</button>' +
      '<button type="button" class="ck-btn" data-ck="save">' + T('Save choices', 'حفظ الاختيارات') + '</button>' +
      '<button type="button" class="ck-btn ck-yes" data-ck="accept">' + T('Accept all', 'قبول الكل') + '</button>' +
      '</div></div>';
    d.body.appendChild(el);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]'); if (!b) return;
      var a = b.getAttribute('data-ck'), c;
      if (a === 'custom') { el.classList.add('ck-open'); return; }
      if (a === 'accept') c = { analytics: true, marketing: !gpc };
      if (a === 'reject') c = { analytics: false, marketing: false };
      if (a === 'save') c = { analytics: d.getElementById('ck-a').checked, marketing: !gpc && d.getElementById('ck-m').checked };
      var had = read(); save(c); apply(c); el.remove(); el = null;
      if (had && ((had.analytics && !c.analytics) || (had.marketing && !c.marketing))) location.reload();
    });
  }

  function fab() {
    if (d.querySelector('.ck-fab')) return;
    var b = d.createElement('button');
    b.type = 'button'; b.className = 'ck-fab'; b.setAttribute('data-cookie-settings', '');
    b.setAttribute('aria-label', T('Cookie settings', 'إعدادات ملفات تعريف الارتباط')); b.title = T('Cookie settings', 'إعدادات ملفات تعريف الارتباط');
    b.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.5A9 9 0 1 1 11.5 3a3 3 0 0 0 3.5 3.5 3 3 0 0 0 3.5 3.5 3 3 0 0 0 2.5 2.5z"/><circle cx="8.5" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="15" r="1" fill="currentColor"/><circle cx="16" cy="14.5" r=".9" fill="currentColor"/><circle cx="8" cy="15.5" r=".8" fill="currentColor"/></svg>';
    d.body.appendChild(b);
  }
  function start() {
    fab();
    var c = read();
    if (c) apply(c); else render(false);
    d.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); render(true); }
    });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', start); else start();
})();
