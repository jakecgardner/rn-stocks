import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import SearchBar from './SearchBar';

export default {
  title: 'components/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

export const Basic: ComponentStory<typeof SearchBar> = () => <SearchBar />;
