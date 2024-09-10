/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity,  StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';


// Função para gerar dados fictícios com base no mês e ano
const getDaysInMonthWithData = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    const isToday =
      date.getDate() === new Date().getDate() &&
      date.getMonth() === new Date().getMonth() &&
      date.getFullYear() === new Date().getFullYear();

    days.push({
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase(),
      isToday: isToday,
      isFuture: date > new Date(),
      income: 'R$ 500,00', // Dados fictícios de entrada
      expense: 'R$ 250,00', // Dados fictícios de saída
      saldo: `R$ ${1500 + 500 * date.getDate()},00`, // Cálculo fictício do saldo
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const DailyTable = ({ selectedMonth, selectedYear }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Atualiza os dias com base no mês e ano selecionados
    setDays(getDaysInMonthWithData(selectedMonth, selectedYear));
  }, [selectedMonth, selectedYear]); // Atualiza quando o mês ou ano muda
  return (
    <ScrollView
      style={styles.dailyTableContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={true} // Exibe o indicador de rolagem
      nestedScrollEnabled={true} // Permite rolagem dentro de outro scroll
    >
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Dia</Text>
        <Text style={styles.headerText}>Entradas</Text>
        <Text style={styles.headerText}>Saídas</Text>
        <Text style={styles.headerText}>Saldo de Caixa</Text>
      </View>

      {days.map((day, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tableRow,
            day.isToday ? styles.todayRow : index % 2 === 0 ? styles.evenRow : styles.oddRow, // Alterna cores
            day.isFuture && styles.futureRow, // Estilo para dias futuros
          ]}
        >
          <View style={styles.dateColumn}>
            <Text style={[
              styles.dayCell,
              day.isToday && styles.boldText,
              day.isFuture && styles.futureText, // Cor azul para futuros
            ]}>
              {`${day.day} ${day.month}`}
            </Text>
            {day.isToday && <Text style={styles.todayLabel}>Hoje</Text>}
          </View>

          <Text style={[
            styles.entryCell,
            day.isToday && styles.boldText,
            day.isFuture && styles.futureText, // Cor azul para futuros
          ]}>
            {day.income}
          </Text>
          <Text style={[
            styles.expenseCell,
            day.isToday && styles.boldText,
            day.isFuture && styles.futureText, // Cor azul para futuros
          ]}>
            {day.expense}
          </Text>
          <Text style={[
            styles.balanceCell,
            day.isToday && styles.boldText,
            day.isFuture && styles.futureText, // Cor azul para futuros
          ]}>
            {day.saldo}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dailyTableContainer: {
    paddingHorizontal: 16,
    backgroundColor: COLORS.background,
    height: 300,
    marginBottom: 100,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: COLORS.black,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    marginBottom:7,
    borderRadius:10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  oddRow: {
    backgroundColor: '#fefbde', // Fundo amarelo claro para linhas ímpares
  },
  evenRow: {
    backgroundColor: '#e0ded0', // Fundo cinza claro para linhas pares
  },
  todayRow: {
    backgroundColor: '#b5b4a6', // Fundo cinza escuro para o dia de hoje
  },
  futureRow: {
    // Fundo azul claro para dias futuros
  },
  dateColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dayCell: {
    fontSize: 14,
    color: COLORS.gray2,
    marginRight: 25,
  },
  todayLabel: {
    fontSize: 12,
    color: COLORS.black,
    marginRight:20,
    fontWeight: '900'
  },
  entryCell: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray2,
    
  },
  expenseCell: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray2,
  },
  balanceCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.gray2,
  },
  boldText: {
    fontWeight: '900',
    color: '#000', // Texto branco para o dia de hoje
  },
  futureText: {
    color: '#749db4', // Azul para dias futuros
    fontWeight: '400',
  },
});

export default DailyTable;
