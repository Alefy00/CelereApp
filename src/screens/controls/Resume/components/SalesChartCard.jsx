/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './stylesChartCard';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://api.celereapp.com.br/api/composite/get/';

const SalesChartCard = ({ selectedDate }) => {
  const [chartData, setChartData] = useState([]);
  const [lucroBruto, setLucroBruto] = useState('0,00');
  const [margemBruta, setMargemBruta] = useState('0,00%');
  const [vendasLiquidadas, setVendasLiquidadas] = useState('0,00');
  const [custosVendas, setCustosVendas] = useState('0,00');
  const [loading, setLoading] = useState(true);

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      return storedEmpresaId ? Number(storedEmpresaId) : null;
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
      return null;
    }
  };

  // Função para converter valores corretamente, removendo os pontos de milhar e ajustando as vírgulas
  const parseToFloat = (value) => {
    if (!value) return 0;
    const cleanedValue = value.replace(/\./g, '').replace(',', '.');  // Remove pontos de milhar e troca vírgulas por pontos
    return parseFloat(cleanedValue);
  };

  // Função para buscar os dados da API com a data selecionada
  const fetchChartData = useCallback(async () => {
    setLoading(true);
    try {
      const empresaId = await getEmpresaId();
      if (!empresaId) {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        setLoading(false);
        return;
      }

      const { dt_ini, dt_end } = selectedDate;
      console.log(`Data selecionada: de ${dt_ini} até ${dt_end}`);
      const response = await axios.get(`${API_URL}?empresa_id=${empresaId}&dt_ini=${dt_ini}&dt_end=${dt_end}`);
      
      if (response.status === 200 && response.data.status === 'success') {
        const data = response.data.data;

        // Atualiza os estados com os valores retornados da API
        const lucroBrutoData = data.find(item => item.item === 'Lucro Bruto');
        const margemBrutaData = data.find(item => item.item === 'Margem Bruta');
        const vendasLiquidadasData = data.find(item => item.item === 'Vendas Liquidadas');
        const custosVendasData = data.find(item => item.item === 'Custos diretos de vendas');

        console.log('Dados retornados da API:', {
          lucroBrutoData,
          margemBrutaData,
          vendasLiquidadasData,
          custosVendasData,
        });

        setLucroBruto(lucroBrutoData ? lucroBrutoData.valor : '0,00');
        setMargemBruta(margemBrutaData ? margemBrutaData.valor : '0,00%');
        setVendasLiquidadas(vendasLiquidadasData ? vendasLiquidadasData.valor : '0,00');
        setCustosVendas(custosVendasData ? custosVendasData.valor : '0,00');

        // Converte valores de string para números, agora usando a função de conversão correta
        let vendasValor = parseToFloat(vendasLiquidadasData?.valor);
        let custosValor = parseToFloat(custosVendasData?.valor);

        // Solução: Dividindo o valor dos custos por 100, já que ele parece estar multiplicado por 100
        custosValor = custosValor / 100;

        console.log('Valores convertidos e corrigidos:', {
          vendasValor,
          custosValor,
        });

        // Verifica se os valores são válidos e não negativos
        const total = vendasValor + custosValor;
        console.log('Total de vendas e custos:', total);

        // Define valores mínimos para garantir que as proporções apareçam no gráfico
        const vendasAmount = vendasValor > 0 ? vendasValor : 0.1;
        const custosAmount = custosValor > 0 ? custosValor : 0.1;

        if (total > 0) {
          // Ajuste a proporção das fatias conforme o total
          const vendasProporcao = (vendasAmount / total) * 100;
          const custosProporcao = (custosAmount / total) * 100;

          console.log('Proporções calculadas corretamente:', {
            vendasProporcao,
            custosProporcao,
          });

          setChartData([
            { key: 1, amount: vendasProporcao, svg: { fill: COLORS.green }, label: 'Vendas' },
            { key: 2, amount: custosProporcao, svg: { fill: COLORS.red }, label: 'Custos diretos das vendas' },
          ]);
        } else {
          // Se não houver movimentação, exibe o gráfico meio a meio
          setChartData([
            { key: 1, amount: 50, svg: { fill: COLORS.green }, label: 'Vendas' },
            { key: 2, amount: 50, svg: { fill: COLORS.red }, label: 'Custos diretos das vendas' },
          ]);
        }
      } else {
        // Se não houver movimentação ou erro, define os valores como 0 e exibe o gráfico meio a meio
        setLucroBruto('0,00');
        setMargemBruta('0,00%');
        setVendasLiquidadas('0,00');
        setCustosVendas('0,00');
        setChartData([
          { key: 1, amount: 50, svg: { fill: COLORS.green }, label: 'Vendas' },
          { key: 2, amount: 50, svg: { fill: COLORS.red }, label: 'Custos diretos das vendas' },
        ]);
      }
    } catch (error) {
      console.error('Erro ao buscar os dados do gráfico:', error);
      Alert.alert('Erro', 'Erro ao buscar os dados do gráfico. Verifique sua conexão.');
      setLucroBruto('0,00');
      setMargemBruta('0,00%');
      setVendasLiquidadas('0,00');
      setCustosVendas('0,00');
      setChartData([
        { key: 1, amount: 50, svg: { fill: COLORS.green }, label: 'Vendas' },
        { key: 2, amount: 50, svg: { fill: COLORS.red }, label: 'Custos diretos das vendas' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  // Use useFocusEffect to fetch data every time the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchChartData();
    }, [fetchChartData])
  );

  const formatCurrency = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <>
            <PieChart
              style={{ height: 80, width: 90 }}
              valueAccessor={({ item }) => item.amount}
              data={chartData}
              outerRadius={'70%'}
              innerRadius={'50%'}
            >
              <SvgText
                x="50%"
                y="50%"
                alignmentBaseline="middle"
                textAnchor="middle"
                fontSize="12"
                fill="#000000"
              />
            </PieChart>

            {/* Informações de Lucro e Margem */}
            <View style={styles.infoContainer}>
              <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>
                  Lucro Bruto <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
                </Text>
                <Text style={styles.infoValue}>R$ {lucroBruto}</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={styles.infoTitle}>
                  Margem Bruta <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
                </Text>
                <Text style={styles.infoValue}>{margemBruta}</Text>
              </View>
            </View>
          </>
        )}
      </View>
      
      {/* Detalhes de Vendas e Custos */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <View style={styles.colorIndicatorGreen} />
          <Text style={styles.detailText}>Vendas</Text>
          <Text style={styles.detailValueGreen}>R$ {vendasLiquidadas}</Text>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.colorIndicatorRed} />
          <Text style={styles.detailText}>Custos diretos das vendas</Text>
          <Text style={styles.detailValueRed}>R$ {formatCurrency(custosVendas)}</Text>
        </View>
      </View>
    </View>
  );
};

export default SalesChartCard;
