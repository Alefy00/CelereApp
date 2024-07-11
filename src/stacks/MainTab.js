import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Resumo from '../screens/controls/Resume';
import Vencendo from '../screens/controls/Expiring';

import Microphone from '../screens/controls/Microphone';

import FluxoCaixa from '../screens/controls/CashFlow';
import Menu from '../screens/controls/MainMenu';

const Tab = createBottomTabNavigator();

export default () => (
  <Tab.Navigator
    tabBar={props => <CustomTabBar {...props} />}
    initialRouteName="Resumo"
    screenOptions={{
      headerShown: false,
    }}>
    <Tab.Screen name="Resumo" component={Resumo} />
    <Tab.Screen name="Vencendo" component={Vencendo} />

    <Tab.Screen name="Microphone" component={Microphone} />

    <Tab.Screen name="FluxoCaixa" component={FluxoCaixa} />
    <Tab.Screen name="Menu" component={Menu} />
  </Tab.Navigator>
);
