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
  const [phoneData, setPhoneData] = useState({
    ddi: '55',
    isoCode: 'BR',
    ddd: '',
    number: '',
  });

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

  // Função para verificar se o usuário existe (pode ser chamada em outros momentos)
  const checkUserExists = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/config/empreendedor/`, {
        params: {
          ddi: phoneData.ddi,
          ddd: phoneData.ddd,
          celular: phoneData.number,
        },
      });

      if (response.data.status === 'success' && response.data.data.length > 0) {
        const userData = response.data.data[0];
        const newUserData = {
          id: userData.id,
          ...phoneData,
          isValidated: true,
          codigo_ativacao: userData.codigo_ativacao,
        };

        await AsyncStorage.setItem('userPhone', JSON.stringify(newUserData));

        if (userData.empresa) {
          await AsyncStorage.setItem('empresaId', userData.empresa.toString());
          console.log('ID da empresa armazenado:', userData.empresa);
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTab' }],
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error.message);
      Alert.alert('Erro', 'Erro ao verificar o usuário. Tente novamente.');
      return false;
    }
  }, [phoneData, navigation]);

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
