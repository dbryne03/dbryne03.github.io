import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'David-Bryne Adedeji',
  tagline: 'Data Platform Engineer · GCP · Azure · Python · SQL',
  favicon: 'img/favicon.ico',

  url: 'https://dbryne03.github.io',
  baseUrl: '/',

  organizationName: 'dbryne03',
  projectName: 'dbryne03.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'David-Bryne Adedeji',
      logo: {
        alt: 'Portfolio',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'projectSidebar',
          position: 'left',
          label: 'Portfolio',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://linkedin.com/in/davidadedeji',
          label: 'LinkedIn',
          position: 'right',
        },
        {
          href: 'https://github.com/dbryne03',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Portfolio',
          items: [
            {
              label: 'GCP Pipeline',
              to: '/docs/projects/gcp-pipeline',
            },
            {
              label: 'Azure CDC Framework',
              to: '/docs/projects/azure-cdc',
            },
            {
              label: 'Certifications',
              to: '/docs/certifications',
            },
          ],
        },
        {
          title: 'Connect',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://linkedin.com/in/davidadedeji',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/dbryne03',
            },
            {
              label: 'Email',
              href: 'mailto:davidedeji25@gmail.com',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} David-Bryne Adedeji. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['python', 'sql', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
