/* ============================================================
   Hero Study 2.0 — КАЛЬКУЛЯТОР ТАРИФОВ (lo-fi, живой пересчёт)
   Числа УСЛОВНЫЕ — правятся в CONFIG ниже, UI не трогаем.
   Разметка: <form data-calculator> с инпутами data-calc-* и
   блоком вывода [data-calc-output] / [data-calc-total].
   ============================================================ */
(function(){
  var CONFIG = {
    currency: '₸',
    perStudentBase: 120,          // ₸ / студент / мес — базовый Study Space
    modulePrice: {                // надбавка за модуль, ₸ / студент / мес
      'Документооборот':12, 'Общежитие':8, 'Финансы':14, 'HR':10,
      'KPI преподавателя':9, 'Библиотека':6, 'Прокторинг':15
    },
    extras: {                     // доп. услуги, ₸ / студент / мес
      'Hero OS AI':22, 'BI Analytics':18, 'Mobile App':10, 'White-label':25
    },
    termDiscount: { '1':0, '2':0.10, '3':0.18 },   // скидка за срок
    minStudents: 100
  };

  function fmt(n){ return Math.round(n).toLocaleString('ru-RU') + ' ' + CONFIG.currency; }

  function recalc(form){
    var students = parseInt(form.querySelector('[data-calc-students]').value,10) || 0;
    var out  = form.querySelector('[data-calc-output]');
    var errEl= form.querySelector('[data-calc-error]');
    var stInput = form.querySelector('[data-calc-students]');

    // живой вывод числа студентов рядом со слайдером
    var lbl = form.querySelector('[data-calc-students-label]'); if(lbl) lbl.textContent = students.toLocaleString('ru-RU');

    var invalid = students < CONFIG.minStudents;
    if(errEl) errEl.hidden = !invalid;
    stInput.setAttribute('aria-invalid', invalid?'true':'false');
    if(invalid){ if(out) out.querySelector('[data-calc-total]').textContent='—'; return; }

    var per = CONFIG.perStudentBase;
    form.querySelectorAll('[data-calc-module]:checked').forEach(function(c){ per += CONFIG.modulePrice[c.value]||0; });
    form.querySelectorAll('[data-calc-extra]:checked').forEach(function(c){ per += CONFIG.extras[c.value]||0; });

    var term = (form.querySelector('[data-calc-term]:checked')||{}).value || '1';
    var disc = CONFIG.termDiscount[term] || 0;

    var monthly = per * students * (1 - disc);
    var total   = monthly * 12 * parseInt(term,10);

    if(out){
      out.querySelector('[data-calc-perstudent]').textContent = fmt(per*(1-disc)) + ' / студент / мес';
      out.querySelector('[data-calc-total]').textContent      = fmt(monthly) + ' / мес';
      var ty=out.querySelector('[data-calc-contract]'); if(ty) ty.textContent = 'За весь срок (' + term + ' г.): ' + fmt(total) + (disc?(' · скидка ' + Math.round(disc*100) + '%'):'');
    }
  }

  function init(form){
    recalc(form);
    form.addEventListener('input', function(){ recalc(form); });
    form.addEventListener('change', function(){ recalc(form); });
    form.addEventListener('submit', function(e){ e.preventDefault(); location.href='consultation.html'; });
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-calculator]').forEach(init);
  });
})();
