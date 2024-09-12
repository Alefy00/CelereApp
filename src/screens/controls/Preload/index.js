/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Container, LoadingIcon, Text, Copyright} from './styles';
import LogoApp from '../../../assets/images/logo.svg';

const Preload = props => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('CelerePayRegister');
    }, 0);
  }, [navigation]);

  return (
    <Container fundo={'#FADC00'}>
      <StatusBar backgroundColor={'#FADC00'} />
      <LogoApp width="100%" height="110" style={{marginTop: 120}} />
      <LoadingIcon size="large" cor={'#000000'} />
      <Text cor={'#000000'}>versão: 0.0.1</Text>
      <Copyright cor={'#000000'}>
        &copy; Todos os direitos reservados. CelereApp 2024.
      </Copyright>
    </Container>
  );
};

export default Preload;
