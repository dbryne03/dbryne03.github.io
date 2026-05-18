---
sidebar_position: 1
---

# GCP Data Integration & Dimensional Modeling Pipeline

End-to-end cloud-native data pipeline on Google Cloud Platform demonstrating custom API extraction, event-driven staging, and dimensional modeling using dbt and BigQuery.

## Overview

This project implements a partner-facing data integration scenario: custom Python applications extract data from REST APIs and publish events to GCP Pub/Sub, which lands raw payloads in Google Cloud Storage. dbt Core transforms staged data into a dimensional warehouse in BigQuery, and the full pipeline is orchestrated by Apache Airflow.

## Architecture

```
REST API
   │
   ▼
Python Extractor (pagination, rate limiting, serialization)
   │
   ▼
GCP Pub/Sub (event buffer)
   │
   ▼
Google Cloud Storage (raw landing zone)
   │
   ▼
BigQuery (staging layer)
   │
   ▼
dbt Core
   ├── staging/      (source conforming)
   ├── intermediate/ (business logic)
   └── mart/         (dimensional models)
         │
         ▼
   Looker Studio (dashboard)
         ▲
Apache Airflow (orchestrates all layers)
```

## Key Design Decisions

**Custom extraction over SaaS ETL tools**
Python REST clients handle pagination, rate limiting, and response serialization without black-box dependencies. This approach keeps integration logic transparent, testable, and version-controlled.

**Pub/Sub as event buffer**
Decouples extraction from landing, enabling message-level retry and replay without re-running the full extraction job.

**Layered dbt modeling**
Staging → Intermediate → Mart follows Kimball dimensional modeling principles, separating source conforming from business transformation logic.

**Airflow for observability**
DAG-level task tracking, retry policies, and alerting provide production-grade reliability and a clear audit trail.

## Technical Stack

| Layer | Technology |
|:---|:---|
| Extraction | Python 3.12, Custom REST Client |
| Queueing | GCP Pub/Sub |
| Raw Storage | Google Cloud Storage |
| Warehousing | Google BigQuery |
| Transformation | dbt Core |
| Orchestration | Apache Airflow |
| Visualisation | Looker Studio |
| CI/CD | GitHub Actions |
| Secrets | GCP Secret Manager |

## Sample: dbt Staging Model

```sql
-- models/staging/stg_api_events.sql
with source as (
    select * from {{ source('raw', 'api_events') }}
),

renamed as (
    select
        event_id,
        partner_id,
        event_type,
        cast(event_timestamp as timestamp) as event_at,
        json_extract_scalar(payload, '$.record_id') as record_id,
        _ingested_at
    from source
)

select * from renamed
```

## Repository

Source code, DAGs, and dbt models: [github.com/dbryne03](https://github.com/dbryne03)
