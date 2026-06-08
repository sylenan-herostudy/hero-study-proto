/* ============================================================
   Hero Study 2.0 — ОБЩАЯ ОБВЯЗКА (Web Components)
   <hs-topbar> <hs-header active="…"> <hs-footer> <hs-stickycta label="…">
   Шаблон зашит строкой → работает на file:// без fetch/CORS.
   Поведение (открытие меню, бургер и т.п.) — в interactions.js (делегирование).
   ============================================================ */
(function(){
  var N = window.HS_NAV;
  var here = (location.pathname.split('/').pop() || 'index.html');

  /* — inline SVG иконки (внешний спрайт не рендерится на file://) — */
  var I = {
    burger:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    globe:'<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>'
  };

  function chips(active){
    return N.products.map(function(p){
      return '<a class="pchip'+(active===p.id?' is-active':'')+'" href="'+p.href+'" title="'+p.label+'">'+p.code+'</a>';
    }).join('');
  }

  /* ---------- TOPBAR ---------- */
  customElements.define('hs-topbar', class extends HTMLElement{
    connectedCallback(){
      var active = this.getAttribute('product') || '';
      this.innerHTML =
        '<div class="topbar"><div class="container">'+
          '<div class="chips" aria-label="Продукты экосистемы">'+chips(active)+'</div>'+
          '<span class="spacer"></span>'+
          '<div class="lang" data-lang-switch>'+
            '<button class="nav-link" style="color:inherit;padding:4px 8px" data-lang-trigger aria-haspopup="true" aria-expanded="false">'+
              I.globe+' <span data-lang-label>RU</span> <span class="caret">▾</span></button>'+
            '<div class="mega" data-lang-menu role="menu">'+
              ['RU','EN','KZ','UZ'].map(function(l){return '<a href="#" role="menuitem" data-lang="'+l+'">'+l+' — '+({RU:'Русский',EN:'English',KZ:'Қазақша',UZ:'Oʻzbekcha'}[l])+'</a>';}).join('')+
            '</div>'+
          '</div>'+
          '<a href="partners.html">Партнёрство</a>'+
        '</div></div>';
    }
  });

  /* ---------- HEADER + mega-menu ---------- */
  customElements.define('hs-header', class extends HTMLElement{
    connectedCallback(){
      var active = this.getAttribute('active') || '';
      var navHTML = N.nav.map(function(item){
        var isActive = (item.id===active) || (item.href && item.href===here);
        if(!item.children){
          return '<li><a class="nav-link'+(isActive?' is-active':'')+'" href="'+item.href+'"'+(isActive?' aria-current="page"':'')+'>'+item.label+'</a></li>';
        }
        var kids = item.children==='PRODUCTS'
          ? N.products.map(function(p){return '<a href="'+p.href+'"><b>'+p.label+'</b><span>'+p.note+'</span></a>';}).join('')
          : item.children.map(function(c){return '<a href="'+c.href+'"><b>'+c.label+'</b><span>'+c.sub+'</span></a>';}).join('');
        return '<li>'+
          '<button class="nav-link'+(isActive?' is-active':'')+'" data-menu-trigger="'+item.id+'" aria-haspopup="true" aria-expanded="false">'+item.label+' <span class="caret">▾</span></button>'+
          '<div class="mega" data-menu-panel="'+item.id+'">'+kids+'</div>'+
        '</li>';
      }).join('');

      /* мобильный drawer: те же пункты как details-аккордеоны */
      var drawerHTML = N.nav.map(function(item){
        if(!item.children) return '<a class="nav-link" href="'+item.href+'">'+item.label+'</a>';
        var kids = item.children==='PRODUCTS'
          ? N.products.map(function(p){return '<a href="'+p.href+'">'+p.label+'</a>';}).join('')
          : item.children.map(function(c){return '<a href="'+c.href+'">'+c.label+'</a>';}).join('');
        return '<details><summary>'+item.label+'</summary><div class="mega-mobile">'+kids+'</div></details>';
      }).join('');

      this.innerHTML =
        '<header class="header"><div class="container">'+
          '<a class="brand" href="'+N.brand.href+'">'+N.brand.label+'<b>.'+N.brand.acc+'</b></a>'+
          '<nav class="nav" aria-label="Основная навигация"><ul style="display:flex;gap:2px;align-items:center;list-style:none;margin:0;padding:0">'+navHTML+'</ul></nav>'+
          '<div class="header__actions">'+
            '<a class="btn btn--sm" href="account-login.html">Вход</a>'+
            '<a class="btn btn--primary btn--sm" href="consultation.html">Заполнить анкету</a>'+
          '</div>'+
          '<button class="burger" data-drawer-open aria-label="Открыть меню">'+I.burger+'</button>'+
        '</div></header>'+
        '<div class="drawer" data-drawer role="dialog" aria-label="Меню">'+
          '<div class="between"><a class="brand" href="'+N.brand.href+'">'+N.brand.label+'<b>.'+N.brand.acc+'</b></a>'+
            '<button class="burger" data-drawer-close aria-label="Закрыть меню">'+I.close+'</button></div>'+
          drawerHTML+
          '<div class="stack mt-5"><a class="btn btn--primary btn--block" href="consultation.html">Заполнить анкету</a>'+
          '<a class="btn btn--block" href="account-login.html">Вход / Регистрация</a></div>'+
        '</div>';
    }
  });

  /* ---------- FOOTER ---------- */
  customElements.define('hs-footer', class extends HTMLElement{
    connectedCallback(){
      var cols = N.footer.map(function(col){
        return '<div><h4>'+col.title+'</h4>'+col.links.map(function(l){return '<a href="'+l[1]+'">'+l[0]+'</a>';}).join('')+'</div>';
      }).join('');
      var c = N.contacts;
      this.innerHTML =
        '<footer class="footer"><div class="container">'+
          '<div class="cols">'+
            '<div><div class="foot-brand">'+N.brand.label+'.'+N.brand.acc+'</div>'+
              '<p style="max-width:34ch">Экосистема цифровых продуктов для университетов и колледжей.</p>'+
              '<p class="mt-4">'+N.social.map(function(s){return '<a style="display:inline-block;margin-right:14px" href="#">'+s+'</a>';}).join('')+'</p>'+
            '</div>'+ cols +
          '</div>'+
          '<div class="foot-bottom">'+
            '<span>Отдел продаж: '+c.kz+' (KZ) · '+c.uz+' (UZ) · '+c.mail+'</span>'+
            '<span>Офисы: '+c.offices+'</span>'+
            '<span>© 2026 Hero Study · <a href="legal-privacy.html" style="display:inline">Политика</a> · <a href="legal-terms.html" style="display:inline">Условия</a> · <a href="sitemap.html" style="display:inline">🗺 Карта прототипа</a></span>'+
          '</div>'+
        '</div></footer>';
    }
  });

  /* ---------- STICKY MOBILE CTA ---------- */
  customElements.define('hs-stickycta', class extends HTMLElement{
    connectedCallback(){
      var label = this.getAttribute('label') || 'Запросить демо';
      var href = this.getAttribute('href') || 'consultation.html';
      this.innerHTML = '<div class="stickycta"><a class="btn btn--primary btn--block btn--lg" href="'+href+'">'+label+'</a></div>';
    }
  });
})();
