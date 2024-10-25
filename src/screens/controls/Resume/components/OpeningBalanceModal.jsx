/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Modal, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants';
import styles from '../styles'; // Adapte seus estilos ao design enviado
import TimeIcon from '../../../../assets/images/svg/MainMenu/timeIcon.svg';
import { API_BASE_URL } from '../../../../services/apiConfig';

const OpeningBalanceModal = ({ visible, onClose, onBalanceSaved }) => {
  const [empresaId, setEmpresaId] = useState(null);
  const [cash, setCash] = useState('');
  const [bank, setBank] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false); // Adiciona o estado do modal de sucesso

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(Number(storedEmpresaId));
        console.log('ID da empresa recuperado:', storedEmpresaId); // Verifica se o ID foi recuperado corretamente
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
        console.log('ID da empresa não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
  };

  // Carregar o ID da empresa assim que o modal for exibido
  useEffect(() => {
    if (visible) {
      getEmpresaId(); // Busca o ID da empresa quando o modal for aberto
    }
  }, [visible]);

  // Função para formatar valores em moeda
  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = (cleanedValue / 100).toFixed(2);
    return formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const handleCashInput = (value) => {
    setCash(formatCurrency(value));
  };

  const handleBankInput = (value) => {
    setBank(formatCurrency(value));
  };

  // Atualiza o saldo total sempre que o valor em espécie ou no banco mudar
  useEffect(() => {
    const cashValue = parseFloat(cash.replace(/\./g, '').replace(',', '.')) || 0;
    const bankValue = parseFloat(bank.replace(/\./g, '').replace(',', '.')) || 0;
    setTotalBalance(cashValue + bankValue);
  }, [cash, bank]);

  // Função para validar os campos
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

  const handleOnclose = () => {
    onClose();
  };

  // Função para salvar o saldo inicial
  const handleSave = async () => {
    if (!validateFields()) return;

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não carregado.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/cad/saldo_caixa_inicial/`, {
        empresa_id: empresaId,
        valor_especie: cash.replace(/\./g, '').replace(',', '.'),
        saldo_banco: bank.replace(/\./g, '').replace(',', '.'),
      });

      if (response.status === 201 && response.data.status === 'success') {
        await AsyncStorage.setItem('initialBalanceAdded', 'true');
        setSuccessModalVisible(true); // Exibe o modal de sucesso
        onBalanceSaved();
      } else {
        Alert.alert('Erro', response.data.message || 'Erro ao salvar o saldo inicial.');
      }
    } catch (error) {
      console.error('Erro ao salvar saldo inicial:', error);
      Alert.alert('Erro', 'Erro ao salvar saldo inicial. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>1º Passo</Text>
          
          <View style={styles.card}>
            <Text style={styles.label22}>Quanto seu negócio tem de dinheiro em espécie?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0,00"
              value={cash}
              onChangeText={handleCashInput}
            />
          </View>

          <View style={styles.card}>
            <Text style={styles.label22}>Quanto seu negócio tem de saldo no banco?</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="0,00"
              value={bank}
              onChangeText={handleBankInput}
            />
          </View>

          <Text style={styles.totalBalanceText}>
            Saldo de caixa inicial{'\n'} R${formatCurrency(totalBalance.toFixed(2))}
          </Text>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={loading}>
            <Icon name="checkmark-circle" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Salvar Tudo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton2} onPress={handleOnclose}>
            <TimeIcon size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Deixa para depois</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color={COLORS.primary} />}
          <Modal visible={successModalVisible} animationType="slide" transparent={true}>
            <View style={styles.successModalContainer}>
              <View style={styles.successModalContent}>
                <Icon name="checkmark-circle" size={90} color={COLORS.green} />
                <Text style={styles.successMessage}>Saldo inicial inserido com sucesso!</Text>
                <TouchableOpacity
                  style={styles.successButton}
                  onPress={() => {
                    setSuccessModalVisible(false); // Fecha o modal de sucesso
                    onClose(); // Fecha o modal principal após sucesso
                  }}
                >
                  <Text style={styles.successButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </Modal>
  );
};

export default OpeningBalanceModal;
