import { type Candle } from '../viewmodels/candlesticks';
/*
  Assumes input is sorted in reverse chronological order
*/
const getPercentageChange = (candles: Candle[]) => {
  if (candles.length === 0) {
    return 0;
  }
  const latestClose = candles[0].close;
  const latestDate = candles[0].date;

  let priorClose = 0;

  const priorDays = candles.filter(candle => candle.date.dayOfYear() !== latestDate.dayOfYear());
  if (priorDays.length === 0) {
    priorClose = candles[candles.length-1].close;
  } else {
    priorDays.sort((a, b) => a.date > b.date ? -1 : 1);
    priorClose = priorDays[0].close;
  }

  const diff = 1 - (priorClose / latestClose);
  return diff * 100;
};

export default getPercentageChange;