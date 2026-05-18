---
sidebar_position: 1
---

# GCP Data Integration & Dimensional Modeling

A pipeline that extracts data from REST APIs, stages it through Pub/Sub and Cloud Storage, then transforms it into a dimensional warehouse in BigQuery using dbt. Orchestrated end-to-end with Airflow.

The goal was to build something I'd be comfortable deploying in a real partner integration context — no managed ETL tools, just Python, SQL, and proper DAG management.

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

## Design Notes

I avoided managed ETL tools for extraction. Custom Python clients give full control over pagination logic, rate limiting, and error handling — and the code lives in version control like everything else.

Pub/Sub sits between extraction and landing so the two steps are decoupled. If the GCS write fails, the message can be reprocessed without re-hitting the API.

The dbt project follows a three-layer structure: staging models normalize raw sources, intermediate models apply business logic, and mart models are what analytics actually queries. Airflow runs each layer in sequence and alerts on failure.

## Stack

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
