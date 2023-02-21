import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';

import { WatchlistItemData } from '../Watchlist/Watchlist';

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
  labelText: {
    color: Colors.white,
  },
});

export type SearchResultsItemData = {
  symbol: string;
  description: string;
};

type SearchResultsItemProps = {
  data: SearchResultsItemData;
  onSelect: () => void;
};

const SearchResultsItem = ({data, onSelect}: SearchResultsItemProps) => {
  return (
    <View style={styles.row}>
      <Pressable onPress={onSelect}>
        <View style={styles.labels}>
          <Text style={[styles.labelText, {fontWeight: 'bold'}]}>
            {data.symbol}
          </Text>
          <Text style={styles.labelText}>{data.description}</Text>
        </View>
      </Pressable>
    </View>
  );
};

type SearchResultsProps = {
  items: Array<SearchResultsItemData>;
  onSelect: (item: WatchlistItemData) => void;
};

const ItemSeparator = () => <View style={styles.separator} />;

const SearchResults = ({ items, onSelect }: SearchResultsProps) => {
  return (
    <View style={styles.listContent}>
      <FlatList
        data={items}
        keyExtractor={item => item.symbol}
        renderItem={({item}) => (
          <SearchResultsItem data={item} onSelect={() => onSelect({ symbol: item.symbol, companyName: item.description })} />
        )}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default SearchResults;
