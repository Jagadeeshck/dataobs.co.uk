# DataObs Website

Public website for **DataObs**, a founder-led consultancy focused on data observability, OpenTelemetry architecture, AI-era telemetry, cloud data platforms, Elastic/OpenSearch delivery, SIEM-aligned observability, and data platform engineering.

## Website

```text
https://dataobs.co.uk/
```

## Purpose

This repository contains the public marketing website for DataObs. The site is designed to explain the consultancy offer, show the DataObs architecture approach, and give prospective clients a clear way to start an architecture review.

DataObs helps platform, data, observability, security, and AI engineering teams make data platforms easier to trust and operate by connecting:

- pipeline telemetry
- data freshness and quality signals
- lineage and ownership context
- cloud and infrastructure telemetry
- AI agent and MCP/tool activity
- sensitive data access signals
- business SLA and service impact

The website is intentionally static, lightweight, and easy to host on GitHub Pages.

## Positioning

DataObs is presented as a consultancy and delivery studio, not as a finished SaaS product.

The public site introduces three connected delivery areas:

### DataObs Advisory and Delivery

Consultancy-led assessment, architecture, implementation, dashboards, alerting, runbooks, and operational handover for data observability initiatives.

### DataObs Platform Accelerator

Reusable implementation patterns for full-stack, pipeline, data, and business observability. These patterns help speed up delivery while still allowing each client architecture to be adapted to the tools and controls already in place.

### DPE — Data Platform Engine

A data platform engineering accelerator for infrastructure-as-code based delivery of cloud data platform components, with observability designed in from the start.

## Design direction

The website is intended to feel like a modern observability and platform engineering site: visual, interactive, architecture-led, and enterprise friendly.

Current design themes:

- OpenTelemetry-first storytelling
- interactive architecture sections
- original SVG/CSS diagrams
- dark/light visual style
- telemetry flow graphics
- platform and accelerator positioning
- browser-only calculator and contact flow

All diagrams and visuals in this repository should be original first-party website assets. Third-party screenshots, vendor diagrams, article images, social-media images, or copied product graphics should not be committed unless there is explicit permission and a clear reason to use them.

## Tech stack

- Static HTML
- CSS
- Vanilla JavaScript
- GitHub Pages

There is no backend, package manager, build step, server runtime, or API dependency for the public website.

## Repository structure

```text
.
├── index.html      # Main static website
├── styles.css      # Layout, theme, responsive design, visual diagrams
├── script.js       # Mobile menu, theme toggle, interactive sections, calculator, contact mailto
├── assets/         # First-party static assets
├── CNAME           # GitHub Pages custom domain
├── robots.txt      # Search crawler rules
├── sitemap.xml     # Public sitemap
└── README.md       # Project notes and maintenance guidance
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

The site is served directly by GitHub Pages from the `main` branch and repository root.

The `CNAME` file is required for the custom domain and should contain only:

```text
dataobs.co.uk
```

DNS and registrar configuration should be managed outside this repository. Follow GitHub Pages custom-domain guidance when changing domain settings.

## Public repository standards

This is a public repository, so keep the content suitable for external viewing.

Do not commit:

- secrets, API keys, tokens, passwords, or `.env` files
- DNS records, registrar screenshots, or private hosting notes
- private client names, client architecture, or delivery documents
- personal addresses or non-public contact details
- copied third-party diagrams, screenshots, vendor graphics, or article images
- unverified claims about clients, partnerships, certifications, awards, or analyst recognition

Acceptable public content includes:

- approved marketing copy
- first-party diagrams and SVG/CSS/JS visuals
- public service descriptions
- public contact email
- GitHub Pages files such as `CNAME`, `robots.txt`, and `sitemap.xml`

## Content style

Use a confident but accurate consultancy tone.

Preferred wording:

- vendor-neutral
- OpenTelemetry-first
- architecture-led
- implementation-focused
- operable handover
- data product trust
- business impact
- telemetry correlation
- reusable accelerator patterns

Avoid overclaiming. Do not add fake testimonials, fake customers, fake logos, fake partner badges, or claims that cannot be verified.

## Maintenance checklist

Before publishing changes, confirm:

- all navigation anchors point to existing sections
- the mobile menu opens and closes correctly
- the dark/light theme toggle works
- interactive architecture sections work
- the calculator updates correctly
- the contact form opens a pre-filled email draft
- the site remains fully static and GitHub Pages compatible
- `CNAME`, `robots.txt`, and `sitemap.xml` remain in the repository root
- no secrets, private operational details, or copied third-party images were added

## Next improvements

Recommended next steps:

- Add a first-party Open Graph preview image under `assets/`.
- Add a short privacy page before introducing analytics or third-party embeds.
- Create service-specific landing sections for Data Observability Assessment, OTEL Foundation Build, Elastic/OpenSearch Delivery, AI Agent Telemetry, and DPE Review.
- Add real case studies only after client approval is available.
- Add a simple content review checklist for future website edits.
- Improve accessibility testing with keyboard navigation and contrast checks.
