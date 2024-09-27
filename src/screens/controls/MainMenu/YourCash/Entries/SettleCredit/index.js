/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../constants";
import FilterModal from "./components/FilterModal";
import AccountDetailModal from "./components/AccountDetailModal"; // Importando o modal para contas a receber
import LiquidatedDetailModal from "./components/LiquidatedDetailModal"; // Importando o modal para liquidadas

const SettleCredit = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('open'); // Estado para alternar entre "Em Aberto" e "Liquidadas"
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Controle da visibilidade do modal de contas a receber
  const [liquidatedModalVisible, setLiquidatedModalVisible] = useState(false); // Controle da visibilidade do modal de liquidadas
  const [filterModalVisible, setFilterModalVisible] = useState(false); // Controle da visibilidade do modal de filtro
  const [selectedAccount, setSelectedAccount] = useState(null); // Conta selecionada

  // Vendas liquidadas
  const contas = [
    { id: '1', nome: 'Mariana Souza', valor: 'R$84,00', produtos: 4, data: '23/09/2024', status: 'Liquidada' },
  ];

  // Vendas de contas a receber
  const contas2 = [
    { id: '1', nome: 'Mariana Souza', valor: 'R$84,00', produtos: 4, data: '23/09/2024', vencimento: '23/09/2024', status: 'Contas a receber' },
  ];

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

  // Função para renderizar uma venda de "Contas a Receber"
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openAccountDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome}>{item.nome}</Text>
            <Text style={styles.contaData}>Data: {item.data}</Text>
            <Text style={styles.contaVencimento}>Vencimento: {item.vencimento}</Text>
            <Text style={styles.contaProdutos}>{item.produtos} produtos</Text>
            <Text style={styles.contaSituacao(item.status)}>Situação: {item.status}</Text>
          </View>
          <Text style={styles.contaValor}>{item.valor}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Função para renderizar uma venda na aba "Liquidadas"
  const renderLiquidatedItem = ({ item }) => (
    <TouchableOpacity onPress={() => openLiquidatedDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome2}>{item.nome}</Text>
            <Text style={styles.contaData2}>Data: {item.data}</Text>
            <Text style={styles.contaProdutos2}>{item.produtos} produtos</Text>
            <Text style={styles.contaSituacaoLiquidada2}>Situação: {item.status}</Text>
          </View>
          <Text style={styles.contaValor2}>{item.valor}</Text>
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

      {/* Lista de contas */}
      {selectedTab === 'open' ? (
        <FlatList
          data={contas} // Mostra as vendas liquidadas
          keyExtractor={(item) => item.id}
          renderItem={renderLiquidatedItem} // Usa o renderLiquidatedItem para "Liquidadas"
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <FlatList
          data={contas2} // Mostra as vendas de contas a receber
          keyExtractor={(item) => item.id}
          renderItem={renderItem} // Usa o renderItem para "Contas a Receber"
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Modal para filtro */}
      <FilterModal
        visible={filterModalVisible}
        onClose={closeFilterModal}
        onFilter={() => {
          closeFilterModal();
        }}
      />

      {/* Modal para contas a receber */}
      {selectedAccount && selectedTab === 'settled' && (
        <AccountDetailModal
          visible={modalVisible}
          onClose={closeAccountDetailModal}
          account={selectedAccount}
        />
      )}

      {/* Modal para vendas liquidadas */}
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
