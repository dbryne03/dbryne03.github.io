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
    stack: ['BigQuery', 'Cloud Composer', 'Pub/Sub', 'dbt Core', 'Airflow'],
    description:
      'Custom Python extractors into Pub/Sub and Cloud Storage, transformed into dimensional models in BigQuery with dbt, and wired together with Airflow DAGs.',
  },
  {
    title: 'Microsoft Azure',
    icon: <DatabaseIcon />,
    stack: ['Azure Data Factory', 'Azure SQL', 'ADLS Gen2', 'IBM DB2', 'T-SQL'],
    description:
      'ADF pipelines, large-scale DB2 to Azure SQL migrations, and a row-level hash validation framework that catches what row counts miss.',
  },
  {
    title: 'Python & SQL',
    icon: <CodeIcon />,
    stack: ['Python 3.12', 'REST APIs', 'TypeScript', 'Airflow DAGs', 'Webhooks'],
    description:
      'Custom REST clients, webhook delivery, ACORD-compliant partner integrations, and validation logic — written in code, not configured in a GUI.',
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
