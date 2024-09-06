/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

const RecurrenceModal = ({ visible, onClose, expenseGroup, onConfirmLiquidateAll, getCategoryNameById }) => {
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
                <Text style={styles.valueText}>Valor: {expense.valor}</Text>
                <Text style={styles.dateText}>Vencimento: {expense.dt_vencimento}</Text>
              </View>
            ))}
          </ScrollView>

          {/* Botão único para liquidar todas as recorrências */}
          <TouchableOpacity style={styles.liquidateAllButton} onPress={() => onConfirmLiquidateAll(expenseGroup)}>
            <Text style={styles.liquidateButtonText}>Baixar Todas</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default RecurrenceModal;
