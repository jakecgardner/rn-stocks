import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import StockDetail from './StockDetail';

export default {
  title: 'components/StockDetail',
  component: StockDetail,
} as ComponentMeta<typeof StockDetail>;

export const Basic: ComponentStory<typeof StockDetail> = () => (
  <StockDetail
    symbol="AAPL"
    companyName="Apple Inc."
    onClose={() => {}}
    onSelect={() => {}}
  />
);
