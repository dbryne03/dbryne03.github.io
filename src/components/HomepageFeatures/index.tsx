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

function GoogleCloudIcon() {
  return (
    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <title>Google Cloud</title>
      <path fill="#4285F4" d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"/>
    </svg>
  );
}

function MicrosoftAzureIcon() {
  return (
    <svg className={styles.icon} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <title>Microsoft Azure</title>
      <path fill="#0078D4" d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14v.002L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.741a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.28.208.618.32.966.32m-3.084-12.531 3.624 10.739a.54.54 0 0 1-.51.713v-.001h-.03a.54.54 0 0 1-.322-.106l-9.287-6.9h4.853m6.313 7.006c.116-.326.13-.694.007-1.058L9.79 1.76a1.722 1.722 0 0 0-.007-.02h6.034a.54.54 0 0 1 .512.366l6.562 19.445a.54.54 0 0 1-.338.684"/>
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19h8" />
      <path d="m4 17 6-6-6-6" />
    </svg>
  );
}

const CapabilityList: CapabilityItem[] = [
  {
    title: 'Google Cloud Platform',
    icon: <GoogleCloudIcon />,
    stack: ['BigQuery', 'Cloud Composer', 'Pub/Sub', 'GCS', 'dbt Core', 'Airflow', 'Astronomer', 'Dataplex', 'BigQuery ML', 'Looker Studio'],
    description:
      'Pipeline authoring, warehouse design, and orchestration on GCP — from raw API ingestion through Pub/Sub to dimensional models in BigQuery, with dbt transformations and Airflow DAG management.',
  },
  {
    title: 'Microsoft Azure',
    icon: <MicrosoftAzureIcon />,
    stack: ['Azure Data Factory', 'ADLS Gen2', 'Azure SQL', 'Azure Synapse', 'dbt', 'CDC', 'IBM DB2'],
    description:
      'ADF pipeline authoring, data lake architecture on ADLS Gen2, large-scale database migrations, and CDC validation frameworks for complex enterprise data movement.',
  },
  {
    title: 'Python & SQL',
    icon: <TerminalIcon />,
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
