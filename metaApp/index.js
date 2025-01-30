/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


// Suppress the specific warning
LogBox.ignoreLogs([
    'Support for defaultProps will be removed',
    '[Reanimated] Reduced motion setting is enabled on this device.',
    'Failed to create a worklet', // Reanimated warning
    'Cannot read property OnboardingScreen of undefined', // Custom component warning
]);

AppRegistry.registerComponent(appName, () => App);
