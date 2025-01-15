/* eslint-disable prettier/prettier */
import React, { useRef, useState } from 'react';
import { View, Animated, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BalanceTab from './BalanceTab'; // Primeira aba
import ExpensesNextDayTab from './ExpensesNextDayTab';
import { COLORS } from '../../../../../constants';
import OverdueReceivablesTab from './OverdueReceivablesTab';
import ExpensesDueToday from './ExpensesDueToday';
import AccountsReceivableToday from './AccountsReceivableToday';
import LatePayments from './LatePayments';
import SalesChartCard from '../SalesChartCard';

const { width } = Dimensions.get('window');

const BaseCarousel = ({ empresaId, selectedDate, onAdjustPress }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  // Dados das abas
  const items = [
    { id: 'saldo', component: <BalanceTab empresaId={empresaId} selectedDate={selectedDate} onAdjustPress={onAdjustPress} /> },
    { id: 'SalesChartCard', component: <SalesChartCard empresaId={empresaId} selectedDate={selectedDate} itemName="SalesChartCard" /> }, 
    { id: 'despesas-proximo-dia', component: <ExpensesNextDayTab empresaId={empresaId} selectedDate={selectedDate} itemName="Despesas à Vencer Próximo dia Útil" /> },
    { id: 'contas-atraso', component: <OverdueReceivablesTab empresaId={empresaId} selectedDate={selectedDate} itemName="Contas a Receber em Atraso" /> },
    { id: 'despesas-hoje', component: <ExpensesDueToday empresaId={empresaId} selectedDate={selectedDate} itemName="Despesas a Vencer Hoje" /> },
    { id: 'receber-hoje', component: <AccountsReceivableToday empresaId={empresaId} selectedDate={selectedDate} itemName="Contas a Receber à Vencer Hoje" /> },
    { id: 'despesas-atraso', component: <LatePayments empresaId={empresaId} selectedDate={selectedDate} itemName="Despesas a Pagar em Atraso" /> },

  ];

  // Funções de Navegação
  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      Animated.timing(scrollX, {
        toValue: (currentIndex + 1) * -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      Animated.timing(scrollX, {
        toValue: (currentIndex - 1) * -width,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* Container do Carrossel */}
      <View style={styles.carouselContainer}>
        <Animated.View
          style={{
            flexDirection: 'row',
            width: width * items.length,
            transform: [{ translateX: scrollX }],
          }}
        >
          {items.map((item, index) => (
            <View key={item.id} style={{ width }}>
              {item.component}
            </View>
          ))}
        </Animated.View>
      </View>

      {/* Setas de Navegação */}
      {currentIndex > 0 && (
        <TouchableOpacity onPress={handlePrev} style={[styles.navButton, styles.navButtonLeft]}>
          <Icon name="arrow-back" size={25} color="black" />
        </TouchableOpacity>
      )}
      {currentIndex < items.length - 1 && (
        <TouchableOpacity onPress={handleNext} style={[styles.navButton, styles.navButtonRight]}>
          <Icon name="arrow-forward" size={25} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselContainer: {
    width,
    height: 150,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButton: {
    position: 'absolute',
    top: '45%',
    transform: [{ translateY: -15 }],
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 5,
  },
  navButtonLeft: {
    left: 8,
  },
  navButtonRight: {
    right: 8,
  },
});

export default BaseCarousel;
