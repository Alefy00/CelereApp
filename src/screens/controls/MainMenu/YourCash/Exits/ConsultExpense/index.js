/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import styles from './styles';

const despesasFicticias = [
  { id: '1', data: '10/01/2024', valor: '100,00' },
  { id: '2', data: '15/01/2024', valor: '200,00' },
  { id: '3', data: '20/01/2024', valor: '300,00' },
];

const ConsultExpense = ({ navigation }) => {
  const [searchDate, setSearchDate] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    // Lógica de busca pode ser implementada aqui
  };

  const renderHeader = () => (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Data da despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Data da despesa"
        value={searchDate}
        onChangeText={setSearchDate}
      />
      <Text style={styles.label}>e/ou Valor da despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Lista</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <BarTop2
        titulo="Consultar Despesa"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer=""
        routeCalculator=""
        style={{ height: 50 }}
      />
      <FlatList
        ListHeaderComponent={renderHeader}
        data={despesasFicticias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>Data: {item.data}</Text>
            <Text>Valor: {item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ConsultExpense;
