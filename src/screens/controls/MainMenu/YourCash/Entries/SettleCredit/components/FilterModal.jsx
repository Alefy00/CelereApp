/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Biblioteca para o seletor de data
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';
import CustomCalendar from '../../../../../../../components/CustomCalendar';

const FilterModal = ({ visible, onClose, onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar o calendário
  const [showCalendar, setShowCalendar] = useState(false);

  // Função para abrir o seletor de data
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || null;
    setShowDatePicker(false); // Fecha o seletor de data após a escolha
    setSelectedDate(currentDate); // Atualiza a data selecionada
  };

  // Função para formatar a data selecionada
  const formatDate = (date) => {
    if (!date) return 'Data';
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('pt-BR', options); // Formato brasileiro
  };
  const handleShowCalendar = () => {
    setShowCalendar(true);
  };

  // Função para manipular a seleção de data no CustomCalendar
  const handleDayPress = (day) => {
    const selectedDate = new Date(day.dateString);
    setSelectedDate(selectedDate);
    setShowCalendar(false); // Fecha o calendário após a seleção
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close-outline" size={30} color="black" />
          </TouchableOpacity>

          {/* Campo de pesquisa por nome */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise um nome..."
              value={searchText}
              onChangeText={setSearchText}
            />
            <Icon name="search-outline" size={24} color="gray" />
          </View>

          {/* Campo de valor da prestação */}
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={valorPrestacao}
            onChangeText={setValorPrestacao}
            keyboardType="numeric"
          />

          {/* Campo de data que abre o seletor de data */}
          <TouchableOpacity style={styles.input2} onPress={handleShowCalendar}>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            <Icon name="calendar" size={24} color="gray" />
          </TouchableOpacity>

          {/* Exibe o CustomCalendar quando necessário */}
          <CustomCalendar
            visible={showCalendar}
            onClose={() => setShowCalendar(false)}
            onDayPress={handleDayPress}
          />
          {/* Botão de filtrar */}
          <TouchableOpacity style={styles.filterButton} onPress={onFilter}>
            <Icon name="filter-outline" size={24} color="black" />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  input2: {
    width: '100%',
    height: 40,
    borderColor: COLORS.black,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  dateText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  filterButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    marginLeft: 5,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default FilterModal;
