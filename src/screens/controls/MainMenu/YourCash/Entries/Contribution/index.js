/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Constantes para URLs de API
const BASE_API_URL = 'https://api.celereapp.com.br';
const CONTRIBUTE_API_ENDPOINT = `${BASE_API_URL}/cad/aporte/`;
const ORIGEM_API_ENDPOINT = `${BASE_API_URL}/config/origem_aporte/?page_size=100&max_page_size=100`;

const Contribution = ({ navigation }) => {
  const [dataAporte, setDataAporte] = useState(new Date());
  const [valorAporte, setValorAporte] = useState('');
  const [origemAporte, setOrigemAporte] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [origens, setOrigens] = useState([]);

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

  // Função para buscar as origens de aporte da API
  const fetchOrigens = async () => {
    try {
      const response = await fetch(ORIGEM_API_ENDPOINT);
      const result = await response.json();

      if (response.ok && result.status === 'success') {
        setOrigens(result.data);
      } else {
        console.error('Erro ao buscar origens de aporte:', result.message);
        Alert.alert('Erro', 'Não foi possível carregar as origens de aporte. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar origens de aporte:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as origens de aporte. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
      } else {
        console.error('ID da empresa não encontrado. Dados recebidos:', empresaData);
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa. Tente novamente mais tarde.');
      }

      await fetchOrigens(); // Busca as origens de aporte ao carregar a tela
    };

    fetchData();
  }, []);

  // Função para lidar com o salvamento dos dados de aporte
  const handleSave = async () => {
    if (!dataAporte || !valorAporte || !origemAporte) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }

    const aporteData = {
      empresa_id: empresaId,
      dt_aporte: dataAporte.toISOString().split('T')[0], // Formata a data para 'YYYY-MM-DD'
      valor_aporte: parseFloat(valorAporte),
      descricao: origemAporte, // Descrição do aporte
      status: origemAporte // Status obtido a partir da seleção do usuário
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

      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o aporte.');
      }
    } catch (error) {
      console.error('Erro ao salvar o aporte:', error);
      Alert.alert('Erro', 'Não foi possível registrar o aporte. Verifique sua conexão e tente novamente.');
    }
  };

  // Função para lidar com a mudança da data no DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataAporte;
    setShowDatePicker(false);
    setDataAporte(currentDate);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <BarTop2
            titulo={'Entradas'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.textAporte}>Aporte</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{dataAporte.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dataAporte}
                mode={'date'}
                display="default"
                onChange={handleDateChange}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Valor do aporte"
              value={valorAporte}
              onChangeText={setValorAporte}
              keyboardType="numeric"
            />
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
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Contribution;
