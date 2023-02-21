import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import HomeScreen from './HomeScreen';

export default {
  title: 'components/HomeScreen',
  component: HomeScreen,
} as ComponentMeta<typeof HomeScreen>;

export const Basic: ComponentStory<typeof HomeScreen> = () => <HomeScreen />;
