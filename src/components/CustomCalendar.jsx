/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

// Configurando o calendário para exibir em português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

const CustomCalendar = ({ visible, onClose, onDayPress }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Atualiza a data exibida no calendário
  const getCurrentDate = () => `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString + 'T12:00:00');
    const formattedDate = selectedDate.toISOString().split('T')[0];

    setSelectedDate(day.dateString);
    onDayPress({ dateString: formattedDate });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.calendarContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <View style={styles.navigationContainer}>
            <Picker
              selectedValue={currentMonth}
              style={styles.picker}
              onValueChange={(itemValue) => setCurrentMonth(itemValue)}>
              {Array.from({ length: 12 }, (_, i) => (
                <Picker.Item label={LocaleConfig.locales['pt-br'].monthNames[i]} value={i + 1} key={i} />
              ))}
            </Picker>

            <Picker
              selectedValue={currentYear}
              style={styles.picker}
              onValueChange={(itemValue) => setCurrentYear(itemValue)}>
              {Array.from({ length: 75 }, (_, i) => {
                const year = 1950 + i;
                return (
                  <Picker.Item label={`${year}`} value={year} key={i} />
                );
              })}
            </Picker>

          </View>

          <Calendar
            key={getCurrentDate()} // Força a re-renderização quando a data muda
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: COLORS.primary },
            }}
            current={getCurrentDate()} // Atualiza a exibição do calendário
            theme={styles.calendarTheme}
            renderHeader={() => null}
            hideArrows={true}
            firstDay={1}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  calendarTheme: {
    backgroundColor: COLORS.white,
    calendarBackground: COLORS.white,
    textSectionTitleColor: COLORS.black,
    selectedDayBackgroundColor: COLORS.primary,
    selectedDayTextColor: COLORS.white,
    todayTextColor: COLORS.primary,
    dayTextColor: COLORS.black,
    arrowColor: COLORS.black,
    monthTextColor: COLORS.black,
    textDayFontFamily: 'Arial',
    textMonthFontFamily: 'Arial',
    textDayHeaderFontFamily: 'Arial',
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 16,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 14,
  },
});

export default CustomCalendar;
