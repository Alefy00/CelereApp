/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';

const ConfirmationModal = ({ visible, onClose, data, onConfirm }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Exibição dos dados em duas colunas */}
          <View style={styles.modalRow}>
            <View style={styles.modalColumn}>
              <Text style={styles.modalLabel}>Primeiro Nome:</Text>
              <Text style={styles.modalValue}>{data.firstName || '---'}</Text>

              <Text style={styles.modalLabel}>Último Nome:</Text>
              <Text style={styles.modalValue}>{data.lastName || '---'}</Text>

              <Text style={styles.modalLabel}>CNPJ:</Text>
              <Text style={styles.modalValue}>{data.hasCnpj ? data.cnpj : 'Não tenho CNPJ'}</Text>

              <Text style={styles.modalLabel}>RG:</Text>
              <Text style={styles.modalValue}>{data.rg}</Text>

              <Text style={styles.modalLabel}>Expeditor:</Text>
              <Text style={styles.modalValue}>{data.expeditor}</Text>

              <Text style={styles.modalLabel}>UF:</Text>
              <Text style={styles.modalValue}>{data.uf}</Text>

              <Text style={styles.modalLabel}>Renda:</Text>
              <Text style={styles.modalValue}>{data.monthlyIncome}</Text>

              <Text style={styles.modalLabel}>País:</Text>
              <Text style={styles.modalValue}>{data.countryCode}</Text>
            </View>

            <View style={styles.modalColumn}>
              <Text style={styles.modalLabel}>CPF:</Text>
              <Text style={styles.modalValue}>{data.cpf}</Text>

              <Text style={styles.modalLabel}>CEP:</Text>
              <Text style={styles.modalValue}>{data.cep}</Text>

              <Text style={styles.modalLabel}>Endereço:</Text>
              <Text style={styles.modalValue}>{data.street}</Text>

              <Text style={styles.modalLabel}>Número:</Text>
              <Text style={styles.modalValue}>{data.number}</Text>

              <Text style={styles.modalLabel}>Complemento:</Text>
              <Text style={styles.modalValue}>{data.complement}</Text>

              <Text style={styles.modalLabel}>Bairro:</Text>
              <Text style={styles.modalValue}>{data.neighborhood}</Text>

              <Text style={styles.modalLabel}>Cidade:</Text>
              <Text style={styles.modalValue}>{data.city}</Text>

              <Text style={styles.modalLabel}>Estado:</Text>
              <Text style={styles.modalValue}>{data.state}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.modalButton} onPress={onConfirm}>
            <Icon name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.modalButtonText}>Confirmar dados</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalColumn: {
    flex: 1,
    marginRight: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  modalValue: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 22,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default ConfirmationModal;
