/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';

// Constantes para URLs de API
const API_BASE_URL = "https://api.celereapp.com.br";
const API_CATEGORIES_URL = `${API_BASE_URL}/mnt/categoriasdespesa/?page=1&page_size=30`;
const API_EXPENSES_URL = `${API_BASE_URL}/cad/despesa/?page=1&page_size=100&empresa_id=11&data_inicial=2023-01-01&data_final=4030-09-23&status=pendente&valor=`;

const ConsultExpense = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);



  // Função para buscar despesas da API
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(API_EXPENSES_URL);
      const despesasData = response.data.data;

      // Agrupar despesas pelo campo "despesa_pai" e somar os valores
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
    }
  };

  // Função para buscar categorias da API
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
      await fetchCategories();
      await fetchExpenses();
      setLoading(false);
    };

    fetchData();
  }, []);

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

  const handleFocus = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    setIsSearching(false);
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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
          <View key={expenseGroup.despesa_pai} style={styles.expenseContainer}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseName}>{expenseGroup.item}</Text>
              <Text style={styles.expenseType}>{categories[expenseGroup.categoria_despesa] || 'Categoria desconhecida'}</Text>
            </View>
            <Text style={styles.expenseAmount}>Total: R${expenseGroup.total.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>

      {!isSearching && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('NewExpense')}
        >
          <Icon name="add" size={24} color="black" />
          <Text style={styles.addButtonText}>Cadastrar nova despesa</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ConsultExpense;
