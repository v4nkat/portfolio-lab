console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/'
    : '/portfolio-lab/';

const pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'cv/', title: 'CV' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://github.com/v4nkat', title: 'GitHub' },
];

const nav = document.createElement('nav');
nav.setAttribute('aria-label', 'Primary navigation');

for (const page of pages) {
  const url = page.url.startsWith('http') ? page.url : BASE_PATH + page.url;
  const link = document.createElement('a');

  link.href = url;
  link.textContent = page.title;
  link.classList.toggle(
    'current',
    link.host === location.host && link.pathname === location.pathname,
  );

  if (link.classList.contains('current')) {
    link.setAttribute('aria-current', 'page');
  }

  if (link.host !== location.host) {
    link.target = '_blank';
    link.rel = 'noreferrer';
  }

  nav.append(link);
}

const siteHeader = document.querySelector('.site-header');
(siteHeader || document.body).append(nav);

document.body.insertAdjacentHTML(
  'afterbegin',
  `<label class="color-scheme">
    Theme:
    <select aria-label="Color scheme">
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>`,
);

const select = document.querySelector('.color-scheme select');

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  select.value = colorScheme;
}

if ('colorScheme' in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

select.addEventListener('input', (event) => {
  const colorScheme = event.target.value;
  setColorScheme(colorScheme);
  localStorage.colorScheme = colorScheme;
});

const contactForm = document.querySelector('form[action^="mailto:"]');

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const recipient = contactForm.action.replace(/^mailto:/, '');
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(data.get('message'));

  location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

// Keep the helper used in the lab available for future page enhancements.
void $$;
