/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import BarTop2 from "../../../../../../components/BarTop2";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { COLORS } from ' ../../../../../../constants';

const EXPENSES_API = 'https://api.celereapp.com.br/cad/despesa/';
const CATEGORIES_API = 'https://api.celereapp.com.br/mnt/categoriasdespesa/?page=1&page_size=30';
const SUPPLIERS_API = 'https://api.celereapp.com.br/cad/fornecedor/?empresa_id=1&page=1&page_size=50';

const LiquidateExpense = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empresaId, setEmpresaId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

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
        setExpenses(response.data.data);
        setFilteredExpenses(response.data.data);
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
  const fetchCategories = useCallback(async () => {
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
  }, []);

  // Função para buscar fornecedores da API
  const fetchSuppliers = useCallback(async () => {
    try {
      const response = await axios.get(SUPPLIERS_API);
      if (response.data.results && response.data.results.data) {
        setFornecedores(response.data.results.data); // Armazena os fornecedores no estado
      } else {
        console.error('Erro ao buscar fornecedores:', response.data.message || 'Formato de resposta inesperado');
        Alert.alert('Erro', 'Não foi possível carregar os fornecedores. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os fornecedores. Verifique sua conexão com a internet e tente novamente.');
    }
  }, []);

  // Carregar dados ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      const id = await getEmpresaId();

      if (id) {
        setEmpresaId(id);
        await fetchExpenses(id); // Chama a função para buscar despesas
        await fetchSuppliers(); // Carregar fornecedores junto com as despesas
      }

      await fetchCategories(); // Carregar categorias
    };

    fetchData(); // Chama a função apenas uma vez na montagem
  }, [fetchExpenses, fetchSuppliers, fetchCategories]);

   // Usar useFocusEffect para recarregar as despesas quando a tela ganhar foco
   useFocusEffect(
    useCallback(() => {
      if (empresaId) {
        fetchExpenses(empresaId); // Recarrega as despesas quando a tela for focada
      }
    }, [empresaId, fetchExpenses])
  );

  // Função para obter o nome da categoria pelo id
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.descricao : 'Categoria não encontrada';
  };
  
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

  // Navegar para a tela de detalhes da despesa, passando a despesa e as categorias e fornecedores
  const handleOpenExpenseDetails = (expense) => {
    navigation.navigate('ExpenseDetails', { expense, categories, fornecedores }); // Passa as despesas e os fornecedores
  };

  // Função para formatar a data no formato brasileiro
  const formatDateToBrazilian = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Ordenar as despesas por data de vencimento
  const sortExpensesByDate = (expenses) => {
    return expenses.sort((a, b) => new Date(a.dt_vencimento) - new Date(b.dt_vencimento));
  };

  // Função para renderizar a lista de despesas, agora sem agrupamento
  const renderExpenseList = () => {
    const sortedExpenses = sortExpensesByDate(filteredExpenses); // Ordena as despesas por data
  
    return (
      <FlatList
        data={sortedExpenses}
        keyExtractor={(item) => `${item.id}`} // Usar o id individual da despesa
        renderItem={({ item }) => (
          <View style={styles.expenseCardContainer}>
            <TouchableOpacity
              style={styles.expenseCard}
              onPress={() => handleOpenExpenseDetails(item)} // Navega para a tela de detalhes
            >
              <View style={styles.expenseInfo}>
                <Text style={styles.expenseTitle}>{item.item}</Text>
                <Text style={styles.expenseSubtitle}>{getCategoryNameById(item.categoria_despesa)}</Text>
                {/* Exibir a data de vencimento individual no formato brasileiro */}
                <Text style={styles.expenseDate}>
                  Data de Vencimento{'\n'}{item.dt_vencimento ? formatDateToBrazilian(item.dt_vencimento) : 'Data não disponível'}
                </Text>
              </View>
              <Text style={styles.expenseValue}>R${item.valor ? parseFloat(item.valor).toFixed(2) : '0.00'}</Text>
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

        {loading ? (
          <ActivityIndicator size="large" color="#FFC700" />
        ) : (
          renderExpenseList()
        )}
      </View>
    </View>
  );
};

export default LiquidateExpense;
