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
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constante para o link da API
const API_URL = 'https://api.celereapp.com.br/cad/despesa';
const CANCEL_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa';

// Função para formatar as datas no formato brasileiro
const formatDateToBrazilian = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};

// Função para obter o ID da empresa do AsyncStorage
const getEmpresaId = async () => {
  try {
    const empresaData = await AsyncStorage.getItem('empresaData');
    return empresaData ? Number(empresaData) : null; // Converte para número
  } catch (error) {
    console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    return null;
  }
};


const ExpenseDetails = ({ route, navigation }) => {
  const { expense, categories, fornecedores, onUpdate } = route.params;
  const [isDateModalVisible, setIsDateModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isPartialModalVisible, setIsPartialModalVisible] = useState(false);
  const [isSecondPartialModalVisible, setIsSecondPartialModalVisible] = useState(false);
  const [partialAmount, setPartialAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(parseFloat(expense.valor));
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

  // Função para obter o nome da categoria pelo id
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };

    // Função para obter o nome do fornecedor pelo id
    const getSupplierNameById = (id) => {
      const supplier = fornecedores.find((sup) => sup.id === id);
      return supplier ? supplier.nome : 'Fornecedor não encontrado';
    };
  
     // Abrir o modal de data
  const handleOpenDateModal = () => {
    setIsDateModalVisible(true);
  };

  // Abrir o modal de adiamento
  const handleOpenPostponeModal = () => {
    setIsPostponeModalVisible(true);
  };
  
  // Abrir o modal de liquidação parcial
  const handleOpenPartialModal = () => {
    setIsPartialModalVisible(true);
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
          `${CANCEL_EXPENSE_API}/${expense.id}/cancelardespesa/`,
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
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Retorna no formato "YYYY-MM-DD"
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

    const formattedDate = formatDateToISO(selectedDate);

    try {
      const response = await axios.patch(
        `${API_URL}/${expense.id}/baixardespesa/`,
        {
          empresa_id: empresaId,
          dt_pagamento: formattedDate,
        }
      );

      if (response.data.status === 200) {
        setIsConfirmationModalVisible(false);

        // Chama a função onUpdate para atualizar a lista de despesas
        if (onUpdate) {
          onUpdate();
        }

        navigation.goBack(); // Volta para a tela anterior (LiquidateExpense)
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
    // Adicione a lógica de adiamento aqui, se necessário
  };
  
  // Confirmar o valor parcial e abrir o segundo modal de confirmação
  const handleConfirmPartialLiquidation = (amount, date) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Erro', 'Insira um valor parcial válido.');
      return;
    }

    setIsPartialModalVisible(false); // Fecha o primeiro modal
    setPartialAmount(parsedAmount); // Define o valor parcial

    // Calcula o valor restante
    const newRemainingAmount = parseFloat(expense.valor) - parsedAmount;
    if (newRemainingAmount < 0) {
      Alert.alert('Erro', 'O valor parcial não pode ser maior que o valor total da despesa.');
      return;
    }
    setRemainingAmount(newRemainingAmount.toFixed(2)); // Atualiza o valor restante
    setIsSecondPartialModalVisible(true); // Abre o segundo modal
  };

  // Confirmar a liquidação parcial e fechar o modal
  const handleFinalConfirmation = () => {
    setIsSecondPartialModalVisible(false);
    Alert.alert('Sucesso', 'Liquidação parcial realizada com sucesso!');
    // Adicione a lógica de liquidação parcial aqui, se necessário
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

        {/* Card de detalhes da despesa */}
        <View style={styles.detailsCard}>
          <View style={styles.detailsInfo}>
            <Text style={styles.expenseTitle}>{expense.item}</Text>
            <Text style={styles.expenseCategory}>{getCategoryNameById(expense.categoria_despesa)}</Text>
            <Text style={styles.expenseSubtitle}>Fornecedor: {getSupplierNameById(expense.fornecedor)}</Text>
            <Text style={styles.expenseSubtitle}>Data da inclusão: {'\n'}{formatDateToBrazilian(expense.criado)}</Text>
            <Text style={styles.expenseSubtitleBold}>Data de vencimento: {'\n'}{formatDateToBrazilian(expense.dt_vencimento)}</Text>
          </View>
          <Text style={styles.expenseValue}>R${parseFloat(expense.valor).toFixed(2)}</Text>
        </View>

        {/* Botões de ações */}
        <TouchableOpacity style={styles.actionButtonFull} onPress={handleOpenDateModal}>
          <Icon name="checkmark-circle" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonTextFull}>Liquidar valor total</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton2} onPress={handleOpenPartialModal}>
          <Icon name="cut-sharp" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonText}>Liquidar parcialmente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleOpenPostponeModal}>
          <Icon name="calendar" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonText}>Adiar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButtonDelete} onPress={handleOpenDeleteModal}>
          <Icon name="trash-outline" size={20} color={COLORS.black} />
          <Text style={styles.actionButtonTextDelete}>Excluir Conta</Text>
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
