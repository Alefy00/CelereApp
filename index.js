/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import moment from 'moment-timezone';
// Defina o fuso horário para 'America/Sao_Paulo' (fuso horário do Brasil)
moment.tz.setDefault('America/Sao_Paulo');

AppRegistry.registerComponent(appName, () => App);
