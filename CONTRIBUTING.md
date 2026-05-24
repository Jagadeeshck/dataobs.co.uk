# Contributing to DataObs

> **Copyright Notice:** This project and all associated source code, documentation, and assets are the exclusive intellectual property of **KJC Infotech Limited**. All rights reserved. Unauthorised use, reproduction, or distribution is strictly prohibited. See [LICENSE](./LICENSE) for full terms.

---

## Branching Strategy

All development in this repository follows a strict **dev → main** branching model to protect production code and ensure every change is reviewed and approved before release.

### Branch Overview

| Branch | Purpose | Who can push directly? |
|---|---|---|
| `main` | Production code — live website | Nobody (protected) |
| `dev` | Active development and staging | Approved contributors via PR only |
| `feature/*` | Individual feature branches | Developer (merged to `dev` via PR) |
| `fix/*` | Bug fix branches | Developer (merged to `dev` via PR) |

### Workflow

```
feature/your-feature
        │
        ▼  Pull Request (reviewed + approved)
       dev  ──────────────────────────────────────────────────▶ Testing
        │
        ▼  Pull Request (approved by KJC Infotech owner only)
       main  ──────────────────────────────────────────────────▶ Production
```

1. **Create a feature branch** from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. **Develop and commit** your changes on the feature branch.

3. **Open a Pull Request** targeting `dev`. At least one approval is required before merging.

4. **Testing on `dev`** — once merged to `dev`, the changes are tested and validated.

5. **Merge to `main`** (Production) — only the repository owner (KJC Infotech) may approve and merge from `dev` into `main` after all testing is complete and signed off.

> ⚠️ **Direct pushes to `main` are not permitted.** All production changes must go through the `dev → main` PR process.

---

## Code Review Requirements

- All pull requests require **at least 1 approving review** before merging.
- The `main` branch requires approval from the **repository owner** (KJC Infotech Limited).
- Pull requests will be dismissed if new commits are pushed after approval — re-approval is required.
- Status checks must pass before any merge is allowed.

---

## Commit Message Format

Use clear, descriptive commit messages:
```
<type>: <short description>

[Optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat: add OpenTelemetry config generator page`
- `fix: correct footer copyright year`
- `docs: update contributing guide with branching model`

---

## Intellectual Property

By submitting a contribution to this repository, you confirm that:

- You have the legal right to submit the contribution.
- You assign all intellectual property rights in your contribution to **KJC Infotech Limited**.
- Your contribution does not include any third-party code unless explicitly approved in writing by KJC Infotech Limited.

---

*© 2024–2026 KJC Infotech Limited. All Rights Reserved.*
