/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, ActivityIndicator, Alert } from 'react-native';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from './components/SearchBar';
import ExpenseGroup from './components/ExpenseGroup';
import RecurrenceModal from './components/RecurrenceModal';
import LiquidateExpenseModal from './components/LiquidateExpenseModal';
import styles from './styles';

const EXPENSES_API = 'https://api.celereapp.com.br/cad/despesa/';
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const LIQUIDATE_EXPENSE_API = 'https://api.celereapp.com.br/cad/despesa/{id}/baixardespesa/';


const LiquidateExpense = ({ navigation }) => {
  const [searchDate, setSearchDate] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [groupedExpenses, setGroupedExpenses] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [liquidateModalVisible, setLiquidateModalVisible] = useState(false);
  const [selectedExpenseGroup, setSelectedExpenseGroup] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);

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

  // Envolva `fetchExpenses` com `useCallback` para evitar a recriação em cada renderização
  const fetchExpenses = useCallback(async (dataInicial = '', dataFinal = '', empresa_id, valor = '') => {
    if (!empresa_id) return;

    setLoading(true);
    try {
      const response = await axios.get(EXPENSES_API, {
        params: {
          page: 1,
          page_size: 100,
          empresa_id: empresa_id,
          data_inicial: dataInicial,
          data_final: dataFinal,
          status: 'pendente',
          valor: valor
        }
      });

      if (response.data.status === 200 && response.data.data) {
        const expenses = response.data.data;
        setExpenses(expenses);
        groupExpensesByParent(expenses);
      } else {
        Alert.alert('Erro', response.data.message || 'Erro ao buscar despesas.');
      }
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as despesas. Verifique sua conexão com a internet e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  const groupExpensesByParent = (expenses) => {
    const grouped = expenses.reduce((acc, expense) => {
      const parentId = expense.despesa_pai || expense.id;
      if (!acc[parentId]) {
        acc[parentId] = [];
      }
      acc[parentId].push(expense);
      return acc;
    }, {});

    setGroupedExpenses(grouped);
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getEmpresaId();

      if (id) {
        setEmpresaId(id);
        fetchExpenses('2023-01-01', '4025-09-23', id);
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, faça login novamente.');
      }

      await fetchCategories();
    };

    fetchData();
  }, [fetchExpenses]); // Adicione `fetchExpenses` ao array de dependências

  const handleOpenModal = (expenseGroup) => {
    setSelectedExpenseGroup(expenseGroup);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedExpenseGroup([]);
    setModalVisible(false);
  };

  const handleOpenLiquidateModal = (expense) => {
    setSelectedExpense(expense);
    setLiquidateModalVisible(true);
  };

  const handleCloseLiquidateModal = () => {
    setSelectedExpense(null);
    setLiquidateModalVisible(false);
  };

  const handleConfirmLiquidation = async (paymentDate, reason) => {
    try {
      const url = getLiquidateExpenseUrl(selectedExpense.id);
  
      const response = await axios.patch(url, {
        empresa_id: empresaId,
        dt_pagamento: paymentDate.toISOString().split('T')[0], // Formato 'YYYY-MM-DD'
        motivo: reason,
      });
  
      if (response.status === 200 || response.data.status === 'success') {
        Alert.alert('Sucesso', 'Despesa liquidada com sucesso!');
        handleCloseLiquidateModal();
        handleCloseModal();
        removeLiquidatedExpense(selectedExpense.id);
      } else {
        Alert.alert('Erro', 'Erro ao liquidar a despesa.');
      }
    } catch (error) {
      console.error('Erro ao liquidar a despesa:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao liquidar a despesa. Verifique sua conexão com a internet e tente novamente.');
    }
  };
  

  const removeLiquidatedExpense = (expenseId) => {
    const updatedExpenses = { ...groupedExpenses };
    Object.keys(updatedExpenses).forEach(parentId => {
      updatedExpenses[parentId] = updatedExpenses[parentId].filter(expense => expense.id !== expenseId);
      if (updatedExpenses[parentId].length === 0) {
        delete updatedExpenses[parentId];
      }
    });

    setGroupedExpenses(updatedExpenses);
  };
  const handleSearch = (startDate, endDate, valor) => {
    const params = {
      page: 1,
      page_size: 100,
      empresa_id: empresaId,
      data_inicial: startDate,
      data_final: endDate,
      status: 'pendente',
    };
  
    if (valor) {
      params.valor = valor; // Adiciona o parâmetro de valor apenas se ele for fornecido
    }
  
    setLoading(true);
    axios.get(EXPENSES_API, { params })
      .then(response => {
        if (response.data.status === 200 && response.data.data) {
          const expenses = response.data.data;
          setExpenses(expenses);
          groupExpensesByParent(expenses);
        } else {
          Alert.alert('Erro', response.data.message || 'Erro ao buscar despesas.');
        }
      })
      .catch(error => {
        console.error('Erro ao buscar despesas:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao buscar as despesas. Verifique sua conexão com a internet e tente novamente.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };

  return (
    <View style={styles.container}>
      <BarTop2
        titulo="Liquidar Despesa"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer=""
        routeCalculator=""
        style={{ height: 50 }}
      />
      <SearchBar 
        searchDate={searchDate} 
        setSearchDate={setSearchDate} 
        searchValue={searchValue} 
        setSearchValue={setSearchValue} 
        onSearch={handleSearch} 
      />
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={Object.values(groupedExpenses)}
          keyExtractor={(item) => item[0].id.toString()}
          renderItem={({ item }) => (
            <ExpenseGroup group={item} onPress={handleOpenModal} getCategoryNameById={getCategoryNameById} />
          )}
        />
      )}
      <RecurrenceModal
        visible={modalVisible}
        onClose={handleCloseModal}
        expenseGroup={selectedExpenseGroup}
        onOpenLiquidateModal={handleOpenLiquidateModal}
        getCategoryNameById={getCategoryNameById}
      />
      <LiquidateExpenseModal
        visible={liquidateModalVisible}
        onClose={handleCloseLiquidateModal}
        onConfirmLiquidation={handleConfirmLiquidation}
      />
    </View>
  );
};

export default LiquidateExpense;



