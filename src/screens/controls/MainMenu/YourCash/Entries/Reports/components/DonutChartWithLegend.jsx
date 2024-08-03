/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

// Componente para criar um gráfico de rosca (Donut Chart)
const DonutChart = ({ data, size = 150, strokeWidth = 20 }) => {
  const radius = (size - strokeWidth) / 2;  // Raio do círculo
  const circumference = 2 * Math.PI * radius;  // Circunferência do círculo
  const halfSize = size / 2;  // Metade do tamanho para centralização
  const colors = ["rgb(94, 208, 112)", "rgb(141, 228, 255)", "rgb(250, 220, 0)"];  // Cores para as fatias

  let total = data.reduce((sum, { amount }) => sum + amount, 0);  // Soma total dos valores
  let offset = 0;  // Offset inicial para as rotações das fatias

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map(({ amount }, index) => {
        const value = amount / total;  // Proporção da fatia
        const dashArray = `${circumference * value} ${circumference * (1 - value)}`;  // Array de dash para o traço do círculo
        const rotation = offset * 360;  // Rotação da fatia
        offset += value;  // Atualiza o offset

        return (
          <Circle
            key={`circle-${index}`}
            cx={halfSize}
            cy={halfSize}
            r={radius}
            fill="transparent"
            stroke={colors[index]}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={circumference / 4}
            transform={`rotate(${rotation} ${halfSize} ${halfSize})`}
          />
        );
      })}
    </Svg>
  );
};

// Componente para exibir um item da legenda do gráfico
const LegendItem = ({ color, amount, name, index }) => (
  <View key={`legend-item-${index}`} style={styles.legendItem}>
    <Text style={styles.legendValue}>{`R$${amount.toLocaleString('pt-BR')}`}</Text>
    <View style={styles.containerInfo}>
      <View style={[styles.legendColor, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{name}</Text>
    </View>
  </View>
);

// Componente para exibir o gráfico de rosca com a legenda
const DonutChartWithLegend = ({ data }) => (
  <View style={styles.container}>
    <DonutChart data={data} />
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <LegendItem key={index} index={index} {...item} />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendContainer: {
    marginLeft: 20,
  },
  legendItem: {
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  legendColor: {
    width: 25,
    height: 15,
    marginRight: 10,
    borderRadius: 7.5,
  },
  legendText: {
    fontSize: 16,
    color: '#000',
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#000',
  },
  containerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DonutChartWithLegend;
