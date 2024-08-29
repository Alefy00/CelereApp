/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const LiquidateExpenseModal = ({ visible, onClose, onConfirmLiquidation }) => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reason, setReason] = useState('');

  const handleConfirm = () => {
    if (!reason) {
      Alert.alert('Erro', 'Por favor, informe o motivo da liquidação.');
      return;
    }

    onConfirmLiquidation(paymentDate, reason);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Informações da Liquidação</Text>

          <Text style={styles.label}>Data de Pagamento</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.textDate}>{paymentDate.toLocaleDateString()}</Text>
            <Icon name="calendar-outline" size={20} color="#000" />
          </TouchableOpacity>
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

          <Text style={styles.label}>Motivo da Liquidação</Text>
          <TextInput
            style={styles.input}
            placeholder="Informe o motivo"
            value={reason}
            onChangeText={setReason}
          />

          <TouchableOpacity style={styles.liquidateButton} onPress={handleConfirm}>
            <Text style={styles.liquidateButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LiquidateExpenseModal;
