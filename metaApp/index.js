/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Suppress the specific warning
LogBox.ignoreLogs(['Support for defaultProps will be removed']);

AppRegistry.registerComponent(appName, () => App);
