/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants';

const ITEM_WIDTH = 70; // Definindo uma largura fixa para cada item

const DateCarousel = ({ onDateSelected }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterVisible, setFilterVisible] = useState(false); // Controle de visibilidade do filtro dropdown
  const flatListRef = useRef(null);

  // Lista de dias passados até o dia atual
  const generatePastDates = () => {
    const today = new Date();
    const datesArray = [];
    for (let i = 0; i < 30; i++) {  // Exibir os últimos 30 dias
      const date = new Date();
      date.setDate(today.getDate() - i);
      datesArray.push(date);
    }
    return datesArray;
  };

  // Estado para as datas (apenas dias até o presente)
  const [dates, setDates] = useState(generatePastDates());

  useEffect(() => {
    // Focar no dia atual quando a tela é aberta
    const todayIndex = 0; // Primeiro dia da lista é o dia atual
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ index: todayIndex, animated: true });
    }, 100);
  }, []);

  const renderItem = ({ item }) => {
    const isSelected = item.getDate() === selectedDate.getDate() && item.getMonth() === selectedDate.getMonth();
    return (
      <TouchableOpacity
        style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
        onPress={() => setSelectedDate(item)}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {item.getDate().toString().padStart(2, '0')}
        </Text>
        <Text style={[styles.monthText, isSelected && styles.selectedDateText]}>
          {item.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  // Função para exibir ou esconder o menu de filtro
  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <View>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={dates}
          renderItem={renderItem}
          keyExtractor={(item) => item.toISOString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          getItemLayout={(data, index) => (
            { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
          )}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />

        {/* Ícone de filtro com fundo amarelo quando ativo */}
        <TouchableOpacity 
          style={[
            styles.filterIconContainer, 
            filterVisible && styles.filterIconActive
          ]} 
          onPress={toggleFilterVisibility}
        >
          <Icon name="filter-outline" size={24} color={filterVisible ? COLORS.black : COLORS.grey} />
        </TouchableOpacity>
      </View>

      {/* Menu de filtro dropdown (em linha) */}
      {filterVisible && (
        <View style={styles.dropdownMenu}>
          <Text style={styles.dropdownTextPeriodo}>Período de tempo:</Text>

            <View style={styles.containerTitle}>
            <TouchableOpacity style={styles.dropdownItem}>
              <Text style={styles.dropdownTextActive}>Diário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItemDisabled} disabled={true}>
              <Text style={styles.dropdownTextDisabled}>Semanal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItemDisabled} disabled={true}>
              <Text style={styles.dropdownTextDisabled}>Mensal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItemDisabled} disabled={true}>
              <Text style={styles.dropdownTextDisabled}>Anual</Text>
            </TouchableOpacity>
            </View>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  dateContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: ITEM_WIDTH, // Definindo uma largura fixa para cada item
  },
  selectedDateContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.black,
  },
  monthText: {
    fontSize: 14,
    color: COLORS.gray,
  },
  selectedDateText: {
    color: COLORS.black,
    fontWeight: '900',
  },
  filterIconContainer: {
    marginRight: 20,
    padding: 10, // Aumentando o padding para o fundo amarelo
    borderRadius: 5, // Deixando o ícone com bordas arredondadas
  },
  filterIconActive: {
    backgroundColor: COLORS.primary, // Fundo amarelo quando o dropdown está ativo
  },
  flatListContent: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  // Estilos para o dropdown menu em linha
  dropdownMenu: {
    paddingVertical: 10,
  },
  containerTitle:{
    flexDirection: 'row',
    width: '100%',
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dropdownItemDisabled: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    opacity: 0.5,
  },
  dropdownTextActive: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  dropdownTextDisabled: {
    color: COLORS.gray,
  },
  // Estilos para o conteúdo abaixo do dropdown
  contentBelow: {
    marginTop: 10,
  },
  textPlaceholder: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
  },
  dropdownTextPeriodo:{
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 20,
  }
});

export default DateCarousel;
