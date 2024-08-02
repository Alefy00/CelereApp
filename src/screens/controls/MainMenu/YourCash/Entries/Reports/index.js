/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Picker } from "@react-native-picker/picker";
import { BarChart, PieChart } from "react-native-chart-kit";
import styles from './styles';
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Report = ({ navigation }) => {
  const [selectedMonth, setSelectedMonth] = useState('Fevereiro');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Mensal');

  const dataPieChart = [
    { name: "Fiados a receber", amount: 3140, color: "rgba(131, 167, 234, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Saldo de Caixa", amount: 4560, color: "rgba(255, 230, 0, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Estoque", amount: 14550, color: "rgba(255, 0, 0, 1)", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ];

  const dataBarChart = {
    labels: ["Vendas", "Custos de Vendas", "Custos Fixos"],
    datasets: [
      {
        data: [21110, 11100, 5500],
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <BarTop2
        titulo={'Relatório Mensal'}
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer={''}
        routeCalculator={''}
        style={{ height: 50 }}
      />
      <Text style={styles.textEspaco}>Espaço de tempo:</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterButton, selectedTimeframe === 'Diário' && styles.selectedFilterButton]} onPress={() => setSelectedTimeframe('Diário')}>
          <Text style={styles.filterButtonText}>Diário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedTimeframe === 'Semanal' && styles.selectedFilterButton]} onPress={() => setSelectedTimeframe('Semanal')}>
          <Text style={styles.filterButtonText}>Semanal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedTimeframe === 'Mensal' && styles.selectedFilterButton]} onPress={() => setSelectedTimeframe('Mensal')}>
          <Text style={styles.filterButtonText}>Mensal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterButton, selectedTimeframe === 'Anual' && styles.selectedFilterButton]} onPress={() => setSelectedTimeframe('Anual')}>
          <Text style={styles.filterButtonText}>Anual</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pickeralign}>
        <View style={styles.pickerContainer}>
            <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            >
            <Picker.Item label="Janeiro" value="Janeiro" />
            <Picker.Item label="Fevereiro" value="Fevereiro" />
            <Picker.Item label="Março" value="Março" />
            <Picker.Item label="Abril" value="Abril" />
            <Picker.Item label="Maio" value="Maio" />
            <Picker.Item label="Junho" value="Junho" />
            <Picker.Item label="Julho" value="Julho" />
            <Picker.Item label="Agosto" value="Agosto" />
            <Picker.Item label="Setembro" value="Setembro" />
            <Picker.Item label="Outubro" value="Outubro" />
            <Picker.Item label="Novembro" value="Novembro" />
            <Picker.Item label="Dezembro" value="Dezembro" />
            </Picker>
        </View>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceRow}>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceText}>Saldo de caixa inicial</Text>
            <View style={styles.arrow}>
              <Icon name="arrow-up-outline" size={20} color={COLORS.green} />
              <Text style={[styles.balanceAmount, styles.amountgreen]}>R$5.100</Text>
            </View>
          </View>
          <View style={styles.balanceBox}>
            <Text style={styles.balanceText}>Saldo de caixa final</Text>
            <View style={styles.arrow}>
              <Icon name="arrow-down-outline" size={20} color={COLORS.red} />
              <Text style={[styles.balanceAmount, styles.amountred]}>R$4.560</Text>
            </View>
          </View>
        </View>
        <View style={styles.balanceBarContainer}>
          <View style={styles.balanceBarGreen}></View>
          <View style={styles.balanceBarRed}></View>
        </View>
        <View style={styles.balanceRow2}>
          <View style={styles.balanceBox2}>
            <Text style={[styles.balanceText, styles.balancenumber]}>Menor Saldo - Dia 5</Text>
            <Text style={[styles.balanceAmount, styles.balenceValue]}>R$4.380</Text>
          </View>
          <View style={styles.balanceBox3}>
            <Text style={[styles.balanceText, styles.balancenumber2]}>Saldo Médio Diário</Text>
            <Text style={[styles.balanceAmount, styles.balenceValue2]}>R$4.560</Text>
          </View>
        </View>
      </View>
      <Text style={styles.balanceRecommended}>Saldo mínimo recomendado R$4.200</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Vendas, Custos de Vendas e Custos Fixos</Text>
        <BarChart
          data={dataBarChart}
          width={350}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Fiados a Receber, Saldo de Caixa e Estoque</Text>
        <PieChart
          data={dataPieChart}
          width={350}
          height={220}
          chartConfig={chartConfig}
          accessor={"amount"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
        />
      </View>
      <View style={styles.capitalContainer}>
        <Text style={styles.capitalTitle}>Capital de Giro</Text>
        <Text style={styles.capitalValue}>R$22.740</Text>
        <Text style={styles.capitalTitle}>Capital de Giro mínimo recomendado</Text>
        <Text style={styles.capitalValue}>R$21.900</Text>
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

export default Report;
