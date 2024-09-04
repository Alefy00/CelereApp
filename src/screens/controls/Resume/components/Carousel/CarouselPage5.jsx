/* eslint-disable prettier/prettier */
// CarouselPage5.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';

const CarouselPage5 = ({ onNext, onPrevious }) => {
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

      {/* Barra de Progresso e Saldos */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progressBarFillLeft}></View>
          <View style={styles.progressBarFillRight}></View>
        </View>
        <Text style={[styles.balanceText, styles.balanceLeft]}>
          Vendas Previstas{'\n'}R$300
        </Text>
        <Text style={[styles.balanceText, styles.balanceRight]}>
          Despesas Previstas{'\n'}R$150
        </Text>
      </View>

      {/* Resultado */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>
          Saldo Previsto <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
        </Text>
        <Text style={styles.resultAmount}>R$ 150</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: COLORS.white,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
    position: 'relative', // Necessário para as setas absolutas
  },
  arrowButtonLeft: {
    position: 'absolute',
    left: -15, // Posiciona a seta levemente para fora do container
    top: '80%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 50,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: -15, // Posiciona a seta levemente para fora do container
    top: '80%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 50,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    width: '100%',
    height: 7,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: -10,
  },
  progressBarFillLeft: {
    flex: 2,
    backgroundColor: COLORS.green,
  },
  progressBarFillRight: {
    flex: 2,
    backgroundColor: COLORS.red,
  },
  balanceText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: 'bold',
    position: 'absolute',
    top: -2, // Alinha com o topo da barra de progresso
  },
  balanceLeft: {
    left: 2, // Alinha à esquerda
    textAlign: 'left',
    color:COLORS.green,
  },
  balanceRight: {
    right: 2, // Alinha à direita
    textAlign: 'right',
    color:COLORS.red,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    marginTop:15,
  },
  resultAmount: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.green,
    textAlign: 'center',
    marginBottom: -10
  },
});

export default CarouselPage5;

