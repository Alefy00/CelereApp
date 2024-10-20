/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform, Alert, ActivityIndicator, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';
import BarTop3 from '../../../components/BarTop3';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';

const API_URL_SALDO = 'https://api.celere.top/cad/saldo_caixa_inicial/';

const OpeningBalance = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [cash, setCash] = useState('');
  const [bank, setBank] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controle do primeiro modal
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false); // Estado para controle do segundo modal
  const [savedTotalBalance, setSavedTotalBalance] = useState(0); // Estado para armazenar o valor salvo e exibir no modal

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          Alert.alert('Erro', 'Dados do usuário não encontrados.');
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  // Função para formatar os valores em Real (R$)
  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedValue = (cleanedValue / 100).toFixed(2); // Converte para valor decimal com 2 casas
    return formattedValue
      .replace('.', ',') // Troca ponto por vírgula para decimais
      .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos para os milhares
  };

  const handleCashInput = (value) => {
    const formattedValue = formatCurrency(value);
    setCash(formattedValue);
  };

  const handleBankInput = (value) => {
    const formattedValue = formatCurrency(value);
    setBank(formattedValue);
  };

  useEffect(() => {
    const calculateTotalBalance = () => {
      const cashValue = parseFloat(cash.replace(/\./g, '').replace(',', '.')) || 0;
      const bankValue = parseFloat(bank.replace(/\./g, '').replace(',', '.')) || 0;
      setTotalBalance(cashValue + bankValue);
    };

    calculateTotalBalance();
  }, [cash, bank]);

  // Função para limpar os inputs após o redirecionamento
  const clearInputs = () => {
    setCash('');
    setBank('');
    setTotalBalance(0);
  };

  const validateFields = () => {
    if (!cash || parseFloat(cash.replace(/\./g, '').replace(',', '.')) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para "Valor em Espécie".');
      return false;
    }
    if (!bank || parseFloat(bank.replace(/\./g, '').replace(',', '.')) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para "Saldo no Banco".');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateFields()) return;
  
    if (!userData || !userData.id) {
      Alert.alert('Erro', 'Dados do usuário não carregados. Tente novamente.');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await axios.post(API_URL_SALDO, {
        empresa_id: userData.id, 
        valor_especie: cash.replace(/\./g, '').replace(',', '.'), // Remove a formatação para enviar
        saldo_banco: bank.replace(/\./g, '').replace(',', '.'), // Remove a formatação para enviar
      });
  
      if (response.status === 201 && response.data.status === 'success') {
        await AsyncStorage.setItem('initialBalanceAdded', 'true');
        setSavedTotalBalance(totalBalance); // Armazena o saldo total para exibir no modal
        setIsModalVisible(true); // Exibe o primeiro modal ao salvar o saldo com sucesso
      } else {
        Alert.alert('Erro', response.data.message || 'Erro ao salvar o saldo inicial. Tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
        Alert.alert('Erro', error.response.data.message || 'Erro na resposta da API.');
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
        Alert.alert('Erro', 'Erro na requisição. Verifique sua conexão e tente novamente.');
      } else {
        console.error('Erro desconhecido:', error.message);
        Alert.alert('Erro', 'Erro desconhecido: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFirstModalConfirm = () => {
    setIsModalVisible(false); // Fecha o primeiro modal
    setIsSecondModalVisible(true); // Abre o segundo modal
  };

  const handleSecondModalConfirm = () => {
    setIsSecondModalVisible(false); // Fecha o segundo modal
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFCF5' }}>
      <View style={{ height: Platform.OS === 'android' ? 55 : 105 }}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>
      <ScrollView contentContainerStyle={styles.containerMain}>
        <Text style={styles.headerText}>Adicione seu saldo de caixa inicial</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Quanto seu negócio tem de dinheiro em espécie?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite o valor"
            value={cash}
            onChangeText={handleCashInput}
            placeholderTextColor="#A6A6A6"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Quanto seu negócio tem de saldo no banco?</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Digite o valor'
            value={bank}
            onChangeText={handleBankInput}
            placeholderTextColor="#A6A6A6"
          />
        </View>

        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceText}>Saldo inicial total:</Text>
          <Text style={styles.totalBalanceValue}>{`R$ ${formatCurrency(totalBalance.toFixed(2))}`}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.buttonText}>Salvar Tudo</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}
      </ScrollView>

      {/* Primeiro Modal para confirmar o saldo inicial */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleFirstModalConfirm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Seu saldo inicial é de</Text>
            <Text style={styles.modalBalance}>{`R$ ${formatCurrency(savedTotalBalance.toFixed(2))}`}</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleFirstModalConfirm}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Segundo Modal "Lançado!" */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSecondModalVisible}
        onRequestClose={handleSecondModalConfirm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <Icon name="checkmark-circle" size={100} color={COLORS.green} />
            <Text style={styles.secondModalText}>Lançado!</Text>
            <TouchableOpacity style={styles.confirmButton2} onPress={handleSecondModalConfirm}>
              <Text style={styles.confirmButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default OpeningBalance;
