---
slug: welcome
title: What this site is
authors: [dbryne03]
tags: [data-engineering, gcp, azure]
---

I built this portfolio to have somewhere to document technical work properly — not a CV bullet point, but the actual architecture, the decisions behind it, and the trade-offs.

<!-- truncate -->

There are two main projects here.

The first is a GCP data integration pipeline: Python extractors pulling from REST APIs, events queued through Pub/Sub, raw data landing in Cloud Storage, then transformed into a dimensional warehouse in BigQuery using dbt and orchestrated by Airflow. The kind of stack I've worked with at Bestow building partner-facing integrations.

The second is an Azure CDC migration and validation framework. The data movement is ADF. The part that took more thought is the validation layer — a Python and T-SQL engine that hashes every row on source and target and compares them by primary key. Row counts tell you volume. Hashes tell you the data is actually right. That framework came out of a production migration at 66degrees across a 40TB+ dataset.

Both projects are actively being built out. Code is in the [GitHub repos](https://github.com/dbryne03) as it gets written.
