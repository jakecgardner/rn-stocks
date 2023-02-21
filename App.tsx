// import StorybookUIRoot from './.ondevice/Storybook';
// export {StorybookUIRoot as default};

import { Provider } from 'react-redux';
import { store } from './ts/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './ts/components/HomeScreen/HomeScreen';
import WebView from './ts/components/WebView/WebView';
import StockDetail from './ts/components/StockDetail/StockDetail';

export type RootStackParamList = {
  Home: undefined;
  WebView: {
    url: string;
  };
  StockDetail: {
    symbol: string;
    companyName: string;
  };
  StockDetailNavigator: {
    screen: string;
    params: {
      symbol: string;
      companyName: string;
    };
  },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackDetailNavigator = () => (
  <Stack.Navigator
    initialRouteName="StockDetail"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Group>
      <Stack.Screen name="StockDetail" component={StockDetail} />
      <Stack.Screen name="WebView" component={WebView} />
    </Stack.Group>
  </Stack.Navigator>
);

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="WebView" component={WebView} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="StockDetailNavigator" component={StackDetailNavigator} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
