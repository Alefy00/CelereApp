/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgPixIcon from '../../../../assets/images/svg/initial/IconPix.svg';
import { COLORS } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './stylesFilterListCard';

const API_URL_VENDAS = 'https://api.celereapp.com.br/cad/vendas/';
const API_ITENS_VENDA = 'https://api.celereapp.com.br/cad/itens_venda/';
const API_URL_DESPESAS = 'https://api.celereapp.com.br/cad/despesa/';

// Função para buscar o ID da empresa logada
const getEmpresaId = async () => {
  try {
    const storedEmpresaId = await AsyncStorage.getItem('empresaId');
    if (!storedEmpresaId) {
      throw new Error('ID da empresa não encontrado.');
    }
    const empresaId = Number(storedEmpresaId);
    if (isNaN(empresaId)) {
      throw new Error('ID da empresa inválido.');
    }
    return empresaId;
  } catch (error) {
    console.error('Erro ao buscar o ID da empresa:', error);
    Alert.alert('Erro', error.message);
    return null;
  }
};

// Função utilitária para formatar valores como moeda Real Brasileiro (BRL)
const formatToBRL = (value) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para buscar os detalhes do item (produto ou serviço) pelo ID
const fetchItemById = async (id) => {
  try {
    const response = await axios.get(`${API_ITENS_VENDA}${id}/`);
    const itemData = response.data;
    return itemData.produto ? itemData.produto.nome : (itemData.servico ? itemData.servico.nome : 'Nome do item indisponível');
  } catch (error) {
    console.error(`Erro ao buscar o item com ID ${id}:`, error);
    return 'Nome do item indisponível';
  }
};

// Função para processar as vendas e buscar o nome dos itens de venda
const processarVendas = async (vendas) => {
  const vendasProcessadas = await Promise.all(
    vendas.map(async (venda) => {
      const itensComNome = await Promise.all(
        venda.itens.map(async (item) => {
          const nomeItem = await fetchItemById(item.id); // Buscar o nome de cada item (produto ou serviço)
          return {
            ...item,
            nome: nomeItem || 'Nome do item indisponível',
          };
        })
      );
      return {
        ...venda,
        itens: itensComNome,
      };
    })
  );
  return vendasProcessadas;
};

// Função para buscar todas as despesas finalizadas da empresa logada
const fetchAllDespesas = async (empresaId) => {
  try {
    const response = await axios.get(`${API_URL_DESPESAS}?empresa_id=${empresaId}`);
    const despesas = response.data.data.filter(despesa => despesa.status === 'finalizada');
    return despesas;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error.message);
    return [];
  }
};

// Função para mapear os dados das despesas
const mapExpenseData = (expenses) => {
  return expenses.map((expense) => ({
    id: expense.id,
    description: expense.item || 'Despesa sem nome',
    method: 'Despesa', // Placeholder, já que não há método de pagamento explícito
    date: formatDate(expense.dt_pagamento), // Formata a data do pagamento
    amount: parseFloat(expense.valor),
  }));
};

// Função para buscar todas as vendas finalizadas com paginação e filtragem correta
const fetchAllVendas = async (empresaId) => {
  const fetchVendasPaginadas = async (url, vendasAcumuladas = []) => {
    try {
      const response = await axios.get(url);
      const vendasPagina = response.data.results.data;

      // Filtramos as vendas pela empresa logada
      const vendasFiltradas = vendasPagina.filter(venda => venda.empresa === empresaId);
      const novasVendas = [...vendasAcumuladas, ...vendasFiltradas];

      // Se houver uma próxima página, fazemos a requisição novamente
      if (response.data.next) {
        return fetchVendasPaginadas(response.data.next, novasVendas);
      }

      return novasVendas;
    } catch (error) {
      console.error("Erro ao buscar vendas:", error.message);
      return vendasAcumuladas; // Em caso de erro, retorna o acumulado até agora
    }
  };

  // Inicia a busca pela primeira página
  return await fetchVendasPaginadas(`${API_URL_VENDAS}?empresa_id=${empresaId}`);
};

// Função para mapear os dados das vendas
const mapSalesData = (sales) => {
  return sales.map((sale) => {
    const firstItem = sale.itens && sale.itens[0] ? sale.itens[0] : {}; // Pegamos o primeiro item da venda
    const itemName = firstItem.nome || 'Produto sem nome'; // Nome do item (produto ou serviço)
    return {
      id: sale.id,
      description: itemName, // Usamos o nome do primeiro item
      method: getPaymentMethodName(sale.tipo_pagamento_venda), // Chama a função que traduz o ID do pagamento
      date: formatDate(sale.data_venda), // Formata a data da venda
      amount: parseFloat(sale.valor_total_venda),
    };
  });
};

// Função para traduzir o método de pagamento
const getPaymentMethodName = (paymentTypeId) => {
  switch (paymentTypeId) {
    case 1:
      return 'Cartão de Crédito';
    case 2:
      return 'Cartão de Débito';
    case 3:
      return 'Dinheiro';
    case 4:
      return 'Pix';
    default:
      return 'Documento'; // Valor padrão para métodos desconhecidos
  }
};

// Função para formatar a data da venda
const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};

// Função para escolher o ícone com base no método de pagamento
const getPaymentIcon = (method) => {
  switch (method) {
    case 'Pix':
      return <SvgPixIcon width={20} height={20} style={styles.pixIcon} />;
    case 'Dinheiro':
      return <Ionicons name="cash" size={20} color={COLORS.green} />;
    case 'Cartão de Crédito':
    case 'Cartão de Débito':
      return <Ionicons name="card" size={20} color={COLORS.green} />;
    default:
      return <Ionicons name="document-outline" size={20} color={COLORS.green} />; // Ícone de documento para métodos desconhecidos
  }
};

const FilteredListCard = () => {
  const [selectedTab, setSelectedTab] = useState('sales'); // 'sales' ou 'expenses'
  const [searchQuery, setSearchQuery] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [expenseData, setExpenseData] = useState([]);

  // Carregar dados de vendas
  useEffect(() => {
    const loadSalesData = async () => {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const sales = await fetchAllVendas(empresaId);
        const vendasProcessadas = await processarVendas(sales);
        const mappedSales = mapSalesData(vendasProcessadas);
        setSalesData(mappedSales);

        // Soma o valor total das vendas finalizadas
        const total = mappedSales.reduce((sum, sale) => sum + sale.amount, 0);
        setSalesTotal(total);
      }
    };
    loadSalesData();
  }, []);

  // Carregar dados de despesas
  useEffect(() => {
    const loadExpenseData = async () => {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const despesas = await fetchAllDespesas(empresaId);
        const mappedExpenses = mapExpenseData(despesas);
        setExpenseData(mappedExpenses);
      }
    };
    loadExpenseData();
  }, []);

  const dataToShow = selectedTab === 'sales' ? salesData : expenseData;

  const filteredData = dataToShow.filter(item =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={true}
      extraHeight={Platform.select({ ios: 100, android: 120 })}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        {/* Botões de Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTab === 'sales' && styles.activeButton]}
            onPress={() => setSelectedTab('sales')}
          >
            <Text style={[styles.toggleText, selectedTab === 'sales' && styles.activeText3]}>Vendas Pagas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-up-outline" size={20} color={COLORS.green} />
              <Text style={[styles.toggleValue2, selectedTab === 'sales' && styles.activeText2]}>
                {formatToBRL(salesTotal)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTab === 'expenses' && styles.activeButton]}
            onPress={() => setSelectedTab('expenses')}
          >
            <Text style={[styles.toggleText, selectedTab === 'expenses' && styles.activeText3]}>Despesas Pagas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-down-outline" size={20} color={COLORS.red} />
              <Text style={[styles.toggleValue, selectedTab === 'expenses' && styles.activeText]}>
                {formatToBRL(expenseData.reduce((sum, expense) => sum + expense.amount, 0))}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Saldo <Text style={styles.balanceSubText}>(Vendas - Despesas Pagas)</Text>
          </Text>
          <Text style={styles.balanceValue}>{formatToBRL(salesTotal - expenseData.reduce((sum, expense) => sum + expense.amount, 0))}</Text>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise uma venda ou despesa recente..."
            placeholderTextColor={COLORS.lightGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color={COLORS.lightGray} />
        </View>

        {/* Lista de Itens Filtrados */}
        <View>
          {filteredData.map(item => (
            <View key={item.id} style={styles.listItem}>
              {getPaymentIcon(item.method)}
              <View style={styles.itemInfo}>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemDetails}>{item.method} - {item.date}</Text>
              </View>
              <Text style={styles.itemAmount}>{formatToBRL(item.amount)}</Text>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FilteredListCard;
