import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  projectSidebar: [
    'certifications',
    {
      type: 'category',
      label: 'Projects',
      items: ['projects/gcp', 'projects/azure'],
    },
  ],
};

export default sidebars;
