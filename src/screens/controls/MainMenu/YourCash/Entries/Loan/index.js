/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';

// Constantes para URLs da API
const BASE_API_URL = 'https://api.celereapp.com.br';
const LOAN_API_ENDPOINT = `${BASE_API_URL}/cad/emprestimos/`;

const Loan = ({ navigation }) => {
  const [valorEmprestimo, setValorEmprestimo] = useState('');
  const [dataLiberacao, setDataLiberacao] = useState(new Date());
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('');
  const [dataVencimento, setDataVencimento] = useState(new Date());
  const [showDatePickerLiberacao, setShowDatePickerLiberacao] = useState(false);
  const [showDatePickerVencimento, setShowDatePickerVencimento] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);

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

  useEffect(() => {
    const fetchEmpresaId = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
      } else {
        console.error('ID da empresa não encontrado. Dados recebidos:', empresaData);
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa. Tente novamente mais tarde.');
      }
    };

    fetchEmpresaId();
  }, []);

  const handleSave = async () => {
    if (!valorEmprestimo || !valorPrestacao || !prazoMeses || !dataLiberacao || !dataVencimento) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }

    const emprestimoData = {
      empresa_id: empresaId,
      valor_emprestimo: parseFloat(valorEmprestimo),
      dt_liberacao_emprestimo: dataLiberacao.toISOString().split('T')[0],
      valor_prestacao: parseFloat(valorPrestacao),
      prazo_meses: parseInt(prazoMeses, 10),
      dt_primeira_prestacao: dataVencimento.toISOString().split('T')[0],
    };

    try {
      const response = await fetch(LOAN_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emprestimoData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', result.message || 'Empréstimo registrado com sucesso.');
 
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o empréstimo.');
      }
    } catch (error) {
      console.error('Erro ao salvar o empréstimo:', error);
      Alert.alert('Erro', 'Não foi possível registrar o empréstimo. Verifique sua conexão e tente novamente.');
    }
  };

  const handleDateChangeLiberacao = (event, selectedDate) => {
    const currentDate = selectedDate || dataLiberacao;
    setShowDatePickerLiberacao(false);
    setDataLiberacao(currentDate);
  };

  const handleDateChangeVencimento = (event, selectedDate) => {
    const currentDate = selectedDate || dataVencimento;
    setShowDatePickerVencimento(false);
    setDataVencimento(currentDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <BarTop2
            titulo={'Empréstimo'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.textEmprestimo}>Empréstimo</Text>

            <Text style={styles.label}>Valor do empréstimo</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o valor do empréstimo"
              value={valorEmprestimo}
              onChangeText={setValorEmprestimo}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Data da liberação do empréstimo</Text>
            <TouchableOpacity onPress={() => setShowDatePickerLiberacao(true)} style={styles.input}>
              <Text>{formatDate(dataLiberacao)}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Valor da prestação</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o valor da prestação"
              value={valorPrestacao}
              onChangeText={setValorPrestacao}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Prazo em meses</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o prazo em meses"
              value={prazoMeses}
              onChangeText={setPrazoMeses}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Data de vencimento da primeira prestação</Text>
            <TouchableOpacity onPress={() => setShowDatePickerVencimento(true)} style={styles.input}>
              <Text>{formatDate(dataVencimento)}</Text>
            </TouchableOpacity>

            {showDatePickerLiberacao && (
              <DateTimePicker
                testID="dateTimePickerLiberacao"
                value={dataLiberacao}
                mode={'date'}
                display="default"
                onChange={handleDateChangeLiberacao}
                locale="pt-BR"
              />
            )}
            {showDatePickerVencimento && (
              <DateTimePicker
                testID="dateTimePickerVencimento"
                value={dataVencimento}
                mode={'date'}
                display="default"
                onChange={handleDateChangeVencimento}
                locale="pt-BR"
              />
            )}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Loan;
