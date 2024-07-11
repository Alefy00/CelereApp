import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import StockCustomTabBar from '../components/StockCustomTabBar';

import Graph from '../screens/controls/MainMenu/YourOperation/Stock/Graph';
import Download from '../screens/controls/MainMenu/YourOperation/Stock/Download';
import MenuStock from '../screens/controls/MainMenu/YourOperation/Stock/Menu';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={props => <StockCustomTabBar {...props} />}
    initialRouteName="Graph"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Graph" component={Graph} />
    <Tab.Screen name="Download" component={Download} />
    <Tab.Screen name="MenuStock" component={MenuStock} />
  </Tab.Navigator>
);
