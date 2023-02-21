import { requireNativeComponent } from 'react-native';

type RNTLineChartProps = {
  data: Array<number>;
  showAxis: boolean;
  showLegend: boolean;
  days: number;
  fillColor: string;
  style: any;
};

const LineChart = requireNativeComponent<RNTLineChartProps>('RNTLineChart');

export default LineChart;