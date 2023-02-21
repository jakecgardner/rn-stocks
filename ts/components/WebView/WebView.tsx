import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  header: {
    height: 40,
    flexDirection: 'row',
  },
});

type WebViewProps = {
  navigation: any;
  route: {
    params: {
      url: string;
    }
  }
};

const _WebView = ({ navigation, route }: WebViewProps) => {
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
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
      <WebView source={{ uri: route.params.url }} />
    </View>
  );
};

export default _WebView;