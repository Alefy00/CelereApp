/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import PartialLiquidationModal from './components/PartialLiquidationModal'; // Importando o modal
import ConfirmationModal from "./components/ConfirmationModal";

// Constantes para URLs de API
const API_BASE_URL = "https://api.celereapp.com.br";
const API_CATEGORIES_URL = `${API_BASE_URL}/mnt/categoriasdespesa/?page=1&page_size=30`;
const API_EXPENSES_URL = `${API_BASE_URL}/cad/despesa/`; // Ajustado para não incluir parâmetros fixos

const PartialLiquidation = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [empresaId, setEmpresaId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null); // Despesa selecionada
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const getEmpresaId = async () => {
    try {
      const empresaData = await AsyncStorage.getItem('empresaData');
      if (empresaData !== null) {
        const parsedData = JSON.parse(empresaData);
        setEmpresaId(parsedData);
        return parsedData;
      } else {
        console.log('Nenhum dado de empresa encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  const fetchExpenses = useCallback(async (empresa_id) => {
    if (!empresa_id) return;

    setLoading(true);
    try {
      const response = await axios.get(API_EXPENSES_URL, {
        params: {
          page: 1,
          page_size: 100,
          empresa_id: empresa_id,
          data_inicial: '2023-01-01',  // Ajuste essas datas conforme necessário
          data_final: '4030-09-23',
          status: 'pendente'
        }
      });
      const despesasData = response.data.data;

      const groupedExpenses = despesasData.reduce((acc, curr) => {
        const { despesa_pai, item, valor, categoria_despesa } = curr;
        const key = despesa_pai || curr.id;  // Usar o próprio ID se "despesa_pai" for nulo

        if (!acc[key]) {
          acc[key] = {
            despesa_pai: key,
            item,
            categoria_despesa,
            total: 0,
          };
        }

        acc[key].total += parseFloat(valor);

        return acc;
      }, {});

      setExpenses(Object.values(groupedExpenses));
      setFilteredExpenses(Object.values(groupedExpenses));
    } catch (error) {
      console.error("Erro ao buscar despesas: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_CATEGORIES_URL);
      const categoriasData = response.data.results.data;

      const categoriasMap = {};
      categoriasData.forEach(category => {
        categoriasMap[category.id] = category.descricao;
      });
      setCategories(categoriasMap);
    } catch (error) {
      console.error("Erro ao buscar categorias: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = await getEmpresaId();
      if (id) {
        fetchExpenses(id);
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, faça login novamente.');
      }
      await fetchCategories();
      setLoading(false);
    };

    fetchData();
  }, [fetchExpenses]);

  useFocusEffect(
    useCallback(() => {
      const refreshExpenses = async () => {
        const id = await getEmpresaId();
        if (id) {
          fetchExpenses(id);
        }
      };

      refreshExpenses();
    }, [fetchExpenses])
  );

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = expenses.filter(expense =>
        expense.item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses);
    }
  };

  // Função para abrir o modal e selecionar a despesa
  const handleOpenModal = (expense) => {
    setSelectedExpense(expense);
    setModalVisible(true);
  };

  // Função para lidar com a liquidação parcial
  const handleConfirmLiquidation = (paymentDate, partialAmount) => {
    console.log('Liquidando parcialmente:', selectedExpense, 'Valor:', partialAmount, 'Data:', paymentDate);
    setModalVisible(false);

    // Abrir o modal de confirmação
    setConfirmationVisible(true);
  };

  // Função para confirmar a liquidação parcial
  const handleConfirmPartialLiquidation = () => {
    console.log('Liquidação parcial confirmada:', selectedExpense);
    setConfirmationVisible(false);  // Fechar o modal de confirmação após a confirmação
  };

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  return (
    <View style={styles.container}>
      <View style={{ height: 50 }}>
        <BarTop2
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Suas despesas</Text>
        <Text style={styles.headerSubtitle}>Veja e cadastre suas despesas.</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise uma despesa..."
            value={searchText}
            onChangeText={handleSearch}
            accessibilityLabel="Campo de busca de despesas"
            accessibilityHint="Digite para buscar despesas recentes"
          />
          <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={24} color="black" />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.expensesListContainer}>
        {filteredExpenses.map(expenseGroup => (
          <TouchableOpacity
            key={expenseGroup.despesa_pai}
            style={styles.expenseContainer}
            onPress={() => handleOpenModal(expenseGroup)}
          >
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseName}>{expenseGroup.item}</Text>
              <Text style={styles.expenseType}>{categories[expenseGroup.categoria_despesa] || 'Categoria desconhecida'}</Text>
            </View>
            <Text style={styles.expenseAmount}>Total: R${expenseGroup.total.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal de liquidação parcial */}
      {selectedExpense && (
        <PartialLiquidationModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirmPartialLiquidation={handleConfirmLiquidation} // Passando a função corretamente
        />
      )}

      {/* Modal de confirmação de liquidação parcial */}
      {confirmationVisible && (
        <ConfirmationModal
          visible={confirmationVisible}
          onClose={() => setConfirmationVisible(false)}
          onConfirm={handleConfirmPartialLiquidation}
        />
      )}
    </View>
  );
};

export default PartialLiquidation;
