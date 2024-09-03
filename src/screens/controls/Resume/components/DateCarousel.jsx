/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants';

const ITEM_WIDTH = 70; // Definindo uma largura fixa para cada item

const DateCarousel = ({ onDateSelected }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthModalVisible, setMonthModalVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Novo estado para o mês selecionado
    const flatListRef = useRef(null);
  
    // Lista de meses em português
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    // Função para gerar as datas com base no mês selecionado
    const generateDates = (month) => {
      const year = new Date().getFullYear(); // Mantendo o ano atual
      const daysInMonth = new Date(year, month + 1, 0).getDate(); // Obtendo o número de dias no mês
      return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
    };
  
    // Estado para as datas com base no mês selecionado
    const [dates, setDates] = useState(generateDates(currentMonth));
  
    useEffect(() => {
      // Focar no dia atual quando a tela é aberta
      const todayIndex = new Date().getDate() - 1;
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: todayIndex, animated: true });
      }, 100);
    }, []);
  
    useEffect(() => {
      // Atualiza as datas sempre que o mês selecionado mudar
      setDates(generateDates(currentMonth));
    }, [currentMonth]);
  
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
            {months[item.getMonth()].substring(0, 3).toUpperCase()}
          </Text>
        </TouchableOpacity>
      );
    };
  
    const handleMonthSelect = (monthIndex) => {
      setCurrentMonth(monthIndex); // Atualiza o mês selecionado
      const newDate = new Date(selectedDate.setMonth(monthIndex));
      setSelectedDate(newDate);
      setMonthModalVisible(false);
    };
  
    return (
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
        <TouchableOpacity style={styles.filterIconContainer} onPress={() => setMonthModalVisible(true)}>
          <Icon name="filter-outline" size={24} color={COLORS.black} />
        </TouchableOpacity>
  
        {/* Modal para seleção de mês */}
        <Modal
          transparent={true}
          visible={monthModalVisible}
          animationType="slide"
          onRequestClose={() => setMonthModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {months.map((month, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.monthOption, 
                      index === currentMonth && styles.selectedMonthOption
                    ]}
                    onPress={() => handleMonthSelect(index)}
                  >
                    <Text style={[
                      styles.monthText, 
                      index === currentMonth && styles.selectedMonthText
                    ]}>
                      {month}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity onPress={() => setMonthModalVisible(false)}>
                <Text style={styles.closeText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    },
    flatListContent: {
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      width: '80%',
      maxHeight: '50%',  // Limitando a altura do modal para permitir a rolagem
    },
    monthOption: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    selectedMonthOption: {
      backgroundColor: COLORS.primary,
      borderRadius: 5,
    },
    selectedMonthText: {
      color: COLORS.black,
      fontWeight: 'bold',
      fontSize:16,
    },
    closeText: {
      color: COLORS.red,
      marginTop: 20,
    },
  });
  
  export default DateCarousel;