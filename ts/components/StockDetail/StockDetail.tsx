import React from 'react';
import { Button, Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Colors from '../../constants/colors';
import Title from '../Title/Title';
import News, { type NewsItemData } from '../News/News';
import LineChart from '../LineChart/LineChart';
import type { Metric } from '../../viewmodels/metrics';

import { useGetCompanyNewsQuery, useGetCandlesticksQuery, useGetMetricsQuery } from '../../services/finnhub';
import metricsViewModel from '../../viewmodels/metrics';
import { decimalFormat } from '../../formatters/numberFormatters';
import { newsQueryFormat } from '../../formatters/dateFormatters';

import createCandlesticksViewModel from '../../viewmodels/candlesticks';
import getPercentageChange from '../../helpers/percentageChange';

import { selectItemInList, watchlistSlice } from '../../store/watchlist';

const chartDimension = Dimensions.get('window').width;
const metricWidth = (Dimensions.get('window').width - 32) / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  companyName: {
    flex: 1,
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  chart: {
    height: chartDimension - 100,
    width: chartDimension,
  },
  chartLabel: {
    color: Colors.secondaryLabel,
    fontSize: 16,
    paddingLeft: 16,
  },
  metrics: {
    width: chartDimension,
    padding: 16,
  },
  metric: {
    flexDirection: 'row',
    padding: 2,
    width: metricWidth,
  },
  metricLabel: {
    color: Colors.white,
    fontSize: 14,
  },
  metricValue: {
    color: Colors.secondaryLabel,
    fontSize: 14,
    marginLeft: 4,
  },
  newsHeader: {
    backgroundColor: Colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    flex: 0,
    justifyContent: 'center',
    height: 40,
    padding: 5,
    borderRadius: 10,
  },
  addText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

type MetricProps = {
  item: Metric;
};

const MetricItem = ({ item }: MetricProps) => (
  <View style={styles.metric}>
    <Text style={styles.metricLabel}>{`${item.label || ''}:`}</Text>
    <Text style={styles.metricValue}>
      {decimalFormat(item.value)}
    </Text>
  </View>
);

type MetricsProps = {
  metrics: Array<Metric>;
};

const Metrics = ({ metrics }: MetricsProps) => {
  return (
    <FlatList
      data={metrics}
      keyExtractor={item => item.label}
      numColumns={2}
      renderItem={({item}) => <MetricItem item={item} />}
      scrollEnabled={false}
    />
  );
};

type NewsHeaderProps = {
  symbol: string;
  companyName: string;
};

const NewsHeader = ({ symbol, companyName }: NewsHeaderProps) => {
  const dispatch = useDispatch();
  const watchingAlready = useSelector(selectItemInList(symbol));
  const onAdd = () => {
    if (!watchingAlready) {
      dispatch(watchlistSlice.actions.addItem({ symbol, companyName }));
    }
  };

  return (
    <View style={styles.newsHeader}>
      <Title text={symbol} />
      {!watchingAlready && (
        <Pressable onPress={onAdd} style={styles.addButton}>
          <Text style={styles.addText}>+ Add to Watchlist</Text>
        </Pressable>
      )}
    </View>
  );
};

type StockDetailProps = {
  navigation: any;
  route: {
    params: {
      symbol: string;
      companyName: string;  
    }
  }
};

const StockDetail = ({ navigation, route: { params: { symbol, companyName } }  }: StockDetailProps) => {
  const [fromNewsDate, toNewsDate] = [moment().subtract(3, 'days'), moment()];
  const { data: companyNews } = useGetCompanyNewsQuery({ symbol, fromDate: newsQueryFormat(fromNewsDate), toDate: newsQueryFormat(toNewsDate) });

  const [fromCandleDate, toCandleDate] = [moment().subtract(4, 'days'), moment()];
  const { data } = useGetCandlesticksQuery({ symbol, fromDate: fromCandleDate.unix(), toDate: toCandleDate.unix() });
  const candlesticks = createCandlesticksViewModel(data);
  const percentChange = getPercentageChange(candlesticks);

  const { data: metrics } = useGetMetricsQuery(symbol);

  const onSelectNewsStory = (item: NewsItemData) => {
    navigation.navigate('WebView', { url: item.url });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.companyName}>{companyName}</Text>
        <Button title="Close" onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.chart}>
        <LineChart
          data={candlesticks.reverse().map(candle => candle.close)}
          showAxis={true}
          showLegend={true}
          days={4}
          fillColor={percentChange < 0 ? 'red' : 'green'}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.metrics}>
        {metrics && <Metrics metrics={metricsViewModel(metrics.metric)} />}
      </View>
      <News
        HeaderComponent={() => <NewsHeader symbol={symbol} companyName={companyName} />} 
        items={companyNews} 
        onSelect={onSelectNewsStory}
      />
    </View>
  );
};

export default StockDetail;
