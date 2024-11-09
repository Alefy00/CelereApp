/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import TotalLiquidationModal from './components/TotalLiquidationModal ';
import ConfirmationModal from './components/ConfirmationModal';
import PartialLiquidationModal from './components/PartialLiquidationModal';
import SecondPartialConfirmationModal from './components/SecondPartialConfirmationModal';
import PostponeExpenseModal from './components/PostponeExpenseModal';
import DeleteExpenseModal from './components/DeleteExpenseModal';
import styles from './styles';
import axios from 'axios';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

// Função para formatar as datas no formato brasileiro
const formatDateToBrazilian = (dateString) => {
  return moment(dateString).tz("America/Sao_Paulo").format("DD/MM/YYYY");
};


const getMonthReference = (dateString) => {
  return moment(dateString).tz("America/Sao_Paulo").subtract(1, 'month').format("MMMM [de] YYYY");
};

const getEmpresaId = async () => {
  try {
    const storedEmpresaId = await AsyncStorage.getItem('empresaId');
    if (!storedEmpresaId) {
      throw new Error('ID da empresa não encontrado.');
    }
    const empresaId = Number(storedEmpresaId);
    if (isNaN(empresaId)) {
      throw new Error('ID da empresa inválido.');
    }
    return empresaId;
  } catch (error) {
    console.error('Erro ao buscar o ID da empresa:', error);
    Alert.alert('Erro', error.message);
    return null;
  }
};

const ExpenseDetails = ({ route, navigation }) => {
  const { expense, categories } = route.params;
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isPartialModalVisible, setIsPartialModalVisible] = useState(false);
  const [isSecondPartialModalVisible, setIsSecondPartialModalVisible] = useState(false);
  const [partialAmount, setPartialAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(parseFloat(expense.valor_a_pagar));
  const [isPostponeModalVisible, setIsPostponeModalVisible] = useState(false); // Controla o modal de adiamento
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
  const [selectedDate, setSelectedDate] = useState(null); // Para armazenar a data do modal
  const [empresaId, setEmpresaId] = useState(null); // Estado para armazenar o ID da empresa logada

  // Obter o ID da empresa ao montar o componente
  useEffect(() => {
    const fetchEmpresaId = async () => {
      const id = await getEmpresaId();
      if (id) {
        setEmpresaId(id);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o ID da empresa.');
      }
    };
    fetchEmpresaId();
  }, []);

  const getCategoryNameById = (id) => {
    return categories[id] || 'Categoria não encontrada';
  };

     // Abrir o modal de data
  const handleOpenDateModal = () => {
    setIsDateModalVisible(true);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalVisible(true); // Abre o modal de exclusão
  };

    // Função para confirmar o cancelamento da despesa
    const handleConfirmDelete = async () => {
      const empresaId = await getEmpresaId();
  
      if (!empresaId) {
        Alert.alert('Erro', 'Não foi possível obter o ID da empresa.');
        return;
      }
  
      try {
        const response = await axios.put(
          `${API_BASE_URL}/cad/despesa/${expense.id}/cancelardespesa/`,
          {
            empresa_id: empresaId,
            motivo_cancelamento: "Desistiu da despesa"
          }
        );
  
        if (response.data.status === 200) {
          setIsDeleteModalVisible(false);
          // Atualizar a lista de despesas na tela LiquidateExpense
          navigation.goBack();
        } else {
          Alert.alert('Erro', 'Ocorreu um problema ao cancelar a despesa.');
        }
      } catch (error) {
        console.error('Erro ao fazer requisição de cancelamento:', error);
        Alert.alert('Erro', 'Erro ao conectar-se à API. Tente novamente mais tarde.');
      }
    };
  // Fechar o modal e armazenar a data de pagamento
  const handleConfirmDate = (date) => {
    setSelectedDate(date);
    setIsDateModalVisible(false);
    setIsConfirmationModalVisible(true); // Abre o modal de confirmação
  };

  const formatDateToISO = (date) => {
    return moment(date).tz("America/Sao_Paulo").format("YYYY-MM-DD");
  };

  // Função para confirmar a liquidação
  const handleConfirmLiquidation = async () => {
    if (!selectedDate) {
      Alert.alert('Erro', 'Selecione uma data para liquidação.');
      return;
    }
  
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não encontrado.');
      return;
    }
  
    // Formatar a data no formato ISO (YYYY-MM-DD)
    const formattedDate = formatDateToISO(selectedDate);
  
    try {
      // Fazer a requisição PATCH para liquidar a despesa
      const response = await axios.patch(
        `${API_BASE_URL}/cad/despesa/${expense.id}/baixardespesa/`,  // URL correta para o PATCH
        {
          empresa_id: empresaId,  // ID da empresa logada
          dt_pagamento: formattedDate,  // Data de pagamento
        }
      );
  
      // Verifica o status da resposta
      if (response.status === 200) {
        setIsConfirmationModalVisible(false); // Fecha o modal de confirmação
  
        // Redireciona de volta para a tela de consulta
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Ocorreu um problema ao liquidar a despesa.');
      }
    } catch (error) {
      console.error('Erro ao fazer requisição PATCH:', error);
      Alert.alert('Erro', 'Erro ao conectar-se à API. Tente novamente mais tarde.');
    }
  };

  // Confirmar o adiamento e exibir uma mensagem de sucesso
  const handleConfirmPostponement = (selectedDate) => {
    setIsPostponeModalVisible(false);
    Alert.alert('Despesa Adiada', `Despesa adiada para: ${formatDateToBrazilian(selectedDate)}`);
  };
  
  // Confirmar o valor parcial e abrir o segundo modal de confirmação
  const handleConfirmPartialLiquidation = (amount, date) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Erro', 'Insira um valor parcial válido.');
      return;
    }
  
    if (!date) {
      Alert.alert('Erro', 'Selecione uma data para pagamento.');
      return;
    }
  
    setIsPartialModalVisible(false); // Fecha o primeiro modal
    setPartialAmount(parsedAmount); // Define o valor parcial
    setSelectedDate(date); // Armazena a data de pagamento
  
    // Calcula o valor restante corretamente a partir de `valor_a_pagar`
    const newRemainingAmount = parseFloat(expense.valor_a_pagar) - parsedAmount;
    if (newRemainingAmount < 0) {
      Alert.alert('Erro', 'O valor parcial não pode ser maior que o valor total da despesa.');
      return;
    }
  
    setRemainingAmount(newRemainingAmount.toFixed(2)); // Atualiza o valor restante
    setIsSecondPartialModalVisible(true); // Abre o segundo modal de confirmação
  };

 // Confirmar a liquidação parcial e fechar o modal
const handleFinalConfirmation = async () => {
  if (!partialAmount || partialAmount <= 0) {
    Alert.alert('Erro', 'Valor parcial inválido.');
    return;
  }

  if (!selectedDate) {
    Alert.alert('Erro', 'Data de pagamento não selecionada.');
    return;
  }

  const empresaId = await getEmpresaId(); // Obter o ID da empresa logada
  if (!empresaId) {
    Alert.alert('Erro', 'ID da empresa não encontrado.');
    return;
  }

  // Formatar a data no formato ISO (YYYY-MM-DD)
  const formattedDate = formatDateToISO(selectedDate);

  try {
    // Fazer a requisição PATCH para liquidar parcialmente a despesa
    const response = await axios.patch(
      `${API_BASE_URL}/cad/despesa/${expense.id}/baixar_despesa_parcialmente/?empresa_id=${empresaId}`,
      {
        dt_pagamento: formattedDate,  // Data de pagamento
        vlr_pagamento: partialAmount,  // Valor parcial
      }
    );

    if (response.status === 200 || response.data.status === 'success') {
      const updatedExpense = response.data.data;  // Dados atualizados da despesa

      // Atualiza o valor restante (valor_a_pagar)
      setRemainingAmount(updatedExpense.valor_a_pagar);

      Alert.alert('Sucesso', 'Liquidação parcial realizada com sucesso!');
      setIsSecondPartialModalVisible(false);

      // Redirecionar ou atualizar a lista de despesas
      navigation.goBack(); // Volta para a tela anterior
    } else {
      Alert.alert('Erro', 'Ocorreu um problema ao realizar a liquidação parcial.');
    }
  } catch (error) {
    console.error('Erro ao fazer requisição PATCH:', error);
    if (error.response) {
      const errorMessage = error.response.data.message || 'Erro ao realizar a liquidação parcial.';
      Alert.alert('Erro', errorMessage);
    } else if (error.request) {
      Alert.alert('Erro', 'Não foi possível conectar-se ao servidor. Verifique sua conexão.');
    } else {
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  }
};

  const formatCurrency = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Detalhes da despesa</Text>

        {/* Exibindo os detalhes da despesa */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsInfo}>
            <Text style={styles.expenseTitle}>{expense.item}</Text>
            <Text style={styles.expenseCategory}>Categoria: {getCategoryNameById(expense.categoria_despesa)}</Text>
            <Text style={styles.expenseReference}>Referência: {getMonthReference(expense.dt_vencimento)}</Text>
            <Text style={styles.expenseCreatedDate}>Data de inclusão:{'\n'}{formatDateToBrazilian(expense.criado)}</Text>
            <Text style={styles.expenseDueDate}>Data de vencimento:{'\n'}{formatDateToBrazilian(expense.dt_vencimento)}</Text>
            <Text style={styles.expenseStatus}>Situação: {expense.status}</Text>
          </View>
          <Text style={styles.expenseValue}>{formatCurrency(expense.valor_a_pagar)}</Text>
        </View>

        {/* Botões de ações */}
        <TouchableOpacity style={styles.actionButtonFull} onPress={handleOpenDateModal}>
          <Icon name="checkmark-circle" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonTextFull}>Pagar valor total</Text>
        </TouchableOpacity>

        {/*<TouchableOpacity style={styles.actionButton2} onPress={handleOpenPartialModal}>
          <Icon name="cut-sharp" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonText}>Liquidar parcialmente</Text>
        </TouchableOpacity>*/ }

        <TouchableOpacity style={styles.actionButtonDelete} onPress={handleOpenDeleteModal}>
          <Icon name="trash-outline" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonTextDelete}>Excluir Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonAdiar} disabled={true}>
          <Icon name="calendar" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonText}>Adiar</Text>
        </TouchableOpacity>
        {/* Modal de liquidação total */}
        <TotalLiquidationModal
          visible={isDateModalVisible}
          onClose={() => setIsDateModalVisible(false)}
          onConfirm={handleConfirmDate} // Recebe a data e fecha o modal
        />

        {/* Modal de confirmação */}
        <ConfirmationModal
          visible={isConfirmationModalVisible}
          onClose={() => setIsConfirmationModalVisible(false)}
          onConfirm={handleConfirmLiquidation} // Chama a função que faz a requisição
        />

        {/* Modal de liquidação parcial */}
        <PartialLiquidationModal
          visible={isPartialModalVisible}
          onClose={() => setIsPartialModalVisible(false)}
          onConfirmPartialLiquidation={handleConfirmPartialLiquidation} // Envia o valor parcial e a data
        />

        {/* Segundo modal de confirmação da liquidação parcial */}
        <SecondPartialConfirmationModal
          visible={isSecondPartialModalVisible}
          onClose={() => setIsSecondPartialModalVisible(false)}
          partialAmount={partialAmount}
          remainingAmount={remainingAmount}
          onConfirm={handleFinalConfirmation} // Chama a função para fechar o modal e confirmar a liquidação
        />

        {/* Modal de adiamento */}
        <PostponeExpenseModal
          visible={isPostponeModalVisible}
          onClose={() => setIsPostponeModalVisible(false)}
          onConfirm={handleConfirmPostponement} // Confirma a data de adiamento
        />

        {/* Modal de exclusão */}
        <DeleteExpenseModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={handleConfirmDelete} // Lógica de exclusão
        />
      </View>
    </View>
  );
};

export default ExpenseDetails;
