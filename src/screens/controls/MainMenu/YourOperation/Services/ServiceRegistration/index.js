/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

const BASE_API_URL = 'https://api.celereapp.com.br';
const UNIT_MEASURE_API_ENDPOINT = `${BASE_API_URL}/api/und_medida_servico/?page=1&page_size=100`;
const ISS_RATE_API_ENDPOINT = `${BASE_API_URL}/api/aliquota_iss_servico/?page=1&page_size=100`;
const REGISTER_SERVICE_API_ENDPOINT = `${BASE_API_URL}/cad/servicos/`;

const AddService = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [unitMeasure, setUnitMeasure] = useState('');
  const [unitValue, setUnitValue] = useState(''); 
  const [price, setPrice] = useState('');
  const [issRate, setIssRate] = useState('');
  const [description, setDescription] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]); // Unidades de medida
  const [issRates, setIssRates] = useState([]); // Alíquotas ISS
  const [isUnitMeasureDropdownVisible, setIsUnitMeasureDropdownVisible] = useState(false);
  const [isIssRateDropdownVisible, setIsIssRateDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal de sucesso

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
        console.log('ID da empresa não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  const fetchUnitsOfMeasure = async (empresa_id) => {
    try {
      const response = await fetch(`${UNIT_MEASURE_API_ENDPOINT}&empresa_id=${empresa_id}`);
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setUnitsOfMeasure(result.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as unidades de medida.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as unidades de medida.');
    }
  };

  const fetchIssRates = async (empresa_id) => {
    try {
      const response = await fetch(`${ISS_RATE_API_ENDPOINT}&empresa_id=${empresa_id}`);
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setIssRates(result.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as alíquotas ISS.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as alíquotas ISS.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
        await fetchUnitsOfMeasure(empresaData);
        await fetchIssRates(empresaData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa. Tente novamente mais tarde.');
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!name || !price || !unitMeasure || !issRate) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; 

    const serviceData = {
      empresa_id: empresaId,
      dt_servico: currentDate,
      nome: name,
      descricao: description,
      preco_venda: parseFloat(price),
      status: 'ativo',
      unidade_medida: unitMeasure,
      aliquota_iss: issRate,
    };

    try {
      const response = await fetch(REGISTER_SERVICE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      const result = await response.json();

      if (response.ok) {
        setModalVisible(true); // Exibe o modal de sucesso
        // Limpa os campos do formulário
        setBarcode('');
        setName('');
        setUnitMeasure('');
        setPrice('');
        setIssRate('');
        setDescription('');
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o serviço.');
      }
    } catch (error) {
      console.error('Erro ao salvar o serviço:', error);
      Alert.alert('Erro', 'Não foi possível registrar o serviço. Verifique sua conexão e tente novamente.');
    }
  };

  const toggleUnitMeasureDropdown = () => {
    setIsUnitMeasureDropdownVisible(!isUnitMeasureDropdownVisible);
  };

  const toggleIssRateDropdown = () => {
    setIsIssRateDropdownVisible(!isIssRateDropdownVisible);
  };

  const selectUnitMeasure = (unit) => {
    setUnitMeasure(unit);
    setIsUnitMeasureDropdownVisible(false);
  };

  const selectIssRate = (rate) => {
    setIssRate(rate);
    setIsIssRateDropdownVisible(false);
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Fecha o modal
    navigation.navigate('RegisteredServices'); // Redireciona para a próxima tela
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <BarTop2
        titulo="Voltar"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabelTitle}>Adicionar um novo serviço</Text>
          <View style={styles.containerColor}>
            <View style={styles.imageWrapper}>
              <Icon name="camera" size={40} color={COLORS.black} />
            </View>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Código"
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.imageLabel}>  Imagem{'\n'}do serviço</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do serviço"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Descrição do Serviço"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valores do Serviço</Text>
          <TextInput
            style={styles.input}
            placeholder="Preço de Venda (R$)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />

          <View style={styles.clientContainer}>
            <TouchableOpacity style={styles.clientPicker} onPress={toggleUnitMeasureDropdown}>
              <Text style={styles.clientText}>{unitMeasure || 'Un. de Medida'}</Text>
              <Icon name={isUnitMeasureDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>
          {isUnitMeasureDropdownVisible && (
            <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
              <ScrollView nestedScrollEnabled={true}>
                {unitsOfMeasure.map((unit) => (
                  <TouchableOpacity key={unit.id} style={styles.dropdownItem} onPress={() => selectUnitMeasure(unit.nome)}>
                    <Text style={styles.dropdownItemText}>{unit.nome}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.clientContainer}>
            <TouchableOpacity style={styles.clientPicker} onPress={toggleIssRateDropdown}>
              <Text style={styles.clientText}>{issRate || 'Alíquota ISS'}</Text>
              <Icon name={isIssRateDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>
          {isIssRateDropdownVisible && (
            <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
              <ScrollView nestedScrollEnabled={true}>
                {issRates.map((rate) => (
                  <TouchableOpacity key={rate.id} style={styles.dropdownItem} onPress={() => selectIssRate(rate.nome)}>
                    <Text style={styles.dropdownItemText}>{rate.nome}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.buttonText}>Cadastrar serviço</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de sucesso */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={90} color={COLORS.green} />
            <Text style={styles.modalText}>Serviço cadastrado com sucesso!</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleCloseModal}>
              <Text style={styles.confirmButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
};

export default AddService;
