/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, Alert, Modal, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryFlag from 'react-native-country-flag';
import LogoApp from '../../../assets/images/logo.svg';
import ProgressBar from '../components/ProgressBar';

import styles from './styles';

const API_URL = 'https://api.celereapp.com.br/config/empreendedor/';

const InitialRegistration = ({ navigation }) => {
  const [ddi, setDdi] = useState('55');
  const [isoCode, setIsoCode] = useState('BR');
  const [ddd, setDdd] = useState('');
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStoredData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('userPhone');
        if (storedData) {
          navigation.navigate('MainTab');
        } else {
          setLoading(false); // Exibir a tela de registro se não há dados armazenados
        }
      } catch (error) {
        console.error('Erro ao verificar os dados armazenados:', error);
        setLoading(false); // Exibir a tela de registro em caso de erro
      }
    };

    checkStoredData();
  }, [navigation]);

  const handleDdiChange = (text) => {
    setDdi(text);
    const trimmedDdi = text.replace(/\D/g, '');
    const isoCodes = { '1': 'US', '55': 'BR', '44': 'GB', '91': 'IN' };
    setIsoCode(isoCodes[trimmedDdi] || '');
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const validateFields = () => {
    if (!ddi || !ddd || !number) {
      showModal('Todos os campos devem ser preenchidos.');
      return false;
    }
    if (!/^\d+$/.test(ddi) || !/^\d+$/.test(ddd) || !/^\d+$/.test(number)) {
      showModal('DDI, DDD e Número de Celular devem conter apenas números.');
      return false;
    }
    return true;
  };

  const handleSend = async () => {
    if (!validateFields()) return;

    try {
      console.log('Fazendo requisição para a API...');
      const response = await axios.post(API_URL, {
        ddi,
        ddd,
        celular: number,
        usuario: 1
      });

      console.log('Resposta da API:', response.data);

      if (response.status === 201 && response.data.status === 'success') {
        const { id, codigo_ativacao } = response.data.data;
        const newUserData = {
          id,
          ddi,
          ddd,
          number,
          isValidated: false,
          codigo_ativacao,
        };
        await AsyncStorage.setItem('userPhone', JSON.stringify(newUserData));
        console.log('Empreendedor registrado com sucesso. Redirecionando para InitialCode.');
        navigation.navigate('InitialCode'); // Agora não precisamos passar userData
      } else {
        showModal(response.data.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      showModal('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LogoApp width="100%" height="110" style={{marginTop: 100, marginBottom: 50}} />
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={1} totalSteps={4} />
      <Text style={styles.text}>Informe o seu Telefone: </Text>
      <View style={styles.inputContainer}>
        {isoCode ? <CountryFlag isoCode={isoCode} size={25} /> : null}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="DDI"
          value={ddi}
          onChangeText={handleDdiChange}
        />
        <TextInput
          style={styles.input}
          placeholder='DDD'
          value={ddd}
          onChangeText={setDdd}
        />
        <TextInput
          style={styles.inputNumber}
          placeholder='0 0000-0000'
          value={number}
          onChangeText={setNumber}
        />
      </View>
      <Button title="Enviar" onPress={handleSend} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button
              title="OK"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InitialRegistration;
