# DataObs Website

Public website for **DataObs** — an Elasticsearch-native data observability platform with focused delivery services.

## Website

```text
https://dataobs.co.uk/
```

## Purpose

This repository contains the public marketing website for DataObs.

The site now leads with the **product** (Elasticsearch-native data, pipeline, and AI observability) while still offering clear paths for architecture reviews and delivery engagements.

DataObs helps platform, data, observability, security, and AI engineering teams make data platforms easier to trust and operate by connecting:

- pipeline telemetry
- data freshness and quality signals
- lineage and ownership context
- cloud and infrastructure telemetry
- AI agent and Model Context Protocol (MCP)/tool activity
- sensitive data access signals
- business SLA and service impact

The website is intentionally static, lightweight, and easy to host on GitHub Pages.

## Positioning

**Primary**: Elasticsearch-native Data Observability platform (six-pillar model).

**Secondary**: Founder-led consultancy and delivery support to accelerate adoption.

### Product highlights

- Elasticsearch + Kibana as the system of record and investigation surface
- OpenTelemetry and OpenLineage as ingestion standards
- Six pillars: Platform, Data Pipeline, Data, FinOps, Business, AI & Agent
- Quality engine, lineage, pipeline/streams monitoring, incident workflows
- Self-managed, controllable, and cost-transparent

### Delivery offers

- Observability Assessment Sprint
- OTEL Foundation Build
- AI Agent Telemetry PoC
- Broader architecture and implementation support

## Design direction

The website is intended to feel like a modern observability and platform engineering site: visual, interactive, architecture-led, and enterprise-friendly.

Current design themes:

- OpenTelemetry-first storytelling
- Elasticsearch-native product emphasis
- six-pillar model
- original SVG/CSS diagrams
- dark/light visual style
- telemetry flow graphics
- browser-only calculator and contact flow

All diagrams and visuals in this repository should be original first-party website assets.

## Tech stack

- Static HTML
- CSS
- Vanilla JavaScript
- GitHub Pages

## Repository structure

```text
.
├── index.html                 # Main homepage (product-led)
├── product.html               # Product overview page
├── how-we-work.html
├── services.html
├── agentguard.html
├── otel-config-generator.html
├── contact.html
├── styles.css
├── script.js
├── assets/
├── CNAME
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

The site is served by GitHub Pages from the `main` branch. Use feature branches and pull requests for updates.

## Content guidelines

- Lead with the product, keep services as the acceleration path.
- Stay accurate about current maturity (the product is under active development).
- Prefer “Elasticsearch-native”, “OpenTelemetry-first”, “six-pillar model”.
- Do not add unverified claims, fake testimonials, or third-party logos without permission.

## Next improvements

- Add first-party Open Graph / social preview image
- Add privacy page if analytics are introduced
- Expand product screenshots and architecture diagrams once available
- Keep navigation and CTAs aligned with the main DataObs repository status
