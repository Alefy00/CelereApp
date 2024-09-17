/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../constants";
import FilterModal from "./components/FilterModal";
import AccountDetailModal from "./components/AccountDetailModal"; // Importando o novo modal

const SettleCredit = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('open'); // Estado para alternar entre "Em Aberto" e "Liquidadas"
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // Controle da visibilidade do modal de detalhes
  const [filterModalVisible, setFilterModalVisible] = useState(false); // Controle da visibilidade do modal de filtro
  const [selectedAccount, setSelectedAccount] = useState(null); // Conta selecionada

  const contas = [
    { id: '1', nome: 'Mariana Souza', valor: 'R$84,00', produtos: 4 }
  ]; // Dados fictícios para replicar o design

  // Função para abrir o modal de filtro
  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  // Função para fechar o modal de filtro
  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  // Função para alternar entre "Em Aberto" e "Liquidadas"
  const toggleTab = (tab) => {
    setSelectedTab(tab);
  };

  // Função para abrir o modal de detalhes da conta
  const openAccountDetailModal = (account) => {
    setSelectedAccount(account);
    setModalVisible(true);
  };

  // Função para fechar o modal de detalhes da conta
  const closeAccountDetailModal = () => {
    setModalVisible(false);
    setSelectedAccount(null);
  };

  // Função para renderizar a conta
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openAccountDetailModal(item)}>
      <View style={styles.contaItem}>
        <View style={styles.contaInfo}>
          <Icon name="person-circle-outline" size={40} color="black" />
          <View style={styles.contaTextContainer}>
            <Text style={styles.contaNome}>{item.nome}</Text>
            <Text style={styles.contaProdutos}>{item.produtos} produtos</Text>
          </View>
          <Text style={styles.contaValor}>{item.valor}</Text>
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
          routeMailer=""
          routeCalculator=""
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* Título */}
      <Text style={styles.title}>Contas a receber</Text>
      <Text style={styles.subtitle}>Localize a dívida de seu cliente e liquide parcialmente ou 100%.</Text>

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
            Em aberto
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, selectedTab === 'settled' ? styles.tabButtonActive : {}]} 
          onPress={() => toggleTab('settled')}
        >
          <Text style={selectedTab === 'settled' ? styles.tabButtonTextActive : styles.tabButtonText}>
            Liquidadas
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de contas */}
      {selectedTab === 'open' ? (
        <FlatList
          data={contas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma conta liquidada.</Text>
        </View>
      )}

      {/* Modal para filtro */}
      <FilterModal
        visible={filterModalVisible}
        onClose={closeFilterModal}
        onFilter={() => {
          // Lógica de filtro pode ser aplicada aqui
          closeFilterModal();
        }}
      />

      {/* Modal para detalhes da conta */}
      {selectedAccount && (
        <AccountDetailModal
          visible={modalVisible}
          onClose={closeAccountDetailModal}
          // Passa os dados da conta selecionada para o modal
        />
      )}
    </View>
  );
};

export default SettleCredit;
