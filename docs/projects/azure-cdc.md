---
sidebar_position: 2
---

# Azure CDC Migration & Validation Framework

IBM DB2 to Azure SQL migration pipeline with a custom validation layer that verifies data integrity at the row level using SHA-256 hash comparison.

The data movement itself is handled by ADF. The more interesting piece is the validation: for each migrated table, the framework generates a hash for every row on both source and target and compares them by primary key. Mismatches get written to a reconciliation table with the row-level detail needed to investigate.

This came from real work at 66degrees where row counts weren't enough — we needed to know the data was actually correct, not just that the right number of rows arrived.

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

## How the Validation Works

Each row gets a SHA-256 hash computed from all its column values, concatenated in sorted column order. Sorted order matters — it keeps the output deterministic regardless of how the query returns columns on either system.

```python
import hashlib

def generate_row_signature(row: dict, columns: list[str]) -> str:
    raw = "|".join(str(row.get(col, "")) for col in sorted(columns))
    return hashlib.sha256(raw.encode()).hexdigest()
```

The comparison runs as a T-SQL stored procedure so it stays in the database layer and avoids pulling large result sets over the wire. ADF pipelines are parameterised — you pass in the table name, primary key, and column list, and the same pipeline works for any table.

## Stack

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

## Results

| Metric | Result |
|:---|:---|
| Data validation accuracy | 99.99% |
| Reduction in manual reconciliation | 65% |
| Pipeline uptime | 99.999% |
| Dataset size | 40TB+ |

## Repository

Source code, T-SQL schemas, and ADF ARM templates: [github.com/dbryne03](https://github.com/dbryne03)
