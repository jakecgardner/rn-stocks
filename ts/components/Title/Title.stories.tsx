import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import Title from './Title';

export default {
  title: 'components/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

export const Basic: ComponentStory<typeof Title> = () => (
  <Title text="Stocks" />
);
