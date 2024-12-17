/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState,forwardRef  } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants';
import moment from 'moment-timezone';

const ITEM_WIDTH = 70; // Definindo uma largura fixa para cada item

const DateCarousel = forwardRef(({ onDateSelected }, ref) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterVisible, setFilterVisible] = useState(false);
  const flatListRef = useRef(null);
  const [initialized, setInitialized] = useState(false); 

  // Gera as datas como strings formatadas no timezone de Brasília
  const generatePastDates = () => {
    const today = moment().tz('America/Sao_Paulo');
    const datesArray = [];
    for (let i = 0; i < 30; i++) {
      const date = today.clone().subtract(i, 'days').format('YYYY-MM-DD');
      datesArray.push(date);
    }
    return datesArray;
  };


  
  const [dates, setDates] = useState(generatePastDates());

  useEffect(() => {
    if (!initialized) {
      const todayIndex = 0;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: todayIndex, animated: true });
      }, 100);
  
      // Define apenas a data visualmente ao montar o componente
      setSelectedDate(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD'));
      setInitialized(true); // Marca como inicializado
    }
  }, [initialized]);

  const renderItem = ({ item }) => {
    const isSelected = item === selectedDate;
    return (
      <TouchableOpacity
        style={[styles.dateContainer, isSelected && styles.selectedDateContainer]}
        onPress={() => {
          setSelectedDate(item);
          onDateSelected(item, item); // Passa a data como string formatada
        }}
      >
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
        {moment(item).tz('America/Sao_Paulo').date().toString().padStart(2, '0')}
        </Text>
        <Text style={[styles.monthText, isSelected && styles.selectedDateText]}>
          {moment(item).tz('America/Sao_Paulo').format('MMM').toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleFilterVisibility = () => {
    setFilterVisible(!filterVisible);
  };

  return (
    <View ref={ref}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={dates}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          horizontal
          inverted
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          getItemLayout={(data, index) => ({ length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index })}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
            });
          }}
        />

        <TouchableOpacity 
          style={[styles.filterIconContainer, filterVisible && styles.filterIconActive]} 
          onPress={toggleFilterVisibility}
        >
          <Icon name="filter-outline" size={24} color={filterVisible ? COLORS.black : COLORS.grey} />
        </TouchableOpacity>
      </View>

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
});

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
