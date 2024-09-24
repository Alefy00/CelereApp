/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import styles from './styles';

const Budget = ({ navigation }) => {

  const budgets = [
    { id: '1', name: 'Marcelo', date: '19/10/2024, 16:47', products: 3, total: 'R$247,90' },
    { id: '2', name: 'Raimundo', date: '19/10/2024, 14:21', products: 1, total: 'R$34,99' },
    { id: '3', name: 'João', date: '19/10/2024, 11:57', products: 2, total: 'R$47,90' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.budgetCard}>
      <View>
        <Text style={styles.budgetName}>{item.name}</Text>
        <Text style={styles.budgetDate}>{item.date}</Text>
        <Text style={styles.budgetProducts}>{item.products} produto{item.products > 1 ? 's' : ''}</Text>
      </View>
      <Text style={styles.budgetTotal}>{item.total}</Text>
      
    </View>
  );

  const handleNewBudgets = () => {
    navigation.navigate('NewBudgets');
  };

  return (
    <View style={styles.containerBase}>
        <View style={styles.containerBartop}>
          <BarTop3
            titulo={'Voltar'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
        </View>
      <View style={styles.container}>
        <Text style={styles.Title}>Orçamentos</Text>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise seus orçamentos"
        />
        <Icon name="search" size={20} color={COLORS.gray} />
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={20} color="black" />
          <Text style={styles.filterText}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Orçamentos */}
      <FlatList
        data={budgets}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.budgetList}
        contentContainerStyle={{ paddingBottom: 80 }} // Garantir que o botão não cubra a lista
      />

      {/* Botão de Incluir Orçamento */}
      <TouchableOpacity style={styles.addButton} onPress={handleNewBudgets}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addButtonText}>Incluir orçamento</Text>
      </TouchableOpacity>

     </View>
    </View>
  );
};

export default Budget;
