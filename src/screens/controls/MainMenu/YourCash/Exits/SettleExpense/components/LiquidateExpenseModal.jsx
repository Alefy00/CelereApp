/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../../../../constants';

const LiquidateExpenseModal = ({ visible, onClose, onConfirm, expense, categories }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleConfirm = () => {
    // Ao clicar em "Liquidar", fecha este modal e abre o modal de confirmação
    onConfirm(paymentDate); // Passa a data de pagamento ao confirmar
  };
  // Função para pegar o nome da categoria pelo ID
  const getCategoryNameById = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header com título e botão de fechar */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Quando esta despesa foi liquidada?</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close-outline" size={24} color="#6C6C6C" />
            </TouchableOpacity>
          </View>

          {/* Informação da despesa */}
          {expense && (
            <View style={styles.expenseInfoContainer2}>
              <View style={styles.containerExpenseModal}>
                <Text style={styles.expenseTitle}>{expense.item}</Text>
                <Text style={styles.expenseSubtitle}>
                  {getCategoryNameById(expense.categoria_despesa)}
                </Text>
              </View>
              <Text style={styles.expenseValue}>R$ {expense.total ? expense.total.toFixed(2) : '0.00'}</Text> 
            </View>
          )}

          {/* Data de Pagamento */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Hoje, {paymentDate.toLocaleDateString('pt-BR')}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Icon name="calendar" size={20} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />

          {showDatePicker && (
            <DateTimePicker
              value={paymentDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setPaymentDate(selectedDate);
              }}
              maximumDate={new Date()}
              locale="pt-BR"
            />
          )}

          {/* Botão de confirmação */}
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Icon name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.confirmButtonText}>Liquidar despesa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LiquidateExpenseModal;
