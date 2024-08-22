/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';  // Estilização será ajustada conforme o novo design
import BarTop3 from '../../../components/BarTop3';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';

const API_URL_SALDO = 'https://api.celereapp.com.br/cad/saldo_caixa_inicial/';

const OpeningBalance = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [cash, setCash] = useState('');
  const [bank, setBank] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const calculateTotalBalance = () => {
      const cashValue = parseFloat(cash) || 0;
      const bankValue = parseFloat(bank) || 0;
      setTotalBalance(cashValue + bankValue);
    };

    calculateTotalBalance();
  }, [cash, bank]);

  const validateFields = () => {
    if (!cash || isNaN(cash) || parseFloat(cash) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para "Valor em Espécie".');
      return false;
    }
    if (!bank || isNaN(bank) || parseFloat(bank) <= 0) {
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
        empreendedor_id: userData.id,
        valor_especie: parseFloat(cash).toFixed(2),
        saldo_banco: parseFloat(bank).toFixed(2),
      });

      if (response.status === 200 && response.data.status === 'success') {
        Alert.alert('Sucesso', 'Saldo inicial salvo com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('Start') }
        ]);
      } else {
        Alert.alert('Erro', response.data.message || 'Erro ao salvar o saldo inicial. Tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
      Alert.alert('Erro', 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
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
            onChangeText={setCash}
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
            onChangeText={setBank}
            placeholderTextColor="#A6A6A6"
          />
        </View>

        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceText}>Saldo inicial total:</Text>
          <Text style={styles.totalBalanceValue}>{`R$${totalBalance.toFixed(2)}`}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
        <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.buttonText}>Salvar Tudo</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}
      </ScrollView>
    </View>
  );
};

export default OpeningBalance;
