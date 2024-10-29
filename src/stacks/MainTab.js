/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Keyboard } from 'react-native';  // Importe o Keyboard da API react-native

import CustomTabBar from '../components/CustomTabBar';
import Resumo from '../screens/controls/Resume';
import Vencendo from '../screens/controls/Expiring';
import Microphone from '../screens/controls/Microphone';
import FluxoCaixa from '../screens/controls/CashFlow';
import Menu from '../screens/controls/MainMenu';

const Tab = createBottomTabNavigator();

export default () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);  // Oculta o tab bar quando o teclado aparece
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);  // Mostra o tab bar quando o teclado desaparece
      }
    );

    return () => {
      // Remove os listeners ao desmontar o componente
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      tabBar={props => !isKeyboardVisible && <CustomTabBar {...props} />}  // Oculta o tab bar se o teclado estiver visível
      initialRouteName="Resumo"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Resumo" component={Resumo} />
      <Tab.Screen name="Vencendo" component={Vencendo} />
    
      <Tab.Screen name="FluxoCaixa" component={FluxoCaixa} />
      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};
