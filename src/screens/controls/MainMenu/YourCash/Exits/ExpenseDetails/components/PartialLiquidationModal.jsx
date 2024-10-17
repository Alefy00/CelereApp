/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../../../../../../../components/CustomCalendar';
import { COLORS } from '../../../../../../../constants';

const formatCurrency = (value) => {
  if (!value) return '';
  const cleanedValue = value.replace(/\D/g, '');
  const numericValue = (parseFloat(cleanedValue) / 100).toFixed(2);
  return Number(numericValue).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [partialValue, setPartialValue] = useState(''); // Armazena o valor formatado como string
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  const handlePartialLiquidation = () => {
    // Converte o valor formatado de volta para número
    const parsedValue = parseFloat(partialValue.replace(/[^\d,-]/g, '').replace(',', '.'));
    
    if (isNaN(parsedValue) || parsedValue <= 0) {
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
            value={partialValue} // Mostra o valor formatado como moeda
            onChangeText={(text) => setPartialValue(formatCurrency(text))} // Usa a função formatCurrency diretamente
            keyboardType="numeric"
          />

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
