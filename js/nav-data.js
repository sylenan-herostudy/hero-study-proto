/* ============================================================
   Hero Study 2.0 — ЕДИНЫЙ ИСТОЧНИК НАВИГАЦИИ
   Из него рендерятся топ-бар, хедер с мега-меню и футер
   (см. components.js). Правим меню — только здесь.
   ============================================================ */
window.HS_NAV = {
  brand: { label: 'Hero', acc: 'study', href: 'index.html' },

  /* Чипы продуктов в топ-баре + мега-меню «Продукты» */
  products: [
    { id:'ss', code:'SS', label:'Hero Study Space',  href:'product-study-space.html',  note:'LMS/ERP вуза · accent: green' },
    { id:'bi', code:'BI', label:'Hero BI Analytics', href:'product-bi-analytics.html', note:'Аналитика · accent: orange' },
    { id:'ai', code:'AI', label:'Hero OS AI', href:'product-ai-assistant.html', note:'ИИ-помощник · accent: cyan' },
    { id:'ws', code:'WS', label:'Hero Workspace',    href:'product-workspace.html',    note:'Задачи и проекты · accent: coral' }
  ],

  /* Основная навигация хедера. children → мега-меню */
  nav: [
    { id:'about',   label:'О нас', href:'about.html' },
    { id:'products',label:'Продукты', children:'PRODUCTS' },
    { id:'services',label:'Услуги', children:[
        { label:'Сопровождение Study Space', sub:'Внедрение, поддержка, обучение', href:'ss-implementation.html' },
        { label:'Консультация и оценка',     sub:'Аудит процессов вуза',           href:'consultation.html' },
        { label:'Отдел продаж',              sub:'Связаться с менеджером',          href:'consultation.html' }
    ]},
    { id:'pricing', label:'Цены', href:'pricing.html' },
    { id:'support', label:'Поддержка и связь', children:[
        { label:'Консультация',     sub:'Запись на демо',            href:'consultation.html' },
        { label:'Справочный центр', sub:'База знаний и статьи',      href:'help-center.html' },
        { label:'Тех. поддержка',   sub:'Тикеты и чат-бот',          href:'support.html' }
    ]},
    { id:'more',    label:'Ещё', children:[
        { label:'Партнёрская программа', sub:'Стать партнёром',  href:'partners.html' },
        { label:'Новости',               sub:'Анонсы и события',  href:'resources-news.html' },
        { label:'Блог',                  sub:'Статьи и практики', href:'resources-blog.html' },
        { label:'Истории клиентов',      sub:'Кейсы вузов',       href:'cases.html' }
    ]}
  ],

  /* Колонки футера */
  footer: [
    { title:'Hero Study', links:[
        ['О нас','about.html'],['Партнёрская программа','partners.html'],
        ['Новости','resources-news.html'],['Блог','resources-blog.html'],['Контакты','consultation.html'] ]},
    { title:'Продукты', links:[
        ['Hero Study Space','product-study-space.html'],['Hero BI Analytics','product-bi-analytics.html'],
        ['Hero OS AI','product-ai-assistant.html'],['Hero Workspace','product-workspace.html'] ]},
    { title:'Для университетов и колледжей', links:[
        ['Решение Study Space','product-study-space.html'],['Сопровождение','ss-implementation.html'],
        ['Консультация и оценка','consultation.html'],['Тех. поддержка','support.html'],['Тарифы','pricing.html'] ]},
    { title:'Ресурсы', links:[
        ['Справочный центр','help-center.html'],['Политика конфиденциальности','legal-privacy.html'],
        ['Использование cookie','legal-cookie.html'],['Условия использования','legal-terms.html'] ]}
  ],

  social: ['Instagram','LinkedIn','YouTube','Facebook'],
  contacts: { kz:'+7 (700) 000-00-00', uz:'+998 (00) 000-00-00', mail:'sales@hero.study',
              offices:'Алматы · Ташкент · Сингапур' }
};
