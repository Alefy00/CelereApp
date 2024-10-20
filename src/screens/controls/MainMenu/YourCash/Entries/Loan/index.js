/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, Keyboard, Platform, TextInput, TouchableWithoutFeedback } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_API_URL = 'https://api.celere.top';
const LOAN_API_ENDPOINT = `${BASE_API_URL}/cad/emprestimos/`;

const Loan = ({ navigation }) => {
  const [valorEmprestimo, setValorEmprestimo] = useState('');
  const [dataLiberacao, setDataLiberacao] = useState(null); // Inicializando como null
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('');
  const [dataVencimento, setDataVencimento] = useState(null); // Inicializando como null
  const [showDatePickerLiberacao, setShowDatePickerLiberacao] = useState(false);
  const [showDatePickerVencimento, setShowDatePickerVencimento] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa.');
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
        
        // Limpar os campos do modal após o sucesso da requisição
        setValorEmprestimo('');
        setValorPrestacao('');
        setPrazoMeses('');
        setDataLiberacao(null); // Reset para null
        setDataVencimento(null); // Reset para null
        
        // Fechar o modal
        setShowModal(false);
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o empréstimo.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar o empréstimo. Verifique sua conexão.');
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
    return date ? date.toLocaleDateString('pt-BR') : ''; // Se a data for null, retorna string vazia
  };

  return (
    <View style={styles.container}>
      <View style={styles.barTop}>
        <BarTop2
          titulo={'Seus Empréstimos'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.listContainer}>
        <Text style={styles.title}>Seus Empréstimos</Text>
        <Text style={styles.description}>
          Declare uma venda a receber registrada para algum de seus clientes como paga.
        </Text>

        {/* Exemplo de dados fictícios, pode ser substituído pelos reais futuramente */}
        <View style={styles.loanItem}>
          <Text>06/09/2024</Text>
          <Text style={styles.loanValue}>R$24000,00</Text>
          <Text>Vence todo dia 28</Text>
          <Text>24 parcelas restantes</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addButtonText}>Cadastrar novo empréstimo</Text>
      </TouchableOpacity>

      {/* Modal para cadastrar novo empréstimo */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Detalhes do empréstimo</Text>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Campo 1: Valor do Empréstimo */}
              <TextInput
                style={styles.input}
                placeholder="Valor que entrou no caixa"
                value={valorEmprestimo}
                onChangeText={setValorEmprestimo}
                keyboardType="numeric"
              />

              {/* Campo 2: Data de Liberação com Placeholder */}
              <TouchableOpacity onPress={() => setShowDatePickerLiberacao(true)} style={styles.input}>
                <Text>{formatDate(dataLiberacao) || "Selecione a data de liberação"}</Text>
              </TouchableOpacity>

              {/* Campo 3: Valor da Prestação */}
              <TextInput
                style={styles.input}
                placeholder="Valor da prestação"
                value={valorPrestacao}
                onChangeText={setValorPrestacao}
                keyboardType="numeric"
              />

              {/* Campo 4: Prazo em Meses */}
              <TextInput
                style={styles.input}
                placeholder="Prazo (em meses, somente números)"
                value={prazoMeses}
                onChangeText={setPrazoMeses}
                keyboardType="numeric"
              />

              {/* Campo 5: Data de Vencimento com Placeholder */}
              <TouchableOpacity onPress={() => setShowDatePickerVencimento(true)} style={styles.input}>
                <Text>{formatDate(dataVencimento) || "Selecione a data de vencimento"}</Text> 
              </TouchableOpacity>

              {showDatePickerLiberacao && (
                <DateTimePicker
                  testID="dateTimePickerLiberacao"
                  value={dataLiberacao || new Date()} // Se null, usa a data atual
                  mode={'date'}
                  display="default"
                  onChange={handleDateChangeLiberacao}
                />
              )}
              {showDatePickerVencimento && (
                <DateTimePicker
                  testID="dateTimePickerVencimento"
                  value={dataVencimento || new Date()} // Se null, usa a data atual
                  mode={'date'}
                  display="default"
                  onChange={handleDateChangeVencimento}
                />
              )}

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Icon name="checkmark-circle" size={24} color="black" />
                <Text style={styles.saveButtonText}>Cadastrar novo empréstimo</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default Loan;
