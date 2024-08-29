/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpenseGroup = ({ group, onPress, getCategoryNameById }) => {
  const parentExpense = group[0]; // A primeira despesa é a original ou o pai
  const totalValue = group.reduce((acc, exp) => acc + parseFloat(exp.valor), 0);

  return (
    <TouchableOpacity style={styles.expenseContainer} onPress={() => onPress(group)}>
      <Text style={styles.itemText}>Item: {parentExpense.item}</Text>
      <Text style={styles.categoryText}>Categoria: {getCategoryNameById(parentExpense.categoria_despesa)}</Text>
      <Text style={styles.valueText}>Valor Total: R$ {totalValue.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  expenseContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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
  },
});

export default ExpenseGroup;
