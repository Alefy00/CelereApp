/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import FilterModal from "../../Entries/SettleCredit/components/FilterModal";
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from "../../../../../../services/apiConfig";

const API_CATEGORIES_URL = `${API_BASE_URL}/mnt/categoriasdespesa/?page=1&page_size=30`;
const API_EXPENSES_URL = `${API_BASE_URL}/cad/despesa/`; // Ajustado para não incluir parâmetros fixos

const ConsultExpense = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState({});
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleState, setToggleState] = useState('pendente'); // Definindo como 'liquidada' por padrão
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const handleFilter = (filters) => {
    const { searchText, valorPrestacao, selectedDate } = filters;
    
    // Filtra as despesas com base nos critérios fornecidos
    const filtered = expenses.filter(expense => {
      const matchesSearchText = searchText ? expense.item.toLowerCase().includes(searchText.toLowerCase()) : true;
      const matchesValue = valorPrestacao ? expense.total <= parseFloat(valorPrestacao.replace(/[^\d]/g, '')) / 100 : true;
      const matchesDate = selectedDate ? new Date(expense.dt_vencimento).toDateString() === selectedDate.toDateString() : true;
  
      return matchesSearchText && matchesValue && matchesDate;
    });
  
    setFilteredExpenses(filtered); // Atualiza a lista filtrada
    setIsFilterModalVisible(false); // Fecha o modal após aplicar o filtro
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const id = await getEmpresaId();
        if (id) {
          fetchExpenses(id, toggleState);  // Chama a API com base no estado selecionado
        }
        await fetchCategories();
        setLoading(false);
      };
  
      fetchData();
    }, [fetchExpenses, toggleState])  // Atualiza ao mudar o estado de toggle
  );

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

// Função para buscar todas as despesas, separadas por status
const fetchExpenses = useCallback(async (empresa_id) => {
  if (!empresa_id) return;

  setLoading(true);
  try {
    // Buscar despesas com status 'pendente' (para a aba 'Contas a pagar')
    const responsePendentes = await axios.get(API_EXPENSES_URL, {
      params: {
        page: 1,
        page_size: 100,
        empresa_id: empresa_id,
        data_inicial: '2023-01-01',
        data_final: '4030-09-23',
        status: 'pendente'
      }
    });

    // Buscar despesas com status 'finalizada' (para a aba 'Pagas')
    const responseFinalizadas = await axios.get(API_EXPENSES_URL, {
      params: {
        page: 1,
        page_size: 100,
        empresa_id: empresa_id,
        data_inicial: '2023-01-01',
        data_final: '4030-09-23',
        status: 'finalizada'
      }
    });

    // Inclui despesas recorrentes junto com as despesas principais
    const todasDespesasPendentes = responsePendentes.data.data.flatMap(despesa => {
      const recorrencias = responsePendentes.data.data.filter(d => d.despesa_pai === despesa.id);
      return [despesa, ...recorrencias];
    });

    const todasDespesasFinalizadas = responseFinalizadas.data.data.flatMap(despesa => {
      const recorrencias = responseFinalizadas.data.data.filter(d => d.despesa_pai === despesa.id);
      return [despesa, ...recorrencias];
    });

    // Atualiza as despesas pendentes e finalizadas separadamente
    const despesasComValorAPagarPendentes = await Promise.all(todasDespesasPendentes.map(async (expense) => {
      const detalhesDespesa = await axios.get(`${API_EXPENSES_URL}${expense.id}`);
      return {
        ...expense,
        valor_a_pagar: detalhesDespesa.data.data.valor_a_pagar,
      };
    }));

    const despesasComValorAPagarFinalizadas = await Promise.all(todasDespesasFinalizadas.map(async (expense) => {
      const detalhesDespesa = await axios.get(`${API_EXPENSES_URL}${expense.id}`);
      return {
        ...expense,
        valor_a_pagar: detalhesDespesa.data.data.valor_a_pagar,
      };
    }));

    // Atualiza a lista de despesas pendentes e finalizadas
    if (toggleState === 'pendente') {
      // Exibe todas as despesas pendentes e suas recorrências
      setExpenses(despesasComValorAPagarPendentes);
      setFilteredExpenses(despesasComValorAPagarPendentes);
    } else if (toggleState === 'liquidada') {
      // Exibe todas as despesas finalizadas e suas recorrências
      setExpenses(despesasComValorAPagarFinalizadas);
      setFilteredExpenses(despesasComValorAPagarFinalizadas);
    }

  } catch (error) {
    console.error("Erro ao buscar despesas: ", error);
  } finally {
    setLoading(false);
  }
}, [toggleState]);



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
        fetchExpenses(id, toggleState);  // Chama a API com base no estado selecionado
      }
      await fetchCategories();
      setLoading(false);
    };

    fetchData();
  }, [fetchExpenses, toggleState]);  // Atualiza ao mudar o estado de toggle

  const handleToggleChange = (newState) => {
    setToggleState(newState);  // Atualiza o estado ao clicar no toggle
  };

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

  const getMonthReference = (dateString) => {
    const expenseDate = new Date(dateString);  // Converte string em data
    const previousMonth = new Date(expenseDate.setMonth(expenseDate.getMonth() - 1));  // Subtrai um mês
    return previousMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });  // Retorna o nome do mês e ano
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);  // Converte string em data
    return date.toLocaleDateString('pt-BR');  // Formata para dia/mês/ano em português
  };

  const goToExpenseDetails = (expense) => {
    navigation.navigate('ExpenseDetails', {
      expense,
      categories,  // Passando as categorias para a tela de detalhes
    });
  };
  
  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  const formatCurrency = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

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

      {/* Campo de busca */}
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
        <TouchableOpacity style={styles.filterButton} onPress={() => setIsFilterModalVisible(true)}>
          <Icon name="filter" size={24} color="black" />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>

      </View>

      {/* Toggle para alternar entre despesas pendentes e liquidadas */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, toggleState === 'pendente' && styles.toggleButtonActive]}
          onPress={() => handleToggleChange('pendente')}
        >
          <Icon name="arrow-forward" size={16} color={toggleState === 'pendente' ? COLORS.black : COLORS.black} />
          <Text style={[styles.toggleText, toggleState === 'pendente' && styles.toggleTextActive]}>Contas a pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, toggleState === 'liquidada' && styles.toggleButtonActive]}
          onPress={() => handleToggleChange('liquidada')}
        >
          <Icon name="arrow-forward" size={16} color={toggleState === 'liquidada' ? COLORS.black : COLORS.black} />
          <Text style={[styles.toggleText, toggleState === 'liquidada' && styles.toggleTextActive]}>Pagas</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de despesas */}
      <ScrollView style={styles.expensesListContainer}>
  {filteredExpenses.map(expense => (
    <TouchableOpacity
      key={expense.id}
      style={styles.expenseContainer}
      onPress={() => {
        if (toggleState === 'pendente') {
          goToExpenseDetails(expense);
        }
      }}
      disabled={toggleState !== 'pendente'}
    >
      <View style={styles.expenseInfo}>
        <Text style={styles.expenseName}>{expense.item}</Text>
        <Text style={styles.expenseType}>{categories[expense.categoria_despesa] || 'Categoria desconhecida'}</Text>
        <Text style={styles.expenseReference}>Referência: {getMonthReference(expense.dt_vencimento)}</Text>
        <Text style={styles.expenseDueDate}>Data de vencimento:{'\n'}{formatDate(expense.dt_vencimento)}</Text>
        
        {/* Verificação do campo status */}
        <Text style={styles.expenseStatus}> 
        Situação: <Text style={expense.status === 'finalizada' ? styles.expenseStatusPaid : styles.expenseStatusPending}> 
            {expense.status === 'finalizada' ? 'Finalizada' : 'Pendente'}
           </Text>
        </Text>
      </View>
      <Text style={styles.expenseAmount}>
        {formatCurrency(expense.valor_a_pagar)}
      </Text>
    </TouchableOpacity>
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
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onFilter={handleFilter}
      />

    </View>
  );
};

export default ConsultExpense;
