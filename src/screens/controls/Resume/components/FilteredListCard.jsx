/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgPixIcon from '../../../../assets/images/svg/initial/IconPix.svg';
import { COLORS } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment-timezone';
import styles from './stylesFilterListCard';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../../services/apiConfig';
import SalesDetailModal from './SalesDetailModal';

const TIMEZONE = 'America/Sao_Paulo';

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
    // Remove o ponto que representa milhar e substitui a vírgula para a correta conversão
    const cleanValue = value.replace(/\./g, '').replace(',', '.');
    const number = parseFloat(cleanValue);
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else if (typeof value === 'number') {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } else {
    return 'R$ 0,00'; // Valor padrão em caso de erro
  }
};

// Função para buscar o acerto do saldo de caixa
const fetchAcertoSaldoCaixa = async (empresaId, dataInicial, dataFinal) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/ms_datainf/get_lista_acerto_saldo_caixa/?empresa_id=${empresaId}&dt_ini=${dataInicial}&dt_end=${dataFinal}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar acerto de saldo de caixa:", error);
    return [];
  }
};

// Função para obter o ícone correto baseado no tipo do item
const getIconForItem = (item, isExpenseTab) => {
  if (item.isAcertoSaldo) {
    // Ícone de refresh em azul para acertos de saldo
    return <Ionicons name="refresh-outline" size={20} color={COLORS.blue} />;
  } else if (isExpenseTab) {
    // Ícone de seta para baixo em vermelho para despesas
    return <Ionicons name="arrow-down-outline" size={20} color={COLORS.red} />;
  } else {
    // Ícone padrão baseado no método de pagamento para vendas
    return getPaymentIconById(item.tipo_pagamento_venda);
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

// Atualização de mapExpenseData com moment-timezone
const mapExpenseData = (expenses, dataInicial, dataFinal) => {
  const despesasFiltradas = expenses.filter(
    (expense) =>
      expense.status === 'finalizada' &&
      moment(expense.dt_pagamento).isBetween(moment(dataInicial), moment(dataFinal), null, '[]')
  );
  return despesasFiltradas.map((expense) => ({
    id: expense.id,
    description: expense.item || 'Despesa sem nome',
    method: 'Despesa',
    date: formatDate(expense.dt_pagamento),
    amount: parseFloat(expense.valor),
    isAcertoSaldo: false,
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

// Atualização de mapSalesData para incluir `isAcertoSaldo`
const mapSalesData = (sales) => {
  return sales.map((sale) => {
    const itemName = sale.itens.reduce((name, item) => {
      if (item.servico?.nome) return item.servico.nome;
      if (item.nome) return item.nome;
      return name;
    }, 'Item sem nome');

    return {
      id: sale.id,
      description: itemName,
      method: getPaymentMethodName(sale.tipo_pagamento_venda),
      date: formatDate(sale.data_venda),
      amount: parseFloat(sale.valor_total_venda),
      tipo_pagamento_venda: sale.tipo_pagamento_venda,
      isAcertoSaldo: false, // Não é acerto de saldo
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
      return 'Despesa';
  }
};

// Função para formatar a data com o timezone de São Paulo
const formatDate = (date) => {
  return moment(date).tz(TIMEZONE).format('DD/MM/YYYY HH:mm');
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

const FilteredListCard = ({ selectedDate, navigation, onSaleCanceledRefresh }) => {
  const [selectedTab, setSelectedTab] = useState('sales'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [salesData, setSalesData] = useState([]);
  const [salesTotal, setSalesTotal] = useState(0);
  const [expenseData, setExpenseData] = useState([]);
  const [vendasLiquidadas, setVendasLiquidadas] = useState(0);
  const [despesasLiquidadas, setDespesasLiquidadas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  const openLiquidatedDetailModal = (saleId) => {
    setSelectedSaleId(saleId);
    setModalVisible(true);
  };

  const closeLiquidatedDetailModal = () => {
    setModalVisible(false);
    setSelectedSaleId(null);
  };

  const handleSaleCanceled = () => {
    setSalesData(prevData => prevData.filter(sale => sale.id !== selectedSaleId));
    closeLiquidatedDetailModal();
    Alert.alert("Sucesso", "Venda cancelada com sucesso.");
    onSaleCanceledRefresh(); // Chama a função de atualização no MainMenu
  };

// Adicionar a lógica de carregamento dentro de useFocusEffect
useFocusEffect(
  useCallback(() => {
    const loadSalesData = async () => {
      const empresaId = await getEmpresaId();
      if (empresaId && selectedDate) {
        const { dt_ini, dt_end } = selectedDate;

        // Busca e processa vendas detalhadas
        const sales = await fetchAllVendas(empresaId, dt_ini, dt_end);
        const vendasProcessadas = await processarVendas(sales);
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

        // Busca o acerto do saldo de caixa e filtra por receita/despesa
        const acertosSaldoCaixa = await fetchAcertoSaldoCaixa(empresaId, dt_ini, dt_end);
        const entradasAcertos = acertosSaldoCaixa.filter(item => item.categoria_operacao === 'receita');
        const saidasAcertos = acertosSaldoCaixa.filter(item => item.categoria_operacao === 'despesa');

        // Mapeia os dados de acerto de saldo de caixa para o formato esperado, mantendo a exclusividade de chave e sem duplicações
        const mappedEntradas = entradasAcertos.map((item, index) => ({
          id: `entrada-${item.item}-${item.data_operacao}-${item.valor}-${Math.random()}`,// Chave única baseada no índice do loop
          description: item.item,
          method: 'Acerto de Caixa',
          date: item.data_operacao,
          valor: item.valor, 
          isAcertoSaldo: true, // Indica que é um acerto de saldo para exibição em azul
        }));

        const mappedSaidas = saidasAcertos.map((item, index) => ({
          id: `saida-${item.item}-${item.data_operacao}-${item.valor}-${Math.random()}`, // Chave única baseada no índice do loop
          description: item.item,
          method: 'Acerto de Caixa',
          date: item.data_operacao,
          valor: item.valor, 
          isAcertoSaldo: true, // Indica que é um acerto de saldo para exibição em azul
        }));

        // Atualiza os dados de entrada e saída combinando com vendas e despesas
        setSalesData(prevSalesData => [...prevSalesData, ...mappedEntradas]);
        setExpenseData(prevExpenseData => [...prevExpenseData, ...mappedSaidas]);
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
              R$ {despesasLiquidadas}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Saldo <Text style={styles.balanceSubText}>(entradas - saídas)</Text>
          </Text>
          <Text 
          style={[
            styles.balanceValue, 
            { color: parseFloat(saldo) < 0 ? COLORS.red : COLORS.green } // Usa parseFloat para garantir que saldo é numérico
          ]}
        >
          {formatToBRL(saldo)}
        </Text>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise uma venda ou despesa"
            placeholderTextColor={COLORS.lightGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color={COLORS.lightGray} />
        </View>
        <View>
        {filteredData.map((item) => {
          const isExpenseTab = selectedTab === 'expenses';
          const itemColor = item.isAcertoSaldo ? COLORS.blue : (isExpenseTab ? COLORS.red : COLORS.green);

          // Formata o valor para exibição, adicionando sinal de negativo na aba de despesas se for um ajuste
          const displayValue = item.isAcertoSaldo && isExpenseTab ? `- R$ ${item.valor}` : `R$ ${item.valor}`;
          // Condicional para tornar o item clicável apenas se não for um acerto de saldo
          const ItemWrapper = item.isAcertoSaldo ? View : TouchableOpacity;

          return (
            <ItemWrapper key={item.id} onPress={() => !item.isAcertoSaldo && openLiquidatedDetailModal(item.id)}>
              <View style={styles.listItem}>
                {getIconForItem(item, isExpenseTab)}
                <View style={styles.itemInfo}>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemDetails}>
                    {item.method} - {item.date}
                  </Text>
                </View>
                <Text style={[styles.itemAmount, { color: itemColor }]}>
                {item.isAcertoSaldo ? displayValue : formatToBRL(item.amount)}
                </Text>
              </View>
            </ItemWrapper>
          );
        })}
      </View>
      <SalesDetailModal
        visible={isModalVisible}
        onClose={closeLiquidatedDetailModal}
        accountId={selectedSaleId}
        onSaleCanceled={handleSaleCanceled}
        servicoNomes={{}} // Pode passar os nomes de serviços, se necessário
        navigation={navigation}
      />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default FilteredListCard;
