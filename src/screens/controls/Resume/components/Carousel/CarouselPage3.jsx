/* eslint-disable prettier/prettier */
// CarouselPage3.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';

const CarouselPage3 = ({ onNext, onPrevious }) => {
  return (
    <View style={styles.pageContainer}>
      {/* Setas de Navegação */}
      <TouchableOpacity 
        style={styles.arrowButtonLeft}
        onPress={onPrevious}
      >
        <Icon name="arrow-back" size={24} color={COLORS.black} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.arrowButtonRight}
        onPress={onNext}
      >
        <Icon name="arrow-forward" size={24} color={COLORS.black} />
      </TouchableOpacity>

      {/* Título e Valor */}
      <Text style={styles.title}>
        Contas em Atraso <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
      </Text>

      <Text style={styles.number}>0</Text>
      <Text style={styles.amount}>R$0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    position: 'relative', // Necessário para posicionamento absoluto das setas
  },
  arrowButtonLeft: {
    position: 'absolute',
    left: -15, // Posiciona a seta levemente para fora do container
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 50,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: -15, // Posiciona a seta levemente para fora do container
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 50,
  },
  title: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
  },
  number: {
    fontSize: 46,
    fontWeight: 'bold',
    color: COLORS.green,
    textAlign: 'center',
  },
  amount: {
    fontSize: 18,
    color: COLORS.green,
    textAlign: 'center',
  },
});

export default CarouselPage3;
