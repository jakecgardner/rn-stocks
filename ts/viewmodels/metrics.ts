export type Metric = {
  label: string;
  value: number;
};

const createMetricsViewModel = (rawMetrics: any) => {
  const metrics: Array<Metric> = [];
  metrics.push({ label: '52W High', value: rawMetrics['52WeekHigh'] });
  metrics.push({ label: '52W Low', value: rawMetrics['52WeekLow'] });
  metrics.push({ label: 'YTD Return', value: rawMetrics['yearToDatePriceReturnDaily'] });
  metrics.push({ label: 'Beta', value: rawMetrics['beta'] });
  metrics.push({ label: '10D Volume', value: rawMetrics['10DayAverageTradingVolume'] });
  metrics.push({ label: 'Dividend/share', value: rawMetrics['dividendPerShareAnnual'] });
  return metrics;
};

export default createMetricsViewModel;