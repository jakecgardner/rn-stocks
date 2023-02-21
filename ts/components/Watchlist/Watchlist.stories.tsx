import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import Watchlist from './Watchlist';

export default {
  title: 'components/Watchlist',
  component: Watchlist,
} as ComponentMeta<typeof Watchlist>;

export const Basic: ComponentStory<typeof Watchlist> = () => (
  <Watchlist
    items={[
      {
        symbol: 'AAPL',
        companyName: 'Apple Inc.',
      },
      {
        symbol: 'GOOG',
        companyName: 'Alphabet',
      },
    ]}
    onSelect={() => {}}
  />
);
