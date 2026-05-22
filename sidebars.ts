import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  projectSidebar: [
    'certifications',
    {
      type: 'category',
      label: 'Projects',
      items: [
        {
          type: 'category',
          label: 'Google Cloud Platform #0001',
          items: [
            {type: 'doc', id: 'projects/gcp0001', label: 'Overview'},
            {type: 'doc', id: 'projects/gcp0001-tdd', label: 'Technical Design Document'},
          ],
        },
        {type: 'doc', id: 'projects/azure0001', label: 'Microsoft Azure #0001'},
      ],
    },
  ],
};

export default sidebars;
