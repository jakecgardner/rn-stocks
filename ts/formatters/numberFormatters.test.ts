import { decimalFormat } from './numberFormatters';

test('outputs integer with decimals', () => {
  expect(decimalFormat(100)).toBe('100.00');
});

test('outputs < 2 or > 2 decimals with 2 decimal places', () => {
  expect(decimalFormat(100.5)).toBe('100.50');
  expect(decimalFormat(100.5123)).toBe('100.51');
});