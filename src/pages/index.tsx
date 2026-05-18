import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const metrics = [
  {value: '4', label: 'External partners served'},
  {value: '50%', label: 'Faster pipeline execution'},
  {value: '30%', label: 'Cloud cost reduction'},
  {value: '99.999%', label: 'Pipeline uptime'},
];

function MetricsRow() {
  return (
    <section className={styles.metrics}>
      <div className="container">
        <div className={styles.metricsRow}>
          {metrics.map(({value, label}) => (
            <div key={label} className={styles.metricItem}>
              <span className={styles.metricValue}>{value}</span>
              <span className={styles.metricLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          David-Bryne Adedeji
        </Heading>
        <p className="hero__subtitle">Data Platform Engineer II</p>
        <p className={styles.heroDescription}>
          I work on data pipelines across GCP and Azure — REST API integrations,
          BigQuery warehouses, dbt models, ADF orchestration, and the validation
          work that makes migrations trustworthy.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/projects/gcp-pipeline">
            View Projects
          </Link>
          <Link
            className={clsx('button button--outline button--secondary button--lg', styles.buttonOutline)}
            href="https://linkedin.com/in/davidadedeji">
            LinkedIn
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="David-Bryne Adedeji — Data Platform Engineer"
      description="Cloud-native data engineering portfolio. GCP, Azure, Python, SQL, Airflow, dbt, BigQuery, Azure Data Factory.">
      <HomepageHeader />
      <main>
        <MetricsRow />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
