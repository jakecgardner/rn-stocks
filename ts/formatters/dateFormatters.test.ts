import moment from 'moment';
import { newsQueryFormat, localeFormat } from './dateFormatters';

test('outputs YYYY-MM-DD format', () => {
  expect(newsQueryFormat(moment('1/1/2023'))).toBe('2023-01-01');
});

test('outputs MM/DD/YYYY format', () => {
  const utcTime = moment('1/1/2023').unix() * 1000;
  expect(localeFormat(moment(utcTime))).toBe('1/1/2023');
});