/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../../../../../../constants';

const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [partialValue, setPartialValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

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
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Icon name="calendar" size={20} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>

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

          {/* Campo para valor parcial */}
          <TextInput
            style={styles.input}
            placeholder="Valor a liquidar parcialmente"
            value={partialValue}
            onChangeText={(text) => setPartialValue(text.replace(/[^0-9,.]/g, ''))} // Permite apenas números, vírgula e ponto
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
    color: COLORS.lightGray,
  },
});
