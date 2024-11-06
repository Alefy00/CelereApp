/* eslint-disable prettier/prettier */
import React, { useEffect, useCallback, useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, LoadingIcon, Text, Copyright } from './styles';
import LogoApp from '../../../assets/images/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../../services/apiConfig';

const Preload = props => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  // Função para verificar se os dados do usuário estão armazenados
  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userPhone');
        if (storedData) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainTab' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }],
          });
        }
      } catch (error) {
        console.error('Erro ao verificar os dados armazenados:', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      } finally {
        setLoading(false);
      }
    };

    checkStoredData();
  }, [navigation]);

  return (
    <Container fundo={'#FADC00'}>
      <StatusBar backgroundColor={'#FADC00'} />
      <LogoApp width="100%" height="110" style={{ marginTop: 120 }} />
      <LoadingIcon size="large" cor={'#000000'} animating={loading} />
      <Text cor={'#000000'}>versão: 0.0.1</Text>
      <Copyright cor={'#000000'}>
        &copy; Todos os direitos reservados. CelereApp 2024.
      </Copyright>
    </Container>
  );
};

export default Preload;
