/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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

// Função para formatar as datas no formato brasileiro
const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };
  
  const ExpenseDetails = ({ route, navigation }) => {
    const { expense, categories, fornecedores } = route.params;
    const [isDateModalVisible, setIsDateModalVisible] = useState(false);
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
    const [isPartialModalVisible, setIsPartialModalVisible] = useState(false);
    const [isSecondPartialModalVisible, setIsSecondPartialModalVisible] = useState(false);
    const [partialAmount, setPartialAmount] = useState(0);
    const [remainingAmount, setRemainingAmount] = useState(parseFloat(expense.valor));
    const [isPostponeModalVisible, setIsPostponeModalVisible] = useState(false); // Controla o modal de adiamento
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
  
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
    const handleConfirmDelete = () => {
        setIsDeleteModalVisible(false);
    };
  
    // Confirmar a liquidação e abrir o modal de confirmação
    const handleConfirmLiquidation = (selectedDate) => {
      setIsDateModalVisible(false); // Fecha o modal de data
      setIsConfirmationModalVisible(true); // Abre o modal de confirmação
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
            onConfirm={handleConfirmLiquidation} // Chama a função ao confirmar
          />
  
          {/* Modal de confirmação */}
          <ConfirmationModal
            visible={isConfirmationModalVisible}
            onClose={() => setIsConfirmationModalVisible(false)}
            onConfirm={() => Alert.alert('Despesa liquidada com sucesso!')} // Lógica da requisição será implementada
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
        <PostponeExpenseModal
          visible={isPostponeModalVisible}
          onClose={() => setIsPostponeModalVisible(false)}
          onConfirm={handleConfirmPostponement} // Confirma a data de adiamento
        />
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