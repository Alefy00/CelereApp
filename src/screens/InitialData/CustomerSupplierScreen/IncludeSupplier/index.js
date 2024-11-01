/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../services/apiConfig';

const REGISTER_SUPPLIER_API_ENDPOINT = `${API_BASE_URL}/cad/fornecedor/`;

const IncludeSupplier = ({ navigation }) => {
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [empresaId, setEmpresaId] = useState(null);

  useEffect(() => {
    const getEmpresaId = async () => {
      try {
        const storedEmpresaId = await AsyncStorage.getItem('empresaId');
        if (storedEmpresaId) {
          setEmpresaId(Number(storedEmpresaId));
        } else {
          Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o ID da empresa.');
        console.error('Erro ao carregar empresaId:', error);
      }
    };
    getEmpresaId();
  }, []);

  const resetFields = () => {
    setSupplierName('');
    setSupplierPhone('');
    setAdditionalInfo('');
  };

  const handleAddSupplier = async () => {
    if (!supplierName) {
      Alert.alert('Erro', 'O nome do fornecedor é obrigatório.');
      return;
    }

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível.');
      return;
    }

    const supplierData = {
      empresa_id: empresaId,
      nome: supplierName,
      categoria_fornecedor_id: 1, // Categoria fictícia, ajuste conforme necessário
    };

    try {
      const response = await fetch(REGISTER_SUPPLIER_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      const result = await response.json();

      if (response.ok) {
        setModalVisible(true); // Exibe o modal de sucesso
        resetFields(); // Limpa os campos
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o fornecedor.');
      }
    } catch (error) {
      console.error('Erro ao registrar o fornecedor:', error);
      Alert.alert('Erro', 'Não foi possível registrar o fornecedor. Verifique sua conexão.');
    }
  };

  const handleAddNew = () => {
    setModalVisible(false);
    resetFields();
  };

  const handleMenu = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleBlur = () => {
    setIsButtonVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerBase}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Incluir Fornecedor</Text>

        {/* Campo de nome do fornecedor */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Fornecedor</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Transportadora segura"
            placeholderTextColor={COLORS.lightGray}
            value={supplierName}
            onChangeText={setSupplierName}
            onBlur={handleBlur}
          />
        </View>

        {/* Campo de celular opcional */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Celular (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: (11) 91234-5678"
            placeholderTextColor={COLORS.lightGray}
            value={supplierPhone}
            onChangeText={setSupplierPhone}
            keyboardType="phone-pad"
            onBlur={handleBlur}
          />
        </View>

        {/* Campo de informações adicionais (Opcional) */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Informações adicionais (Opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Cliente de Ribeirão Preto"
            placeholderTextColor={COLORS.lightGray}
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
            onBlur={handleBlur}
          />
        </View>
      </ScrollView>

      {/* Botão para adicionar fornecedor visível condicionalmente */}
      {isButtonVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSupplier}>
            <Icon name="add" size={24} color={COLORS.black} />
            <Text style={styles.addButtonText}>Adicionar fornecedor</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Icon name="checkmark-circle" size={80} color={COLORS.green} />
            <Text style={styles.modalTitle}>
              Inclusão de fornecedor realizada com sucesso!
            </Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleAddNew}>
              <Icon name="add" size={24} color={COLORS.black} />
              <Text style={styles.modalButtonText}>Incluir novo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonSecondary}
              onPress={handleMenu}
            >
              <Text style={styles.modalButtonText}>Retornar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default IncludeSupplier;
