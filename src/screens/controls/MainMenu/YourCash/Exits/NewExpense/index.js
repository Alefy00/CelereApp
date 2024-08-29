/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import ConfirmModal from './components/ConfirmModal';
import SucessModal from './components/SucessModal';
import styles from './styles';

// Constantes para os endpoints da API
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const SUPPLIERS_API = 'https://api.celereapp.com.br/cad/fornecedor/?empresa_id=1&page=1&page_size=50';
const MONTHS_API = 'https://api.celereapp.com.br/api/despesas_recorrencias/';
const SAVE_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa/';

const NewExpense = ({ navigation }) => {
  const [categoria, setCategoria] = useState('');
  const [categories, setCategories] = useState([]);
  const [valor, setValor] = useState('');
  const [item, setItem] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [repeats, setRepeats] = useState(false);
  const [quantosMeses, setQuantosMeses] = useState('');
  const [months, setMonths] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date()); // Novo estado para a data de vencimento
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false); // Novo estado para o picker de data de vencimento
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMonths, setLoadingMonths] = useState(false);

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      if (empresaData !== null) {
        const parsedData = JSON.parse(empresaData);
        console.log('ID da Empresa Obtido:', parsedData); // Confirmando que o ID é obtido corretamente
        return parsedData; // Retorna o ID da empresa
      } else {
        console.log('Nenhum dado de empresa encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  const getSupplierNameById = (id) => {
    const supplier = suppliers.find((s) => s.value === id);
    return supplier ? supplier.label : 'Parceiro não encontrado';
  };

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(CATEGORIES_API);
      const data = response.data;
      if (data.results && data.results.data) {
        const fetchedCategories = data.results.data.map((item) => ({
          label: item.descricao,
          value: item.id, // Armazenar o ID para envio
        }));
        setCategories([{ label: 'Selecione uma categoria', value: '' }, ...fetchedCategories]);
      } else {
        console.error('Erro ao buscar categorias:', data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar as categorias. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      handleRequestError(error);
    }
    setLoading(false);
  }, []);

  const fetchSuppliers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(SUPPLIERS_API);
      const data = response.data;
      if (data.results && data.results.data) {
        const fetchedSuppliers = data.results.data.map((item) => ({
          label: item.nome,
          value: item.id, // Armazenar o ID para envio
        }));
        setSuppliers([{ label: 'Selecione um parceiro', value: '' }, ...fetchedSuppliers]);
      } else {
        console.error('Erro ao buscar fornecedores:', data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar os fornecedores. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      handleRequestError(error);
    }
    setLoading(false);
  }, []);

  const fetchMonths = useCallback(async () => {
    setLoadingMonths(true);
    try {
      const response = await axios.get(MONTHS_API);
      const data = response.data;
      if (data.data) {
        const fetchedMonths = data.data.map((item) => ({
          label: item.nome,
          value: item.meses, // Usar 'meses' como valor numérico para envio
        }));
        setMonths([{ label: 'Selecione o número de meses', value: '' }, ...fetchedMonths]);
      } else {
        console.error('Erro ao buscar meses:', data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar os meses. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar meses:', error);
      handleRequestError(error);
    }
    setLoadingMonths(false);
  }, []);

  const handleRequestError = (error) => {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data);
      Alert.alert('Erro', `Erro na resposta da API: ${JSON.stringify(error.response.data) || 'Erro desconhecido'}`);
    } else if (error.request) {
      console.error('Erro na requisição da API:', error.request);
      Alert.alert('Erro', 'Erro na requisição da API. Verifique sua conexão e tente novamente.');
    } else {
      console.error('Erro desconhecido:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro desconhecido. Tente novamente.');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchMonths();
  }, [fetchCategories, fetchSuppliers, fetchMonths]);

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    const currentDate = selectedDate || date;
    const localDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000));

    if (localDate <= new Date()) {
      setDate(localDate);
    } else {
      Alert.alert('Erro', 'Por favor, selecione uma data que não seja no futuro.');
    }
  };

  const onChangeDueDate = (event, selectedDate) => {
    setShowDueDatePicker(Platform.OS === 'ios');
    const currentDueDate = selectedDate || dueDate;
    const localDueDate = new Date(currentDueDate.getTime() - (currentDueDate.getTimezoneOffset() * 60000));

    if (localDueDate >= new Date()) {
      setDueDate(localDueDate);
    } else {
      Alert.alert('Erro', 'Por favor, selecione uma data de vencimento futura.');
    }
  };

  const handleSave = () => {
    if (!categoria || !valor || !parceiro) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    setModalVisible(false);
    setLoading(true);
    const empresa_id = await getEmpresaId();
  
    if (!empresa_id) {
      Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, verifique as configurações de login.');
      setLoading(false);
      return;
    }
  
    // Validação e formatação do valor da despesa
    const formattedValue = parseFloat(valor);
    if (isNaN(formattedValue) || formattedValue <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor de despesa válido.');
      setLoading(false);
      return;
    }
    const expenseData = {
      empresa_id: Number(empresa_id), // Convertendo para número
      item: item || '', // Usando string vazia se `item` estiver indefinido
      valor: formattedValue, // Valor deve ser float
      dt_pagamento: format(date, 'yyyy-MM-dd'), // Data no formato 'YYYY-MM-DD'
      dt_vencimento: format(dueDate, 'yyyy-MM-dd'), // Novo campo para data de vencimento
      status: 'pendente', // Novo campo de status padrão
      recorrencia: repeats ? parseInt(quantosMeses, 10) : 1, // Recorrência como número inteiro
      fornecedor_id: Number(parceiro), // Convertendo para número
      categoria_despesa_id: Number(categoria), // Convertendo para número
    };
  
    try {
      const response = await axios.post(SAVE_EXPENSE_API, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201 || response.data.status === 'success') {
        // Despesa criada com sucesso
        setSuccessModalVisible(true);
      } else {
        console.error('Erro ao salvar a despesa:', response.data);
        Alert.alert('Erro', `Ocorreu um erro ao salvar a despesa: ${response.data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a despesa. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegisterNew = () => {
    setSuccessModalVisible(false);
    setCategoria('');
    setValor('');
    setItem('');
    setParceiro('');
    setRepeats(false);
    setQuantosMeses('');
    setDate(new Date());
    setDueDate(new Date()); // Resetar a data de vencimento também
  };

  return (
    <View style={styles.container}>
    <BarTop2
      titulo="Saídas"
      backColor={COLORS.primary}
      foreColor={COLORS.black}
      routeMailer=""
      routeCalculator=""
      style={{ height: 50 }}
    />
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Imediato</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonActive}>
              <Text style={styles.buttonTextActive}>Contas a pagar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.datePicker}>
            <Text style={{ color: '#000' }}>Data de pagamento</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.textDate}>{format(date, 'dd/MM/yyyy', { locale: ptBR })}</Text>
              <Icon name="calendar-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
                locale="pt-BR" // Configurando o DateTimePicker para português
              />
            )}
          </View>

          <View style={styles.datePicker}>
            <Text style={{ color: '#000' }}>Data de vencimento</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDueDatePicker(true)}>
              <Text style={styles.textDate}>{format(dueDate, 'dd/MM/yyyy', { locale: ptBR })}</Text>
              <Icon name="calendar-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
            {showDueDatePicker && (
              <DateTimePicker
                value={dueDate}
                mode="date"
                display="default"
                onChange={onChangeDueDate}
                minimumDate={new Date()}
                locale="pt-BR" // Configurando o DateTimePicker para português
              />
            )}
          </View>
            <View style={styles.inputContainer}>
              <Text style={{ color: '#000' }}>Categoria de despesa *</Text>
              <Picker
                selectedValue={categoria}
                style={styles.picker}
                onValueChange={(itemValue) => setCategoria(itemValue)}
              >
                {categories.map((category) => (
                  <Picker.Item key={category.value} label={category.label} value={category.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ color: '#000' }}>Valor *</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite um valor"
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ color: '#000' }}>Item</Text>
              <TextInput
                style={styles.input}
                placeholder='Dê um nome'
                value={item}
                onChangeText={setItem}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={{ color: '#000' }}>Parceiro *</Text>
              <Picker
                selectedValue={parceiro}
                style={styles.picker}
                onValueChange={(itemValue) => setParceiro(itemValue)}
              >
                {suppliers.map((supplier) => (
                  <Picker.Item key={supplier.value} label={supplier.label} value={supplier.value} />
                ))}
              </Picker>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={repeats}
                onValueChange={setRepeats}
                tintColors={{ true: COLORS.green, false: COLORS.black }}
              />
              <Text style={styles.checkboxLabel}>A despesa se repete</Text>
            </View>
            {repeats && (
              <View style={styles.inputContainer}>
                <Text style={{ color: '#000' }}>Quantos meses?</Text>
                {loadingMonths ? (
                  <ActivityIndicator size="small" color={COLORS.primary} />
                ) : (
                  <Picker
                    selectedValue={quantosMeses}
                    style={styles.picker}
                    onValueChange={(itemValue) => setQuantosMeses(itemValue)}
                  >
                    {months.map((month) => (
                      <Picker.Item key={month.value} label={month.label} value={month.value} />
                    ))}
                  </Picker>
                )}
              </View>
            )}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        valor={valor}
        parceiro={getSupplierNameById(parceiro)}
        dataPagamento={date.toLocaleDateString()}
        dataVencimento={dueDate.toLocaleDateString()} // Passando a data de vencimento
        recorrencia={repeats ? `Pagamento se repete todo dia ${date.getDate()}` : 'Pagamento único'}
      />

      <SucessModal
        visible={successModalVisible}
        onClose={() => navigation.navigate('Exits')}
        onRegisterNew={handleRegisterNew}
      />
    </View>
  );
};

export default NewExpense;
