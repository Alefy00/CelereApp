/* eslint-disable prettier/prettier */
import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './src/services/queryClient';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import SplashScreen from 'react-native-splash-screen';
import moment from 'moment-timezone';

// Defina o fuso horário para 'America/Sao_Paulo' (fuso horário do Brasil)
moment.tz.setDefault('America/Sao_Paulo');

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </QueryClientProvider>
    );
  };
};
