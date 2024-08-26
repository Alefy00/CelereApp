/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, View, TextInput, Modal, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryFlag from 'react-native-country-flag';
import LogoApp from '../../../assets/images/logo.svg';
import ProgressBar from '../components/ProgressBar';

import styles from './styles';

const API_URL = 'https://api.celereapp.com.br/config/empreendedor/';

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
  const [isSuccess, setIsSuccess] = useState(false);

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
    const trimmedDdi = text.replace(/\D/g, '').slice(0, 2); // Limita a 2 dígitos
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
      maxLength = 2; // Limita o DDD a 2 dígitos
    } else if (name === 'number') {
      maxLength = 9; // Limita o número de telefone a 9 dígitos
    }
    const trimmedValue = value.replace(/\D/g, '').slice(0, maxLength); // Limita a entrada conforme necessário
    setPhoneData(prevState => ({ ...prevState, [name]: trimmedValue }));
  }, []);

  const showModal = useCallback((message, success = false) => {
    setModalMessage(message);
    setIsSuccess(success);
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

  const handleSend = useCallback(async () => {
    if (!validateFields()) return;

    try {
      const response = await axios.post(API_URL, {
        ddi: phoneData.ddi,
        ddd: phoneData.ddd,
        celular: phoneData.number,
        usuario: 1,
      });

      if (response.status === 201 && response.data.status === 'success') {
        const { id, codigo_ativacao } = response.data.data;
        const newUserData = {
          id,
          ...phoneData,
          isValidated: false,
          codigo_ativacao,
        };
        await AsyncStorage.setItem('userPhone', JSON.stringify(newUserData));
        
        showModal('Registro realizado com sucesso!', true);
      } else {
        showModal(response.data.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      showModal('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    }
  }, [phoneData, validateFields, showModal]);

  const handleModalClose = () => {
    setModalVisible(false);
    if (isSuccess) {
      navigation.navigate('InitialCode');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LogoApp width="100%" height="110" style={{ marginTop: 100, marginBottom: 50 }} />
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={1} totalSteps={4} />
      <Text style={styles.text}>Informe o seu Telefone: </Text>
      <View style={styles.inputContainer}>
        {phoneData.isoCode ? <CountryFlag isoCode={phoneData.isoCode} size={25} /> : null}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="DDI"
          value={phoneData.ddi}
          onChangeText={(text) => handleDdiChange(text)}
        />
        <TextInput
          style={styles.input}
          placeholder='DDD'
          keyboardType="numeric"
          value={phoneData.ddd}
          onChangeText={(text) => handleInputChange('ddd', text)}
        />
        <TextInput
          style={styles.inputNumber}
          placeholder='0 0000-0000'
          keyboardType="numeric"
          value={phoneData.number}
          onChangeText={(text) => handleInputChange('number', text)}
        />
      </View>
      <Button title="Enviar" onPress={handleSend} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button
              title="OK"
              onPress={handleModalClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InitialRegistration;
