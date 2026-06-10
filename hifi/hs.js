/* HeRo Study 2.0 — Premium Dark: общая обвязка hi-fi страниц.
   Использование: <link rel="stylesheet" href="hs.css"> + <script src="hs.js" defer>
   <hs-topbar product="ss|bi|ai|ws"?>, <hs-header active="home|about|products|services|pricing|support|more"?>, <hs-footer>
   Автоматически добавляет: heroMark defs, мобильный drawer, видео-модалку, sticky-CTA, cookie-баннер. */
(function () {
  'use strict';

  var HEROMARK_DEFS = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><g id="heroMark">' +
    '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M2.61744 23.681C-0.872479 27.1709 -0.872479 32.8291 2.61744 36.319L15.3967 49.0983C16.0222 49.7238 17.0918 49.2808 17.0918 48.3962V23.9572C17.0918 23.6938 17.1964 23.4413 17.3826 23.2551L24.3332 16.3045C24.9587 15.6789 26.0283 16.122 26.0283 17.0066V26.1134C26.0283 26.998 27.0978 27.4411 27.7233 26.8155L34.6739 19.8649C34.8601 19.6787 34.9647 19.4262 34.9647 19.1628V1.50395C31.4917 -0.82139 26.7486 -0.450227 23.681 2.61744L2.61744 23.681ZM45.5963 11.8947C44.9708 11.2692 43.9012 11.7122 43.9012 12.5968V34.5534C43.9012 34.8168 43.7966 35.0694 43.6104 35.2556L36.6598 42.2062C36.0343 42.8317 34.9647 42.3887 34.9647 41.5041V32.3972C34.9647 31.5126 33.8952 31.0696 33.2697 31.6951L26.3191 38.6457C26.1329 38.8319 26.0283 39.0845 26.0283 39.3478V58.4558C26.0283 58.833 26.2404 59.1822 26.5891 59.326C29.8263 60.6608 33.6886 60.013 36.319 57.3826L57.3826 36.319C60.8725 32.8291 60.8725 27.1709 57.3826 23.681L45.5963 11.8947Z"/>' +
    '<path fill="#fff" d="M96.492 8.09998V34H91.682V22.9H78.288V34H73.478V8.09998H78.288V18.793H91.682V8.09998H96.492Z"/>' +
    '<path fill="#fff" d="M121.562 24.232C121.562 24.5526 121.537 25.009 121.488 25.601H105.985C106.256 27.0563 106.959 28.2156 108.094 29.079C109.253 29.9176 110.684 30.337 112.386 30.337C114.557 30.337 116.345 29.6216 117.751 28.191L120.23 31.04C119.342 32.1006 118.22 32.9023 116.863 33.445C115.506 33.9876 113.977 34.259 112.275 34.259C110.104 34.259 108.193 33.8273 106.54 32.964C104.887 32.1006 103.605 30.9043 102.692 29.375C101.804 27.821 101.36 26.0696 101.36 24.121C101.36 22.197 101.792 20.4703 102.655 18.941C103.543 17.387 104.764 16.1783 106.318 15.315C107.872 14.4516 109.623 14.02 111.572 14.02C113.496 14.02 115.21 14.4516 116.715 15.315C118.244 16.1536 119.428 17.35 120.267 18.904C121.13 20.4333 121.562 22.2093 121.562 24.232ZM111.572 17.72C110.092 17.72 108.834 18.164 107.798 19.052C106.787 19.9153 106.17 21.0746 105.948 22.53H117.159C116.962 21.0993 116.357 19.94 115.346 19.052C114.335 18.164 113.077 17.72 111.572 17.72Z"/>' +
    '<path fill="#fff" d="M143.395 34L138.104 26.415C137.882 26.4396 137.549 26.452 137.105 26.452H131.259V34H126.449V8.09998H137.105C139.349 8.09998 141.298 8.46998 142.951 9.20998C144.628 9.94998 145.911 11.0106 146.799 12.392C147.687 13.7733 148.131 15.4136 148.131 17.313C148.131 19.2616 147.65 20.939 146.688 22.345C145.75 23.751 144.394 24.7993 142.618 25.49L148.575 34H143.395ZM143.284 17.313C143.284 15.6603 142.741 14.39 141.656 13.502C140.57 12.614 138.979 12.17 136.883 12.17H131.259V22.493H136.883C138.979 22.493 140.57 22.049 141.656 21.161C142.741 20.2483 143.284 18.9656 143.284 17.313Z"/>' +
    '<path fill="#fff" d="M161.948 34.259C159.95 34.259 158.15 33.8273 156.546 32.964C154.943 32.1006 153.685 30.9043 152.772 29.375C151.884 27.821 151.44 26.0696 151.44 24.121C151.44 22.1723 151.884 20.4333 152.772 18.904C153.685 17.3746 154.943 16.1783 156.546 15.315C158.15 14.4516 159.95 14.02 161.948 14.02C163.971 14.02 165.784 14.4516 167.387 15.315C168.991 16.1783 170.236 17.3746 171.124 18.904C172.037 20.4333 172.493 22.1723 172.493 24.121C172.493 26.0696 172.037 27.821 171.124 29.375C170.236 30.9043 168.991 32.1006 167.387 32.964C165.784 33.8273 163.971 34.259 161.948 34.259ZM161.948 30.3C163.65 30.3 165.056 29.7326 166.166 28.598C167.276 27.4633 167.831 25.971 167.831 24.121C167.831 22.271 167.276 20.7786 166.166 19.644C165.056 18.5093 163.65 17.942 161.948 17.942C160.246 17.942 158.84 18.5093 157.73 19.644C156.645 20.7786 156.102 22.271 156.102 24.121C156.102 25.971 156.645 27.4633 157.73 28.598C158.84 29.7326 160.246 30.3 161.948 30.3Z"/>' +
    '</g></defs></svg>';

  var BRAND = '<a class="brand" href="home.html"><svg class="brandlogo" viewBox="0 0 173 60" role="img" aria-label="HeRo Study" style="color:#2D68C4"><use href="#heroMark"/><text x="74" y="50" class="bsub">STUDY</text></svg></a>';

  var CARET = ' <span class="caret" aria-hidden="true">▾</span>';

  /* ---------- <hs-topbar product="ss|bi|ai|ws"> ---------- */
  customElements.define('hs-topbar', class extends HTMLElement {
    connectedCallback() {
      var act = this.getAttribute('product') || '';
      var chip = function (code, href, title) {
        return '<a class="pchip' + (act === code ? ' is-active' : '') + '" href="' + href + '" title="' + title + '">' + code.toUpperCase() + '</a>';
      };
      this.innerHTML = '<div class="topbar"><div class="wrap">' +
        '<div class="chips" aria-label="Продукты экосистемы">' +
        chip('ss', 'product-study-space.html', 'HeRo Study Space') +
        chip('bi', 'product-bi-analytics.html', 'HeRo BI Analytics') +
        chip('ai', 'product-ai-assistant.html', 'HeRo OS AI') +
        chip('ws', 'product-workspace.html', 'HeRo Work Space') +
        '</div><span class="sp"></span>' +
        '<div class="lang" data-lang-switch>' +
        '<button class="tnav-link" data-lang-trigger aria-haspopup="true" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18"/></svg>' +
        '<span data-lang-label>RU</span>' + CARET + '</button>' +
        '<div class="mega mega--lang" data-lang-menu role="menu">' +
        '<a role="menuitem" href="#" data-lang="ru"><b>RU</b><span>Русский</span></a>' +
        '<a role="menuitem" href="#" data-lang="en"><b>EN</b><span>English</span></a>' +
        '<a role="menuitem" href="#" data-lang="kz"><b>KZ</b><span>Қазақша</span></a>' +
        '<a role="menuitem" href="#" data-lang="uz"><b>UZ</b><span>Oʻzbekcha</span></a>' +
        '</div></div>' +
        '<a class="tnav-plain" href="partners.html">Партнёрство</a>' +
        '</div></div>';
    }
  });

  /* ---------- <hs-header active="..."> ---------- */
  customElements.define('hs-header', class extends HTMLElement {
    connectedCallback() {
      var act = this.getAttribute('active') || '';
      var on = function (id) { return act === id ? ' is-active" aria-current="page' : ''; };
      var onBtn = function (id) { return act === id ? ' is-active' : ''; };
      this.innerHTML = HEROMARK_DEFS +
        '<header class="site"><div class="wrap">' + BRAND +
        '<nav class="nav" aria-label="Основная навигация"><ul class="navlist">' +
        '<li><a class="nav-link' + on('about') + '" href="about.html">О нас</a></li>' +
        '<li class="has-mega"><button class="nav-link' + onBtn('products') + '" data-menu-trigger="products" aria-haspopup="true" aria-expanded="false">Продукты' + CARET + '</button>' +
        '<div class="mega mega--products" data-menu-panel="products" role="menu">' +
        '<a role="menuitem" href="product-study-space.html"><img src="../assets/marks/ss.svg" alt=""><span><b>HeRo Study Space</b><span>LMS/ERP вуза</span></span></a>' +
        '<a role="menuitem" href="product-bi-analytics.html"><img src="../assets/marks/bi.svg" alt=""><span><b>HeRo BI Analytics</b><span>Аналитика и отчётность</span></span></a>' +
        '<a role="menuitem" href="product-ai-assistant.html"><img src="../assets/marks/ai.svg" alt=""><span><b>HeRo OS AI</b><span>ИИ-помощник</span></span></a>' +
        '<a role="menuitem" href="product-workspace.html"><img src="../assets/marks/ws.svg" alt=""><span><b>HeRo Work Space</b><span>Задачи и проекты</span></span></a>' +
        '</div></li>' +
        '<li class="has-mega"><button class="nav-link' + onBtn('services') + '" data-menu-trigger="services" aria-haspopup="true" aria-expanded="false">Услуги' + CARET + '</button>' +
        '<div class="mega" data-menu-panel="services" role="menu">' +
        '<a role="menuitem" href="ss-implementation.html"><b>Сопровождение Study Space</b><span>Внедрение, поддержка, обучение</span></a>' +
        '<a role="menuitem" href="consultation.html"><b>Консультация и оценка</b><span>Аудит процессов вуза</span></a>' +
        '<a role="menuitem" href="consultation.html"><b>Отдел продаж</b><span>Связаться с менеджером</span></a>' +
        '</div></li>' +
        '<li><a class="nav-link' + on('pricing') + '" href="pricing.html">Цены</a></li>' +
        '<li class="has-mega"><button class="nav-link' + onBtn('support') + '" data-menu-trigger="support" aria-haspopup="true" aria-expanded="false">Поддержка и связь' + CARET + '</button>' +
        '<div class="mega" data-menu-panel="support" role="menu">' +
        '<a role="menuitem" href="consultation.html"><b>Консультация</b><span>Запись на демо</span></a>' +
        '<a role="menuitem" href="help-center.html"><b>Справочный центр</b><span>База знаний и статьи</span></a>' +
        '<a role="menuitem" href="support.html"><b>Тех. поддержка</b><span>Тикеты и чат-бот</span></a>' +
        '</div></li>' +
        '<li class="has-mega"><button class="nav-link' + onBtn('more') + '" data-menu-trigger="more" aria-haspopup="true" aria-expanded="false">Ещё' + CARET + '</button>' +
        '<div class="mega" data-menu-panel="more" role="menu">' +
        '<a role="menuitem" href="partners.html"><b>Партнёрская программа</b><span>Стать партнёром</span></a>' +
        '<a role="menuitem" href="resources-news.html"><b>Новости</b><span>Анонсы и события</span></a>' +
        '<a role="menuitem" href="resources-blog.html"><b>Блог</b><span>Статьи и практики</span></a>' +
        '<a role="menuitem" href="cases.html"><b>Истории клиентов</b><span>Кейсы вузов</span></a>' +
        '</div></li>' +
        '</ul></nav>' +
        '<div class="header__actions">' +
        '<a class="btn btn-glass btn-sm" href="account-login.html">Войти</a>' +
        '<a class="btn btn-primary btn-sm" href="consultation.html">Запросить демо</a>' +
        '</div>' +
        '<button class="burger" data-drawer-open aria-label="Открыть меню" aria-controls="hs-drawer" aria-expanded="false">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg></button>' +
        '</div></header>' +
        /* мобильный drawer */
        '<div class="drawer" id="hs-drawer" data-drawer role="dialog" aria-modal="true" aria-label="Меню" hidden>' +
        '<div class="drawer-head">' + BRAND +
        '<button class="burger" data-drawer-close aria-label="Закрыть меню"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
        '<nav class="drawer-nav" aria-label="Мобильная навигация">' +
        '<a class="d-link" href="about.html">О нас</a>' +
        '<details><summary>Продукты</summary><div class="d-sub">' +
        '<a href="product-study-space.html">HeRo Study Space</a>' +
        '<a href="product-bi-analytics.html">HeRo BI Analytics</a>' +
        '<a href="product-ai-assistant.html">HeRo OS AI</a>' +
        '<a href="product-workspace.html">HeRo Work Space</a>' +
        '</div></details>' +
        '<details><summary>Услуги</summary><div class="d-sub">' +
        '<a href="ss-implementation.html">Сопровождение Study Space</a>' +
        '<a href="consultation.html">Консультация и оценка</a>' +
        '<a href="consultation.html">Отдел продаж</a>' +
        '</div></details>' +
        '<a class="d-link" href="pricing.html">Цены</a>' +
        '<details><summary>Поддержка и связь</summary><div class="d-sub">' +
        '<a href="consultation.html">Консультация</a>' +
        '<a href="help-center.html">Справочный центр</a>' +
        '<a href="support.html">Тех. поддержка</a>' +
        '</div></details>' +
        '<details><summary>Ещё</summary><div class="d-sub">' +
        '<a href="partners.html">Партнёрская программа</a>' +
        '<a href="resources-news.html">Новости</a>' +
        '<a href="resources-blog.html">Блог</a>' +
        '<a href="cases.html">Истории клиентов</a>' +
        '</div></details>' +
        '</nav>' +
        '<div class="drawer-foot">' +
        '<a class="btn btn-primary btn-block" href="consultation.html">Заполнить анкету</a>' +
        '<a class="btn btn-glass btn-block" href="account-login.html">Вход / Регистрация</a>' +
        '</div></div>';
    }
  });

  /* ---------- <hs-footer> ---------- */
  customElements.define('hs-footer', class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = '<footer><div class="wrap"><div class="fcols">' +
        '<div>' + BRAND +
        '<p class="about">Экосистема цифровых продуктов для университетов и колледжей.</p>' +
        '<div class="fsocials">' +
        '<a href="#" aria-label="Instagram"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.4"/><circle cx="17.6" cy="6.4" r="1.15" fill="currentColor" stroke="none"/></svg></a>' +
        '<a href="#" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.4 8.1h4.2V23H.4V8.1zm7.1 0h4.02v2.03h.06c.56-1.06 1.93-2.18 3.97-2.18 4.25 0 5.03 2.8 5.03 6.44V23h-4.2v-7.2c0-1.72-.03-3.93-2.4-3.93-2.4 0-2.77 1.87-2.77 3.8V23H7.5V8.1z"/></svg></a>' +
        '<a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.5a3 3 0 0 0-2.1-2.13C19.5 3.85 12 3.85 12 3.85s-7.5 0-9.4.52A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.13c1.9.52 9.4.52 9.4.52s7.5 0 9.4-.52a3 3 0 0 0 2.1-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg></a>' +
        '<a href="#" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.92 3.78-3.92 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.43-4.92 8.43-9.94z"/></svg></a>' +
        '</div></div>' +
        '<div><h5>Продукты</h5><a class="fl" href="product-study-space.html">HeRo Study Space</a><a class="fl" href="product-bi-analytics.html">HeRo BI Analytics</a><a class="fl" href="product-ai-assistant.html">HeRo OS AI</a><a class="fl" href="product-workspace.html">HeRo Work Space</a></div>' +
        '<div><h5>Для вузов и колледжей</h5><a class="fl" href="ss-implementation.html">Сопровождение</a><a class="fl" href="consultation.html">Консультация и оценка</a><a class="fl" href="support.html">Тех. поддержка</a><a class="fl" href="pricing.html">Тарифы</a></div>' +
        '<div><h5>Компания</h5><a class="fl" href="about.html">О нас</a><a class="fl" href="cases.html">Кейсы</a><a class="fl" href="partners.html">Партнёрам</a><a class="fl" href="resources-news.html">Новости</a><a class="fl" href="resources-blog.html">Блог</a></div>' +
        '<div><h5>Ресурсы</h5><a class="fl" href="help-center.html">Справочный центр</a><a class="fl" href="legal-privacy.html">Политика конфиденциальности</a><a class="fl" href="legal-cookie.html">Использование cookie</a><a class="fl" href="legal-terms.html">Условия использования</a></div>' +
        '</div>' +
        '<div class="fbottom">' +
        '<span>© 2026 HeRo Study</span>' +
        '<span>+7 (700) 000-00-00 (KZ) · +998 (00) 000-00-00 (UZ) · sales@hero.study</span>' +
        '<span>Алматы · Ташкент · Сингапур</span>' +
        '<span><a href="legal-privacy.html">Политика</a> · <a href="legal-terms.html">Условия</a> · <a href="../sitemap.html" style="display:inline-flex;align-items:center;gap:5px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6"/><line x1="8" y1="3" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="21"/></svg>Карта прототипа</a></span>' +
        '</div></div></footer>';
    }
  });

  /* ---------- авто-инъекция: фон, модалка, sticky-CTA, cookie ---------- */
  function injectShared() {
    if (!document.querySelector('.bgmesh')) {
      var bg = document.createElement('div'); bg.className = 'bgmesh';
      document.body.insertBefore(bg, document.body.firstChild);
    }
    if (!document.getElementById('videoModal')) {
      var d = document.createElement('div');
      d.innerHTML = '<dialog class="vmodal" id="videoModal"><div class="vbox">' +
        '<div class="vhead"><h3>Презентация экосистемы HeRo Study</h3><button class="vclose" data-modal-close aria-label="Закрыть"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
        '<div class="vframe"><div class="vplay"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="8 5.5 19 12 8 18.5 8 5.5"/></svg></div></div>' +
        '<p class="vnote">Видео-презентация платформы (версии KZ / EN / UZ). В прототипе — плейсхолдер ролика.</p>' +
        '</div></dialog>';
      document.body.appendChild(d.firstChild);
    }
    if (!document.querySelector('.stickycta')) {
      var s = document.createElement('div'); s.className = 'stickycta';
      s.innerHTML = '<a class="btn btn-primary" href="consultation.html">Запросить демо</a>';
      document.body.appendChild(s);
    }
    if (!document.getElementById('cookieBar')) {
      var c = document.createElement('div'); c.className = 'cookie'; c.id = 'cookieBar'; c.hidden = true;
      c.innerHTML = '<p>Мы используем файлы cookie для работы сайта и аналитики. Подробнее — в <a href="legal-cookie.html">политике cookie</a>.</p>' +
        '<button class="btn btn-primary btn-sm" data-cookie-accept>Принять</button>';
      document.body.appendChild(c);
    }
  }

  /* ---------- интерактив ---------- */
  function init() {
    injectShared();
    var DESKTOP = window.matchMedia('(min-width:981px)');
    var triggers = [].slice.call(document.querySelectorAll('[data-menu-trigger],[data-lang-trigger]'));
    var hoverTimer = null;
    function panelFor(btn) {
      if (btn.hasAttribute('data-lang-trigger')) return document.querySelector('[data-lang-menu]');
      return document.querySelector('[data-menu-panel="' + btn.getAttribute('data-menu-trigger') + '"]');
    }
    function closeAll(except) {
      triggers.forEach(function (b) {
        var p = panelFor(b);
        if (p && p !== except) { p.classList.remove('is-open'); b.setAttribute('aria-expanded', 'false'); }
      });
    }
    function open(btn) { var p = panelFor(btn); if (!p) return; closeAll(p); p.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true'); }
    function toggle(btn) { var p = panelFor(btn); if (!p) return; p.classList.contains('is-open') ? closeAll() : open(btn); }
    triggers.forEach(function (btn) {
      btn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); toggle(btn); });
      var li = btn.closest('.has-mega') || btn.closest('.lang');
      if (li) {
        li.addEventListener('mouseenter', function () { if (DESKTOP.matches) { clearTimeout(hoverTimer); open(btn); } });
        li.addEventListener('mouseleave', function () { if (DESKTOP.matches) { clearTimeout(hoverTimer); hoverTimer = setTimeout(closeAll, 250); } });
      }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.mega') && !e.target.closest('[data-menu-trigger]') && !e.target.closest('[data-lang-trigger]')) closeAll();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAll(); closeDrawer(); } });

    /* drawer */
    var drawer = document.querySelector('[data-drawer]');
    var openBtn = document.querySelector('[data-drawer-open]');
    var closeBtn = document.querySelector('[data-drawer-close]');
    function openDrawer() {
      if (!drawer) return; drawer.hidden = false; requestAnimationFrame(function () { drawer.classList.add('is-open'); });
      document.body.style.overflow = 'hidden'; if (openBtn) openBtn.setAttribute('aria-expanded', 'true'); if (closeBtn) closeBtn.focus();
    }
    function closeDrawer() {
      if (!drawer || !drawer.classList.contains('is-open')) return;
      drawer.classList.remove('is-open'); document.body.style.overflow = '';
      if (openBtn) { openBtn.setAttribute('aria-expanded', 'false'); openBtn.focus(); }
      setTimeout(function () { drawer.hidden = true; }, 220);
    }
    if (openBtn) openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (drawer) drawer.querySelectorAll('a[href]').forEach(function (a) { a.addEventListener('click', closeDrawer); });
    DESKTOP.addEventListener('change', function (m) { if (m.matches) closeDrawer(); });

    /* видео-модалка */
    var vmodal = document.getElementById('videoModal');
    document.querySelectorAll('[data-modal-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); closeAll(); var m = document.getElementById(b.getAttribute('data-modal-open')); if (m) { m.showModal ? m.showModal() : m.setAttribute('open', ''); } });
    });
    if (vmodal) {
      vmodal.querySelectorAll('[data-modal-close]').forEach(function (c) { c.addEventListener('click', function () { vmodal.close(); }); });
      vmodal.addEventListener('click', function (e) { if (e.target === vmodal) vmodal.close(); });
    }

    /* cookie */
    try {
      if (!localStorage.getItem('hs_cookie')) {
        var cb = document.getElementById('cookieBar');
        if (cb) { cb.hidden = false; var ok = cb.querySelector('[data-cookie-accept]'); if (ok) ok.addEventListener('click', function () { try { localStorage.setItem('hs_cookie', '1'); } catch (e) {} cb.hidden = true; }); }
      }
    } catch (e) {}

    /* мультиязычность (страница помечает элементы data-i18n / data-i18n-html) */
    var I18N = {
      ru: { eyebrow: '● Экосистема для университетов и колледжей', h1: 'Цифровой партнёр <span class="grad">вашего университета</span>', sub: 'Единая облачная платформа для приёма, учёбы, аналитики и команды — управляйте вузом эффективно в одном месте.', btnDemo: 'Запросить демо →', btnVideo: 'Смотреть видео', trust: '<b>100 000+</b> пользователей · <b>16</b> вузов · <b>3</b> страны' },
      en: { eyebrow: '● Ecosystem for universities and colleges', h1: 'The digital partner for <span class="grad">your university</span>', sub: 'One cloud platform for admissions, learning, analytics and teamwork — run your institution efficiently in one place.', btnDemo: 'Request a demo →', btnVideo: 'Watch video', trust: '<b>100,000+</b> users · <b>16</b> universities · <b>3</b> countries' },
      kz: { eyebrow: '● Университеттер мен колледждерге арналған экожүйе', h1: '<span class="grad">Университетіңіздің</span> цифрлық серіктесі', sub: 'Қабылдау, оқу, аналитика және команда үшін бірыңғай бұлттық платформа — оқу орнын бір жерден тиімді басқарыңыз.', btnDemo: 'Демо сұрау →', btnVideo: 'Бейнені көру', trust: '<b>100 000+</b> қолданушы · <b>16</b> ЖОО · <b>3</b> ел' },
      uz: { eyebrow: '● Universitet va kollejlar uchun ekotizim', h1: '<span class="grad">Universitetingizning</span> raqamli hamkori', sub: 'Qabul, oʻqish, tahlil va jamoa uchun yagona bulutli platforma — oliygohni bir joydan samarali boshqaring.', btnDemo: 'Demo soʻrash →', btnVideo: 'Videoni koʻrish', trust: '<b>100 000+</b> foydalanuvchi · <b>16</b> oliygoh · <b>3</b> davlat' }
    };
    function setLang(l) {
      var d = I18N[l]; if (!d) return;
      document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (d[k] != null) el.textContent = d[k]; });
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) { var k = el.getAttribute('data-i18n-html'); if (d[k] != null) el.innerHTML = d[k]; });
      document.documentElement.lang = l;
      var lbl = document.querySelector('[data-lang-label]'); if (lbl) lbl.textContent = l.toUpperCase();
      try { localStorage.setItem('hs_lang', l); } catch (e) {}
    }
    document.querySelectorAll('[data-lang]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); setLang(a.getAttribute('data-lang')); closeAll(); }); });
    try { var sl = localStorage.getItem('hs_lang'); if (sl && I18N[sl] && sl !== 'ru') setLang(sl); } catch (e) {}
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
