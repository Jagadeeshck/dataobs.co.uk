(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const year = document.querySelector('[data-year]');
  const form = document.querySelector('[data-contact-form]');

  const savedTheme = localStorage.getItem('dataobs-theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initialTheme);

  function updateThemeButton() {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isLight ? '◑' : '◐';
  }

  updateThemeButton();

  themeToggle?.addEventListener('click', function () {
    const nextTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('dataobs-theme', nextTheme);
    updateThemeButton();
  });

  function closeMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  menuToggle?.addEventListener('click', function () {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.hidden === false;
    mobileMenu.hidden = isOpen;
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
  });

  mobileMenu?.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  if (year) year.textContent = String(new Date().getFullYear());

  form?.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('DataObs enquiry');
    const body = encodeURIComponent([
      'Hello DataObs,',
      '',
      'Name: ' + (data.get('name') || ''),
      'Company: ' + (data.get('company') || ''),
      'Email: ' + (data.get('email') || ''),
      'Current observability tools: ' + (data.get('tools') || ''),
      '',
      'Problem summary:',
      data.get('summary') || ''
    ].join('\n'));
    window.location.href = 'mailto:hello@dataobs.co.uk?subject=' + subject + '&body=' + body;
  });
})();
