/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgPixIcon from '../../../../assets/images/svg/initial/IconPix.svg';
import { COLORS } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './stylesFilterListCard';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../../services/apiConfig';

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
  if (typeof value === 'string') {
    // Remove os pontos (separadores de milhar) e substitui a vírgula pelo ponto (separador decimal)
    const cleanValue = value.replace(/\./g, '').replace(',', '.');
    const number = parseFloat(cleanValue);
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else if (typeof value === 'number') {
    // Se já for um número, apenas formata diretamente
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else {
    return 'R$ 0,00'; // Valor padrão em caso de erro
  }
};

// Função para buscar o resumo financeiro do endpoint adicional
const fetchResumoFinanceiro = async (empresaId, dataInicial, dataFinal) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/ms_datainf/composite/?empresa_id=${empresaId}&dt_ini=${dataInicial}&dt_end=${dataFinal}`);
    const data = response.data.data;

    // Captura os valores diretamente da API
    const vendasLiquidadas = data.find(item => item.item === "Vendas Liquidadas")?.valor || "0,00";
    const despesasLiquidadas = data.find(item => item.item === "Despesas Liquidadas")?.valor || "0,00";
    const saldo = data.find(item => item.item === "Saldo (Vendas - Despesas Pagas)")?.valor || "0,00";

    // Retorna os valores como strings, exatamente como estão na API
    return {
      vendasLiquidadas,
      despesasLiquidadas,
      saldo,
    };
  } catch (error) {
    console.error("Erro ao buscar o resumo financeiro:", error.message);
    return {
      vendasLiquidadas: "0,00",
      despesasLiquidadas: "0,00",
      saldo: "0,00",
    };
  }
};

// Função para buscar os detalhes do item (produto ou serviço) pelo ID
const fetchItemById = async (item) => {
  try {
    if (item.nome) {
      return item.nome;
    }

    const response = await axios.get(`${API_BASE_URL}/cad/itens_venda/${item.id}/`);
    const itemData = response.data;

    return itemData.produto ? itemData.produto.nome : (itemData.servico ? itemData.servico.nome : 'Nome do item indisponível');
  } catch (error) {
    console.error(`Erro ao buscar o item com ID ${item.id}:`, error);
    return 'Nome do item indisponível';
  }
};

// Função para processar as vendas e buscar o nome dos itens de venda
const processarVendas = async (vendas) => {
  const vendasProcessadas = await Promise.all(
    vendas.map(async (venda) => {
      const itensComNome = await Promise.all(
        venda.itens.map(async (item) => {
          const nomeItem = await fetchItemById(item); 
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

// Função para buscar todas as despesas da empresa
const fetchAllDespesas = async (empresaId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/cad/despesa/?empresa_id=${empresaId}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error.message);
    return [];
  }
};

// Função para mapear e filtrar os dados das despesas no front-end
const mapExpenseData = (expenses, dataInicial, dataFinal) => {
  const despesasFiltradas = expenses.filter(expense =>
    expense.status === 'finalizada' &&
    new Date(expense.dt_pagamento) >= new Date(dataInicial) &&
    new Date(expense.dt_pagamento) <= new Date(dataFinal)
  );
  return despesasFiltradas.map((expense) => ({
    id: expense.id,
    description: expense.item || 'Despesa sem nome',
    method: 'Despesa',
    date: formatDate(expense.dt_pagamento),
    amount: parseFloat(expense.valor),
  }));
};

// Função para buscar todas as vendas finalizadas com filtragem por data
const fetchAllVendas = async (empresaId, dataInicial, dataFinal) => {
  const fetchVendasPaginadas = async (url, vendasAcumuladas = []) => {
    try {
      const response = await axios.get(url);

      // Verifica se `data` existe e é um array, caso contrário usa array vazio
      const vendasPagina = Array.isArray(response.data?.data) ? response.data.data : [];

      // Filtra apenas as vendas da empresa especificada e com status 'finalizada'
      const vendasFiltradas = vendasPagina.filter(
        venda => venda.empresa === empresaId && venda.status === 'finalizada'
      );
      const novasVendas = [...vendasAcumuladas, ...vendasFiltradas];

      // Se houver uma próxima página, continua a busca paginada
      if (response.data.next) {
        return fetchVendasPaginadas(response.data.next, novasVendas);
      }

      return novasVendas;
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      return vendasAcumuladas; // Retorna as vendas acumuladas até o momento, mesmo em caso de erro
    }
  };

  // Inicia a busca paginada de vendas
  return await fetchVendasPaginadas(`${API_BASE_URL}/cad/vendas/?empresa=${empresaId}&data_inicial=${dataInicial}&data_final=${dataFinal}`);
};

// Função para mapear os dados das vendas, priorizando o nome do serviço quando disponível
const mapSalesData = (sales) => {
  return sales.map((sale) => {
    // Itera pelos itens e verifica se há um serviço ou produto com nome
    const itemName = sale.itens.reduce((name, item) => {
      if (item.servico?.nome) return item.servico.nome; // Prioriza o nome do serviço
      if (item.nome) return item.nome; // Usa o nome do produto, se o serviço não existir
      return name; // Mantém o nome atual se nenhum nome for encontrado
    }, 'Item sem nome');

    return {
      id: sale.id,
      description: itemName,
      method: getPaymentMethodName(sale.tipo_pagamento_venda),
      date: formatDate(sale.data_venda),
      amount: parseFloat(sale.valor_total_venda),
      tipo_pagamento_venda: sale.tipo_pagamento_venda,
    };
  });
};


// Função para traduzir o método de pagamento usando o ID
const getPaymentMethodName = (paymentTypeId) => {
  switch (paymentTypeId) {
    case 1:
      return 'Pix';
    case 2:
      return 'Dinheiro';
    case 3:
      return 'Cartão de Crédito';
    case 4:
      return 'Débito';
    default:
      return 'Documento';
  }
};

// Função para formatar a data da venda
const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('pt-BR', options);
};

// Função para escolher o ícone com base no método de pagamento
const getPaymentIconById = (paymentTypeId) => {
  switch (paymentTypeId) {
    case 1: // Pix
      return <SvgPixIcon width={20} height={20} style={styles.pixIcon} />;
    case 2: // Dinheiro
      return <Ionicons name="cash" size={20} color={COLORS.green} />;
    case 3: // Cartão de Credito
      return <Ionicons name="card" size={20} color={COLORS.green} />;
    case 4: // Cartão de Débito
      return <Ionicons name="card" size={20} color={COLORS.green} />;
    default: // Valor padrão para métodos desconhecidos
      return <Ionicons name="document-outline" size={20} color={COLORS.green} />;
  }
};

const FilteredListCard = ({ selectedDate }) => {
  const [selectedTab, setSelectedTab] = useState('sales'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [vendasLiquidadas, setVendasLiquidadas] = useState(0);
  const [despesasLiquidadas, setDespesasLiquidadas] = useState(0);
  const [saldo, setSaldo] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadSalesData = async () => {
        const empresaId = await getEmpresaId();
        if (empresaId && selectedDate) {
          const { dt_ini, dt_end } = selectedDate;
      
          // Busca vendas detalhadas
          const sales = await fetchAllVendas(empresaId, dt_ini, dt_end);
          
          // Processa as vendas para carregar os nomes dos itens corretamente
          const vendasProcessadas = await processarVendas(sales);
          
          // Mapeia as vendas processadas para exibir os dados na interface
          const mappedSales = mapSalesData(vendasProcessadas);
          setSalesData(mappedSales);
      
          // Soma o valor total das vendas finalizadas
          const total = mappedSales.reduce((sum, sale) => sum + sale.amount, 0);
          setSalesTotal(total);
      
          // Busca o resumo financeiro
          const resumoFinanceiro = await fetchResumoFinanceiro(empresaId, dt_ini, dt_end);
          setVendasLiquidadas(resumoFinanceiro.vendasLiquidadas);
          setDespesasLiquidadas(resumoFinanceiro.despesasLiquidadas);
          setSaldo(resumoFinanceiro.saldo);
        }
      };

      const loadExpenseData = async () => {
        const empresaId = await getEmpresaId();
        if (empresaId && selectedDate) {
          const { dt_ini, dt_end } = selectedDate;

          const despesas = await fetchAllDespesas(empresaId);
          const mappedExpenses = mapExpenseData(despesas, dt_ini, dt_end);
          setExpenseData(mappedExpenses);
        }
      };

      loadSalesData();
      loadExpenseData();
    }, [selectedDate])
  );

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
            <Text style={[styles.toggleText, selectedTab === 'sales' && styles.activeText3]}>Entradas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-up-outline" size={20} color={COLORS.green} />
              <Text style={[styles.toggleValue2, selectedTab === 'sales' && styles.activeText2]}>
              {formatToBRL(vendasLiquidadas)}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTab === 'expenses' && styles.activeButton]}
            onPress={() => setSelectedTab('expenses')}
          >
            <Text style={[styles.toggleText, selectedTab === 'expenses' && styles.activeText3]}>Saídas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-down-outline" size={20} color={COLORS.red} />
              <Text style={[styles.toggleValue, selectedTab === 'expenses' && styles.activeText]}>
              {despesasLiquidadas}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Saldo <Text style={styles.balanceSubText}>(entradas - saídas)</Text>
          </Text>
          <Text style={styles.balanceValue}>R$ {saldo}</Text>
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
          {filteredData.map(item => {
            return (
              <View key={item.id} style={styles.listItem}>
                {getPaymentIconById(item.tipo_pagamento_venda)}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemDetails}>{getPaymentMethodName(item.tipo_pagamento_venda)} - {item.date}</Text>
                </View>
                <Text style={styles.itemAmount}>{formatToBRL(item.amount)}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FilteredListCard;
