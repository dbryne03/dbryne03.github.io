---
sidebar_position: 1
---

# Google Cloud Platform #0001

## Overview

A monthly music intelligence pipeline built on Google Cloud Platform, ingesting data from three sources — a REST API, a JSON dataset, and a Parquet dataset — transforming it into a dimensional model in BigQuery, and delivering outputs via Looker Studio and Google Sheets.

The pipeline tracks artist chart performance, catalogue depth, and audio characteristics across the Last.fm listener base on a monthly cadence, with support for on-demand execution via a central Airflow DAG.

## Objectives

1. Identify which artists are growing in listener count and chart presence on a month-over-month basis
2. Profile the audio characteristics of charting tracks using Spotify feature data
3. Contextualise artist performance against catalogue depth and release history from MusicBrainz
4. Deliver findings to both technical and non-technical stakeholders through automated reporting

## Sources

| Source | Name | Type | Format |
|:---|:---|:---|:---|
| A | Last.fm API | REST API | JSON — charts, artist metadata, tags, play counts |
| B | MusicBrainz Database Dump | Batch | JSON — canonical artist, recording, release, genre |
| C | Spotify Tracks Dataset | Batch | Parquet — audio features per track |

## Architecture

```
Source A                    Source B                Source C
Last.fm API                 MusicBrainz             Spotify
                            JSON Dump               Parquet
     │                          │                       │
     ▼                          ▼                       ▼
Cloud Run Job               Cloud Run Job           Cloud Run Job
(Python, API key,           (Python, download       (Python, download
 pagination)                 + stage)                + stage)
     │                          │                       │
     ▼                          │                       │
Kafka Topic                     │                       │
(Confluent Cloud)               │                       │
     │                          │                       │
     ▼                          ▼                       ▼
GCS (raw/api/)          GCS (raw/batch/)        GCS (raw/batch/)
     └──────────────────────────┴───────────────────────┘
                                │
                                ▼
                           BigQuery
                 raw.lastfm | raw.mb_dump | raw.spotify
                                │
                                ▼
                           dbt Core
                           ├── staging/        source conforming, one model per source
                           ├── intermediate/   artist resolution, track matching
                           └── mart/
                               ├── dim_artist
                               ├── dim_track
                               └── fact_chart_position
                                │
                  ┌─────────────┴──────────────┐
                  ▼                             ▼
          Looker Studio                  Google Sheets
          (dashboard)                   (BigQuery connector)

Astronomer Cloud — monthly cron or on-demand central DAG:
  extract → stage → load → dbt run (Cloud Run Job) → dbt test → notify
```

## Dimensional Model

| Model | Description |
|:---|:---|
| `dim_artist` | Canonical artist record sourced from MusicBrainz, enriched with Last.fm listener counts and genre tags |
| `dim_track` | Track-level dimension combining Spotify audio features with Last.fm play count data |
| `fact_chart_position` | Weekly Last.fm chart positions joined to `dim_artist` and `dim_track` |

## Output

### Looker Studio Dashboard

Four report pages refreshed on pipeline completion:

| Page | Content |
|:---|:---|
| Chart Trends | Top 50 artists by listener growth, week-over-week movement |
| Audio Profile | Distribution and scatter charts of Spotify audio features for charting tracks |
| Artist Catalogue | Release count, active years, and genre breakdown per artist |
| Genre Trends | Month-on-month change in genre representation across chart positions |

### Google Sheets

A live monthly summary report connected directly to BigQuery via the native connector. Refreshes automatically on pipeline completion. Designed for stakeholders who require the data in a tabular, shareable format without direct warehouse access.

## Execution Model

The pipeline runs on the first of each month via a scheduled DAG on Astronomer Cloud — fully managed, cloud-hosted Airflow with no local dependencies. The same DAG is available for on-demand execution, triggering the full sequence — extraction, staging, transformation, testing, and output refresh — from a single run. dbt transformations execute as a Cloud Run Job invoked by the DAG.

## Design Notes

**Extraction via Cloud Run Jobs.** Each source runs as a containerised Cloud Run Job — triggered by Astronomer Cloud, executes to completion, and scales to zero. No persistent compute infrastructure is required. dbt transformations run the same way — a dedicated Cloud Run Job invoked by the DAG after loading completes.

**Kafka as the messaging layer for Source A.** The Last.fm extractor publishes records to a Confluent Cloud topic. A consumer job reads from the topic and stages to GCS, decoupling extraction from landing. This ensures that a failed GCS write can be replayed from the topic without re-issuing API requests — relevant given Last.fm's rate limits and the cost of re-pagination.

**Sources B and C write directly to GCS.** File-based batch datasets do not benefit from per-record queuing. Cloud Run Jobs download and stage the files; Airflow GCS sensors detect arrival and trigger the downstream BigQuery load.

**Cross-source artist resolution.** Last.fm, MusicBrainz, Billboard, and Spotify each use different identifiers for the same artist entity. The intermediate layer constructs a resolution table using MusicBrainz IDs as the canonical key, with normalised name matching applied as a fallback for records that do not carry an MBID.

**Infrastructure is provisioned with Pulumi (TypeScript).** GCS buckets, BigQuery datasets, Cloud Run Job definitions, Secret Manager secrets, and IAM bindings are all declared in code and applied via CI/CD. Nothing is clicked into existence in the console.

**Spotify Parquet staging is intentionally minimal.** The dataset arrives pre-typed with clean audio features. Staging conforms column names and nullability only. The transformation logic is concentrated in the intermediate layer, where audio features are joined to chart and play data to produce a richer track dimension than either source provides independently.

## Stack

| Layer | Technology |
|:---|:---|
| Extraction | Cloud Run Jobs, Python 3.12, Pydantic |
| Messaging | Apache Kafka (Confluent Cloud) |
| Storage | Google Cloud Storage |
| Warehousing | Google BigQuery |
| Transformation | dbt Core |
| Orchestration | Astronomer Cloud (managed Airflow) |
| Reporting | Looker Studio, Google Sheets (BigQuery connector) |
| IaC | Pulumi (TypeScript) |
| CI/CD | GitHub Actions |
| Secrets | GCP Secret Manager |

## Repository

[github.com/dbryne03/gcp-music-0001](https://github.com/dbryne03/gcp-music-0001)
