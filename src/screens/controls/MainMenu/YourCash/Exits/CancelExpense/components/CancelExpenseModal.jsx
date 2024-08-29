/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CancelExpenseModal = ({ visible, onClose, onConfirmCancellation }) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Confirmar Cancelamento</Text>

          <Text style={styles.label}>
            Você tem certeza que deseja cancelar esta despesa?
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirmCancellation}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
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
    width: '80%',
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
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CancelExpenseModal;
