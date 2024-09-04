/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SvgPixIcon from '../../../../assets/images/svg/initial/IconPix.svg'; 
import { COLORS } from '../../../../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Dados fictícios
const salesData = [
  { id: 1, description: 'Cabo Tipo C Xiaomi', method: 'Pix', date: '07/02/2024, 15:23', amount: 31.90 },
  { id: 2, description: 'Capa antiqueda Iphone 8', method: 'Dinheiro', date: '07/02/2024, 15:04', amount: 18.00 },
  { id: 3, description: 'Protetor de tela', method: 'Cartão de Credito', date: '07/02/2024, 14:11', amount: 40.00 },
];

const expenseData = [
  { id: 1, description: 'Despesa A', method: 'Pix', date: '07/02/2024, 12:00', amount: 50.00 },
  { id: 2, description: 'Despesa B', method: 'Dinheiro', date: '07/02/2024, 13:00', amount: 25.00 },
];

// Função para escolher o ícone com base no método de pagamento
const getPaymentIcon = (method) => {
  switch (method) {
    case 'Pix':
      return <SvgPixIcon width={20} height={20} style={styles.pixIcon} />;
    case 'Dinheiro':
      return <Ionicons name="cash" size={20} color={COLORS.green} />;
    case 'Cartão de Credito':
      return <Ionicons name="card" size={20} color={COLORS.green} />;
    default:
      return <Ionicons name="help-circle-outline" size={20} color={COLORS.green} />;
  }
};

const FilteredListCard = () => {
  const [selectedTab, setSelectedTab] = useState('sales'); // 'sales' or 'expenses'
  const [searchQuery, setSearchQuery] = useState('');

  const dataToShow = selectedTab === 'sales' ? salesData : expenseData;

  const filteredData = dataToShow.filter(item =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.scrollContainer}
      scrollEnabled={true}
      extraHeight={Platform.select({ ios: 100, android: 120 })} 
      keyboardShouldPersistTaps="handled" // Adicionado para manter o foco no campo de entrada
    >
      <View style={styles.card}>
        {/* Botões de Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTab === 'sales' && styles.activeButton]}
            onPress={() => setSelectedTab('sales')}
          >
            <Text style={[styles.toggleText, selectedTab === 'sales' && styles.activeText3]}>Vendas Liquidadas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-up-outline" size={20} color={COLORS.green} />
              <Text style={[styles.toggleValue2, selectedTab === 'sales' && styles.activeText2]}>R$210</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, selectedTab === 'expenses' && styles.activeButton]}
            onPress={() => setSelectedTab('expenses')}
          >
            <Text style={[styles.toggleText, selectedTab === 'expenses' && styles.activeText3]}>Despesas Liquidadas</Text>
            <View style={styles.containerArrow}>
              <Ionicons name="arrow-down-outline" size={20} color={COLORS.red} />
              <Text style={[styles.toggleValue, selectedTab === 'expenses' && styles.activeText]}>R$100</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Saldo */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>
            Saldo <Text style={styles.balanceSubText}>(Vendas - Despesas liquidadas)</Text>
          </Text>
          <Text style={styles.balanceValue}>R$110</Text>
        </View>

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise uma venda recente..."
            placeholderTextColor={COLORS.lightGray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={20} color={COLORS.lightGray} />
        </View>

        {/* Lista de Itens Filtrados */}
        <View>
          {filteredData.map(item => (
            <View key={item.id} style={styles.listItem}>
              {getPaymentIcon(item.method)}
              <View style={styles.itemInfo}>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemDetails}>{item.method} - {item.date}</Text>
              </View>
              <Text style={styles.itemAmount}>R${item.amount.toFixed(2)}</Text>
            </View>
          ))}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 70, // Espaço suficiente para o tab bar
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginVertical: 10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  containerfilter: {
  },
  containerArrow: {
    flexDirection: 'row',
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: COLORS.lightGray2,
  },
  toggleText: {
    fontSize: 14,
    color: COLORS.black,
    fontWeight: '900',
  },
  toggleValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.red,
  },
  activeText: {
    color: COLORS.red,
    fontWeight: '900',
  },
  activeText3: {
    color: COLORS.black,
    fontWeight: '900',
  },
  activeText2: {
    color: COLORS.green,
  },
  toggleValue2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceText: {
    fontSize: 14,
    color: COLORS.black,
  },
  balanceSubText: {
    fontSize: 12,
    color: COLORS.black,
  },
  balanceValue: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.green,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    marginVertical: 5,
    paddingBottom: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  pixIcon: {
    marginRight: 0,
  },
  itemInfo: {
    flex: 1,
    marginLeft:10,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  itemDetails: {
    fontSize: 12,
    color: '#666666',
    marginTop: -5,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDD',
  },
});

export default FilteredListCard;

