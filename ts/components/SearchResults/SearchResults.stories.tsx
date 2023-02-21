import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import SearchResults from './SearchResults';

export default {
  title: 'components/SearchResults',
  component: SearchResults,
} as ComponentMeta<typeof SearchResults>;

export const Basic: ComponentStory<typeof SearchResults> = () => (
  <SearchResults
    items={[
      {symbol: 'AAPL', companyName: 'Apple Inc.'},
      {symbol: 'ALPA', companyName: 'Alphabet'},
    ]}
    onSelect={() => {}}
  />
);
