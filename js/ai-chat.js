/* ============================================================
   Hero Study — AI-слой · сквозной чат-виджет (lo-fi mockup)
   Без бэкенда: ответы имитируются. Демонстрирует этапы из ТЗ:
   рельсы → чат во всех ЛК → голос (этап 2) → действия (этап 3).
   Роль берётся из <body data-ai-role="student|teacher|manager">.
   ============================================================ */
(function () {
  'use strict';

  var ROLES = {
    student: {
      sub: 'ЛК студента · сквозной чат',
      kb: 'база знаний студента',
      note: '',
      suggests: [
        { t: 'Когда ближайший дедлайн?', a: 'Ближайший дедлайн — курсовая по «Базам данных», сдача до 14 июня. Дальше: эссе по истории до 19 июня.' },
        { t: 'Покажи моё расписание на завтра', a: 'Завтра 4 пары: Базы данных (09:00, ауд. 312), Алгоритмы (10:45), Английский (13:00), Физкультура (14:45).' },
        { t: 'Сколько у меня баллов за РК1?', a: 'РК1: суммарно 27/30. Слабее всего — «Сети» (6/10). Рекомендую разобрать темы 3–4 до РК2.' }
      ]
    },
    teacher: {
      sub: 'ЛК преподавателя (ППС) · сквозной чат',
      kb: 'справочник и регламенты ППС',
      note: 'Кабинет ППС — в планах; подключение по готовности кабинета.',
      suggests: [
        { t: 'Найди методичку по дисциплине «Базы данных»', a: 'Нашёл 3 документа: РПД «Базы данных» (2026), методичка к лабораторным №1–6, фонд оценочных средств. Открыть?' },
        { t: 'Сводка посещаемости группы ИС-21 за неделю', a: 'ИС-21 за неделю: средняя посещаемость 86%. Ниже порога — Иванов (54%), Петрова (61%).' },
        { t: 'Выставь оценки за РК1 группе ИС-21', act: true,
          preview: 'Действие: выставить оценки за РК1 для 24 студентов группы ИС-21 (по результатам тестирования). 3 студента без результата — пропустить.' }
      ]
    },
    manager: {
      sub: 'ЛК менеджера вуза · сквозной чат',
      kb: 'регламенты и журнал',
      note: '',
      suggests: [
        { t: 'Выставь посещаемость группе ИС-21 на сегодня', act: true,
          preview: 'Действие: отметить «присутствовал» для 24 студентов группы ИС-21 на сегодня. Затем сможете вручную поправить отсутствующих.' },
        { t: 'Обработай нагрузку кафедры ИС', act: true,
          preview: 'Действие: распределить часы нагрузки по 12 преподавателям кафедры ИС по шаблону прошлого семестра. Конфликтов: 0.' },
        { t: 'Поставь статус «на проверке» новым заявкам', a: 'Найдено 7 новых заявок без статуса. Готов проставить «на проверке» всем — подтвердите действие.' }
      ]
    }
  };

  var MODELS = ['Qwen (self-hosted)', 'OpenAI GPT', 'Anthropic Claude'];

  function el(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  var role = (document.body.dataset.aiRole || 'student');
  var cfg = ROLES[role] || ROLES.student;
  var log, panel, fab;

  function scrollEnd() { if (log) log.scrollTop = log.scrollHeight; }

  function renderEmpty() {
    log.innerHTML = '';
    var wrap = el('<div class="ai-empty"></div>');
    wrap.appendChild(el('<p class="ai-empty__hi">Спросите что-нибудь или выберите подсказку. Ответы — на основе: <b>' + esc(cfg.kb) + '</b>.</p>'));
    var sg = el('<div class="ai-suggests"></div>');
    cfg.suggests.forEach(function (s, i) {
      var b = el('<button class="ai-sg" type="button"></button>');
      b.innerHTML = (s.act ? '<span class="ai-sg__act">ДЕЙСТВИЕ</span>' : '') + esc(s.t);
      b.addEventListener('click', function () { ask(s.t, s); });
      sg.appendChild(b);
    });
    wrap.appendChild(sg);
    log.appendChild(wrap);
  }

  function pushUser(text) {
    var e = log.querySelector('.ai-empty'); if (e) e.remove();
    log.appendChild(el('<div class="ai-msg ai-msg--user">' + esc(text) + '</div>'));
    scrollEnd();
  }
  function pushBot(html, withSrc) {
    var m = el('<div class="ai-msg ai-msg--bot">' + html + '</div>');
    if (withSrc !== false) {
      m.appendChild(el('<div class="ai-msg__src">источник: <span class="tag">' + esc(cfg.kb) + '</span> · <span class="tag">mockup</span></div>'));
    }
    log.appendChild(m); scrollEnd();
  }
  function typing() {
    var t = el('<div class="ai-typing"><i></i><i></i><i></i></div>');
    log.appendChild(t); scrollEnd(); return t;
  }

  function ask(text, s) {
    pushUser(text);
    var t = typing();
    setTimeout(function () {
      t.remove();
      if (s && s.act) { renderAction(s.preview || text); }
      else { pushBot(esc((s && s.a) || ('Готовлю ответ на основе «' + cfg.kb + '». (демо-ответ макета)'))); }
    }, 750);
  }

  function renderAction(preview) {
    var card = el(
      '<div class="ai-action">' +
        '<div class="ai-action__h">⚙︎ AI предлагает действие <span class="tag">этап 3</span></div>' +
        '<div class="ai-action__b">' + esc(preview) + '</div>' +
        '<div class="ai-action__row">' +
          '<button class="btn btn--accent btn--sm" data-yes>Подтвердить</button>' +
          '<button class="btn btn--sm" data-no>Отменить</button>' +
        '</div>' +
      '</div>'
    );
    card.querySelector('[data-yes]').addEventListener('click', function () {
      card.remove(); pushBot('✓ Готово. Действие выполнено. Остальное можно поправить вручную.', false);
    });
    card.querySelector('[data-no]').addEventListener('click', function () {
      card.remove(); pushBot('Действие отменено. Ничего не изменено.', false);
    });
    log.appendChild(card); scrollEnd();
  }

  function renderError() {
    var e = log.querySelector('.ai-empty'); if (e) e.remove();
    var err = el(
      '<div class="ai-error">⚠︎ Модель временно недоступна. Запрос не выполнен.' +
        '<div><button class="btn btn--sm" data-retry>Повторить</button></div>' +
      '</div>'
    );
    err.querySelector('[data-retry]').addEventListener('click', function () {
      err.remove(); pushBot('Соединение восстановлено. Чем помочь?', false);
    });
    log.appendChild(err); scrollEnd();
  }

  function buildPanel() {
    panel = el('<section class="ai-panel" role="dialog" aria-label="AI-ассистент Hero Study"></section>');

    var head = el('<div class="ai-head"></div>');
    head.appendChild(el(
      '<div class="between">' +
        '<div><div class="ai-head__title">AI-ассистент <span class="tag">Hero AI</span></div>' +
        '<div class="ai-head__sub">' + esc(cfg.sub) + '</div></div>' +
        '<button class="ai-x" type="button" aria-label="Закрыть">✕</button>' +
      '</div>'
    ));
    if (cfg.note) head.appendChild(el('<div class="note note--margin">' + esc(cfg.note) + '</div>'));

    var modelRow = el('<div class="ai-model"><label>Модель</label></div>');
    var sel = el('<select class="select"></select>');
    MODELS.forEach(function (m) { sel.appendChild(el('<option>' + esc(m) + '</option>')); });
    sel.addEventListener('change', function () {
      pushBot('Провайдер переключён на <b>' + esc(sel.value) + '</b> (смена модели — конфигом).', false);
    });
    modelRow.appendChild(sel);
    head.appendChild(modelRow);

    // demo-состояния — для ревью макета
    var demo = el('<div class="ai-model" style="margin-top:8px"><label>Демо</label></div>');
    [['пусто', renderEmpty], ['ответ', function () { ask(cfg.suggests[0].t, cfg.suggests[0]); }],
     ['действие', function () { var a = cfg.suggests.find(function (x) { return x.act; }); renderAction(a ? a.preview : 'Действие: пример операции в интерфейсе.'); }],
     ['ошибка', renderError]].forEach(function (pair) {
      var b = el('<button class="btn btn--ghost btn--sm" type="button">' + pair[0] + '</button>');
      b.addEventListener('click', pair[1]); demo.appendChild(b);
    });
    head.appendChild(demo);
    panel.appendChild(head);

    log = el('<div class="ai-log"></div>');
    panel.appendChild(log);

    var comp = el('<div class="ai-composer"></div>');
    var row = el('<div class="ai-composer__row"></div>');
    var mic = el('<button class="ai-mic" type="button" aria-label="Голосовой ввод">🎙<span class="ai-tip">Голосовой ввод — этап 2</span></button>');
    mic.addEventListener('click', function () { pushBot('Голосовой ввод появится на <b>этапе 2</b> (транскрибация).', false); });
    var ta = el('<textarea class="textarea" rows="1" placeholder="Напишите запрос…"></textarea>');
    var send = el('<button class="btn btn--accent ai-send" type="button">Отпр.</button>');
    function submit() {
      var v = ta.value.trim(); if (!v) return; ta.value = '';
      ask(v, { a: 'Готовлю ответ на основе «' + cfg.kb + '». (демо-ответ макета)' });
    }
    send.addEventListener('click', submit);
    ta.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); submit(); }
    });
    row.appendChild(mic); row.appendChild(ta); row.appendChild(send);
    comp.appendChild(row);
    comp.appendChild(el('<div class="ai-composer__hint"><span>Enter — отправить</span><span>Сквозной вызов на всех страницах</span></div>'));
    panel.appendChild(comp);

    head.querySelector('.ai-x').addEventListener('click', close);
    document.body.appendChild(panel);
    renderEmpty();
  }

  function open() { panel.classList.add('is-open'); fab.hidden = true; }
  function close() { panel.classList.remove('is-open'); fab.hidden = false; }

  function init() {
    fab = el('<button class="ai-fab" type="button"><span class="ai-fab__dot"></span> AI-ассистент</button>');
    fab.addEventListener('click', open);
    document.body.appendChild(fab);
    buildPanel();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
