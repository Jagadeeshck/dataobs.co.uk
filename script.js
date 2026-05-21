(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const year = document.querySelector('[data-year]');
  const form = document.querySelector('[data-contact-form]');
  const impactForm = document.querySelector('[data-impact-form]');
  const impactOutput = document.querySelector('[data-impact-output]');

  const savedTheme = localStorage.getItem('dataobs-theme');
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'light';
  root.setAttribute('data-theme', initialTheme);

  function updateThemeButton() {
    if (!themeToggle) return;
    const isDark = root.getAttribute('data-theme') === 'dark';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) icon.textContent = isDark ? '☀' : '☾';
  }

  updateThemeButton();

  themeToggle?.addEventListener('click', function () {
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('dataobs-theme', nextTheme);
    updateThemeButton();
  });

  function closeMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.hidden = true;
    document.body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  menuToggle?.addEventListener('click', function () {
    if (!mobileMenu) return;
    const isOpen = mobileMenu.hidden === false;
    mobileMenu.hidden = isOpen;
    document.body.classList.toggle('menu-open', !isOpen);
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
    const subject = encodeURIComponent('DataObs architecture call enquiry');
    const body = encodeURIComponent([
      'Hello DataObs,',
      '',
      'I would like to discuss a data observability challenge.',
      '',
      'Name: ' + (data.get('name') || ''),
      'Company or team: ' + (data.get('company') || ''),
      'Email: ' + (data.get('email') || ''),
      'Current observability tools: ' + (data.get('tools') || ''),
      '',
      'What we would like to improve:',
      data.get('summary') || ''
    ].join('\n'));

    window.location.href = 'mailto:hello@dataobs.co.uk?subject=' + subject + '&body=' + body;
  });

  function updateImpactEstimate() {
    if (!impactForm || !impactOutput) return;
    const data = new FormData(impactForm);
    const incidents = Math.max(0, Number(data.get('incidents')) || 0);
    const hours = Math.max(0, Number(data.get('hours')) || 0);
    const people = Math.max(1, Number(data.get('people')) || 1);
    const rate = Math.max(0, Number(data.get('rate')) || 0);
    const monthlyCost = incidents * hours * people * rate;
    impactOutput.textContent = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(monthlyCost);
  }

  impactForm?.addEventListener('input', updateImpactEstimate);
  updateImpactEstimate();
})();
