/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RecurrenceModal = ({ visible, onClose, expenseGroup, onOpenCancelModal, getCategoryNameById }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Recorrências da Despesa</Text>
          <ScrollView style={styles.modalContent}>
            {expenseGroup.map((expense) => (
              <View key={expense.id} style={styles.modalExpenseItem}>
                <Text style={styles.itemText}>Item: {expense.item}</Text>
                <Text style={styles.categoryText}>Categoria: {getCategoryNameById(expense.categoria_despesa)}</Text>
                <Text style={styles.valueText}>Valor: R$ {expense.valor}</Text>
                <Text style={styles.dateText}>Vencimento: {expense.dt_vencimento}</Text>

                {/* Chamada para abrir o modal de cancelamento em vez de liquidar */}
                <TouchableOpacity style={styles.cancelButton} onPress={() => onOpenCancelModal(expense)}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalContent: {
    width: '100%',
  },
  modalExpenseItem: {
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  valueText: {
    fontSize: 14,
    color: '#007BFF',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RecurrenceModal;
