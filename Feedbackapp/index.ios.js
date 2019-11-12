/**
 * With newer versions of React-Native there doesn't have to be an index.ios.js file, because all the code that is needed
 * is normally within the index.js file. However, this feel had to be added to fix problems while running code. 
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
