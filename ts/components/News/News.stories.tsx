import React from 'react';
import { Text } from 'react-native';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import News from './News';

export default {
  title: 'components/News',
  component: News,
} as ComponentMeta<typeof News>;

export const Basic: ComponentStory<typeof News> = () => (
  <News
    items={[
      {
        source: 'Bloomberg',
        headline: 'Britain Loses 2.5 Million Days to Worst Strikes Since',
        datetime: Date.now(),
        image: 'https://via.placeholder.com/150/771796',
        url: 'https://news.com/1',
      },
      {
        source: 'Bloomberg',
        headline: 'UK Wages Rise More Than Expected in Added Sign Of',
        datetime: Date.now(),
        image: 'https://via.placeholder.com/150/92c952',
        url: 'https://news.com/1',
      },
    ]}
    onSelect={() => {}}
    HeaderComponent={() => <Text>Top Stories</Text>}
  />
);
