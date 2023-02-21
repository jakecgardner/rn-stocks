import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';

import Colors from '../../constants/colors';
import { localeFormat } from '../../formatters/dateFormatters';

const imageDimension = Dimensions.get('window').width / 4;
const maxLineWidth = Dimensions.get('window').width / 1.75;

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
    paddingLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.tertiaryBackground,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingRight: 16,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newsView: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  source: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  headline: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'normal',
    marginVertical: 12,
    maxWidth: maxLineWidth,
  },
  date: {
    color: Colors.secondaryLabel,
    fontSize: 12,
  },
  image: {
    borderRadius: 7,
    height: imageDimension,
    width: imageDimension,
  },
});

export type NewsItemData = {
  source: string;
  headline: string;
  datetime: number;
  image: string;
  url: string;
};

type NewsItemProps = {
  data: NewsItemData;
  onSelect: () => void;
};

const NewsItem = ({ data, onSelect }: NewsItemProps) => {
  return (
    <Pressable onPress={onSelect} style={styles.row}>
      <View style={styles.newsView}>
        <Text style={styles.source}>{data.source}</Text>
        <Text style={styles.headline} numberOfLines={2}>
          {data.headline}
        </Text>
        <Text style={styles.date}>
          {localeFormat(moment(data.datetime*1000))}
        </Text>
      </View>
      <Image source={{ uri: data.image }} style={styles.image} />
    </Pressable>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

type NewsProps = {
  items: Array<NewsItemData>;
  onSelect: (item: NewsItemData) => void;
  HeaderComponent: React.ComponentType<any>;
};

const News = ({ HeaderComponent, items = [], onSelect }: NewsProps) => {
  return (
    <View style={styles.listContent}>
      <FlatList
        data={items}
        keyExtractor={item => item.headline}
        renderItem={({item}) => (
          <NewsItem data={item} onSelect={() => onSelect(item)} />
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={HeaderComponent}
      />
    </View>
  );
};

export default News;
