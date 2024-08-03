/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import RoundedBarsChart from './components/RoundedBarsChart';
import DonutChartWithLegend from './components/DonutChartWithLegend';
import BottomRoundedBarsChart from './components/BottomRoundedBarsCharts';
import styles from './styles';

const Report = ({ navigation }) => {
  // Estados para armazenar o mês selecionado e o intervalo de tempo selecionado
  const [selectedMonth, setSelectedMonth] = useState('Fevereiro');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Mensal');

  // Dados fictícios para o gráfico de barras arredondadas
  const dataBarChart = [
    { value: 21110, label: "Vendas", svg: { fill: COLORS.green } },
    { value: 11100, label: "Custos de Vendas", svg: { fill: COLORS.red } },
    { value: 5500, label: "Custos Fixos", svg: { fill: COLORS.orange } },
  ];

  // Dados fictícios para o gráfico de pizza com legenda
  const dataPieChart = [
    { name: "Fiados a receber", amount: 3140, color: "rgb(94, 208, 112)" },
    { name: "Saldo de Caixa", amount: 4560, color: "rgb(141, 228, 255)" },
    { name: "Estoque", amount: 14550, color: "rgb(250, 220, 0)" },
  ];

  // Dados fictícios para o gráfico de barras arredondadas inferior
  const dataBottomBarChart = [
    { value: 100, amount: 22740, label: "Capital de Giro" },
    { value: 80, amount: 21900, label: "Capital de Giro mínimo recomendado" },
  ];

  return (
    <ScrollView style={styles.container}>
      <BarTop2
        titulo="Relatório Mensal"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer=""
        routeCalculator=""
        style={{ height: 50 }}
      />
      <Text style={styles.textEspaco}>Espaço de tempo:</Text>
      {/* Botões para selecionar o intervalo de tempo */}
      <View style={styles.filterContainer}>
        {["Diário", "Semanal", "Mensal", "Anual"].map((timeframe) => (
          <TouchableOpacity
            key={timeframe}
            style={[styles.filterButton, selectedTimeframe === timeframe && styles.selectedFilterButton]}
            onPress={() => setSelectedTimeframe(timeframe)}
          >
            <Text style={styles.filterButtonText}>{timeframe}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Picker para selecionar o mês */}
      <View style={styles.pickeralign}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMonth}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
          >
            {["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month) => (
              <Picker.Item key={month} label={month} value={month} />
            ))}
          </Picker>
        </View>
      </View>
      {/* Container de saldo de caixa */}
      <View style={styles.balanceContainer}>
        {/* Linha de saldo de caixa inicial e final */}
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
        {/* Barra de saldo */}
        <View style={styles.balanceBarContainer}>
          <View style={styles.balanceBarGreen} />
          <View style={styles.balanceBarRed} />
        </View>
        {/* Linha de menor saldo e saldo médio diário */}
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
        <Text style={styles.balanceRecommended}>Saldo mínimo recomendado</Text>
        <Text style={styles.balanceRecommendedValue}>R$4.200</Text>
      </View>
      {/* Container de gráficos */}
      <View style={styles.chartContainer}>
        <RoundedBarsChart data={dataBarChart} />
      </View>
      {/* Container de informações */}
      <View style={styles.informationContainer}>
        <View style={styles.containerTextInfo}>
          <Text style={styles.informationText}>Resultado</Text>
          <Text style={styles.informationText}>Margem de lucro</Text>
          <Text style={styles.informationText}>Ponto de equilíbrio</Text>
        </View>
        <View style={styles.containerTextValue}>
          <Text style={styles.informationValue}>R$4.400</Text>
          <Text style={styles.informationValue}>47.41% (R$10.010)</Text>
          <Text style={styles.informationValue}>R$11.704,41</Text>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <DonutChartWithLegend data={dataPieChart} />
      </View>
      <View style={styles.chartContainer}>
        <BottomRoundedBarsChart 
          data={dataBottomBarChart} 
          barColor="#8A2BE2" 
          labelStyle={{ color: "#000", fontSize: "14" }} 
          valueStyle={{ color: "#000", fontSize: "14", fontWeight: "bold" }}
        />
      </View>
    </ScrollView>
  );
};

export default Report;
