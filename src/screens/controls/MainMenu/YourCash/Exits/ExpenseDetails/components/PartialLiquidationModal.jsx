/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../../../../../../../components/CustomCalendar';
import { COLORS } from '../../../../../../../constants';

const formatCurrency = (value) => {
  const number = value.replace(/\D/g, ''); // Remove tudo que não for número
  const formatted = (number / 100).toFixed(2).replace('.', ','); // Formata o valor
  return `R$ ${formatted.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`; // Adiciona ponto como separador de milhar
};

const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [partialValue, setPartialValue] = useState('');
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    // Função para lidar com a entrada de texto e formatar como moeda
    const handleValueChange = (text) => {
      setPartialValue(formatCurrency(text));
    };

  // Garantir que o valor seja convertido para número corretamente
  const handlePartialLiquidation = () => {
    const parsedValue = parseFloat(partialValue.replace(',', '.')); // Substitui vírgula por ponto, se houver
    if (isNaN(parsedValue) || parsedValue <= 0) {
      // Verifica se o valor é válido
      alert('Por favor, insira um valor parcial válido.');
      return;
    }

    onClose(); // Fecha o modal atual
    onConfirmPartialLiquidation(parsedValue, paymentDate); // Envia o valor numérico e a data ao componente pai
  };

  const handleDayPress = (day) => {
    setPaymentDate(new Date(day.dateString)); // Atualiza a data selecionada
  };

  const handleShowCalendar = () => {
    setIsCalendarVisible(true);
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

          {/* Data de Pagamento */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Hoje, {paymentDate.toLocaleDateString('pt-BR')}</Text>
            <TouchableOpacity onPress={handleShowCalendar} style={styles.datePickerButton}>
              <Icon name="calendar" size={20} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>

          <CustomCalendar
          visible={isCalendarVisible}
          onClose={() => setIsCalendarVisible(false)}
          onDayPress={handleDayPress}
          />

          {/* Campo para valor parcial */}
          <TextInput
            style={styles.input}
            placeholder="Valor a liquidar parcialmente"
            value={partialValue}
            onChangeText={handleValueChange} // Formata o valor em tempo real
            keyboardType="numeric"
          />

          {/* Botão de confirmação */}
          <TouchableOpacity style={styles.confirmButton} onPress={handlePartialLiquidation}>
            <Icon name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.confirmButtonText}>Liquidar despesa parcialmente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PartialLiquidationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    paddingHorizontal: 10,
  },
  datePickerButton: {
    marginBottom: 15,
    marginTop: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 22,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 8,
  },
  dateLabel: {
    color: COLORS.black,
  },
});
