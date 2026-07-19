const SUPPORTED_LANGS = ['en', 'es', 'ca'];
const PAGE = document.body.getAttribute('data-page');
let currentLang = 'en';

function getByPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function detectInitialLang() {
  const url = new URLSearchParams(window.location.search);
  const urlLang = url.get('lang');
  if (urlLang && SUPPORTED_LANGS.includes(urlLang)) return urlLang;

  const stored = localStorage.getItem('lang');
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;

  const browserLang = (navigator.language || 'en').slice(0, 2).toLowerCase();
  if (SUPPORTED_LANGS.includes(browserLang)) return browserLang;

  return 'en';
}

function applyLanguage(lang) {
  currentLang = SUPPORTED_LANGS.includes(lang) ? lang : 'en';
  const dict = TECH_TRANSLATIONS[currentLang];

  document.documentElement.lang = currentLang;
  document.title = dict[PAGE].title;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    const value = getByPath(dict, el.getAttribute('data-i18n'));
    if (value === undefined) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    const isActive = btn.getAttribute('data-lang') === currentLang;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', String(isActive));
  });
}

function setLanguage(lang) {
  applyLanguage(lang);
  localStorage.setItem('lang', currentLang);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', currentLang);
  window.history.replaceState({}, '', url);
}

document.querySelectorAll('.lang-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    setLanguage(btn.getAttribute('data-lang'));
  });
});

setLanguage(detectInitialLang());

function themeCookieDomain() {
  return location.hostname.endsWith('albertortells.cat') ? '; domain=.albertortells.cat' : '';
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value) {
  document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + (365 * 24 * 60 * 60) + themeCookieDomain() + '; samesite=lax';
}

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function setTheme(theme) {
  applyTheme(theme);
  setCookie('theme', theme);
}

applyTheme(getCookie('theme') || (systemDarkQuery.matches ? 'dark' : 'light'));

if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

systemDarkQuery.addEventListener('change', function (e) {
  if (!getCookie('theme')) applyTheme(e.matches ? 'dark' : 'light');
});

const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}
