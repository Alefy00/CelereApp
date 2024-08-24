/* eslint-disable prettier/prettier */
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePickerModal from './DatePickerModal';
import styles from '../styles';

const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 5; // 5 dias visíveis por vez

const DatePicker = ({ dates, selectedDateIndex, onDateSelect }) => {
  const scrollViewRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: selectedDateIndex * DAY_WIDTH - (DAY_WIDTH * 2), animated: true });
    }
  }, [selectedDateIndex]);

  const handleFilterPress = () => {
    setModalVisible(true);
  };

  const handleMonthSelect = (selectedMonth) => {
    setMonth(selectedMonth);
    const updatedDates = getDaysInMonth(selectedMonth, year);
    onDateSelect(updatedDates[0], 0); // Seleciona o primeiro dia do mês
    setModalVisible(false);
  };

  const getDaysInMonth = (month, year) => {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push({
        day: date.getDate().toString().padStart(2, '0'),
        month: date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase(),
        isSelected: false,
        isToday: date.getDate() === new Date().getDate() &&
                  date.getMonth() === new Date().getMonth() &&
                  date.getFullYear() === new Date().getFullYear(),
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  return (
    <View style={styles.datePickerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        scrollEventThrottle={16}
        overScrollMode="never"
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateContainer,
              date.isSelected && styles.selectedDate,
              date.isToday && styles.todayDate,
            ]}
            onPress={() => onDateSelect(date, index)}
            activeOpacity={1}
          >
            <Text style={[styles.dateText, date.isSelected && styles.selectedDateText]}>
              {date.day}
            </Text>
            <Text style={[styles.monthText, date.isSelected && styles.selectedMonthText]}>
              {date.month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={handleFilterPress} style={styles.filterButton}>
        <Icon name="filter-outline" size={24} color="#000" />
      </TouchableOpacity>

      <DatePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onMonthSelect={handleMonthSelect}
      />
    </View>
  );
};

export default DatePicker;
