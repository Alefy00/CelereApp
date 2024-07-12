import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Preload from '../screens/controls/Preload';

import Expiring from '../screens/controls/Expiring';
import CashFlow from '../screens/controls/CashFlow';

import MainMenu from '../screens/controls/MainMenu';
import Stock from '../screens/controls/MainMenu/YourOperation/Stock/Graph';
import Product from '../screens/controls/MainMenu/YourOperation/Stock/Product';
import NProduct from '../screens/controls/MainMenu/YourOperation/NStock/Graph/Product';

import MainTab from './MainTab';
import StockTab from './StockTab';
import NStockTab from './NStockTab';
import Start from '../screens/controls/Start';

import InitialRegistration from '../screens/Start/InitialRegistration';
import InitialCode from '../screens/Start/InitialCode';
import InitialBranch from '../screens/Start/InitialBranch';

const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator
    initialRouteName="Preload"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Preload" component={Preload} options={{title: ''}} />

    <Stack.Screen name="Expiring" component={Expiring} />

    <Stack.Screen name="CashFlow" component={CashFlow} />

    <Stack.Screen name="MainMenu" component={MainMenu} />
    <Stack.Screen name="Stock" component={Stock} />
    {/* <Stack.Screen name="Product" component={Product} /> */}
    <Stack.Screen name="NProduct" component={NProduct} />

    <Stack.Screen name="MainTab" component={MainTab} />
    <Stack.Screen name="StockTab" component={StockTab} />
    <Stack.Screen name="NStockTab" component={NStockTab} />

    <Stack.Screen name="Start" component={Start} />

    <Stack.Screen name="InitialRegistration" component={InitialRegistration} />
    <Stack.Screen name="InitialCode" component={InitialCode} />
    <Stack.Screen name="InitialBranch" component={InitialBranch} />
  </Stack.Navigator>
);
