/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../DailyViewStyles';

const getDaysInMonth = (month, year = new Date().getFullYear()) => {
    return new Date(year, month + 1, 0).getDate(); // Retorna o número de dias no mês
  };
  
  const DailyView = ({ dailyTransactions, selectedMonth }) => {
    const daysInMonth = getDaysInMonth(selectedMonth);
    
    // Valores de exemplo para "Saldo de Caixa Inicial" e "Saldo de Caixa Final"
    const saldoInicial = 1430.00;
    const entradasTotais = 21000.00;
    const saidasTotais = 10000.00;
    const saldoFinal = 1540.00;
  
    return (
      <View style={styles.contentContainer}>
        
        {/* Seção de Saldo de Caixa Inicial */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saldo de Caixa Inicial</Text>
          <Text style={styles.sectionValue}>{`R$ ${saldoInicial.toFixed(2)}`}</Text>
        </View>
  
        {/* Container para Entradas, Saídas e Saldo */}
        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Entradas</Text>
            <Text style={styles.summaryText}>Saídas</Text>
            <Text style={styles.summaryText}>Saldo</Text>
          </View>
          <View style={styles.summaryItemValue}>
            <Text style={styles.summaryValue}>{`R$ ${entradasTotais.toFixed(2)}`}</Text>
            <Text style={styles.summaryValueRed}>{`R$ ${saidasTotais.toFixed(2)}`}</Text>
            <Text style={styles.summaryValue}>{`R$ ${(entradasTotais - saidasTotais).toFixed(2)}`}</Text>
          </View>
        </View>
  
        {/* Seção de Saldo de Caixa Final */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saldo de Caixa Final</Text>
          <Text style={styles.sectionValue}>{`R$ ${saldoFinal.toFixed(2)}`}</Text>
        </View>
  
        {/* Cabeçalho para Dias */}
        <View style={styles.dailyTransactionHeader}>
          <Text style={styles.headerText}>Dia</Text>
          <Text style={styles.headerText}>Entradas</Text>
          <Text style={styles.headerText}>Saídas</Text>
          <Text style={styles.headerText}>Saldo de Caixa</Text>
        </View>
  
        {/* Renderização dos dias */}
        {[...Array(daysInMonth)].map((_, day) => {
          const transaction = dailyTransactions[day] || { entradas: 0, saidas: 0, saldo: 0 };
          const saldo = transaction.entradas - transaction.saidas;
          
          return (
            <View key={day} style={styles.dailyTransactionItem}>
              <Text style={[styles.transactionDate, day + 1 === new Date().getDate() ? styles.today : styles.futureDate]}>
                {`${day + 1}`.padStart(2, '0')}
              </Text>
              <Text style={styles.transactionValue}>{`R$ ${transaction.entradas.toFixed(2)}`}</Text>
              <Text style={styles.transactionValue}>{`R$ ${transaction.saidas.toFixed(2)}`}</Text>
              <Text style={[styles.transactionValue, saldo >= 0 ? styles.saldoPositivo : styles.saldoNegativo]}>
                {`R$ ${saldo.toFixed(2)}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  
  export default DailyView;