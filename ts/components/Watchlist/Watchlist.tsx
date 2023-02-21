import React from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import LineChart from '../LineChart/LineChart';
import Colors from '../../constants/colors';
import { decimalFormat } from '../../formatters/numberFormatters';
import getPercentageChange from '../../helpers/percentageChange';

import { watchlistSlice } from '../../store/watchlist';

import { useGetCandlesticksQuery } from '../../services/finnhub';
import createCandlesticksViewModel from '../../viewmodels/candlesticks';

const chartWidth = Dimensions.get('window').width * 3/8;
const chartHeight = 34;

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    paddingLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.secondaryBackground,
  },
  row: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  labels: {
    display: 'flex',
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  chart: {
    height: chartHeight,
    width: chartWidth,
  },
  prices: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  labelText: {
    color: Colors.white,
  },
  boldText: {
    fontWeight: 'bold',
  },
  deleteButton: {
    justifyContent: 'center',
    backgroundColor: 'red',
    paddingHorizontal: 5,
  },
  deleteText: {
    color: 'white',
  },
});

export type WatchlistItemData = {
  symbol: string;
  companyName: string;
};

type WatchlistItemProps = {
  item: WatchlistItemData;
  onSelect: () => void;
};

const WatchlistItem = ({ item, onSelect }: WatchlistItemProps) => {
  const [fromCandleDate, toCandleDate] = [moment().subtract(4, 'days'), moment()];
  const { data } = useGetCandlesticksQuery({ symbol: item.symbol, fromDate: fromCandleDate.unix(), toDate: toCandleDate.unix() });
  const candlesticks = createCandlesticksViewModel(data);
  const percentChange = getPercentageChange(candlesticks);

  return (
    <Pressable onPress={onSelect} style={styles.row}>
      <View style={styles.labels}>
        <Text style={[styles.labelText, styles.boldText]}>
          {item.symbol}
        </Text>
        <Text style={styles.labelText} numberOfLines={1}>{item.companyName}</Text>
      </View>
      <View style={styles.chart}>
        <LineChart
          data={candlesticks.reverse().map(candle => candle.close)}
          showAxis={false}
          showLegend={false}
          days={4}
          fillColor={percentChange < 0 ? 'red' : 'green'}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.prices}>
        <Text style={styles.labelText}>
          {candlesticks.length > 0 ? candlesticks[0].close : ''}
        </Text>
        <Text
          style={[
            styles.labelText,
            { backgroundColor: percentChange < 0 ? 'red' : 'green' },
          ]}>
          {candlesticks.length > 0 ? `${decimalFormat(percentChange)}%` : ''}
        </Text>
      </View>
    </Pressable>
  );
};

type WatchlistProps = {
  items: Array<WatchlistItemData>;
  onSelect: (item: WatchlistItemData) => void;
};

const ItemSeparator = () => <View style={styles.separator} />;

type DeleteButtonProps = {
  onPress: () => void;
};

const DeleteButton = ({ onPress }: DeleteButtonProps) => (
  <Pressable onPress={onPress} style={styles.deleteButton}>
    <Text style={styles.deleteText}>Delete</Text>
  </Pressable>
);

const Watchlist = ({ items, onSelect }: WatchlistProps) => {
  const dispatch = useDispatch();
  const onDelete = (item: WatchlistItemData) => {
    dispatch(watchlistSlice.actions.deleteItem(item.symbol));
  }
  return (
    <View style={styles.listContent}>
      <FlatList
        data={items}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => (
          <Swipeable renderRightActions={() => <DeleteButton onPress={() => onDelete(item)} />}>
            <WatchlistItem item={item} onSelect={() => onSelect(item)} />
          </Swipeable>
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default Watchlist;
