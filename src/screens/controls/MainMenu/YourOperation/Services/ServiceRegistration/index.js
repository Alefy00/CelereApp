/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Constantes para URLs de API
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
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]); // Estado para armazenar a lista de unidades de medida
  const [issRates, setIssRates] = useState([]); // Estado para armazenar a lista de alíquotas ISS

  // Função para obter o ID da empresa
  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      if (empresaData !== null) {
        return JSON.parse(empresaData); // Se o dado for um número, ele será retornado como tal
      } else {
        console.log('Nenhum dado de empresa encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  // Função para buscar as unidades de medida da API
  const fetchUnitsOfMeasure = async (empresa_id) => {
    try {
      const response = await fetch(`${UNIT_MEASURE_API_ENDPOINT}&empresa_id=${empresa_id}`);
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setUnitsOfMeasure(result.data);
      } else {
        console.error('Erro ao buscar unidades de medida:', result.message);
        Alert.alert('Erro', 'Não foi possível carregar as unidades de medida. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar unidades de medida:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as unidades de medida. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  // Função para buscar as alíquotas ISS da API
  const fetchIssRates = async (empresa_id) => {
    try {
      const response = await fetch(`${ISS_RATE_API_ENDPOINT}&empresa_id=${empresa_id}`);
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setIssRates(result.data);
      } else {
        console.error('Erro ao buscar alíquotas ISS:', result.message);
        Alert.alert('Erro', 'Não foi possível carregar as alíquotas ISS. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar alíquotas ISS:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as alíquotas ISS. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
        await fetchUnitsOfMeasure(empresaData); // Busca as unidades de medida após obter o ID da empresa
        await fetchIssRates(empresaData); // Busca as alíquotas ISS após obter o ID da empresa
      } else {
        console.error('ID da empresa não encontrado. Dados recebidos:', empresaData);
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa. Tente novamente mais tarde.');
      }
    };

    fetchData();
  }, []);

  // Função para salvar o serviço
  const handleSave = async () => {
    if (!name || !price || !unitMeasure || !issRate) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato 'YYYY-MM-DD'

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
        Alert.alert('Sucesso', result.message || 'Serviço registrado com sucesso.');
        navigation.navigate('ServicesMenu'); // Exemplo de redirecionamento após sucesso
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o serviço.');
      }
    } catch (error) {
      console.error('Erro ao salvar o serviço:', error);
      Alert.alert('Erro', 'Não foi possível registrar o serviço. Verifique sua conexão e tente novamente.');
    }
  };

  const handlePickerSelect = (value) => {
    if (pickerType === 'unitMeasure') {
      setUnitMeasure(value);
    } else if (pickerType === 'issRate') {
      setIssRate(value);
    }
    setShowPicker(false);
  };

  const renderPicker = () => {
    let data = [];
    if (pickerType === 'unitMeasure') {
      data = unitsOfMeasure.map(item => item.nome); // Mapeia os nomes das unidades de medida para exibição
    } else if (pickerType === 'issRate') {
      data = issRates.map(item => item.nome); // Mapeia os nomes das alíquotas ISS para exibição
    }

    return (
      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={
                pickerType === 'unitMeasure'
                  ? unitMeasure
                  : issRate
              }
              onValueChange={handlePickerSelect}
            >
              {data.map((item, index) => (
                <Picker.Item key={index} label={item} value={item} />
              ))}
            </Picker>
            <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <BarTop2
        titulo="Adicionar serviço"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer={''}
        routeCalculator={''}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
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
          <TouchableOpacity>
            <Icon name="barcode-outline" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome*"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.unitInput]}
            placeholder={unitMeasure ? `Valor ${unitMeasure}` : 'Valor'}
            value={unitValue}
            onChangeText={setUnitValue}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.iconDropdown}
            onPress={() => {
              setPickerType('unitMeasure');
              setShowPicker(true);
            }}
          >
            <Icon name="filter" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            setPickerType('issRate');
            setShowPicker(true);
          }}
        >
          <Text style={styles.dropdownText}>{issRate || 'Alíquota ISS'}</Text>
          <Icon name="filter" size={20} color={COLORS.black} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Preço de venda*"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.textArea}
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>

        {renderPicker()}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddService;
