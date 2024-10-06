/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { COLORS } from '../constants';
import { format } from 'date-fns'; // Usando a date-fns para formatar a data
import ptBR from 'date-fns/locale/pt-BR'; // Importando o local para português

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  // Converte a data selecionada para o formato YYYY-MM-DD
  const initialDate = selectedDate
    ? format(new Date(selectedDate), 'yyyy-MM-dd')
    : format(new Date(), 'yyyy-MM-dd');

  const [date, setDate] = useState(initialDate);

  const handleDayPress = (day) => {
    setDate(day.dateString);
    if (onDateChange) {
      onDateChange(day.dateString); // Passa a data selecionada para o componente pai
    }
  };

  return (
    <View>
      {/* Formata a data para exibição no formato desejado */}
      <Text style={{ fontSize: 16, marginBottom: 10, color: COLORS.primary }}>
        Data selecionada: {format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </Text>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [date]: { selected: true, selectedColor: COLORS.primary },
        }}
        theme={{
          selectedDayBackgroundColor: COLORS.primary,
          todayTextColor: COLORS.secondary,
          arrowColor: COLORS.primary,
        }}
        // Define a data inicial selecionada no calendário
        initialDate={date}
      />
    </View>
  );
};

export default CustomCalendar;
