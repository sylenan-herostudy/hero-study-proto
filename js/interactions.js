/* ============================================================
   Hero Study 2.0 — ИНТЕРАКТИВ (vanilla, делегирование событий)
   Один слушатель на document → работает с контентом,
   вставленным Web Components.
   ============================================================ */
(function(){
  'use strict';
  var $  = function(s,c){return (c||document).querySelector(s);};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};

  /* ---- закрыть все открытые мега-панели / поповеры ---- */
  function closeAllMenus(except){
    $$('.mega.is-open').forEach(function(m){ if(m!==except){ m.classList.remove('is-open'); } });
    $$('[aria-expanded="true"][data-menu-trigger],[aria-expanded="true"][data-lang-trigger]').forEach(function(b){
      var panel = b.getAttribute('data-menu-trigger')
        ? $('[data-menu-panel="'+b.getAttribute('data-menu-trigger')+'"]')
        : $('[data-lang-menu]', b.closest('[data-lang-switch]'));
      if(panel!==except) b.setAttribute('aria-expanded','false');
    });
  }

  document.addEventListener('click', function(e){
    var t = e.target;

    /* ---------- мега-меню хедера ---------- */
    var mt = t.closest('[data-menu-trigger]');
    if(mt){
      e.preventDefault();
      var id = mt.getAttribute('data-menu-trigger');
      var panel = $('[data-menu-panel="'+id+'"]');
      var open = panel.classList.contains('is-open');
      closeAllMenus();
      if(!open){ panel.classList.add('is-open'); mt.setAttribute('aria-expanded','true'); }
      return;
    }

    /* ---------- переключатель языка ---------- */
    var lt = t.closest('[data-lang-trigger]');
    if(lt){
      e.preventDefault();
      var lmenu = $('[data-lang-menu]', lt.closest('[data-lang-switch]'));
      var lopen = lmenu.classList.contains('is-open');
      closeAllMenus();
      if(!lopen){ lmenu.classList.add('is-open'); lt.setAttribute('aria-expanded','true'); }
      return;
    }

    /* клик вне открытого меню — закрыть */
    if(!t.closest('.mega')){ closeAllMenus(); }

    /* ---------- мобильный drawer ---------- */
    if(t.closest('[data-drawer-open]')){ $('[data-drawer]').classList.add('is-open'); document.body.style.overflow='hidden'; return; }
    if(t.closest('[data-drawer-close]')){ $('[data-drawer]').classList.remove('is-open'); document.body.style.overflow=''; return; }

    /* ---------- табы (внутри [data-tabset]) ---------- */
    var tab = t.closest('[data-tab]');
    if(tab){
      var set = tab.closest('[data-tabset]');
      var key = tab.getAttribute('data-tab');
      $$('[data-tab]', set).forEach(function(b){ b.setAttribute('aria-selected', b===tab?'true':'false'); });
      $$('[data-panel]', set).forEach(function(p){ p.hidden = (p.getAttribute('data-panel')!==key); });
      return;
    }

    /* ---------- схема модулей: тултип ---------- */
    var mod = t.closest('[data-module-trigger]');
    if(mod){
      var wrap = mod.closest('.modwrap');
      var tip = $('[data-module-tip]', wrap);
      var wasOpen = tip.classList.contains('is-open');
      $$('[data-module-tip].is-open').forEach(function(x){x.classList.remove('is-open');});
      $$('[data-module-trigger][aria-expanded="true"]').forEach(function(x){x.setAttribute('aria-expanded','false');});
      if(!wasOpen){ tip.classList.add('is-open'); mod.setAttribute('aria-expanded','true'); }
      return;
    }

    /* ---------- модалки (<dialog>) ---------- */
    var mo = t.closest('[data-modal-open]');
    if(mo){
      e.preventDefault();
      var dlg = document.getElementById(mo.getAttribute('data-modal-open'));
      if(dlg && dlg.showModal) dlg.showModal();
      else if(dlg) dlg.setAttribute('open','');
      return;
    }
    if(t.closest('[data-modal-close]')){
      var d = t.closest('dialog'); if(d){ d.close ? d.close() : d.removeAttribute('open'); } return;
    }

    /* ---------- стэппер: вперёд/назад ---------- */
    var sn = t.closest('[data-step-next]'), sp = t.closest('[data-step-prev]');
    if(sn || sp){ e.preventDefault(); moveStep(t.closest('[data-stepper]'), sn?1:-1); return; }

    /* ---------- поиск: чип заполняет инпут ---------- */
    var fill = t.closest('[data-search-fill]');
    if(fill){
      var scope = fill.closest('[data-search-scope]') || document;
      var inp = $('[data-search]', scope);
      if(inp){ inp.value = fill.getAttribute('data-search-fill') || fill.textContent.trim(); runSearch(inp); }
      return;
    }

    /* ---------- ручное переключение состояния формы ---------- */
    var st = t.closest('[data-set-state]');
    if(st){ e.preventDefault(); setFormState(st.closest('[data-mock-submit]') || $('[data-mock-submit]'), st.getAttribute('data-set-state')); return; }

    /* ---------- cookie ---------- */
    if(t.closest('[data-cookie-accept]')){
      try{ localStorage.setItem('hs_cookie','1'); }catch(_){}
      var cb = $('.cookie'); if(cb) cb.classList.remove('is-open'); return;
    }

    /* ---------- чат-бот ---------- */
    if(t.closest('[data-chat-open]')){ var p=$('.chatpanel'); if(p) p.classList.toggle('is-open'); return; }
    var qa = t.closest('[data-chat-q]');
    if(qa){
      var body = $('.chatpanel .body');
      if(body){
        var q=document.createElement('div'); q.className='bubble bubble--me'; q.textContent=qa.textContent.trim(); body.appendChild(q);
        var a=document.createElement('div'); a.className='bubble bubble--bot'; a.textContent=qa.getAttribute('data-chat-q'); body.appendChild(a);
        body.scrollTop=body.scrollHeight;
      }
      return;
    }
  });

  /* Esc закрывает меню/drawer */
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){
      closeAllMenus();
      var dr=$('[data-drawer].is-open'); if(dr){ dr.classList.remove('is-open'); document.body.style.overflow=''; }
      $$('[data-module-tip].is-open').forEach(function(x){x.classList.remove('is-open');});
    }
  });

  /* ---------- live-поиск ---------- */
  document.addEventListener('input', function(e){
    if(e.target.matches('[data-search]')) runSearch(e.target);
    if(e.target.closest('[data-stepper]')) clearFieldError(e.target);
  });
  function runSearch(inp){
    var scope = inp.closest('[data-search-scope]') || document;
    var q = inp.value.trim().toLowerCase();
    var any=false;
    $$('[data-search-item]', scope).forEach(function(it){
      var hay = ((it.getAttribute('data-keywords')||'') + ' ' + it.textContent).toLowerCase();
      var hit = !q || hay.indexOf(q)>-1; it.hidden = !hit; if(hit) any=true;
    });
    var empty = $('[data-search-empty]', scope); if(empty) empty.hidden = any;
  }

  /* ---------- стэппер ---------- */
  function moveStep(stepper, dir){
    if(!stepper) return;
    var steps = $$('[data-step]', stepper);
    var cur = steps.findIndex(function(s){return !s.hidden;});
    if(cur<0) cur=0;
    if(dir>0 && !validateStep(steps[cur])) return;        // не пускаем дальше при ошибке
    var next = cur + dir;
    if(next>=steps.length){                                // финиш
      var href = stepper.getAttribute('data-step-finish-href');
      if(href){ location.href = href; return; }
      var ok=$('[data-step-success]',stepper); if(ok){ steps.forEach(function(s){s.hidden=true;}); ok.hidden=false; }
      return;
    }
    next = Math.max(0, Math.min(steps.length-1, next));
    steps.forEach(function(s,i){ s.hidden = (i!==next); });
    paintProgress(stepper, next, steps.length);
  }
  function paintProgress(stepper, idx, total){
    var dots=$$('[data-step-dot]',stepper);
    dots.forEach(function(d,i){ d.classList.toggle('is-done', i<idx); d.classList.toggle('is-current', i===idx); });
    var cnt=$('[data-step-count]',stepper); if(cnt) cnt.textContent='Шаг '+(idx+1)+' из '+total;
  }
  function validateStep(step){
    var ok=true;
    $$('[required]', step).forEach(function(f){
      var bad = !f.value || (f.type==='checkbox' && !f.checked);
      var field=f.closest('.field')||f.closest('.checkline'); if(field) field.setAttribute('data-invalid', bad?'true':'false');
      f.setAttribute('aria-invalid', bad?'true':'false'); if(bad) ok=false;
    });
    return ok;
  }
  function clearFieldError(f){
    if(f.value){ f.setAttribute('aria-invalid','false'); var fl=f.closest('.field'); if(fl) fl.setAttribute('data-invalid','false'); }
  }

  /* ---------- состояния форм (mock submit) ---------- */
  document.addEventListener('submit', function(e){
    var form=e.target.closest('[data-mock-submit]'); if(!form) return;
    e.preventDefault();
    setFormState(form,'loading');
    setTimeout(function(){
      setFormState(form, form.hasAttribute('data-force-error')?'error':'success');
    }, 800);
  });
  function setFormState(form, state){
    if(!form) return;
    form.setAttribute('data-state', state);
    var btn=$('[type="submit"]',form), sp=btn&&$('.spinner',btn);
    if(btn){ btn.disabled = (state==='loading'); if(sp) sp.style.display = state==='loading'?'inline-block':'none'; }
    $$('[data-on-state]',form).forEach(function(el){
      el.hidden = (el.getAttribute('data-on-state').split(',').indexOf(state)===-1);
    });
  }

  /* ---------- cookie banner (инъекция на всех страницах) ---------- */
  document.addEventListener('DOMContentLoaded', function(){
    var seen=false; try{ seen = !!localStorage.getItem('hs_cookie'); }catch(_){}
    if(seen) return;
    var bar=document.createElement('div');
    bar.className='cookie is-open';
    bar.innerHTML='<p>Мы используем cookie, чтобы портал работал лучше. Подробнее — в <a href="legal-cookie.html" style="color:#fff;text-decoration:underline">политике cookie</a>.</p>'+
      '<button class="btn btn--sm" data-cookie-accept style="background:#fff;border-color:#fff">Принять</button>';
    document.body.appendChild(bar);
  });
})();
