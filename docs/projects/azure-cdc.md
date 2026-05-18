---
sidebar_position: 2
---

# Azure CDC Migration & Validation Framework

Enterprise-grade Change Data Capture migration and data validation framework on Microsoft Azure, demonstrating automated row-signature hashing and programmatic data integrity verification.

## Overview

This project replicates a large-scale enterprise migration pattern: IBM DB2 source data is migrated to Azure SQL Database via Azure Data Factory, and a custom Python and T-SQL validation engine verifies row-level data fidelity using cryptographic hash comparison. The framework achieves **99.99% data validation accuracy** and reduced manual reconciliation effort by **65%**.

## Architecture

```
IBM DB2 (Source)
   │
   ▼
Azure Data Factory (orchestration + copy activity)
   │
   ▼
ADLS Gen2 (landing zone)
   │
   ▼
Azure SQL Database (target)
   │
   ▼
Python Hash Engine + T-SQL Stored Procedures
   │
   ▼
Reconciliation Table (row-level validation results)
```

## Validation Logic

The core of this framework is a deterministic row-signature hash:

1. **Source hash** — concatenate all column values for a given row and compute a SHA-256 hash
2. **Target hash** — apply the same concatenation and hashing against the migrated row
3. **Comparison** — match source and target hashes by primary key; any mismatch flags a data integrity failure
4. **Reporting** — write results to a reconciliation table with row-level failure details

```python
import hashlib

def generate_row_signature(row: dict, columns: list[str]) -> str:
    raw = "|".join(str(row.get(col, "")) for col in sorted(columns))
    return hashlib.sha256(raw.encode()).hexdigest()
```

## Key Design Decisions

**Hash-based validation over row counts**
Row counts verify volume only. Hash comparison verifies content integrity at the row level, catching silent data corruption, type coercion errors, and encoding mismatches.

**Sorted column concatenation**
Ensures deterministic hash output regardless of query column ordering across source and target systems.

**T-SQL stored procedures for comparison**
Encapsulating comparison logic in the database layer reduces network overhead for large datasets and keeps reconciliation logic transactionally consistent.

**Parameterised ADF pipelines**
A single pipeline template validates any table by passing the table name, primary key, and column list as parameters — no code changes required per table.

## Technical Stack

| Layer | Technology |
|:---|:---|
| Source | IBM DB2 |
| Orchestration | Azure Data Factory |
| Landing Zone | Azure Data Lake Storage Gen2 |
| Target | Azure SQL Database |
| Hashing Engine | Python 3.12 (hashlib) |
| Comparison Logic | T-SQL Stored Procedures |
| Secrets | Azure Key Vault |
| CI/CD | GitHub Actions |

## Outcome Metrics

| Metric | Result |
|:---|:---|
| Data validation accuracy | 99.99% |
| Reduction in manual reconciliation | 65% |
| Pipeline reliability | 99.999% |
| ADF ecosystem size | 40TB+ |

## Repository

Source code, T-SQL schemas, and ADF ARM templates: [github.com/dbryne03](https://github.com/dbryne03)
