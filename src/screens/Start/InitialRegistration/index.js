/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useMemo } from 'react';
import { Button, Text, View, TextInput, Alert, Modal } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Definindo constantes para strings usadas repetidamente
const API_URL = 'https://api.celereapp.com.br/config/empreendedor/';
const SUCCESS_MESSAGE = 'Número registrado com sucesso!';
const ERROR_MESSAGE = 'Erro ao registrar o número. Tente novamente.';
const DUPLICATE_NUMBER_MESSAGE = 'Este número já foi registrado. Redirecionando para o menu...';
const CONNECTION_ERROR_MESSAGE = 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.';

const InitialRegistration = ({ navigation }) => {
  const [ddi, setDdi] = useState('55');
  const [isoCode, setIsoCode] = useState('BR');
  const [ddd, setDdd] = useState('');
  const [number, setNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Mapeamento de DDI para código ISO
  const ddiToIso = useMemo(() => ({
    '1': 'US',
    '55': 'BR',
    '44': 'GB',
    '91': 'IN',
  }), []);

  // Função para lidar com mudanças no campo DDI
  const handleDdiChange = useCallback((text) => {
    setDdi(text);
    const trimmedDdi = text.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (ddiToIso[trimmedDdi]) {
      setIsoCode(ddiToIso[trimmedDdi]);
    } else {
      setIsoCode('');
    }
  }, [ddiToIso]);

  // Função para validar os campos
  const validateFields = useCallback(() => {
    if (!ddi || !ddd || !number) {
      setModalMessage('Todos os campos devem ser preenchidos.');
      setModalVisible(true);
      return false;
    }
    if (!/^\d+$/.test(ddi) || !/^\d+$/.test(ddd) || !/^\d+$/.test(number)) {
      setModalMessage('DDI, DDD e Número de Celular devem conter apenas números.');
      setModalVisible(true);
      return false;
    }
    return true;
  }, [ddi, ddd, number]);

  // Função para lidar com a resposta da API
  const handleApiResponse = useCallback(async (response) => {
    console.log('Resposta da API no handleApiResponse:', response);
    const { message, code_message } = response.data;
    if (response.status === 201 && code_message === 'success') {
      await AsyncStorage.setItem('userPhone', JSON.stringify({ ddi, ddd, number }));
      Alert.alert('Sucesso', SUCCESS_MESSAGE, [
        { text: 'OK', onPress: () => navigation.navigate('InitialCode') }
      ]);
    } else {
      setModalMessage(message || ERROR_MESSAGE);
      setModalVisible(true);
    }
  }, [ddi, ddd, number, navigation]);

  // Função para verificar se o número de telefone já está cadastrado no banco de dados
  const checkPhoneNumberExists = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}?ddi=${ddi}&ddd=${ddd}&celular=${number}`);
      console.log('Resposta da verificação:', response);

      if (response.status === 200 && response.data.code_message === 200 && response.data.message === 'success' && response.data.data.length > 0) {
        await AsyncStorage.setItem('userPhone', JSON.stringify({ ddi, ddd, number }));
        Alert.alert('Aviso', DUPLICATE_NUMBER_MESSAGE, [
          { text: 'OK', onPress: () => navigation.navigate('MainTab') }
        ]);
        return true;
      }
    } catch (error) {
      if (error.response) {
        console.log('Erro na resposta da verificação:', error.response.data);
        setModalMessage(`Erro na verificação: ${error.response.data.message || error.response.data}`);
      } else {
        console.log('Erro ao verificar o número de telefone:', error.message);
        setModalMessage('Erro ao verificar o número de telefone.');
      }
      setModalVisible(true);
    }
    return false;
  }, [ddi, ddd, number, navigation]);

  // Função para enviar os dados para a API
  const handleSend = useCallback(async () => {
    if (!validateFields()) return;

    const exists = await checkPhoneNumberExists();
    if (exists) return;

    try {
      console.log('Enviando dados para a API:', { ddi, ddd, celular: number });

      const response = await axios.post(API_URL, {
        ddi,
        ddd,
        celular: number,
      });

      console.log('Resposta da API no handleSend:', response);
      if (response.status === 201) {
        await AsyncStorage.setItem('userPhone', JSON.stringify({ ddi, ddd, number }));
        navigation.navigate('InitialCode');
      } else {
        await handleApiResponse(response);
      }

    } catch (error) {
      if (error.response) {
        console.log('Erro na resposta da API:', error.response.data);
        setModalMessage(`Erro na API: ${error.response.data.message || error.response.data}`);
      } else {
        console.log('Erro ao conectar à API no handleSend:', error.message);
        setModalMessage(CONNECTION_ERROR_MESSAGE);
      }
      setModalVisible(true);
    }
  }, [validateFields, checkPhoneNumberExists, handleApiResponse, ddi, ddd, number]);

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
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
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
