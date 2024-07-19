/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import 'moment/locale/pt-br';

const DatePicker = ({ label, onConfirm }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); 
  const [date, setDate] = useState(null);

  // Função para mostrar o seletor de data
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Função para esconder o seletor de data
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Função para confirmar a data selecionada
  const handleConfirm = (selectedDate) => {
    setDate(selectedDate); // Atualiza o estado com a data selecionada
    onConfirm(selectedDate); // Chama a função de callback passando a data selecionada
    hideDatePicker(); // Esconde o seletor de data
  };

  return (
    <View>
      <Text>{label}</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
        <Text style={styles.datePickerText}>
          {date ? moment(date).locale('pt-br').format('LL') : "Selecionar data"} 
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible} // Controla a visibilidade do seletor de data
        mode="date" // Define o modo do seletor como data
        onConfirm={handleConfirm} // Função chamada ao confirmar a data
        onCancel={hideDatePicker} // Função chamada ao cancelar a seleção
        locale="pt-BR" // Define o idioma como português do Brasil
      />
    </View>
  );
};

// Estilos para o componente
const styles = StyleSheet.create({
  datePickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  datePickerText: {
    color: '#000',
  },
});

export default DatePicker;
