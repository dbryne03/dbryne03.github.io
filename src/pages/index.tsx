import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function AboutSection() {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.aboutGrid}>
          <div className={styles.aboutBio}>
            <Heading as="h2">About</Heading>
            <p>
              I'm a data engineer with a focus on cloud infrastructure across GCP and Azure.
              The work I find most interesting sits at the intersection of data movement and
              data quality — API integrations, orchestration pipelines, migration validation
              frameworks, and the tooling that lets you trust what's in your warehouse.
              I've been building these systems across insurance, cloud consulting, and
              partner integration contexts since graduating in 2023.
            </p>
            <p>
              I studied Computer Science with a Cyber Operations focus at Cedarville University,
              which gave me a different lens on data infrastructure than a pure software
              background would have. Outside of the main stack, I'm interested in where AI
              tooling is heading for data engineering — I've spent time building with LLMs,
              RAG pipelines, and agentic workflows, and I have views on what's actually
              useful versus what's being oversold.
            </p>
            <p>
              Originally from Nigeria, currently based in the US, and actively looking to
              relocate to Greater Manchester. I'm drawn to the engineering culture there
              and ready to make the move.
            </p>
          </div>
          <div className={styles.aboutMeta}>
            <dl className={styles.metaList}>
              <div className={styles.metaRow}>
                <dt>Based in</dt>
                <dd>United States</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Seeking</dt>
                <dd>Greater Manchester, UK</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Visa</dt>
                <dd>Skilled Worker sponsorship required</dd>
              </div>
              <div className={styles.metaRow}>
                <dt>Contact</dt>
                <dd>
                  <a href="mailto:davidedeji25@gmail.com">davidedeji25@gmail.com</a>
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt>LinkedIn</dt>
                <dd>
                  <a href="https://linkedin.com/in/davidadedeji" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/davidadedeji
                  </a>
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt>GitHub</dt>
                <dd>
                  <a href="https://github.com/dbryne03" target="_blank" rel="noopener noreferrer">
                    github.com/dbryne03
                  </a>
                </dd>
              </div>
            </dl>
          </div>
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
            to="/gcp">
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
        <AboutSection />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
