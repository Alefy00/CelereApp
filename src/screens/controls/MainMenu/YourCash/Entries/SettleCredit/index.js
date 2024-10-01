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

const API_VENDAS = 'https://api.celereapp.com.br/cad/vendas/';
const API_CLIENTES = 'https://api.celereapp.com.br/cad/cliente/';

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
          const response = await axios.get(`${API_CLIENTES}?empresa=${empresaId}`);
          const clientesData = response.data.results.data;
    
          if (clientesData && Array.isArray(clientesData)) {
            // Cria um mapa de clientes com id como chave e nome como valor
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
    
      const fetchVendas = useCallback(async () => {
        try {
          setLoading(true);
          const empresaId = await getEmpresaId();
          if (!empresaId) {
            setLoading(false);
            return;
          }
    
          await fetchClientes(empresaId); // Busca os clientes da empresa antes de buscar as vendas
    
          const response = await axios.get(`${API_VENDAS}?empresa_id=${empresaId}`);
          const vendas = response.data.results.data;
    
          if (vendas && Array.isArray(vendas)) {
            const vendasEmpresa = vendas.filter(venda => venda.empresa === empresaId);
            const liquidadas = vendasEmpresa.filter(venda => venda.status === 'finalizada');
            const contasReceber = vendasEmpresa.filter(venda => venda.status === 'pendente');
    
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
  };

  // Função para abrir o modal de vendas liquidadas (LiquidatedDetailModal)
  const openLiquidatedDetailModal = (account) => {
    setSelectedAccount(account);
    setLiquidatedModalVisible(true);
  };

  // Função para fechar o modal de contas a receber
  const closeAccountDetailModal = () => {
    setModalVisible(false);
    setSelectedAccount(null);
  };

  // Função para fechar o modal de vendas liquidadas
  const closeLiquidatedDetailModal = () => {
    setLiquidatedModalVisible(false);
    setSelectedAccount(null);
  };

  // Função para abrir o modal de filtro
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  // Função para fechar o modal de filtro
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  // Função para alternar entre "Liquidadas" e "Contas a Receber"
  const toggleTab = (tab) => {
    setSelectedTab(tab);
  };

  // Função para formatar a data para exibir apenas dia, mês e ano
const formatarData = (data) => {
  const date = new Date(data);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};


const renderItem = ({ item }) => (
  <TouchableOpacity onPress={() => openAccountDetailModal(item)}>
    <View style={styles.contaItem}>
      <View style={styles.contaInfo}>
        <Icon name="person-circle-outline" size={40} color="black" />
        <View style={styles.contaTextContainer}>
          {/* Nome do Cliente baseado no ID */}
          <Text style={styles.contaNome}>
            {clientes[item.cliente] || 'Cliente não encontrado'}
          </Text>
          
          {/* Data da Venda formatada */}
          <Text style={styles.contaData}>
            Data: {formatarData(item.data_venda)}
          </Text>
          
          {/* Data de Vencimento correta */}
          <Text style={styles.contaVencimento}>
            Vencimento: {formatarData(item.dt_prevista_pagamento)}
          </Text>
          
          {/* Quantidade de Produtos */}
          <Text style={styles.contaProdutos}>
            Produtos: {item.itens.length} itens
          </Text>
          
          {/* Situação da Venda */}
          <Text style={styles.contaSituacao(item.status)}>
            Situação: {item.status}
          </Text>
        </View>
        
        {/* Valor total da venda */}
        <Text style={styles.contaValor}>R${item.valor_total_venda}</Text>
      </View>
    </View>
  </TouchableOpacity>
);


  const renderLiquidatedItem = ({ item }) => (
    <TouchableOpacity onPress={() => openLiquidatedDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome2}>
              {clientes[item.cliente] || 'Cliente não encontrado'}
            </Text>
            <Text style={styles.contaData2}>Data: {formatarData(item.data_venda)}</Text>
            <Text style={styles.contaProdutos2}>
               {item.itens.length} Produtos
            </Text>
            <Text style={styles.contaSituacaoLiquidada2}>
              Situação: {item.status}
            </Text>
          </View>
          <Text style={styles.contaValor2}>R${item.valor_total_venda}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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
            Liquidadas
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
        />
      )}
      {selectedAccount && selectedTab === 'open' && (
        <LiquidatedDetailModal
          visible={liquidatedModalVisible}
          onClose={closeLiquidatedDetailModal}
          account={selectedAccount}
        />
      )}
    </View>
  );
};

export default SettleCredit;
