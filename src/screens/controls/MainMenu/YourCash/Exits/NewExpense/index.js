/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
import IconAluguel from '../../../../../../assets/images/svg/NewExpense/IconAluguel.svg';
import IconDespesas from '../../../../../../assets/images/svg/NewExpense/IconDespesas.svg';
import IconFornecedor from '../../../../../../assets/images/svg/NewExpense/IconFornecedor.svg';
import IconFrete from '../../../../../../assets/images/svg/NewExpense/IconFrete.svg';
import IconMaquinas from '../../../../../../assets/images/svg/NewExpense/IconMaquinas.svg';
import IconMarketing from '../../../../../../assets/images/svg/NewExpense/IconMarketing.svg';
import IconNaoRecomendavel from '../../../../../../assets/images/svg/NewExpense/IconNaoRecomendavel.svg';
import IconOutros from '../../../../../../assets/images/svg/NewExpense/IconOutros.svg';
import IconPagamento from '../../../../../../assets/images/svg/NewExpense/IconPagamento.svg';
import IconProLabore from '../../../../../../assets/images/svg/NewExpense/IconProLabore.svg';
import Icontaxas from '../../../../../../assets/images/svg/NewExpense/IconTaxas.svg';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import ConfirmModal from './components/ConfirmModal';
import SucessModal from './components/SucessModal';
import RecurrenceField from './components/RecurrenceField';
import SupplierDropdown from './components/SupplierDropdown';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import CustomCalendar from '../../../../../../components/CustomCalendar';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

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

const NewExpense = ({ navigation  }) => {
  const [categoria, setCategoria] = useState('');
  const [categories, setCategories] = useState([]);
  const [valor, setValor] = useState('');
  const [item, setItem] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [isLiquidateNow, setIsLiquidateNow] = useState(true);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [recorrenciaText, setRecorrenciaText] = useState('Pagamento único'); // Estado para a recorrência
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // Controla a visibilidade do CustomCalendar
  const [isRecurring, setIsRecurring] = useState(false); // Controle de recorrência
  const [isIndeterminate, setIsIndeterminate] = useState(false); // Tempo indeterminado
  const [repeatCount, setRepeatCount] = useState(0); // Quantidade de repetições
  const [selectedFrequencyId, setSelectedFrequencyId] = useState(null);
  const [selectedFrequencyName, setSelectedFrequencyName] = useState('');// Nome da frequência para exibição
  const [valorNumerico, setValorNumerico] = useState(0);

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
    setIsCalendarVisible(true); // Abre o calendário
  };
  
  const handleDayPress = (day) => {
    const [year, month, dayOfMonth] = day.dateString.split('-');
    const selectedDate = new Date(year, month - 1, dayOfMonth);
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Define "hoje" sem horário para comparação
  
    console.log("Data selecionada:", selectedDate);
  
    // Verifica se a data selecionada é hoje ou uma data passada
    if (selectedDate <= today) {
      setDate(selectedDate); // Armazena a data de pagamento como objeto Date
      setIsCalendarVisible(false);
    } else {
      Alert.alert('Data Inválida', 'Por favor, selecione uma data anterior');
    }
  };
  
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/mnt/categoriasdespesa/?page=1&page_size=30`);
      const data = response.data;
      if (data.results && data.results.data) {
        const fetchedCategories = data.results.data.map((item) => ({
          label: item.descricao,
          value: item.id, // Armazenar o ID para envio
          icon: categoryIcons[item.id] && React.isValidElement(React.createElement(categoryIcons[item.id])) 
                ? categoryIcons[item.id] 
                : null, // Usar o ícone importado correspondente ou null se não for válido
        }));
        setCategories([{ label: 'Categoria da despesa', value: '' }, ...fetchedCategories]);
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
    const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada do AsyncStorage
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, verifique as configurações de login.');
      setLoading(false);
      return;
    }

    // Endpoint dinâmico usando o ID da empresa
    const suppliersApiUrl = `${API_BASE_URL}/cad/fornecedor/?empresa_id=${empresaId}&page=1&page_size=50`;
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

const handleSelectSupplier = (supplier) => {
  console.log('Fornecedor selecionado:', supplier);  // Verifica o valor selecionado
  setSelectedSupplier(supplier);  // Define o fornecedor selecionado
  setParceiro(supplier.value);    // Define o ID do parceiro corretamente
};

// Dentro do componente NewExpense
useFocusEffect(
  useCallback(() => {
    fetchSuppliers(); // Atualiza a lista de fornecedores quando a tela ganha o foco
  }, [fetchSuppliers])
);

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
  }, [fetchCategories, fetchSuppliers]);

  // Função para determinar o texto da recorrência
  const determineRecurrenceText = () => {
    if (!isRecurring) {
      return 'Pagamento único';
    } else {
      let text = selectedFrequencyId || 'Recorrência';
      if (isIndeterminate) {
        text += ' (tempo indeterminado)';
      } else if (repeatCount > 0) {
        text += ` - Repetições: ${repeatCount}`;
      }
      return text;
    }
  };
  const getSupplierNameById = (id) => {
    const supplier = suppliers.find((s) => s.value === id);
    return supplier ? supplier.label : 'Parceiro não encontrado';
  };
  const handleSave = () => {
    console.log('Categoria:', categoria);
    console.log('Valor:', valor);
    console.log('Parceiro:', parceiro);
  
    if (!categoria) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }
    if (!item) {
      Alert.alert('Erro', 'Insira o nome do item');
      return;
    }
  

    if (!valorNumerico || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
      return;
    }

       // Define o texto da recorrência antes de abrir o modal
       const recurrenceText = determineRecurrenceText();
       setRecorrenciaText(recurrenceText);
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
      valor: valorNumerico,
      dt_vencimento: format(dueDate, 'yyyy-MM-dd'),
      dt_pagamento: date ? format(date, 'yyyy-MM-dd') : null,
      fornecedor_id: Number(parceiro),
      categoria_despesa_id: Number(categoria),
      status: 'finalizada',
    };

    // Somente adicionar os campos de recorrência se isRecurring for true
    if (isRecurring) {
      expenseData.tipo_recorrencia = selectedFrequencyName.toLowerCase();
      expenseData.recorrencia = !isIndeterminate && repeatCount > 0 ? repeatCount : 0;
      expenseData.eh_recorrencia_indeterminada = !!isIndeterminate;
    } else {
      // Limpa os campos de recorrência se não for uma despesa recorrente
      delete expenseData.tipo_recorrencia;
      delete expenseData.recorrencia;
      delete expenseData.eh_recorrencia_indeterminada;
    }

    console.log('Dados enviados para a API:', expenseData);
    try {
      const response = await axios.post(`${API_BASE_URL}/cad/despesa/`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data);
      if (response.status === 201 || response.data.status === 'success') {
        setSuccessModalVisible(true);
        const despesaId = response.data.data[0].id; // Captura o id da primeira despesa criada
        console.log('ID da despesa cadastrada:', despesaId); // Log do id da despesa
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
    setRepeatCount(0);
    setIsIndeterminate(false);
    setDate(new Date());
    setDueDate(new Date());
    setBarcode('');
    setRepeatCount(0);
    setIsIndeterminate(false);
    setSelectedFrequencyId('');
    setIsRecurring(false);
    setRecorrenciaText('Pagamento único');
  };

  const toggleExpenseType = () => {
    setIsLiquidateNow(!isLiquidateNow);
  };

  const handleAcconunts = () => {
    navigation.navigate('AccountsPayable');
  };

  const handleCategoriesScreen = () => {
    navigation.navigate('IncludeCategoriesExpense');
  };

  const handleCloseSucessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate("MainTab");
  }

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
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={styles.formContainer}>
            <Text style={styles.Title}>Cadastrar uma Despesa</Text>
            {/* Botões de Alternância para "Liquidar agora" e "Contas a pagar" */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLiquidateNow && styles.toggleButtonActive]}
                onPress={toggleExpenseType}
              >
                <Text style={styles.toggleButtonText}>Pagar agora</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLiquidateNow && styles.toggleButtonActive]}
                onPress={handleAcconunts}
              >
                <Text style={styles.toggleButtonText}>Contas a pagar</Text>
              </TouchableOpacity>
            </View>

            {/* Date Picker para Data de Pagamento */}
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>Data de pagamento</Text>
              <TouchableOpacity style={styles.datePickerRow} onPress={handleShowCalendar}>
              <TextInput
                  style={styles.dateInput}
                  value={date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''} // Formata a data de pagamento
                  editable={false} // Campo não editável diretamente
                />
                  <Icon name="calendar" size={20} color={COLORS.gray} />
              </TouchableOpacity>
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
                  <TouchableOpacity style={styles.addButton} onPress={handleCategoriesScreen} disabled={true}>
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
                    onChangeText={(text) => {
                      // Remove todos os caracteres que não são números
                      const numericValue = text.replace(/\D/g, '');
                      
                      // Divide por 100 para obter o valor com centavos
                      const numberValue = parseFloat(numericValue) / 100;

                      // Formata o valor como moeda brasileira
                      const formattedValue = numberValue.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      });

                      // Atualiza o estado do valor formatado para exibição
                      setValor(formattedValue);
                      // Atualiza o estado do valor numérico para processamento
                      setValorNumerico(numberValue);
                    }}
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

           {/* Recorrencia */}
            <RecurrenceField
                  setSelectedFrequencyId={setSelectedFrequencyId}
                  setSelectedFrequencyName={setSelectedFrequencyName}
                setIsIndeterminate={setIsIndeterminate}          // Passa a função para definir se é indeterminado
                setRepeatCount={setRepeatCount}                  // Passa a função para definir a quantidade de repetições
                setIsRecurring={setIsRecurring}
                isRecurring={isRecurring}                        // Passa o estado para controlar a limpeza
                selectedFrequencyId={selectedFrequencyId}        // Passa o estado de frequência para controle
                repeatCount={repeatCount}                        // Passa o estado de repetições
                isIndeterminate={isIndeterminate}               // Passa a função para definir se é recorrente
              />

            {/* Botão de Salvar Despesa */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Icon name="checkmark-circle" size={24} color={COLORS.black} />
              <Text style={styles.saveButtonText}>Salvar despesa</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <CustomCalendar
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onDayPress={handleDayPress}
          maximumDate={new Date().toISOString().split('T')[0]}
        />

      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        valor={valor}
        parceiro={getSupplierNameById(parceiro)}
        dataPagamento={date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''}
        dataVencimento={date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : ''}
        isRecurring={isRecurring}
        tipoRecorrencia={selectedFrequencyName}
        repeatCount={repeatCount}
        isIndeterminate={isIndeterminate}
      />

      <SucessModal
        visible={successModalVisible}
        onClose={handleCloseSucessModal} // Agora fecha o modal e mantém o usuário na tela
        onRegisterNew={() => setSuccessModalVisible(false)}
      />
    </ScrollView>
  );
};

export default NewExpense;
