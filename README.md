# DataObs static website

DataObs is a professional static consultancy website for `https://dataobs.co.uk`. The site presents DataObs as a founder-led specialist consultancy for data observability across modern AI-era data platforms, AWS data platforms, OpenTelemetry, Elastic, OpenSearch, Grafana, SIEM, compliance monitoring, AI agent activity monitoring, and business-critical data products.

The implementation is intentionally simple and GitHub Pages-friendly: no backend, no server runtime, no package install step, and no static-site generator build requirement.

## Project purpose

This repository contains the public marketing website for DataObs. It is designed to:

- Explain DataObs services and delivery patterns.
- Describe an OTEL-first reference architecture for data observability.
- Position DataObs for AI-era data platform, agent, MCP/tool, and SIEM-aligned observability work.
- Provide static contact options using `mailto:hello@dataobs.co.uk`.
- Deploy directly from the repository root to GitHub Pages.

## Content structure

```text
.
├── index.html    # Static page markup, SEO metadata, JSON-LD schema, and all website sections
├── styles.css    # Responsive layout, dark/light themes, cards, architecture visuals, and form styling
├── script.js     # Theme toggle, mobile menu, copyright year, and mailto form behaviour
├── assets/       # Static image assets, including the DataObs SVG mark
├── CNAME         # GitHub Pages custom domain: dataobs.co.uk
├── robots.txt    # Search crawler rules and sitemap location
├── sitemap.xml   # Important canonical URLs and section anchors
└── README.md     # Deployment, DNS, preview, and maintenance notes
```

Main page sections:

1. Hero
2. Services
3. Solutions
4. Reference architecture
5. AI-era observability
6. Elastic and SIEM-aligned observability
7. Example engagement patterns
8. About
9. Contact

## GitHub Pages deployment

Use GitHub Pages publishing from the repository root:

1. Push changes to the `main` branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Set **Branch** to `main` and folder to `/ (root)`.
5. Save the settings.
6. Confirm the custom domain is `dataobs.co.uk`.
7. Keep **Enforce HTTPS** enabled once GitHub finishes issuing the certificate.

Because this is a plain static site, GitHub Pages can serve it directly without GitHub Actions.

## GoDaddy DNS records

In GoDaddy DNS management for `dataobs.co.uk`, configure GitHub Pages records. These are public GitHub Pages routing records, not private DataObs server IP addresses. They are included here only as deployment notes so the domain can be configured without hunting through external documentation.

If you prefer not to keep DNS values in the repository, remove the tables below and link to GitHub's official custom-domain documentation instead. The website itself only requires the root `CNAME` file and static assets to run on GitHub Pages; the DNS records must still be configured in GoDaddy.

Recommended apex-domain records:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Default / 1 hour |
| A | `@` | `185.199.109.153` | Default / 1 hour |
| A | `@` | `185.199.110.153` | Default / 1 hour |
| A | `@` | `185.199.111.153` | Default / 1 hour |
| CNAME | `www` | `jagadeeshck.github.io` | Default / 1 hour |

Optional IPv6 records if you want AAAA support:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` | Default / 1 hour |
| AAAA | `@` | `2606:50c0:8001::153` | Default / 1 hour |
| AAAA | `@` | `2606:50c0:8002::153` | Default / 1 hour |
| AAAA | `@` | `2606:50c0:8003::153` | Default / 1 hour |

Notes:

- The repository includes a `CNAME` file containing `dataobs.co.uk`.
- DNS propagation can take time after changes in GoDaddy.
- Avoid setting `www.dataobs.co.uk` in the `CNAME` file when the canonical site is the apex domain `dataobs.co.uk`.

## Local preview

No dependencies are required. Preview with any static file server from the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

A direct file open also works for basic inspection, but a local server is closer to GitHub Pages behaviour.

## Quality checklist

Before publishing significant changes, confirm:

- Internal anchor links in `index.html` point to existing section IDs.
- The contact form and contact buttons open `mailto:hello@dataobs.co.uk`.
- The theme toggle changes between dark and light themes.
- The mobile menu opens, closes, and navigates to sections.
- `CNAME`, `robots.txt`, and `sitemap.xml` exist in the repository root.
- Copy does not claim fake clients, certifications, partnerships, awards, or revenue.
- The site remains fully static and compatible with GitHub Pages.

## Future TODOs

- Add a lightweight SVG Open Graph image under `assets/` and reference it from the metadata.
- Add privacy and cookie pages if analytics or third-party embeds are introduced.
- Add case studies only after real client permission is available.
- Add service-specific landing pages if SEO strategy requires deeper pages.
- Consider a form provider only if a backend-free, privacy-appropriate option is selected and documented.
