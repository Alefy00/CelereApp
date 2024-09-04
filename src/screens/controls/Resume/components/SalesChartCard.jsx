/* eslint-disable prettier/prettier */
// SalesChartCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { COLORS } from '../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

// Dados fictícios para o gráfico
const chartData = [
  { key: 1, amount: 80, svg: { fill: COLORS.red }, label: 'Custos diretos das vendas' },  // Vermelho
  { key: 2, amount: 210, svg: { fill: COLORS.green }, label: 'Vendas' },                   // Verde
  { key: 3, amount: 300, svg: { fill: COLORS.lightGray2 }, label: 'Restante' },                 // Cinza
];

const SalesChartCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {/* Gráfico Circular */}
        <PieChart
          style={{ height: 80, width: 90 }}
          valueAccessor={({ item }) => item.amount}
          data={chartData}
          outerRadius={'70%'}
          innerRadius={'50%'}
        >
          {/* Texto central do gráfico */}
          <SvgText
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            textAnchor="middle"
            fontSize="12"
            fill="#000000"
          >
          </SvgText>
        </PieChart>

        {/* Informações de Lucro e Margem */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>
                Lucro Bruto <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
            </Text>
            <Text style={styles.infoValue}>R$ 130</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoTitle}>
                Margem Bruta <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
            </Text>
            <Text style={styles.infoValue}>61,9%</Text>
          </View>
        </View>
      </View>

      {/* Detalhes de Vendas e Custos */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.colorIndicatorGreen} />
          <Text style={styles.detailText}>Vendas</Text>
          <Text style={styles.detailValueGreen}>R$210</Text>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.colorIndicatorRed} />
          <Text style={styles.detailText}>Custos diretos das vendas</Text>
          <Text style={styles.detailValueRed}>R$80</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
  },
  infoContainer: {
    flex: 1,
    justifyContent:  'space-around',
    marginLeft: 10,
    flexDirection: 'row',
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 14,
    color: COLORS.black,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
  },
  detailsContainer: {
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  colorIndicatorGreen: {
    width: 15,
    height: 10,
    backgroundColor: COLORS.green,
    marginRight: 5,
    borderRadius: 5,
  },
  colorIndicatorRed: {
    width: 15,
    height: 10,
    backgroundColor: COLORS.red,
    marginRight: 5,
    borderRadius: 5,
  },
  detailText: {
    fontSize: 14,
    flex: 1,
    color: COLORS.black,
  },
  detailValueGreen: {
    fontSize: 14,
    color: COLORS.green,
  },
  detailValueRed: {
    fontSize: 14,
    color: COLORS.red,
  },
});

export default SalesChartCard;
