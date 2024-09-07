/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import BarTop2 from "../../../../../../components/BarTop2";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LiquidateExpenseModal from './components/LiquidateExpenseModal';
import ConfirmationModal from "../PartialLiquidation/components/ConfirmationModal";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { COLORS } from "../../../../../../constants";

const EXPENSES_API = 'https://api.celereapp.com.br/cad/despesa/';
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const LIQUIDATE_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa/{id}/baixardespesa/';

const LiquidateExpense = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [liquidatedExpenses, setLiquidatedExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [liquidateModalVisible, setLiquidateModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedExpenseGroup, setSelectedExpenseGroup] = useState([]);
  const [empresaId, setEmpresaId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [activeTab, setActiveTab] = useState('Ativas');
  const [selectedExpense, setSelectedExpense] = useState(null); 

  const getLiquidateExpenseUrl = (id) => LIQUIDATE_EXPENSE_API.replace('{id}', id);

  // Obter o ID da empresa do AsyncStorage
  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      return empresaData ? JSON.parse(empresaData) : null;
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
      return null;
    }
  };

  // Função para agrupar despesas pelo `despesa_pai`
  const groupExpenses = (expenses) => {
    return expenses.reduce((acc, curr) => {
      const key = curr.despesa_pai || curr.id;

      if (!acc[key]) {
        acc[key] = {
          despesa_pai: key,
          item: curr.item,
          categoria_despesa: curr.categoria_despesa,
          total: 0,
          despesas: [],
        };
      }

      // Somar o valor corretamente
      acc[key].total += parseFloat(curr.valor);
      acc[key].despesas.push(curr);

      return acc;
    }, {});
  };

  // Função para buscar despesas da API
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
        const grouped = groupExpenses(response.data.data);
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

  // Carregar categorias
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
  
      // Recuperar despesas liquidadas do AsyncStorage
      const storedLiquidatedExpenses = await AsyncStorage.getItem('liquidatedExpenses');
      if (storedLiquidatedExpenses) {
        setLiquidatedExpenses(JSON.parse(storedLiquidatedExpenses));
      }
    };
  
    fetchData();
  }, [fetchExpenses]);
  

  // Filtrar despesas pelo nome
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

  // Abrir modal de liquidação e passar despesa selecionada
  const handleOpenLiquidateModal = (expenseGroup) => {
    setSelectedExpense(expenseGroup); // Definir a despesa selecionada
    setSelectedExpenseGroup(expenseGroup.despesas);
    setLiquidateModalVisible(true);
  };

  // Fechar modal de liquidação
  const handleCloseLiquidateModal = () => {
    setSelectedExpenseGroup([]);
    setLiquidateModalVisible(false);
  };

  // Fechar modal de confirmação
  const handleCloseConfirmationModal = () => {
    setConfirmationVisible(false);
  };

  // Confirmar a liquidação de todas as despesas
  const handleConfirmLiquidateAll = async (paymentDate, reason) => {
    try {
      // Para cada despesa no grupo selecionado, fazer a chamada à API para liquidar
      for (const expense of selectedExpenseGroup) {
        const url = getLiquidateExpenseUrl(expense.id);
        await axios.patch(url, {
          empresa_id: empresaId,
          dt_pagamento: paymentDate.toISOString().split('T')[0],
          motivo: reason,
        });
      }

      // Atualizar despesas ativas removendo as liquidadas
      const updatedExpenses = expenses.filter(
        group => !selectedExpenseGroup.some(expense => expense.despesa_pai === group.despesa_pai)
      );
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);

      // Atualizar a lista de despesas liquidadas
      const liquidatedGroups = groupExpenses(selectedExpenseGroup);
      const updatedLiquidatedExpenses = [...liquidatedExpenses, ...Object.values(liquidatedGroups)];
      setLiquidatedExpenses(updatedLiquidatedExpenses);

      // Salvar no AsyncStorage
      await AsyncStorage.setItem('liquidatedExpenses', JSON.stringify(updatedLiquidatedExpenses));

      // Fechar o modal de confirmação após a liquidação
      handleCloseConfirmationModal();

    } catch (error) {
      console.error('Erro ao liquidar todas as despesas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao liquidar as despesas. Verifique sua conexão com a internet e tente novamente.');
    }
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };

  // Função para renderizar a lista de despesas
  const renderExpenseList = () => {
    const data = activeTab === 'Ativas' ? filteredExpenses : liquidatedExpenses;

    return (
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.despesa_pai}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.expenseCardContainer}>
            <TouchableOpacity
              style={styles.expenseCard}
              onPress={activeTab === 'Ativas' ? () => handleOpenLiquidateModal(item) : null}
              disabled={activeTab === 'Liquidadas'}
            >
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.item}</Text>
                <Text style={styles.expenseSubtitle}>{getCategoryNameById(item.categoria_despesa)}</Text>
              </View>
              <Text style={styles.expenseValue}>R${item.total ? item.total.toFixed(2) : '0.00'}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>
      <View style={styles.container}>
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
            <Icon name="search-outline" size={20} color={COLORS.lightGray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter-outline" size={20} color={COLORS.black} />
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
            <Text style={styles.tabText}>Liquidadas ({liquidatedExpenses.length})</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#FFC700" />
        ) : (
          renderExpenseList()
        )}
        <LiquidateExpenseModal
          visible={liquidateModalVisible}
          onClose={handleCloseLiquidateModal}
          onConfirm={() => {
            setLiquidateModalVisible(false);
            setConfirmationVisible(true); // Abrir o modal de confirmação após o modal de liquidação
          }}
          expense={selectedExpense} // Passar a despesa selecionada para o modal
          categories={categories} // Passar a lista de categorias
        />
        <ConfirmationModal
          visible={confirmationVisible}
          onClose={handleCloseConfirmationModal}
          onConfirm={() => handleConfirmLiquidateAll(new Date(), "Pagamento confirmado")} // Ajustar a lógica da data e motivo conforme necessário
        />
      </View>
    </View>
  );
};

export default LiquidateExpense;