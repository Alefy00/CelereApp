/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../../../../constants';


const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [partialValue, setPartialValue] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePartialLiquidation = () => {
    onClose(); // Fecha o modal atual
    onConfirmPartialLiquidation(paymentDate, partialValue); // Abre o modal de confirmação
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
            onChangeText={setPartialValue}
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