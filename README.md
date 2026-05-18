# Data Platform Engineering Portfolio & Certification Track

This repository contains the source code for the professional portfolio of David-Bryne Adedeji, focusing on Data Platform Engineering, cloud architecture, and data integration. The portfolio is built using [Docusaurus](https://docusaurus.io/) and hosted on GitHub Pages.

## Project Overview

This platform serves as the centralized repository for:
- Project documentation and architectural diagrams.
- Demonstrations of advanced data engineering capabilities on GCP and Azure.
- Tracking of professional certifications and continued learning.

The overarching development plan can be referenced within the project scope, detailing specific tracks for GCP Data Integration, Azure CDC Migration, and Cloud Infrastructure Certifications.

## Architecture & Technology Stack

- **Framework:** Docusaurus (React, TypeScript)
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions
- **Primary Languages (Data Tracks):** Python 3.12, SQL

## Local Development

To run this project locally, ensure you have Node.js installed, then execute:

```bash
# Install dependencies
npm install

# Start the local development server
npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Deployment

This project utilizes GitHub Actions for continuous deployment. Upon merging changes into the `main` branch, the `.github/workflows/deploy.yml` workflow automatically builds the static site and deploys it to the `gh-pages` branch, making the updates live on the configured GitHub Pages URL.

```bash
# To manually build the static site locally
npm run build
```

## Repository Structure

- `/docs`: Contains technical documentation and project deep-dives.
- `/blog`: Used for project updates, certification milestones, and engineering insights.
- `/src`: Contains custom React components and styling for the Docusaurus site.
- `.github/workflows`: Contains the CI/CD pipeline configuration (`deploy.yml`).

## License

Copyright © 2026 David-Bryne Adedeji.
