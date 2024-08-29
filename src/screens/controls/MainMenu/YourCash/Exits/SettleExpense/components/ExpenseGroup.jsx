/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const ExpenseGroup = ({ group, onPress, getCategoryNameById }) => {
  const parentExpense = group[0]; // A primeira despesa é a original ou o pai
  const totalValue = group.reduce((acc, exp) => acc + parseFloat(exp.valor), 0);

  return (
    <TouchableOpacity style={styles.expenseContainer} onPress={() => onPress(group)}>
      <Text style={styles.itemText}>Item: {parentExpense.item}</Text>
      <Text style={styles.categoryText}>Categoria: {getCategoryNameById(parentExpense.categoria_despesa)}</Text>
      <Text style={styles.valueText}>Valor Total: {totalValue.toFixed(2)}</Text>
    </TouchableOpacity>
  );
};

export default ExpenseGroup;
