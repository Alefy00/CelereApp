/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';

const PostponeExpenseModal = ({ visible, onClose, onConfirm }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Data selecionada
  const [showDatePicker, setShowDatePicker] = useState(false); // Controla o date picker

  // Função para confirmar o adiamento
  const handlePostpone = () => {
    onClose(); // Fecha o modal
    onConfirm(selectedDate); // Confirma a data de adiamento
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header com título e botão de fechar */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Para quando você quer adiar essa despesa?</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close-outline" size={24} color="#6C6C6C" />
            </TouchableOpacity>
          </View>

          {/* Data de adiamento */}
          <View style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Hoje, {selectedDate.toLocaleDateString('pt-BR')}</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
              <Icon name="calendar" size={20} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>

          {/* Exibir o date picker */}
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={(event, newDate) => {
                setShowDatePicker(false);
                if (newDate) setSelectedDate(newDate);
              }}
              minimumDate={new Date()} // Permite selecionar datas futuras
              locale="pt-BR"
            />
          )}

          {/* Botão de confirmação */}
          <TouchableOpacity style={styles.confirmButton} onPress={handlePostpone}>
            <Icon name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.confirmButtonText}>Adiar despesa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PostponeExpenseModal;

// Estilos do modal
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
  dateLabel: {
    color: COLORS.lightGray,
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
});
