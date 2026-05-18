import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type CapabilityItem = {
  title: string;
  icon: ReactNode;
  stack: string[];
  description: string;
};

function CloudIcon() {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm0 2c3.86 0 6 1.37 6 2s-2.14 2-6 2-6-1.37-6-2 2.14-2 6-2zm0 14c-3.86 0-6-1.37-6-2V8.4c1.53 1.37 3.73 1.6 6 1.6s4.47-.23 6-1.6V17c0 .63-2.14 2-6 2z"/>
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  );
}

const CapabilityList: CapabilityItem[] = [
  {
    title: 'Google Cloud Platform',
    icon: <CloudIcon />,
    stack: ['BigQuery', 'Cloud Composer', 'Pub/Sub', 'GCS', 'dbt Core', 'Airflow', 'Astronomer', 'Dataplex', 'BigQuery ML', 'Looker Studio'],
    description:
      'Pipeline authoring, warehouse design, and orchestration on GCP — from raw API ingestion through Pub/Sub to dimensional models in BigQuery, with dbt transformations and Airflow DAG management.',
  },
  {
    title: 'Microsoft Azure',
    icon: <DatabaseIcon />,
    stack: ['Azure Data Factory', 'ADLS Gen2', 'Azure SQL', 'Azure Synapse', 'dbt', 'CDC', 'IBM DB2'],
    description:
      'ADF pipeline authoring, data lake architecture on ADLS Gen2, large-scale database migrations, and CDC validation frameworks for complex enterprise data movement.',
  },
  {
    title: 'Python & SQL',
    icon: <CodeIcon />,
    stack: ['Python 3.12', 'pandas', 'Pydantic', 'REST APIs', 'Webhooks', 'ACORD', 'PostgreSQL', 'MySQL', 'T-SQL', 'IBM DB2 SQL', 'Google Standard SQL'],
    description:
      'Python for extraction logic, data validation, and partner-facing integrations. SQL across dialects for transformation, dimensional modeling, and operational reporting.',
  },
];

function Capability({title, icon, stack, description}: CapabilityItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.card}>
        <div className={styles.cardIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <div className={styles.stack}>
          {stack.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="text--center margin-bottom--xl">
          <Heading as="h2">Core Capabilities</Heading>
        </div>
        <div className="row">
          {CapabilityList.map((props, idx) => (
            <Capability key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
