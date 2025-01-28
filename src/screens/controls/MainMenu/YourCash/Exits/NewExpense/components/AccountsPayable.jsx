/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal, FlatList } from 'react-native';
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
import moment from 'moment-timezone';
import { format } from 'date-fns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../../constants';
import ConfirmModal from '../components/ConfirmModal';
import SucessModal from '../components/SucessModal';
import styles from '../styles';
import RecurrenceField from './RecurrenceField';
import SupplierDropdown from './SupplierDropdown';
import CustomCalendar from '../../../../../../../components/CustomCalendar';
import { API_BASE_URL } from '../../../../../../../services/apiConfig';
import { useFocusEffect } from '@react-navigation/native';
import mixpanel from '../../../../../../../services/mixpanelClient';

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
  const [date, setDate] = useState(moment().tz('America/Sao_Paulo'));
  const [dueDate, setDueDate] = useState(moment().tz('America/Sao_Paulo'));
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [barcode, setBarcode] = useState('');
  const [isLiquidateNow, setIsLiquidateNow] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [recorrenciaText, setRecorrenciaText] = useState('Pagamento único'); // Estado para a recorrência
  const [showCalendar, setShowCalendar] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false); // Controle de recorrência
  const [selectedFrequencyId, setSelectedFrequencyId] = useState(''); // Tipo de recorrência (nome)
  const [isIndeterminate, setIsIndeterminate] = useState(false); // Tempo indeterminado
  const [repeatCount, setRepeatCount] = useState(0); // Quantidade de repetições
  const [valorNumerico, setValorNumerico] = useState(0);
  const [selectedFrequencyName, setSelectedFrequencyName] = useState('');

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
    const selectedDate = moment.tz(day.dateString, 'YYYY-MM-DD', 'America/Sao_Paulo');
    const today = moment.tz('America/Sao_Paulo').startOf('day');

    if (selectedDate.isSameOrAfter(today)) {
      setDueDate(selectedDate);
      setShowCalendar(false);
    } else {
      Alert.alert('Data Inválida', 'Por favor, selecione uma data de hoje em diante.');
    }
  };

  const getSupplierNameById = (id) => {
    const supplier = suppliers.find((s) => s.value === id);
    return supplier ? supplier.label : 'Parceiro não encontrado';
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
        setCategories([{ label: 'Selecione uma categoria', value: '' }, ...fetchedCategories]);
      } else {
        console.error('Erro ao buscar categorias:', data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar as categorias. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
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
    const suppliersApiUrl = `${API_BASE_URL}/cad/fornecedor/?empresa_id=${empresa_id}&page=1&page_size=50`;

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
  }
  setLoading(false);
}, []);

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, [fetchCategories, fetchSuppliers]);

  useFocusEffect(
    useCallback(() => {
      fetchSuppliers(); // Atualiza a lista de fornecedores quando a tela ganha o foco
    }, [fetchSuppliers])
  );

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
          text = 'Recorrência';
      }
    }
    if (isIndeterminate) {
      text += ' (tempo indeterminado)';
    }
    return text;
  };
  
  const handleSave = () => {
    mixpanel.track("Despesa Salva(Contas a pagar)", {
      screen: "AccountsPayable",
      category_id: categoria,
      category_name: categories.find((cat) => cat.value === categoria)?.label || "Unknown",
      value: valorNumerico,
      partner_id: parceiro,
      partner_name: getSupplierNameById(parceiro),
      due_date: dueDate.format("YYYY-MM-DD"),
      recurrence: isRecurring ? selectedFrequencyName : "single",
      repeat_count: repeatCount,
    });

    if (!dueDate) {
      Alert.alert('Erro', 'Por favor, selecione uma data de vencimento.');
      return;
    }

    if (!categoria) {
      Alert.alert('Erro', 'Por favor, selecione uma categoria.');
      return;
    }
    if (!item) {
      Alert.alert('Erro', 'Insira o nome do item');
      return;
    }
  
    if (!valor || isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido.');
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
      Alert.alert('Erro', 'ID da empresa não encontrado. Verifique as configurações.');
      setLoading(false);
      return;
    }
    const expenseData = {
      empresa_id: Number(empresa_id),
      item: item,
      valor: valorNumerico,
      dt_vencimento: dueDate.format('YYYY-MM-DD'),
      dt_pagamento: null,
      fornecedor_id: Number(parceiro),
      categoria_despesa_id: Number(categoria),
      status: 'pendente',
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
    console.log("dado enviados",expenseData)
    try {
      const response = await axios.post(`${API_BASE_URL}/cad/despesa/`, expenseData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Resposta da API:', response.data);
      if (response.status === 201 || response.data.status === 'success') {
        setSuccessModalVisible(true);
        handleRegisterNew();
      } else {
        Alert.alert('Erro', `Erro ao salvar a despesa: ${response.data.message || 'Erro desconhecido'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar a despesa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a despesa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterNew = () => {
    setCategoria('');
    setSelectedCategory('');
    setValor('');
    setValorNumerico(0); // Limpa o valor numérico da despesa
    setItem('');
    setParceiro('');
    setSelectedSupplier(null);
    setRepeatCount(0);  // Limpa a quantidade de repetições
    setIsIndeterminate(false);  // Reseta a recorrência indeterminada
    setSelectedFrequencyId('');  // Limpa o tipo de frequência selecionada
    setSelectedFrequencyName(''); // Limpa o nome do tipo de frequência
    setIsRecurring(false);  // Desmarca o checkbox de recorrência
    setRecorrenciaText('Pagamento único');  // Define o texto padrão para recorrência
    setDate(moment().tz('America/Sao_Paulo'));
    setDueDate(moment().tz('America/Sao_Paulo'));
    setBarcode('');
  };

  const toggleExpenseType = () => {
    navigation.navigate('NewExpense');
  };

  const handleAcconunts = () => {
    navigation.navigate('AccountsPayable');
  };

  const handleCloseSucessModal = () => {
    setSuccessModalVisible(false);
    navigation.navigate("MainTab");
  }
  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);
  // Função para definir o fornecedor selecionado
  const handleSelectSupplier = (supplier) => {
    console.log('Fornecedor selecionado:', supplier);  // Verifica o valor selecionado
    setSelectedSupplier(supplier);  // Define o fornecedor selecionado
    setParceiro(supplier.value);    // Define o ID do parceiro corretamente
  };

  const formatCurrency = (value) => {
    const numericValue = value.replace(/\D/g, '');
    const numberValue = parseFloat(numericValue) / 100;
    // Formata para o padrão BRL
    if (isNaN(numberValue)) {
      return '';
    } else {
      return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
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
            <TouchableOpacity style={styles.datePickerRow} onPress={handleShowCalendar}>
              <TextInput
                style={styles.dateInput}
                value={dueDate ? dueDate.format('DD/MM/YYYY') : ''}
                editable={false}
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
                {/* <TouchableOpacity style={styles.addButton} disabled={true}>
                    <Icon name="add" size={30} color={COLORS.black} />
                  </TouchableOpacity>*/} 
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
                const formattedValue = formatCurrency(text);
                setValor(formattedValue);
                // Também armazenamos o valor numérico para uso na requisição
                const numericValue = text.replace(/\D/g, '');
                const numberValue = parseFloat(numericValue) / 100;
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

            {/* Cartão de Recorrência */}
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
              <Icon name="checkmark-circle" size={30} color={COLORS.black} />
              <Text style={styles.saveButtonText}>Salvar despesa</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>

      <CustomCalendar
        visible={showCalendar}
        onClose={() => setShowCalendar(false)}
        onDayPress={handleDayPress}
        minimumDate={moment().tz('America/Sao_Paulo').format('YYYY-MM-DD')}
      />
      <ConfirmModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        valor={valor} // O valor já está formatado
        parceiro={getSupplierNameById(parceiro)}
        dataVencimento={dueDate ? dueDate.format('DD/MM/YYYY') : ''}
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

export default AccountsPayable;
