import { displayTemplate } from '@optimizely/cms-sdk';

export const HeroStatsElementDisplayTemplate = displayTemplate({
  key: 'HeroStatsElementDisplayTemplate',
  isDefault: true,
  displayName: 'Hero Stats Style',
  contentType: 'HeroStatsElement',
  settings: {
    columns: {
      editor: 'select',
      displayName: 'Columns (desktop)',
      sortOrder: 0,
      choices: {
        cols2: { displayName: '2 columns', sortOrder: 0 },
        cols3: { displayName: '3 columns', sortOrder: 1 },
        cols4: { displayName: '4 columns (default)', sortOrder: 2 },
      },
    },
    accentColor: {
      editor: 'select',
      displayName: 'Value Color',
      sortOrder: 1,
      choices: {
        amber: { displayName: 'Amber (default)', sortOrder: 0 },
        primary: { displayName: 'Primary', sortOrder: 1 },
        neutral: { displayName: 'Neutral', sortOrder: 2 },
      },
    },
  },
});
