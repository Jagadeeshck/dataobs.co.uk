# DataObs website

Public static website for **DataObs**, hosted with GitHub Pages at:

```text
https://dataobs.co.uk/
```

DataObs is a founder-led consultancy focused on data observability, OpenTelemetry architecture, AWS data platform observability, Elastic/OpenSearch implementation, AI-era telemetry, SIEM-aligned observability, and data platform engineering.

## Tech stack

- Static HTML
- CSS
- JavaScript
- GitHub Pages

There is no backend, build system, package install step, or server runtime required for the public website.

## Repository structure

```text
.
├── index.html
├── styles.css
├── script.js
├── assets/
├── CNAME
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local preview

From the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Deployment

The site is designed to be served directly by GitHub Pages from the `main` branch and repository root.

The `CNAME` file is required for the custom domain and should contain only:

```text
dataobs.co.uk
```

For DNS setup, use GitHub's official custom-domain documentation. Do not store registrar account details, screenshots, DNS tables, tokens, or private operational notes in this public repository.

## Public repository safety

Do not commit:

- API keys
- Analytics tokens
- Registrar account details
- DNS screenshots
- Passwords
- `.env` files
- Client names or private client information
- Internal architecture diagrams that are not intended for public use
- Private repository access details

Safe public content includes:

- Marketing copy
- Static assets
- Public contact email
- `CNAME`
- `robots.txt`
- `sitemap.xml`

## Content notes

The site positions three connected offerings:

1. **DataObs Advisory and Delivery** — consultancy-led assessment, architecture, implementation, and handover.
2. **DataObs Platform** — reusable observability accelerator patterns for infrastructure, pipeline, data, and business observability.
3. **DPE — Data Platform Engine** — reusable data platform engineering accelerator for IaC-based cloud data platform delivery.

Avoid fake client claims, fake testimonials, unverified certifications, and partnership claims unless they are confirmed and approved for public use.

## Maintenance checklist

Before publishing changes:

- Check that all internal anchor links work.
- Confirm the contact form opens a mail client.
- Confirm the mobile menu works.
- Confirm the light/dark theme toggle works.
- Confirm `CNAME`, `robots.txt`, and `sitemap.xml` remain in the repository root.
- Confirm no secrets or unnecessary operational details have been added.
- Confirm the site still works as a fully static GitHub Pages site.

## TODO

- Add a public Open Graph image.
- Add a privacy page before introducing analytics or third-party embeds.
- Add real case studies only after permission is available.
- Consider service-specific landing pages when SEO strategy is ready.
