/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
import IconAluguel from '../../../../../../../assets/images/svg/NewExpense/IconAluguel.svg';
import IconDespesas from '../../../../../../../assets/images/svg/NewExpense/IconDespesas.svg';
import IconFornecedor from '../../../../../../../assets/images/svg/NewExpense/IconFornecedor.svg';
import IconFrete from '../../../../../../../assets/images/svg/NewExpense/IconFrete.svg';
import IconMaquinas from '../../../../../../../assets/images/svg/NewExpense/IconMaquinas.svg';
import IconMarketing from '../../../../../../../assets/images/svg/NewExpense/IconMarketing.svg';
import IconNaoRecomendavel from '../../../../../../../assets/images/svg/NewExpense/IconNaoRecomendavel.svg';
import IconOutros from '../../../../../../../assets/images/svg/NewExpense/IconOutros.svg';
import IconPagamento from '../../../../../../../assets/images/svg/NewExpense/IconPagamento.svg';
import IconProLabore from '../../../../../../../assets/images/svg/NewExpense/IconProLabore.svg';
import Icontaxas from '../../../../../../../assets/images/svg/NewExpense/IconTaxas.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../../constants';
import ConfirmModal from '../components/ConfirmModal';
import SucessModal from '../components/SucessModal';
import styles from '../styles';
import RecurrenceField from './RecurrenceField';
import SupplierDropdown from './SupplierDropdown';
import CustomCalendar from '../../../../../../../components/CustomCalendar';

// Constantes para os endpoints da API
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const MONTHS_API = 'https://api.celereapp.com.br/api/despesas_recorrencias/';
const SAVE_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa/';

const categoryIcons = {
  1: IconFornecedor, // Fornecedores de matéria-prima, produtos ou suprimentos
  2: IconMarketing, // Marketing e anúncios
  3: IconPagamento, // Folha de pagamento
  4: Icontaxas, // Taxas e Tributos
  5: IconFrete, // Frete, transporte e logística
  6: IconAluguel, // Aluguel
  7: IconMaquinas, // Máquinas e equipamentos
  8: IconDespesas, // Despesas Administrativas
  9: IconProLabore, // Pró-labore
  10: IconNaoRecomendavel, // Despesas pessoais (não recomendável)
  11: IconOutros, // Outros
};

const AccountsPayable = ({ navigation }) => {
  const [categoria, setCategoria] = useState('');
  const [categories, setCategories] = useState([]);
  const [valor, setValor] = useState('');
  const [item, setItem] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [months, setMonths] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMonths, setLoadingMonths] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [isLiquidateNow, setIsLiquidateNow] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedFrequencyId, setSelectedFrequencyId] = useState(null); // ID da frequência selecionada
  const [repeatCount, setRepeatCount] = useState(0); // Quantidade de repetições
  const [isIndeterminate, setIsIndeterminate] = useState(false); // Tempo indeterminado
  const [recorrenciaText, setRecorrenciaText] = useState('Pagamento único'); // Estado para a recorrência
  const [showCalendar, setShowCalendar] = useState(false); 

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);
      } else {
        console.log('ID da empresa não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };
  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    setDueDate(selectedDate);
    setShowCalendar(false);
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
          icon: categoryIcons[item.id] && React.isValidElement(React.createElement(categoryIcons[item.id])) 
                ? categoryIcons[item.id] 
                : null, // Usar o ícone importado correspondente ou null se não for válido
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
  
  

// Função para buscar fornecedores da API usando o ID da empresa logada
const fetchSuppliers = useCallback(async () => {
  setLoading(true);
  try {
    const empresa_id = await getEmpresaId(); // Obtém o ID da empresa logada do AsyncStorage
    if (!empresa_id) {
      Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, verifique as configurações de login.');
      setLoading(false);
      return;
    }

    // Endpoint dinâmico usando o ID da empresa
    const suppliersApiUrl = `https://api.celereapp.com.br/cad/fornecedor/?empresa_id=${empresa_id}&page=1&page_size=50`;

    const response = await axios.get(suppliersApiUrl);
    const data = response.data;

    if (data.results && data.results.data) {
      const fetchedSuppliers = data.results.data.map((item) => ({
        label: item.nome,
        value: item.id, // ID do fornecedor
      }));

      setSuppliers([{ label: 'Selecione um Fornecedor', value: '' }, ...fetchedSuppliers]);
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


useEffect(() => {
  fetchSuppliers();
}, [fetchSuppliers]);

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



  const determineRecurrenceText = () => {
    let text = 'Pagamento único';  // Define como pagamento único por padrão
    if (selectedFrequencyId) {
      switch (selectedFrequencyId) {
        case 1:
          text = 'Semanal';
          break;
        case 2:
          text = 'Quinzenal';
          break;
        case 3:
          text = 'Mensal';
          break;
        case 4:
          text = 'Anual';
          break;
        default:
          text = 'Recorrência indefinida';
      }
    }
    if (isIndeterminate) {
      text += ' (tempo indeterminado)';
    }
    return text;
  };
  
  const handleSave = () => {
    console.log('Categoria:', categoria);
    console.log('Valor:', valor);
    console.log('Parceiro:', parceiro);
  
    if (!categoria) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }
  
    if (!valor || isNaN(parseFloat(valor)) || parseFloat(valor) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }
  
    // Verifica se o parceiro foi selecionado (fornecedor obrigatório)
    if (!parceiro) {
      Alert.alert('Erro', 'Por favor, selecione um fornecedor.');
      return;
    }
  
       // Define o texto da recorrência antes de abrir o modal
       const recurrenceText = determineRecurrenceText();
       setRecorrenciaText(recurrenceText);  // Define o texto da recorrência
    // Se tudo estiver preenchido corretamente, abre o modal de confirmação
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

    const expenseData = {
      empresa_id: Number(empresa_id),
      item: item || '',
      valor: parseFloat(valor),
      dt_vencimento: format(dueDate, 'yyyy-MM-dd'), // Data de vencimento
      dt_pagamento: null, // Data de pagamento será null para "Contas a pagar"
      fornecedor_id: Number(parceiro),
      categoria_despesa_id: Number(categoria),
      classificacao_lancamento: 4,
      recorrencia: selectedFrequencyId || null, // Se não houver frequência selecionada, a recorrência será null
      is_recorrencia_tempo_indeterminado: !!isIndeterminate,
      quantidade_repeticoes: !isIndeterminate && repeatCount > 0 ? repeatCount : null,
      status: 'pendente', // Status será "pendente" para contas a pagar
    };

    console.log('Dados enviados para a API:', expenseData);

    try {
      const response = await axios.post(SAVE_EXPENSE_API, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data);
      if (response.status === 201 || response.data.status === 'success') {
        const despesaId = response.data.data[0].id; // Captura o id da primeira despesa criada
        console.log('ID da despesa cadastrada:', despesaId); // Log do id da despesa
        setSuccessModalVisible(true);
        handleRegisterNew(); // Limpa todos os campos após o envio bem-sucedido
      } else {
        Alert.alert('Erro', `Ocorreu um erro ao salvar a despesa: ${response.data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar a despesa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a despesa. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNew = () => {
    setCategoria('');
    setSelectedCategory('');
    setValor('');
    setItem('');
    setParceiro('');
    setSelectedSupplier(null);
    setRepeatCount(0);  // Limpa a quantidade de repetições
    setIsIndeterminate(false);  // Reseta a recorrência indeterminada
    setSelectedFrequencyId(null);  // Reseta a frequência
    setRecorrenciaText('Pagamento único');  // Volta ao padrão de recorrência
    setDate(new Date());
    setDueDate(new Date());
    setBarcode('');
    setIsLiquidateNow(true);
    setSuccessModalVisible(false);
  };
  
  
  const toggleExpenseType = () => {
    navigation.navigate('NewExpense');
  };

  const handleAcconunts = () => {
    navigation.navigate('AccountsPayable');
  };

  // Função para definir o fornecedor selecionado
  const handleSelectSupplier = (supplier) => {
    console.log('Fornecedor selecionado:', supplier);  // Verifica o valor selecionado
    setSelectedSupplier(supplier);  // Define o fornecedor selecionado
    setParceiro(supplier.value);    // Define o ID do parceiro corretamente
  };
  
  return (
    <ScrollView style={styles.container}>
      <BarTop2
        titulo="Voltar"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer=""
        routeCalculator=""
        style={{ height: 50 }}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.formContainer}>
            <Text style={styles.Title}>Cadastrar uma Despesa</Text>
            {/* Botões de Alternância para "Liquidar agora" e "Contas a pagar" */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLiquidateNow && styles.toggleButtonActive]}
                onPress={toggleExpenseType}
              >
                <Text style={styles.toggleButtonText}>Liquidar agora</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLiquidateNow && styles.toggleButtonActive]}
                onPress={handleAcconunts}
              >
                <Text style={styles.toggleButtonText}>Contas a pagar</Text>
              </TouchableOpacity>
            </View>

            {/* Date Picker para Data de Vencimento */}
            <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Data de vencimento</Text>
            <View style={styles.datePickerRow}>
              <TextInput
                style={styles.dateInput}
                value={format(dueDate, 'dd/MM/yyyy', { locale: ptBR })}
                editable={false}
              />
              <TouchableOpacity onPress={handleShowCalendar}>
                <Icon name="calendar" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
          </View>

            {/* Campo de Código de Barras */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Código de barras (opcional)"
                value={barcode}
                onChangeText={setBarcode}
              />
              <TouchableOpacity>
                <Icon name="barcode-outline" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            {/* Cartão de Detalhes da Despesa */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Detalhes da despesa</Text>
              {/* Botão para abrir o modal de seleção de categoria */}
              <View style={styles.containerDetalhes}>
              <TouchableOpacity onPress={() => setCategoryModalVisible(true)} style={styles.pickerButton}>
                <Text style={styles.pickerButtonText}>
                  {selectedCategory ? categories.find(cat => cat.value === selectedCategory).label : 'Categoria da Despesa'}
                </Text>
                  <Icon name="arrow-down" size={22} color={COLORS.gray} />
              </TouchableOpacity>
                  <TouchableOpacity style={styles.addButton} disabled={true}>
                    <Icon name="add" size={30} color={COLORS.black} />
                  </TouchableOpacity>
              </View>

                {/* Modal de Seleção de Categoria */}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={categoryModalVisible}
                  onRequestClose={() => setCategoryModalVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                      <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Selecione a categoria da despesa</Text>
                        <TouchableOpacity onPress={() => setCategoryModalVisible(false)}>
                          <Icon name="close" size={24} color={COLORS.black} />
                        </TouchableOpacity>
                      </View>
                      <FlatList
                        data={categories}
                        keyExtractor={(item) => item.value.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.modalItem}
                            onPress={() => {
                              setSelectedCategory(item.value);
                              setCategoria(item.value); // Mantendo a lógica existente
                              setCategoryModalVisible(false);
                            }}
                          >
                            <View style={styles.modalItemContent}>
                              {/* Verifique se o ícone está sendo passado corretamente */}
                              {item.icon && React.isValidElement(React.createElement(item.icon)) ? (
                                React.createElement(item.icon, {
                                  width: 24,
                                  height: 24,
                                  fill: COLORS.black,
                                  style: styles.modalItemIcon
                                })
                              ) : (
                                <Icon name="help-circle-outline" size={24} color={COLORS.black} />
                              )}
                              <Text style={styles.modalItemText}>{item.label}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </View>
                </Modal>

              {/* Campo de Valor */}
              <TextInput
                style={styles.input}
                placeholder="Valor (R$)"
                value={valor}
                onChangeText={setValor}
                keyboardType="numeric"
              />

              {/* Campo de Descrição */}
              <TextInput
                style={styles.input}
                placeholder="Item"
                value={item}
                onChangeText={setItem}
              />
            </View>

            {/* Fornecedor com novo Dropdown */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Fornecedor</Text>
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <SupplierDropdown
                  suppliers={suppliers}
                  selectedSupplier={selectedSupplier}
                  onSelectSupplier={handleSelectSupplier}
                  navigation={navigation}
                />
              )}
            </View>

            {/* Cartão de Recorrência */}
            <RecurrenceField
              setSelectedFrequencyId={setSelectedFrequencyId} // Passa função para definir a frequência
              setRepeatCount={setRepeatCount} // Passa função para definir o número de repetições
              setIsIndeterminate={setIsIndeterminate} // Passa função para definir se é indeterminado
            />

            {/* Botão de Salvar Despesa */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Icon name="checkmark-circle" size={30} color={COLORS.black} />
              <Text style={styles.saveButtonText}>Salvar despesa</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      <CustomCalendar
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDayPress={handleDayPress}
      />
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        valor={valor}
        parceiro={getSupplierNameById(parceiro)}
        dataVencimento={dueDate.toLocaleDateString()}
        recorrencia={recorrenciaText}
      />

      <SucessModal
        visible={successModalVisible}
        onClose={() => navigation.navigate('MainTab')}
        onRegisterNew={handleRegisterNew}
        onConfirm={handleConfirm}
      />
    </ScrollView>
  );
};

export default AccountsPayable;
