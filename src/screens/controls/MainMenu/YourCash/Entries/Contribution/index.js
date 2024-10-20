/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, Keyboard, Platform, TextInput, TouchableWithoutFeedback } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";  // Import do Picker
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_API_URL = 'https://api.celere.top';
const CONTRIBUTE_API_ENDPOINT = `${BASE_API_URL}/cad/aporte/`;
const ORIGEM_API_ENDPOINT = `${BASE_API_URL}/config/origem_aporte/?page_size=100&max_page_size=100`;

const Contribution = ({ navigation }) => {
  const [dataAporte, setDataAporte] = useState(null);  // Inicializando como null para o placeholder
  const [valorAporte, setValorAporte] = useState('');
  const [origemAporte, setOrigemAporte] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [origens, setOrigens] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Função para obter o ID da empresa
  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      if (empresaData !== null) {
        return JSON.parse(empresaData);
      } else {
        console.log('Nenhum dado de empresa encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  // Função para buscar as origens de aporte da API
  const fetchOrigens = async () => {
    try {
      const response = await fetch(ORIGEM_API_ENDPOINT);
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setOrigens(result.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as origens de aporte. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as origens de aporte.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa.');
      }
      await fetchOrigens();
    };

    fetchData();
  }, []);

  // Função para lidar com o salvamento dos dados de aporte
  const handleSave = async () => {
    if (!dataAporte || !valorAporte || !origemAporte) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    const aporteData = {
      empresa_id: empresaId,
      dt_aporte: dataAporte.toISOString().split('T')[0],
      valor_aporte: parseFloat(valorAporte),
      descricao: origemAporte,
      origem: origemAporte
    };

    try {
      const response = await fetch(CONTRIBUTE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aporteData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', result.message || 'Aporte registrado com sucesso.');
        
        // Limpar campos após sucesso
        setDataAporte(null);
        setValorAporte('');
        setOrigemAporte('');
        
        // Fechar o modal
        setShowModal(false);
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o aporte.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar o aporte. Verifique sua conexão.');
    }
  };

  // Função para lidar com a mudança da data no DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataAporte;
    setShowDatePicker(false);
    setDataAporte(currentDate);
  };

  const formatDate = (date) => {
    return date ? date.toLocaleDateString('pt-BR') : '';  // Se a data for null, retorna string vazia
  };

  return (
    <View style={styles.container}>
      <View style={styles.barTop}>
        <BarTop2
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Aporte</Text>
        <Text style={styles.description}>
          Qualquer investimento em dinheiro seu, dos sócios ou de terceiros deve entrar como aporte no caixa da empresa.
        </Text>
        <Text style={styles.placeholderText}>Você ainda não tem nenhum aporte cadastrado</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addButtonText}>Cadastrar novo aporte</Text>
      </TouchableOpacity>

      {/* Modal para cadastrar novo aporte */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalhes do aporte</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Campo 1: Data do Aporte com Placeholder */}
              <View style={styles.dateInputContainer}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputDate}>
                  <Text>{formatDate(dataAporte) || "Data do aporte"}</Text>
                </TouchableOpacity>
                <Icon name="calendar" size={24} color="gray" style={styles.calendarIcon} />
              </View>

              {/* Campo 2: Valor do Aporte */}
              <TextInput
                style={styles.input}
                placeholder="Valor do aporte"
                value={valorAporte}
                onChangeText={setValorAporte}
                keyboardType="numeric"
              />

              {/* Campo 3: Picker de Origem do Aporte */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={origemAporte}
                  onValueChange={(itemValue) => setOrigemAporte(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione a origem do aporte" value="" />
                  {origens.map((origem) => (
                    <Picker.Item key={origem.cod} label={origem.nome} value={origem.cod} />
                  ))}
                </Picker>
              </View>

              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dataAporte || new Date()}  // Se null, usa a data atual
                  mode={'date'}
                  display="default"
                  onChange={handleDateChange}
                />
              )}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Icon name="checkmark-circle" size={24} color="black" />
                <Text style={styles.saveButtonText}>Cadastrar novo aporte</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Contribution;
