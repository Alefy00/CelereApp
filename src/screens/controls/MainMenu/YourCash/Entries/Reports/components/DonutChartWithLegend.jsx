/* eslint-disable prettier/prettier */
// DonutChartWithLegend.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const DonutChart = ({ data, size = 150, strokeWidth = 20 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const halfSize = size / 2;
  const colors = ["rgb(94, 208, 112)", "rgb(141, 228, 255)", "rgb(250, 220, 0)"];

  let total = data.reduce((sum, { amount }) => sum + amount, 0);
  let offset = 0;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map(({ amount }, index) => {
        const value = amount / total;
        const dashArray = `${circumference * value} ${circumference * (1 - value)}`;
        const rotation = offset * 360;
        offset += value;

        return (
          <Circle
            key={index}
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

const DonutChartWithLegend = ({ data }) => (
  <View style={styles.container}>
    <DonutChart data={data} />
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <Text style={styles.legendValue}>{`R$${item.amount.toLocaleString('pt-BR')}`}</Text>
          <View style={styles.containerInfo}>
          <View style={[styles.legendColor, { backgroundColor: item.color }]} />
          <Text style={styles.legendText}>{item.name}</Text>
          </View>
        </View>
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
    textAlign:'left'
  },
  legendColor: {
    width: 25,
    height: 15,
    marginRight: 10,
    borderRadius: 7.5,
  },
  legendText: {
    fontSize: 16,
    color:'#000',
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
    color:'#000',
  },
  containerInfo:{
    flexDirection:'row',
    alignItems:"center",
    textAlign:'left',
  }
});

export default DonutChartWithLegend;
