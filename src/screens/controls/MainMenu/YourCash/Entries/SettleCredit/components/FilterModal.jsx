/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';
import CustomCalendar from '../../../../../../../components/CustomCalendar';

// Função utilitária para formatar valores em reais
const formatCurrency = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// Função utilitária para formatar a data
const formatDate = (date) => {
  if (!date) return 'Data';
  return date.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' });
};

const FilterModal = ({ visible, onClose, onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Função para manipular a alteração no valor e já formatar como moeda
  const handleValorPrestacaoChange = (text) => {
    const cleanValue = text.replace(/[^\d]/g, ''); // Remove tudo que não for número
    setValorPrestacao(formatCurrency(cleanValue / 100)); // Divide por 100 para ajustar os centavos
  };

// Função para manipular a seleção de data no FilterModal
const handleDayPress = (day) => {
  // Extrai o ano, mês e dia selecionados
  const [year, month, dayOfMonth] = day.dateString.split('-');
  // Cria um novo objeto Date com os valores corretos
  const selectedDate = new Date(year, month - 1, dayOfMonth);
  
  setSelectedDate(selectedDate); // Armazena a data selecionada corretamente
  setShowCalendar(false); // Fecha o calendário após a seleção
};

  // Função para aplicar o filtro
  const applyFilter = () => {
    onFilter({ searchText, valorPrestacao, selectedDate });
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
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

          {/* Campo de valor da prestação formatado */}
          <TextInput
            style={styles.input}
            placeholder="Valor"
            value={valorPrestacao}
            onChangeText={handleValorPrestacaoChange}
            keyboardType="numeric"
          />

          {/* Campo de data */}
          <TouchableOpacity style={styles.input2} onPress={() => setShowCalendar(true)}>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            <Icon name="calendar" size={24} color="gray" />
          </TouchableOpacity>

          {/* CustomCalendar para selecionar a data */}
          <CustomCalendar
            visible={showCalendar}
            onClose={() => setShowCalendar(false)}
            onDayPress={handleDayPress}
          />

          {/* Botão de filtrar */}
          <TouchableOpacity style={styles.filterButton} onPress={applyFilter}>
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
