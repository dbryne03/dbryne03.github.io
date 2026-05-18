# dbryne03.github.io

Source for the professional portfolio of **David-Bryne Adedeji** — Data Platform Engineer II.

Live at [dbryne03.github.io](https://dbryne03.github.io)

---

## About

This portfolio documents production-grade data engineering work across GCP and Azure, including project architecture, engineering decisions, and professional certifications. Built with [Docusaurus](https://docusaurus.io/), deployed via GitHub Pages.

## Projects

| Project | Stack |
|:---|:---|
| [GCP Data Integration & Dimensional Modeling](https://dbryne03.github.io/docs/projects/gcp-pipeline) | Python, Pub/Sub, GCS, BigQuery, dbt, Airflow |
| [Azure CDC Migration & Validation Framework](https://dbryne03.github.io/docs/projects/azure-cdc) | ADF, ADLS Gen2, Azure SQL, Python, T-SQL |

## Tech Stack

- **Framework:** Docusaurus (React, TypeScript)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions — auto-deploys on push to `main`

## Local Development

```bash
npm install
npm run start
```

## Build

```bash
npm run build
```

## Repository Structure

```
docs/
  certifications.md       # Professional certifications
  projects/
    gcp-pipeline.md       # GCP Data Integration & Dimensional Modeling
    azure-cdc.md          # Azure CDC Migration & Validation Framework
blog/                     # Engineering updates and certification milestones
src/
  pages/                  # Homepage
  components/             # Custom React components
.github/workflows/        # GitHub Actions CI/CD
```

---

© 2026 David-Bryne Adedeji
