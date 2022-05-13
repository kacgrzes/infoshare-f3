import { AppRegistry, LogBox, Platform } from 'react-native';
import { Root } from './Root';
import { instance } from '@infoshare-f3/api-client';

instance.defaults.baseURL =
  Platform.OS === 'ios' ? 'http://localhost:3333/' : 'http://10.0.2.2:3333/';

LogBox.ignoreLogs(['Non-serializable']);

AppRegistry.registerComponent('TweeterMobile', () => Root);
