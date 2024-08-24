/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';



const ExpenseDetails = () => {
    return (
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.emptyHeader}></Text>
            <Text style={styles.header}>Previsto</Text>
            <Text style={styles.header}>Realizado</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>Fornecedores</Text>
            <Text style={styles.amount}>R$ 200</Text>
            <Text style={styles.amount}>R$ 210</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>Aluguel</Text>
            <Text style={styles.amount}>R$ 0</Text>
            <Text style={styles.amount}>R$ 0</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.item}>Marketing</Text>
            <Text style={styles.amount}>R$ 0</Text>
            <Text style={styles.amount}>R$ 0</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.item, styles.total]}>Total</Text>
            <Text style={[styles.amount, styles.total]}>R$ 200</Text>
            <Text style={[styles.amount, styles.total]}>R$ 210</Text>
          </View>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: {
        padding: 15,
      },
      headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
      },
      emptyHeader: {
        flex: 1,
      },
      header: {
        width: 100,
        textAlign: 'right',
        fontSize: 14,
        color: '#333',
      },
      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      item: {
        flex: 1,
        fontSize: 16,
        color: '#333',
      },
      amount: {
        width: 100,
        textAlign: 'right',
        fontSize: 16,
        color: '#333',
      },
      total: {
        fontWeight: 'bold',
        color: '#000',
      },
    });

export default ExpenseDetails;
