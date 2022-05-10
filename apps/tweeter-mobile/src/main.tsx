import { AppRegistry, LogBox } from 'react-native';
import { Root } from './Root';

LogBox.ignoreLogs(['Non-serializable']);

AppRegistry.registerComponent('TweeterMobile', () => Root);
