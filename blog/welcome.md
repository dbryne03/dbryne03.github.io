---
slug: welcome
title: Welcome to My Engineering Portfolio
authors: [dbryne03]
tags: [portfolio, data-engineering, gcp, azure]
---

This site is the central hub for my work as a Data Platform Engineer — documenting project architecture, engineering decisions, and the certification track that validates this work.

<!-- truncate -->

I am building two production-grade reference implementations:

**1. GCP Data Integration & Dimensional Modeling Pipeline**

A custom Python REST extraction pipeline feeding GCP Pub/Sub, staged into Google Cloud Storage, transformed into a dimensional warehouse in BigQuery using dbt Core, and orchestrated end-to-end by Apache Airflow.

**2. Azure CDC Migration & Validation Framework**

A row-signature hash validation engine for enterprise-scale IBM DB2 to Azure SQL migrations, orchestrated by Azure Data Factory, with a Python and T-SQL reconciliation layer that achieved 99.99% data validation accuracy across a 40TB+ production estate.

Both projects emphasize code-first solutions with no SaaS black boxes, full version control, and demonstrable execution in a cloud sandbox environment.

Start with the [Projects & Certifications](/docs/certifications) section.
