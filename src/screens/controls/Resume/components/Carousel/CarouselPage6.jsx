/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';

const { width } = Dimensions.get('window');

const CarouselPage6 = ({ onNext, onPrevious }) => {
  // Valores iniciais que serão dinâmicos no futuro
  const [saldoAtualizado, setSaldoAtualizado] = useState(1230);
  const [saldoMinimo, setSaldoMinimo] = useState(1540);

  useEffect(() => {
    // Aqui você pode adicionar a chamada para a API para buscar os dados
  }, []);

  // Calcular a largura das barras com base nos próprios valores
  const maxBarWidth = width * 0.8; // Usar 80% da largura da tela
  const total = saldoAtualizado + saldoMinimo;
  const widthAtualizado = (saldoAtualizado / total) * maxBarWidth;
  const widthMinimo = (saldoMinimo / total) * maxBarWidth;

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

      {/* Gráfico de Barras Horizontais */}
      <View style={styles.chartContainer}>
        {/* Barra para Saldo de Caixa Atualizado */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: widthAtualizado,
                  backgroundColor: COLORS.purple,
                },
              ]}
            />
          </View>
        </View>

        {/* Barra para Saldo Mínimo Recomendado */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: widthMinimo,
                  backgroundColor: COLORS.green,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Legendas */}
      <View style={styles.legendContainer}>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.purple }]} />
          <Text style={styles.legendText}>Saldo de caixa atualizado</Text>
          <Text style={styles.legendValueATT}>R${saldoAtualizado}</Text>
        </View>
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.green }]} />
          <Text style={styles.legendText}>Saldo mínimo recomendado</Text>
          <Text style={styles.legendValueREC}>R${saldoMinimo}</Text>
        </View>
      </View>

      {/* Resultado */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultTitle}>
          Saldo <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
        </Text>
        <Text style={styles.resultAmount}>R$ { saldoMinimo - saldoAtualizado}</Text>
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
    position: 'relative',
  },
  arrowButtonLeft: {
    position: 'absolute',
    left: -15,
    top: '70%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 50,
  },
  arrowButtonRight: {
    position: 'absolute',
    right: -15,
    top: '70%',
    transform: [{ translateY: -12 }],
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 50,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: -10,
  },
  progressBarContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: COLORS.lightGray2,
    overflow: 'hidden',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 5,
  },
  legendContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  legendDot: {
    width: 20,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: COLORS.black,
    flex: 1,
  },
  legendValueATT: {
    fontSize: 14,
    color: COLORS.purple,
    fontWeight: 'bold',
  },
  legendValueREC: {
    fontSize: 14,
    color: COLORS.green,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop:5
  },
  resultTitle: {
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',

  },
  resultAmount: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.green,
    textAlign: 'center',
    marginBottom:-15,
  },
});

export default CarouselPage6;
