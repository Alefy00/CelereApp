/* eslint-disable prettier/prettier */
import React from "react";
import { COLORS } from "../../../../../../../constants";
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ConfirmModal = ({ visible, onClose, onConfirm, valor, parceiro, dataPagamento, dataVencimento, recorrencia }) => {
  
  // Função para formatar o valor como moeda BRL
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Botão de Fechar */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>Confirme os dados</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor</Text>
            <Text style={styles.input}>{formatCurrency(valor)}</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Parceiro</Text>
            <Text style={styles.input}>{parceiro}</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de pagamento</Text>
            <Text style={styles.input}>{dataPagamento}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Data de vencimento</Text>
            <Text style={styles.input}>{dataVencimento}</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Recorrência</Text>
            <Text style={styles.input}>{recorrencia}</Text>
          </View>
          
          <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative', // Adicionada para posicionamento absoluto do botão de fechar
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#000',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#000',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray2,
    justifyContent: 'center',
    paddingVertical: 10,
    color:'#000',
  },
  confirmButton: {
    backgroundColor: COLORS.green,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConfirmModal;
