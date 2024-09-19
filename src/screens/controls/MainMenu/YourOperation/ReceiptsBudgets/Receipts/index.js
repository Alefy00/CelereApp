/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import styles from './styles';

const Receipts = ({ navigation }) => {
    const receipts = [
        { id: '1', date: '19/10/2024, 16:47', products: 3, total: 'R$247,90' },
        { id: '2', date: '19/10/2024, 14:21', products: 1, total: 'R$34,99' },
        { id: '3', date: '19/10/2024, 11:57', products: 2, total: 'R$47,90' },
      ];
    
      const renderItem = ({ item }) => (
        <View style={styles.receiptCard}>
          <View>
            <Text style={styles.receiptDate}>{item.date}</Text>
            <Text style={styles.receiptProducts}>{item.products} produto{item.products > 1 ? 's' : ''}</Text>
          </View>
          <Text style={styles.receiptTotal}>{item.total}</Text>
        </View>
      );

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
        <Text style={styles.Title}>Compartilhar recibo</Text>
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

         {/* Lista de Recibos */}
         <FlatList
          data={receipts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.receiptList}
          contentContainerStyle={{ paddingBottom: 80 }} // Espaço para o botão
        />


     </View>
    </View>
  );
};

export default Receipts;
