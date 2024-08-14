/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Button, Text, View, TextInput, Alert, Modal, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountryFlag from 'react-native-country-flag';
import LogoApp from '../../../assets/images/logo.svg';
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
    const checkRegistration = async () => {
      try {
        // Recupera os dados do AsyncStorage e converte de JSON para objeto
        const storedData = await AsyncStorage.getItem('userPhone');
        if (storedData) {
          const userData = JSON.parse(storedData);
          navigation.navigate('MainTab', { userData }); // Passa os dados do usuário para a MainTab
          return;
        }

        // Verifica se o número já está no banco de dados
        const response = await axios.get(`${API_URL}?ddi=${ddi}&ddd=${ddd}&celular=${number}`);
        if (response.status === 200 && response.data.data.length > 0) {
          const userData = response.data.data[0];
          await AsyncStorage.setItem('userPhone', JSON.stringify(userData));
          navigation.navigate('MainTab', { userData });
        } else {
          setLoading(false); // Prosseguir com o registro se o número não está no banco
        }
      } catch (error) {
        setLoading(false); // Mostrar tela de registro em caso de erro de conexão
      }
    };

    checkRegistration();
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
      const response = await axios.post(API_URL, {
        ddi,
        ddd,
        celular: number,
      });

      if (response.status === 201 && response.data.code_message === 'success') {
        const userData = { ddi, ddd, number };
        await AsyncStorage.setItem('userPhone', JSON.stringify(userData));
        Alert.alert('Sucesso', 'Número registrado com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('InitialCode', { userData }) }
        ]);
      } else {
        showModal(response.data.message || 'Erro ao registrar. Tente novamente.');
      }
    } catch (error) {
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
