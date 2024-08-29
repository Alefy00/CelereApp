/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import Bartop2 from '../../../../../../components/BarTop2';
import { COLORS } from "../../../../../../constants";
import styles from './styles';
import { Alert, Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    const clearAsyncStorage = async () => {
      try {
        await AsyncStorage.clear();
        console.log('AsyncStorage limpo com sucesso!');
        Alert.alert('Sucesso', 'O armazenamento foi limpo. Você pode testar um novo número.');
      } catch (error) {
        console.error('Erro ao limpar AsyncStorage:', error);
        Alert.alert('Erro', 'Não foi possível limpar o armazenamento.');
      }
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
        <Button title="Limpar Armazenamento" onPress={clearAsyncStorage} color="#FF0000" />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Bartop2
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