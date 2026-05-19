---
sidebar_position: 2
---

# Microsoft Azure #0001

## Overview

A data migration and validation pipeline for insurance operational data on Microsoft Azure. Policyholder, policy, and claims records are migrated from a cloud-hosted PostgreSQL source alongside broker submission files delivered via SFTP, loaded into Azure SQL, and validated at the row level using a cryptographic hash comparison framework.

The pipeline is designed around a core principle: row counts confirm volume, not correctness. Every migrated row is hashed and compared between source and target to guarantee data integrity across records containing personal data.

## Objectives

1. Migrate policyholder, policy, and claims data from Azure Database for PostgreSQL into Azure SQL without data loss or corruption
2. Ingest broker submission files from an SFTP endpoint into Azure SQL alongside the migrated records
3. Validate data integrity at the row level using SHA-256 hash comparison across all migrated tables
4. Surface any data mismatches with sufficient detail for investigation and remediation
5. Handle personal data in accordance with UK GDPR, the Data Protection Act 2018, and FCA data management expectations — masking, encryption, and access controls applied at the database layer

## Sources

| Source | Name | Type | Details |
|:---|:---|:---|:---|
| A | Azure Database for PostgreSQL | Relational DB | 3 tables: policyholders, policies, claims |
| B | SFTP Server | File transfer | Broker submission CSV files — new policy applications |

### PostgreSQL Tables

| Table | Personal Data Fields | Description |
|:---|:---|:---|
| `policyholders` | Full name, date of birth, NI number, address, email, telephone | Insured party records |
| `policies` | Policy number, inception/expiry dates, premium, status, product type | Active and historical policy records |
| `claims` | Claim reference, incident date, description, settlement amount, status | Claims against active policies |

### SFTP Source

Broker submission files delivered as CSV on a scheduled basis. Each file contains new policy applications from registered brokers — policyholder details, requested cover type, and premium band. ADF picks up files on arrival via the SFTP connector; processed files are archived in ADLS Gen2.

## Architecture

```
Source A                              Source B
Azure Database for PostgreSQL         Azure Container Apps
3 tables (personal data)              (atmoz/sftp — broker submissions)
          │                                    │
          ▼                                    ▼
    ADF Copy Activity                   ADF SFTP Connector
    (full + incremental load)           (CSV pickup + archive)
          │                                    │
          └──────────────┬─────────────────────┘
                         ▼
                   ADLS Gen2
                   raw/postgres/ | raw/sftp/
                         │
                         ▼
                   ADF Copy Activity
                   (stage → Azure SQL)
                         │
                         ▼
                   Azure SQL Database
                   policyholders | policies | claims | broker_submissions
                         │
                         ▼
                   Azure Function (Python)
                   SHA-256 hash engine — per table, per row
                         │
                         ▼
                   T-SQL Stored Procedures
                   (source vs target hash comparison)
                         │
                         ▼
                   Reconciliation Tables
                   + ADF Pipeline Alerts (email on failure / completion)
```

## Personal Data Handling

All data used in this project is synthetic, generated with Faker. Personal data fields are treated as sensitive throughout the pipeline in line with UK GDPR data minimisation and security principles.

| Control | Implementation |
|:---|:---|
| Column masking | Azure SQL Dynamic Data Masking on name, email, telephone, and address fields |
| Field encryption | Always Encrypted on NI number and date of birth columns |
| Access control | Column-level permissions — validation service account cannot SELECT unmasked personal data |
| Credentials | All connection strings and keys stored in Azure Key Vault; ADF uses managed identity |
| Data in transit | TLS enforced on all ADF linked service connections |
| Audit trail | Pipeline activity logs retained in Azure Monitor for auditability |

## Validation Framework

The validation engine generates a deterministic SHA-256 hash for every row in both source and target by concatenating column values in sorted column order using a pipe delimiter. Sorted column order ensures the hash is consistent regardless of how each system returns columns.

Hashes are compared by primary key. Any mismatch is written to a reconciliation table with the table name, primary key value, source hash, target hash, and a column-level diff identifying which fields diverged.

The comparison logic runs as a T-SQL stored procedure in Azure SQL, keeping large result sets in the database layer and avoiding unnecessary data movement over the wire. The Azure Function invokes the procedure per table and writes the reconciliation output.

## Output

### Reconciliation Tables

Three output tables written to Azure SQL on each pipeline run:

| Table | Content |
|:---|:---|
| `validation_run` | Run ID, timestamp, tables validated, total rows, pass rate |
| `validation_result` | Per-table summary — row count, matched, mismatched, missing |
| `validation_mismatch` | Row-level detail — primary key, source hash, target hash, differing columns |

### Pipeline Alerts

ADF pipeline alerts issue email notifications on completion and on failure. Failure alerts include the pipeline stage, error message, and a link to the ADF monitoring run for immediate investigation.

## Execution Model

ADF orchestrates the full pipeline end-to-end. The SFTP Container App starts on pipeline trigger and stops on completion, incurring compute cost only during the execution window. The full sequence runs on a configurable schedule or on-demand trigger:

```
Start SFTP Container App
→ Extract PostgreSQL tables (ADF Copy)
→ Pick up SFTP broker files (ADF SFTP Connector)
→ Stage to ADLS Gen2
→ Load to Azure SQL
→ Run hash validation (Azure Function → T-SQL)
→ Write reconciliation output
→ Send completion / failure alert
→ Stop SFTP Container App
```

## Design Notes

**SFTP via Azure Container Apps.** The SFTP server runs as a Container App (atmoz/sftp image) that scales to zero between runs. ADF starts the container at pipeline open and stops it on completion — compute cost is limited to the execution window. SFTP credentials and host keys are stored in Azure Key Vault.

**Parameterised ADF pipelines.** A single Copy Activity template accepts table name, schema, and watermark column as parameters. Adding a new source table requires no pipeline changes — a new parameter set is sufficient. The same applies to the validation stored procedure, which accepts the table name and primary key at runtime.

**Hash comparison stays in the database.** Pulling source and target rows into the Azure Function for comparison would require moving the full dataset over the wire. Running the comparison as a T-SQL stored procedure keeps the data in place and returns only the mismatch records — a meaningful difference at scale.

**Incremental load on the PostgreSQL tables.** Full table reloads are used on the initial migration run. Subsequent runs use watermark-based incremental extraction on an `updated_at` timestamp column, reducing data movement and load time on recurring executions.

**Infrastructure is provisioned with Pulumi (TypeScript).** Azure Database for PostgreSQL, ADLS Gen2, Azure SQL, Container Apps, Azure Function App, ADF instance, Key Vault, and all IAM role assignments are declared in code and applied via CI/CD on GitHub Actions. Nothing is provisioned manually through the portal.

## Stack

| Layer | Technology |
|:---|:---|
| Source DB | Azure Database for PostgreSQL |
| SFTP | Azure Container Apps (atmoz/sftp) |
| Orchestration | Azure Data Factory |
| Landing Zone | Azure Data Lake Storage Gen2 |
| Target DB | Azure SQL Database |
| Validation Engine | Azure Functions (Python 3.12) |
| Comparison Logic | T-SQL Stored Procedures |
| Secrets | Azure Key Vault |
| IaC | Pulumi (TypeScript) |
| CI/CD | GitHub Actions |

## Repository

[github.com/dbryne03/azure-insurance-0001](https://github.com/dbryne03/azure-insurance-0001)
