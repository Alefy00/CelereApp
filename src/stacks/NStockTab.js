import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import NStockCustomTabBar from '../components/NStockCustomTabBar';

import Graph from '../screens/controls/MainMenu/YourOperation/NStock/Graph';
import Download from '../screens/controls/MainMenu/YourOperation/Stock/Download';
import MenuStock from '../screens/controls/MainMenu/YourOperation/Stock/Menu';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={props => <NStockCustomTabBar {...props} />}
    initialRouteName="Graph"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Graph" component={Graph} />
    <Tab.Screen name="Download" component={Download} />
    <Tab.Screen name="MenuStock" component={MenuStock} />
  </Tab.Navigator>
);
