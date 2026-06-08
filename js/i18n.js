/* ============================================================
   Hero Study 2.0 — переключатель языка (ВИЗУАЛЬНЫЙ, для lo-fi)
   Реального перевода нет. Меняем метку + html[lang] + (для демо)
   несколько показательных строк, чтобы проверить, что длинные
   слова RU/KZ/UZ/EN не ломают вёрстку.
   ============================================================ */
(function(){
  function apply(lang){
    document.documentElement.setAttribute('lang', lang.toLowerCase());
    document.querySelectorAll('[data-lang-label]').forEach(function(el){ el.textContent = lang; });
    document.querySelectorAll('[data-lang-menu] [data-lang]').forEach(function(a){
      a.classList.toggle('is-active', a.getAttribute('data-lang')===lang);
    });
    /* демо-строки: <h1 data-i18n data-i18n-en="…" data-i18n-kz="…" …> */
    document.querySelectorAll('[data-i18n]').forEach(function(el){
      if(!el.dataset.i18nRu) el.dataset.i18nRu = el.textContent;      // запомнить оригинал как RU
      var key = 'i18n' + lang.charAt(0) + lang.slice(1).toLowerCase(); // i18nEn / i18nKz / i18nUz / i18nRu
      el.textContent = el.dataset[key] || el.dataset.i18nRu;
    });
    try{ localStorage.setItem('hs_lang', lang); }catch(_){}
  }

  document.addEventListener('click', function(e){
    var a = e.target.closest('[data-lang-menu] [data-lang]');
    if(!a) return;
    e.preventDefault();
    apply(a.getAttribute('data-lang'));
    var menu = a.closest('[data-lang-menu]'); if(menu) menu.classList.remove('is-open');
    var trig = a.closest('[data-lang-switch]'); trig = trig && trig.querySelector('[data-lang-trigger]');
    if(trig) trig.setAttribute('aria-expanded','false');
  });

  document.addEventListener('DOMContentLoaded', function(){
    var saved='RU'; try{ saved = localStorage.getItem('hs_lang') || 'RU'; }catch(_){}
    if(saved!=='RU') apply(saved);
  });
})();
