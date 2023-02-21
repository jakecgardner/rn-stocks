import moment from 'moment';
import getPercentageChange from './percentageChange';

test('gives percentage change between yesterday close and most recent close', () => {
  const candles = [
    { 
      date: moment('1/1/2023'),
      high: 102,
      low: 100,
      open: 101,
      close: 102,
      volume: 10,
    },
    { 
      date: moment('12/31/2022'),
      high: 100,
      low: 95,
      open: 95,
      close: 100,
      volume: 10,
    },
  ];

  expect(getPercentageChange(candles)).toBe(1.9607843137254943);
});

test('gives percentage change between friday close and monday close', () => {
  const candles = [
    { 
      date: moment('2/20/2023'),
      high: 102,
      low: 100,
      open: 101,
      close: 102,
      volume: 10,
    },
    { 
      date: moment('2/17/2023'),
      high: 100,
      low: 95,
      open: 95,
      close: 100,
      volume: 10,
    },
  ];

  expect(getPercentageChange(candles)).toBe(1.9607843137254943);
});

test('gives percentage change between earliest close and most recent close', () => {
  const candles = [
    { 
      date: moment('1/1/2023'),
      high: 102,
      low: 100,
      open: 101,
      close: 102,
      volume: 10,
    },
    { 
      date: moment('1/1/2023'),
      high: 100,
      low: 95,
      open: 95,
      close: 100,
      volume: 10,
    },
  ];

  expect(getPercentageChange(candles)).toBe(1.9607843137254943);
});