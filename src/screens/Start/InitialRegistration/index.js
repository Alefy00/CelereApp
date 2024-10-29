/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Text, View, TextInput, Modal, ActivityIndicator, TouchableOpacity } from 'react-native';
import BarTop3 from '../../../components/BarTop3';
import { COLORS } from '../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoApp from '../../../assets/images/logo.svg';
import ProgressBar from '../components/ProgressBar';
import styles from './styles';
import { API_BASE_URL } from '../../../services/apiConfig';

const InitialRegistration = ({ navigation }) => {
  const [phoneData, setPhoneData] = useState({
    ddi: '55',
    isoCode: 'BR',
    ddd: '',
    number: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const numberInputRef = useRef(null);

  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userPhone');
        if (storedData) {
          navigation.navigate('MainTab');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro ao verificar os dados armazenados:', error);
        setLoading(false);
      }
    };

    checkStoredData();
  }, [navigation]);

  const handleDdiChange = useCallback((text) => {
    const trimmedDdi = text.replace(/\D/g, '').slice(0, 2);
    const isoCodes = { '1': 'US', '55': 'BR', '44': 'GB', '91': 'IN' };
    setPhoneData(prevState => ({
      ...prevState,
      ddi: trimmedDdi,
      isoCode: isoCodes[trimmedDdi] || '',
    }));
  }, []);

  const handleInputChange = useCallback((name, value) => {
    let maxLength = 0;
    if (name === 'ddd') {
      maxLength = 2;
    } else if (name === 'number') {
      maxLength = 9;
    }
    const trimmedValue = value.replace(/\D/g, '').slice(0, maxLength);
    setPhoneData(prevState => ({ ...prevState, [name]: trimmedValue }));

    // Foca no campo de número se o DDD estiver completo
    if (name === 'ddd' && trimmedValue.length === maxLength) {
      numberInputRef.current.focus();
    }
  }, []);

  const showModal = useCallback((message) => {
    setModalMessage(message);
    setModalVisible(true);
  }, []);

  const validateFields = useCallback(() => {
    const { ddi, ddd, number } = phoneData;
    if (!ddi || !ddd || !number) {
      showModal('Todos os campos devem ser preenchidos.');
      return false;
    }
    if (!/^\d+$/.test(ddi) || !/^\d+$/.test(ddd) || !/^\d+$/.test(number)) {
      showModal('DDI, DDD e Número de Celular devem conter apenas números.');
      return false;
    }
    return true;
  }, [phoneData, showModal]);

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
          // Armazena o ID da empresa
          await AsyncStorage.setItem('empresaId', userData.empresa.toString());
          console.log('ID da empresa armazenado:', userData.empresa);

          // Verifica imediatamente após armazenar
          const empresaData = await AsyncStorage.getItem('empresaId');
          console.log('ID da empresa recuperado do AsyncStorage:', empresaData);
        }
        
        navigation.navigate('MainTab');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao verificar usuário:', error.message);
      showModal('Erro ao verificar o usuário. Tente novamente.');
      return false;
    }
  }, [phoneData, showModal, navigation]);

  const handleSend = useCallback(async () => {
    if (!validateFields()) return;

    const userExists = await checkUserExists();
    if (userExists) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/config/empreendedor/`, {
        ddi: phoneData.ddi,
        ddd: phoneData.ddd,
        celular: phoneData.number,
        usuario: 1,
      });

      if (response.status === 201 && response.data.status === 'success') {
        const { id, codigo_ativacao, empresa } = response.data.data;
        const newUserData = {
          id,
          ...phoneData,
          isValidated: false,
          codigo_ativacao,
        };

        // Armazena os dados do usuário
        await AsyncStorage.setItem('userPhone', JSON.stringify(newUserData));

        if (empresa) {
          // Armazena o ID da empresa
          await AsyncStorage.setItem('empresaId', empresa.toString());
          console.log('ID da empresa armazenado:', empresa);

          // Verifica imediatamente após o armazenamento
          const storedEmpresaId = await AsyncStorage.getItem('empresaId');
          console.log('ID da empresa armazenado no AsyncStorage:', storedEmpresaId);

          // Navegação somente se o ID for armazenado corretamente
          if (storedEmpresaId) {
            navigation.navigate('InitialCode');
          } else {
            console.error('Erro ao armazenar o ID da empresa.');
          }
        }
      } else {
        showModal(response.data.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      showModal('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    }
  }, [phoneData, validateFields, checkUserExists, showModal, navigation]);

  const handleModalClose = () => {
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LogoApp width="100%" height="110" />
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>
      <ProgressBar currentStep={1} totalSteps={4} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Informe seu telefone</Text>
        <View style={styles.cardContainer}>
          <View style={styles.inputWrapper}>
            <View style={styles.ddiContainer}>
              <CountryFlag isoCode={phoneData.isoCode} size={25} />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="+55"
                value={phoneData.ddi}
                onChangeText={(text) => handleDdiChange(text)}
              />
            </View>
            <TextInput
              style={styles.inputDDD}
              placeholder='(XX)'
              keyboardType="numeric"
              value={phoneData.ddd}
              onChangeText={(text) => handleInputChange('ddd', text)}
            />
            <TextInput
              ref={numberInputRef}
              style={styles.inputNumber}
              placeholder='XXXXX-XXXX'
              keyboardType="numeric"
              value={phoneData.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSend}>
            <Icon name="arrow-forward" size={20} color="#000" />
            <Text style={styles.buttonText}>Enviar Código</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>Um código será enviado para o seu celular.</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="OK" onPress={handleModalClose} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InitialRegistration;
