(function () {
  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const year = document.querySelector('[data-year]');
  const form = document.querySelector('[data-contact-form]');
  const impactForm = document.querySelector('[data-impact-form]');
  const impactOutput = document.querySelector('[data-impact-output]');
  const simButtons = document.querySelectorAll('[data-sim]');
  const simState = document.querySelector('[data-sim-state]');
  const simLog = document.querySelector('[data-sim-log]');
  const simRemedy = document.querySelector('[data-sim-remedy]');
  const flowNodes = document.querySelectorAll('[data-node]');

  const savedTheme = localStorage.getItem('dataobs-theme');
  const initialTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : 'dark';
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

  const simulations = {
    normal: {
      label: '● NORMAL',
      node: null,
      severity: '',
      lines: [
        ['[OK]', 'OTel collector receiving pipeline telemetry on 0.0.0.0:4317'],
        ['[OK]', 'Dataset freshness checks passing for priority data products'],
        ['[INFO]', 'Business SLA dashboard updated with latest lineage context']
      ],
      remedy: 'Baseline telemetry confirms data movement, ownership, quality checks and business SLA context are visible.'
    },
    drift: {
      label: '● SCHEMA DRIFT',
      node: 'process',
      severity: 'alert',
      lines: [
        ['[CRITICAL]', "Schema drift detected: customer_profile.loyal_customer_id type changed"],
        ['[INFO]', 'Impacted downstream models: revenue_daily, churn_features, exec_dashboard'],
        ['[ACTION]', 'Quarantine route and owner notification prepared with lineage context']
      ],
      remedy: 'DataObs correlates schema drift with impacted datasets, owners and business dashboards instead of leaving the failure buried in pipeline logs.'
    },
    latency: {
      label: '● SLA DELAY',
      node: 'process',
      severity: 'warn',
      lines: [
        ['[WARN]', "Airflow task run_dbt_assertions exceeded SLA threshold"],
        ['[INFO]', 'Freshness lag now 2h 14m for orders.hourly'],
        ['[ACTION]', 'PagerDuty/Slack payload includes dataset owner and runbook link']
      ],
      remedy: 'The platform converts task delay into data product freshness risk and sends triage-ready context to the correct owner.'
    },
    token: {
      label: '● AI TOKEN SPIKE',
      node: 'observe',
      severity: 'warn',
      lines: [
        ['[WARN]', 'LLM endpoint token consumption +340% over baseline'],
        ['[INFO]', 'Agent workflow traced to feature_enrichment_tool call path'],
        ['[ACTION]', 'Cost and usage anomaly linked to business workflow and model input source']
      ],
      remedy: 'AI-era observability connects token, model, tool and data-product context so cost spikes and unsafe automation paths can be investigated.'
    },
    sensitive: {
      label: '● SENSITIVE ACCESS',
      node: 'source',
      severity: 'alert',
      lines: [
        ['[CRITICAL]', 'Sensitive dataset access outside expected service account pattern'],
        ['[INFO]', 'IAM identity, query source and dataset classification attached'],
        ['[ACTION]', 'SIEM-aligned evidence event routed into Elastic/OpenSearch detection view']
      ],
      remedy: 'Security telemetry is treated as part of data observability, giving compliance teams evidence around who accessed sensitive data and why.'
    }
  };

  function setSimulation(type) {
    const sim = simulations[type] || simulations.normal;
    simButtons.forEach(function (button) {
      button.classList.toggle('active', button.getAttribute('data-sim') === type);
    });
    flowNodes.forEach(function (node) {
      node.classList.remove('alert', 'warn');
      if (sim.node && node.getAttribute('data-node') === sim.node && sim.severity) node.classList.add(sim.severity);
    });
    if (simState) simState.textContent = sim.label;
    if (simLog) {
      simLog.innerHTML = sim.lines.map(function (line) {
        return '<p><span>' + line[0] + '</span> ' + line[1] + '</p>';
      }).join('');
    }
    if (simRemedy) simRemedy.innerHTML = '<strong>Observation remedy:</strong> ' + sim.remedy;
  }

  simButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      setSimulation(button.getAttribute('data-sim'));
    });
  });

  form?.addEventListener('submit', function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('DataObs architecture review enquiry');
    const body = encodeURIComponent([
      'Hello DataObs,',
      '',
      'I would like to discuss a data observability architecture review.',
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
    const annualCost = incidents * 12 * hours * people * rate;
    impactOutput.textContent = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0
    }).format(annualCost);
    impactForm.querySelectorAll('[data-range-value]').forEach(function (output) {
      const name = output.getAttribute('data-range-value');
      output.textContent = data.get(name) || '';
    });
  }

  impactForm?.addEventListener('input', updateImpactEstimate);
  updateImpactEstimate();
})();
