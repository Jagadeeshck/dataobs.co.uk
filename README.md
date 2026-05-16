# DataObs

DataObs public website hosted on GitHub Pages.

## Tech stack

- Static HTML
- CSS
- JavaScript
- GitHub Pages

## Local preview

Run a local static file server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deployment

Published through GitHub Pages from the `main` branch root.

## Custom domain

The site uses the root `CNAME` file with:

```text
dataobs.co.uk
```

For DNS configuration, refer to the official GitHub Pages custom domain documentation.

## Security note

Do not commit secrets, registrar account details, private DNS screenshots, analytics tokens, API keys, or client information.

## Content maintenance notes

- Keep the website fully static and GitHub Pages compatible.
- Keep `CNAME`, `robots.txt`, and `sitemap.xml` in the repository root.
- Do not add a backend, API keys, analytics tokens, private data, or client information.
- Avoid claiming clients, certifications, partnerships, testimonials, or awards unless they are real and approved for public use.
- Update `sitemap.xml` if new public pages are added.
- Keep contact behaviour clear: the static contact form opens the user's email client.

## TODO

- Add real case studies only after client permission is available.
- Consider service-specific static landing pages if future content strategy requires them.
- Add privacy or cookie information only if analytics or third-party embeds are introduced.
- Periodically review copy for clarity, accessibility, and public-repository safety.
