/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../constants";
import FilterModal from "./components/FilterModal";
import AccountDetailModal from "./components/AccountDetailModal"; // Importando o modal para contas a receber
import LiquidatedDetailModal from "./components/LiquidatedDetailModal"; // Importando o modal para liquidadas
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_BASE_URL } from "../../../../../../services/apiConfig";
import mixpanel from "../../../../../../services/mixpanelClient";

const SettleCredit = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('open'); // Aba atual: "open" para liquidadas, "settled" para contas a receber
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [liquidatedModalVisible, setLiquidatedModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [contas, setContas] = useState([]); // Lista de vendas liquidadas
  const [contas2, setContas2] = useState([]); // Lista de contas a receber
  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState({});
  const [servicoNomes, setServicoNomes] = useState({});

  // Função para mostrar alertas
  const showAlert = (title, message) => Alert.alert(title, message);

  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) return Number(storedEmpresaId);
      showAlert('Erro', 'ID da empresa não encontrado.');
      return null;
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  }, []);

  const fetchClientes = useCallback(async (empresaId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cad/cliente/?empresa=${empresaId}`);
      const clientesData = response.data.results.data;

      if (clientesData && Array.isArray(clientesData)) {
        const clientesMap = {};
        clientesData.forEach(cliente => {
          clientesMap[cliente.id] = cliente.nome;
        });
        setClientes(clientesMap);
      } else {
        showAlert("Erro", "A resposta da API de clientes não contém os dados esperados.");
      }
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      showAlert("Erro", "Não foi possível carregar os clientes.");
    }
  }, []);

  const fetchServicoById = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cad/servicos/${id}/`);
      return response.data.nome;
    } catch (error) {
      console.error(`Erro ao buscar o serviço com ID ${id}:`, error);
      return 'Nome do serviço indisponível'; // Caso o nome não seja encontrado
    }
  };

  const fetchVendas = useCallback(async () => {
    try {
      setLoading(true);
      const empresaId = await getEmpresaId();
      if (!empresaId) {
        setLoading(false);
        return;
      }
  
      await fetchClientes(empresaId); // Busca os clientes da empresa
  
      // Definindo datas padrão para o filtro de vendas
      const dataInicial = "2024-10-01";
      const dataFinal = "2030-10-24";
  
      const fetchAllVendas = async (url, vendasAcumuladas = []) => {
        const response = await axios.get(url);
        const vendasPagina = response.data.data;
  
        // Filtrando vendas da empresa atual
        const vendasFiltradas = vendasPagina.filter(venda => venda.empresa === empresaId);
        const novasVendas = [...vendasAcumuladas, ...vendasFiltradas];
  
        if (response.data.next) {
          return fetchAllVendas(response.data.next, novasVendas);
        }
  
        return novasVendas;
      };
  
      const vendas = await fetchAllVendas(`${API_BASE_URL}/cad/vendas/?empresa=${empresaId}&data_inicial=${dataInicial}&data_final=${dataFinal}`);
  
      if (vendas && Array.isArray(vendas)) {
        const liquidadas = vendas.filter(venda => venda.status === 'finalizada');
        const contasReceber = vendas.filter(venda => venda.status === 'pendente');
  
        // Buscar os nomes dos serviços para as vendas liquidadas
        const novosNomesServicos = {};
        for (const venda of liquidadas) {
          for (const item of venda.itens) {
            if (item.servico) {
              const nomeServico = await fetchServicoById(item.servico);
              novosNomesServicos[item.servico] = nomeServico;
            }
          }
        }
        setServicoNomes(novosNomesServicos);
  
        setContas(liquidadas);
        setContas2(contasReceber);
      } else {
        showAlert("Erro", "A resposta da API de vendas não contém os dados esperados.");
      }
  
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      showAlert("Erro", "Não foi possível carregar as vendas.");
      setLoading(false);
    }
  }, [getEmpresaId, fetchClientes]);
  
  

  useEffect(() => {
    fetchVendas();
  }, [fetchVendas]);

  // Função para abrir o modal de contas a receber (AccountDetailModal)
  const openAccountDetailModal = (account) => {
    setSelectedAccount(account);
    setModalVisible(true);
  // Evento Mixpanel - Captura a abertura do modal de contas a receber
  mixpanel.track('Modal de Contas a Receber Aberto', {
    contaId: account.id,
    cliente: clientes[account.cliente] || 'Cliente não encontrado',
  });
  };

  // Função para abrir o modal de vendas liquidadas (LiquidatedDetailModal)
  const openLiquidatedDetailModal = (account) => {
    setSelectedAccount(account);
    setLiquidatedModalVisible(true);
  // Evento Mixpanel - Captura a abertura do modal de vendas liquidadas
  mixpanel.track('Modal de Vendas Liquidadas Aberto', {
    contaId: account.id,
    cliente: clientes[account.cliente] || 'Cliente não encontrado',
  });
  };

  // Função para fechar o modal de contas a receber
  const closeAccountDetailModal = () => {
    setModalVisible(false);
    setSelectedAccount(null);
  // Evento Mixpanel - Captura o fechamento do modal de contas a receber
  mixpanel.track('Modal de Contas a Receber Fechado');
  };

  // Função para fechar o modal de vendas liquidadas
  const closeLiquidatedDetailModal = () => {
    setLiquidatedModalVisible(false);
    setSelectedAccount(null);
  // Evento Mixpanel - Captura o fechamento do modal de vendas liquidadas
  mixpanel.track('Modal de Vendas Liquidadas Fechado');
  };

  // Função para abrir o modal de filtro
  const openFilterModal = () => {
    setFilterModalVisible(true);
  // Evento Mixpanel - Captura a abertura do modal de filtro
  mixpanel.track('Filtro Aberto');
  };

  // Função para alternar entre "Liquidadas" e "Contas a Receber"
  const toggleTab = (tab) => {
    setSelectedTab(tab);
      // Evento Mixpanel - Captura a troca de aba
  mixpanel.track('Aba Trocada', {
    abaSelecionada: tab === 'open' ? 'Pagas' : 'Contas a Receber',
  });
  };

  const handleSaleCanceled = () => {
    fetchVendas(); // Recarregar as vendas após o cancelamento
};
  // Função para formatar a data para exibir apenas dia, mês e ano
const formatarData = (data) => {
  const date = new Date(data);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    fetchVendas();
  });

  return unsubscribe;
}, [navigation, fetchVendas]);

const renderItem = ({ item }) => {
  const quantidadeProdutos = item.itens.filter(i => i.produto !== null).length; // Quantidade de produtos
  const quantidadeServicos = item.itens.filter(i => i.servico !== null).length; // Quantidade de serviços
  
  return (
    <TouchableOpacity onPress={() => openAccountDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome}>
              {clientes[item.cliente] || 'Cliente não encontrado'}
            </Text>
            <Text style={styles.contaData}>
              Data: {formatarData(item.data_venda)}
            </Text>
            <Text style={styles.contaVencimento}>
              Vencimento: {formatarData(item.dt_prevista_pagamento)}
            </Text>

            {/* Exibir a quantidade de produtos ou serviços */}
            {quantidadeProdutos > 0 && (
              <Text style={styles.contaProdutos}>
                Produtos: {quantidadeProdutos}
              </Text>
            )}
            {quantidadeServicos > 0 && (
              <Text style={styles.contaProdutos}>
                Serviços: {quantidadeServicos}
              </Text>
            )}

            <Text style={styles.contaSituacao(item.status)}>
              Situação: {item.status}
            </Text>
          </View>
          <Text style={styles.contaValor}>R${item.valor_total_venda - item.total_pagamentos}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const renderLiquidatedItem = ({ item }) => {
  const quantidadeProdutos = item.itens.filter(i => i.produto !== null).length;
  const quantidadeServicos = item.itens.filter(i => i.servico !== null).length;

  return (
    <TouchableOpacity onPress={() => openLiquidatedDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome2}>
              {clientes[item.cliente] || 'Cliente não encontrado'}
            </Text>
            <Text style={styles.contaData2}>Data: {formatarData(item.data_venda)}</Text>

            {/* Exibir a quantidade de produtos ou serviços */}
            {quantidadeProdutos > 0 && (
              <Text style={styles.contaProdutos2}>
                {quantidadeProdutos} Produtos
              </Text>
            )}
            {quantidadeServicos > 0 && (
              <View>
                <Text style={styles.contaProdutos2}>
                  {quantidadeServicos} Serviços
                </Text>
                
              </View>
            )}

            <Text style={styles.contaSituacaoLiquidada2}>
              Situação: {item.status}
            </Text>
          </View>
          <Text style={styles.contaValor2}>R${item.valor_total_venda}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
  return (
    <View style={styles.container}>
      <View style={styles.containerBartop}>
        <BarTop2 
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          onPress={() => navigation.goBack()}
        />
      </View>

      <Text style={styles.title}>Consultar vendas</Text>

      {/* Campo de pesquisa */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um cliente ou valor..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <Icon name="search" size={24} color={COLORS.gray} />
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Icon name="filter-outline" size={24} color="black" />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Botões de alternância */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'open' ? styles.tabButtonActive : {}]} 
          onPress={() => toggleTab('open')}
        >
          <Text style={selectedTab === 'open' ? styles.tabButtonTextActive : styles.tabButtonText}>
            Pagas
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'settled' ? styles.tabButtonActive : {}]} 
          onPress={() => toggleTab('settled')}
        >
          <Text style={selectedTab === 'settled' ? styles.tabButtonTextActive : styles.tabButtonText}>
            Contas a receber
          </Text>
        </TouchableOpacity>
      </View>

      {/* Carregamento ou lista de contas */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.black} />
      ) : (
        <FlatList
          data={selectedTab === 'open' ? contas : contas2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={selectedTab === 'open' ? renderLiquidatedItem : renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modais */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
      />
      {selectedAccount && selectedTab === 'settled' && (
        <AccountDetailModal
          visible={modalVisible}
          onClose={closeAccountDetailModal}
          account={selectedAccount}
          servicoNomes={servicoNomes}
          onSaleCanceled={handleSaleCanceled}
          navigation={navigation}
        />
      )}
      {selectedAccount && selectedTab === 'open' && (
        <LiquidatedDetailModal
          visible={liquidatedModalVisible}
          onClose={closeLiquidatedDetailModal}
          account={selectedAccount}
          servicoNomes={servicoNomes}
          onSaleCanceled={handleSaleCanceled}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default SettleCredit;
