/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import FilterModal from '../../../YourCash/Entries/SettleCredit/components/FilterModal';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../../../../services/apiConfig';
import mixpanel from '../../../../../../services/mixpanelClient';

const Budget = ({ navigation }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [clientCache, setClientCache] = useState({}); // Cache de clientes para evitar múltiplas requisições para o mesmo 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [modalVisibleFilter, setModalVisibleFilter] = useState(false);

    // Estados para armazenar os filtros aplicados
    const [filters, setFilters] = useState({
      searchText: '',
      valorPrestacao: '',
      selectedDate: null,
    });

  // Função para buscar o ID da empresa logada de forma segura
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

  const fetchBudgets = useCallback(async (empresaId) => {
    try {
      let allBudgets = [];
      let nextPage = `${API_BASE_URL}/cad/orcamento/?empresa_id=${empresaId}`;
      
      while (nextPage) {
        const response = await axios.get(nextPage);
  
        if (response.status === 200 && response.data?.results?.data) {
          const budgetsWithDetails = await Promise.all(
            response.data.results.data.map(async (budget) => {
              // Buscar nome do cliente
              let clientName = 'Cliente não encontrado';
              if (!clientCache[budget.cliente]) {
                const clientResponse = await axios.get(`${API_BASE_URL}/cad/cliente/${budget.cliente}/`);
                clientName = clientResponse.data.nome || 'Cliente não encontrado';
                setClientCache((prevCache) => ({ ...prevCache, [budget.cliente]: clientName }));
              } else {
                clientName = clientCache[budget.cliente];
              }
              return {
                ...budget,
                clientName,
              };
            })
          );
  
          allBudgets = [...allBudgets, ...budgetsWithDetails];
  
          // Verificar se existe próxima página
          nextPage = response.data.next; 
        } else {
          throw new Error('Erro ao recuperar orçamentos.');
        }
      }
  
      return allBudgets; // Retornar todos os orçamentos após coletar todas as páginas
    } catch (error) {
      console.error('Erro ao buscar orçamentos:', error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível carregar os orçamentos.');
      return [];
    }
  }, [clientCache]);
  
  // Função para carregar orçamentos
  const loadBudgets = useCallback(async () => {
    setLoading(true);
    try {
      const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
      if (!empresaId) {
        throw new Error('ID da empresa não encontrado.'); // Verifica se o ID foi encontrado
      }

      // Busca os orçamentos e nomes dos clientes associados
      const fetchedBudgets = await fetchBudgets(empresaId);
      setBudgets(fetchedBudgets);
    } catch (error) {
      console.error('Erro ao carregar orçamentos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os orçamentos.');
    } finally {
      setLoading(false);
    }
  }, [fetchBudgets]);

  // Carregar orçamentos uma vez ao montar o componente
  useEffect(() => {
    const loadBudgetsOnce = async () => {
      if (!budgets.length) { // Checa se a lista de orçamentos já foi carregada
        await loadBudgets();
      }
    };
    loadBudgetsOnce();
  }, [budgets.length, loadBudgets]);

  // Filtrar orçamentos pelo nome do cliente
  const filteredBudgets = budgets.filter((budget) =>
    budget.clientName?.toLowerCase().includes(search.toLowerCase())
  );

    // Função para deletar orçamento
    const deleteBudget = async (budgetId) => {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/cad/orcamento/${budgetId}/`);
        Alert.alert('Sucesso', 'Orçamento excluído com sucesso.');
        setModalVisible(false);
        loadBudgets(); // Atualizar lista após a exclusão
      } catch (error) {
        console.error('Erro ao excluir orçamento:', error);
        Alert.alert('Erro', 'Não foi possível excluir o orçamento.');
      } finally {
        setLoading(false);
      }
    };

  // Usar useFocusEffect para recarregar orçamentos toda vez que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      loadBudgets();
    }, [loadBudgets])
  );
  
    const handleSelectBudget = (budget) => {
      setSelectedBudget(budget);
      setModalVisible(true);
      mixpanel.track('Ver detalhes do orçamento', { budgetId: budget.id });
    };
  // Função para aplicar filtros
  const applyFilters = () => {
    setModalVisibleFilter(false); // Fecha o modal após aplicar o filtro
    mixpanel.track('Orçamentos aplicar filtro', { filters });

    const filteredBudgets = budgets.filter((budget) => {
      const matchesSearchText = budget.clientName.toLowerCase().includes(filters.searchText.toLowerCase());
      const matchesValue = filters.valorPrestacao
        ? parseFloat(budget.valor_total_venda) === parseFloat(filters.valorPrestacao)
        : true;
      const matchesDate = filters.selectedDate
        ? new Date(budget.data_orcamento).toLocaleDateString('pt-BR') === filters.selectedDate.toLocaleDateString('pt-BR')
        : true;

      return matchesSearchText && matchesValue && matchesDate;
    });

    setBudgets(filteredBudgets); // Atualiza a lista de orçamentos com os filtros aplicados
  };
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleSelectBudget(item)}>
        <View style={styles.budgetCard}>
          <View>
            <Text style={styles.budgetName}>{item.clientName}</Text>
            <Text style={styles.budgetDate}>
              Data: {new Date(item.data_orcamento).toLocaleDateString('pt-BR')} {new Date(item.data_orcamento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </Text>
            <Text style={styles.budgetProducts}>
              Produtos: {item.item_venda_orcamento?.length || 0}
            </Text>
          </View>
          <Text style={styles.budgetTotal}>
            R$ {item.valor_total_venda ? parseFloat(item.valor_total_venda).toFixed(2) : '0.00'}
          </Text>
        </View>
      </TouchableOpacity>
    );

  const handleNewBudgets = () => {
    navigation.navigate('NewBudgets');
    mixpanel.track('Criar novo orçamento');
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.Title}>Orçamentos</Text>

        {/* Search Input */}
        <View style={styles.searchSection}>
          <TextInput style={styles.searchInput} placeholder="Pesquise seus orçamentos" value={search} onChangeText={setSearch} />
          <Icon name="search" size={20} color={COLORS.gray} />
          <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisibleFilter(true)}>
            <Icon name="filter" size={20} color="black" />
            <Text style={styles.filterText}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* Orçamentos List */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={filteredBudgets}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            style={styles.budgetList}
            contentContainerStyle={{ paddingBottom: 80 }} // Garantir que o botão não cubra a lista
          />
        )}

        {/* Add Budget Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleNewBudgets}>
          <Icon name="add" size={24} color="black" />
          <Text style={styles.addButtonText}>Incluir orçamento</Text>
        </TouchableOpacity>

        {/* Modal de exclusão */}
          {selectedBudget && (
          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Orçamento</Text>
                <View style={styles.modalcontainerSegund}>
                 <Text style={styles.modalText}>{selectedBudget.clientName}</Text>
                 <Text style={styles.modalText}>R$ {parseFloat(selectedBudget.valor_total_venda).toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.receiptButton} // Adicione um estilo apropriado
                  onPress={() => {
                    setModalVisible(false); // Fecha o modal
                    navigation.navigate('BudgetsScreen', { saleId: selectedBudget.id, from: 'Budget' }); // Envia o ID do orçamento
                  }}
                >
                  <Icon name="document-text-outline" size={20} color={COLORS.black} />
                  <Text style={styles.receiptButtonText}>Gerar Recibo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBudget(selectedBudget.id)}>
                <Icon name="trash-outline" size={20} color={COLORS.black} />
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Icon name="close" size={20} color={COLORS.black} />
                  <Text style={styles.cancelButtonText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

          {/* Modal de filtro */}
          <FilterModal
          visible={modalVisibleFilter}
          onClose={() => setModalVisibleFilter(false)}
          onFilter={applyFilters}
        />
      </View>
    </View>
  );
};

export default Budget;
