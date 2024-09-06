/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseGroup from './components/ExpenseGroup';
import LiquidateExpenseModal from './components/LiquidateExpenseModal';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const EXPENSES_API = 'https://api.celereapp.com.br/cad/despesa/';
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const LIQUIDATE_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa/{id}/baixardespesa/';

const LiquidateExpense = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liquidateModalVisible, setLiquidateModalVisible] = useState(false);
  const [selectedExpenseGroup, setSelectedExpenseGroup] = useState([]);
  const [empresaId, setEmpresaId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('Ativas'); // Aba ativa

  const getLiquidateExpenseUrl = (id) => {
    return LIQUIDATE_EXPENSE_API.replace('{id}', id);
  };

  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      if (empresaData !== null) {
        const parsedData = JSON.parse(empresaData);
        return parsedData;
      } else {
        console.log('Nenhum dado de empresa encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(CATEGORIES_API);
      if (response.data.results && response.data.results.data) {
        setCategories(response.data.results.data);
      } else {
        console.error('Erro ao buscar categorias:', response.data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar as categorias de despesas. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias de despesas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as categorias de despesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  const fetchExpenses = useCallback(async (empresa_id) => {
    if (!empresa_id) return;

    setLoading(true);
    try {
      const response = await axios.get(EXPENSES_API, {
        params: {
          page: 1,
          page_size: 100,
          empresa_id: empresa_id,
          data_inicial: '2023-01-01',
          data_final: '3030-09-23',
          status: 'pendente'
        }
      });

      if (response.data.status === 200 && response.data.data) {
        const despesasData = response.data.data;

        const grouped = despesasData.reduce((acc, curr) => {
          const { despesa_pai, item, valor, categoria_despesa } = curr;
          const key = despesa_pai || curr.id;

          if (!acc[key]) {
            acc[key] = {
              despesa_pai: key,
              item,
              categoria_despesa,
              total: 0,
              despesas: [],
            };
          }

          acc[key].total += parseFloat(valor); 
          acc[key].despesas.push(curr);

          return acc;
        }, {});

        setExpenses(Object.values(grouped));
        setFilteredExpenses(Object.values(grouped));
      } else {
        Alert.alert('Erro', response.data.message || 'Erro ao buscar despesas.');
      }
    } catch (error) {
      console.error('Erro ao buscar despesas:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as despesas. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const id = await getEmpresaId();

      if (id) {
        setEmpresaId(id);
        fetchExpenses(id);
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, faça login novamente.');
      }

      await fetchCategories();
    };

    fetchData();
  }, [fetchExpenses]);

  // Função para filtrar despesas com base no nome
  const filterExpensesByName = () => {
    if (!searchQuery) {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter(expense =>
        expense.item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredExpenses(filtered);
    }
  };

  const handleOpenLiquidateModal = (expenseGroup) => {
    setSelectedExpenseGroup(expenseGroup.despesas);
    setLiquidateModalVisible(true);
  };

  const handleCloseLiquidateModal = () => {
    setSelectedExpenseGroup([]);
    setLiquidateModalVisible(false);
  };

  const handleConfirmLiquidateAll = async (paymentDate, reason) => {
    try {
      for (const expense of selectedExpenseGroup) {
        const url = getLiquidateExpenseUrl(expense.id);
        
        await axios.patch(url, {
          empresa_id: empresaId,
          dt_pagamento: paymentDate.toISOString().split('T')[0],
          motivo: reason,
        });
      }

      Alert.alert('Sucesso', 'Todas as recorrências foram liquidadas com sucesso!');
      handleCloseLiquidateModal();

      // Atualiza a lista removendo despesas liquidadas
      const updatedExpenses = expenses.filter(
        group => !selectedExpenseGroup.some(expense => expense.despesa_pai === group.despesa_pai)
      );
      
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses); // Atualiza também a lista filtrada
    } catch (error) {
      console.error('Erro ao liquidar todas as despesas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao liquidar as despesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };

  return (
    <View style={styles.container}>
      <BarTop2
        titulo="Liquidar valor total de uma despesa"
        backColor="#FFC700" // Amarelo conforme o design
        foreColor="#000" // Preto para o título
        style={{ height: 50 }}
      />
      <Text style={styles.title}>Liquidar valor total de uma despesa</Text>
      <Text style={styles.subtitle}>Veja e cadastre suas despesas.</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise uma despesa recente..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={filterExpensesByName}>
          <Icon name="search-outline" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-outline" size={20} color="#000" />
          <Text style={styles.filterButtonText}>Filtrar</Text> 
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Ativas' ? styles.tabButtonActive : styles.tabButtonInactive]}
          onPress={() => setActiveTab('Ativas')}
        >
          <Text style={styles.tabText}>Ativas ({filteredExpenses.length})</Text> 
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Liquidadas' ? styles.tabButtonActive : styles.tabButtonInactive]}
          onPress={() => setActiveTab('Liquidadas')}
        >
          <Text style={styles.tabText}>Liquidadas (5)</Text> 
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FFC700" />
      ) : (
        <FlatList
          data={filteredExpenses}
          keyExtractor={(item) => item.despesa_pai.toString()}
          renderItem={({ item }) => (
            <View style={styles.expenseCard}>
              <Text style={styles.expenseTitle}>{item.item}</Text> 
              <Text style={styles.expenseSubtitle}>{getCategoryNameById(item.categoria_despesa)}</Text> 
              <Text style={styles.expenseValue}>R${item.total.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
  
      <LiquidateExpenseModal
        visible={liquidateModalVisible}
        onClose={handleCloseLiquidateModal}
        onConfirmLiquidation={handleConfirmLiquidateAll}
      />
    </View>
  );
  
};

export default LiquidateExpense;
