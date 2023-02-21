import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../App';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

import Title from '../Title/Title';
import SearchBar from '../SearchBar/SearchBar';
import Watchlist, { type WatchlistItemData } from '../Watchlist/Watchlist';
import SearchResults from '../SearchResults/SearchResults';
import News, { type NewsItemData } from '../News/News';

import Colors from '../../constants/colors';

import { useGetTopStoriesQuery, useSearchQuery } from '../../services/finnhub';
import { selectWatchlist } from '../../store/watchlist';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  header: {
    padding: 16,
  },
  body: {
    flex: 1,
  },
});

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const timer = useRef<NodeJS.Timeout>();
  const [query, setQueryText] = useState('');
  const [skip, setSkip] = useState(true);

  const watchlistItems = useSelector(selectWatchlist);

  const { data: topStories } = useGetTopStoriesQuery({});
  const { data: searchResponse } = useSearchQuery(query, { skip });

  const onSearchTextChange = (text: string) => {
    setQueryText(text.toUpperCase());
    setSkip(true);
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setSkip(false);
    }, 300);
  };

  const onSelectStockItem = (item: WatchlistItemData) => {
    navigation.navigate(
      'StockDetailNavigator',
      { 
        screen: 'StockDetail',
        params: { symbol: item.symbol, companyName: item.companyName },
      },
    );
  };

  const onSelectTopStory = (item: NewsItemData) => {
    navigation.navigate('WebView', { url: item.url });
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }
    ]}>
      <View style={styles.header}>
        {query === '' && <Title text="Stocks" />}
        <SearchBar
          text={query}
          onChange={onSearchTextChange}
        />
      </View>
      <View style={styles.body}>
        {query
          ? <SearchResults items={searchResponse?.result} onSelect={onSelectStockItem} />
          : (
              <View style={styles.body}>
                <Watchlist items={watchlistItems} onSelect={onSelectStockItem} />
                <News 
                  HeaderComponent={() => <Title text="Top Stories" />} 
                  items={topStories} 
                  onSelect={onSelectTopStory} 
                />
              </View>
            )
        }
      </View>
    </View>
  );
};

export default HomeScreen;