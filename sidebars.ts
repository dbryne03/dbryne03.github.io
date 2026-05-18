import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  projectSidebar: [
    'certifications',
    {
      type: 'category',
      label: 'Projects',
      items: ['projects/gcp-pipeline', 'projects/azure-cdc'],
    },
  ],
};

export default sidebars;
