import moment from 'moment';

export type Candle = {
  date: moment.Moment;
  high: number;
  low: number;
  open: number;
  close: number;
  volume: number;
};

const createCandlesticksViewModel = (rawCandlesticks: any) => {
  if (!rawCandlesticks || !rawCandlesticks.t) {
    return [];
  }

  const candlesticks: Array<Candle> = [];
  for (let i = 0; i < rawCandlesticks.t.length; i++) {
    candlesticks.push({
      date: moment(rawCandlesticks.t[i]*1000),
      high: rawCandlesticks.h[i],
      low: rawCandlesticks.l[i],
      open: rawCandlesticks.o[i],
      close: rawCandlesticks.c[i],
      volume: rawCandlesticks.v[i],
    });
  }
  
  return candlesticks;
};

export default createCandlesticksViewModel;