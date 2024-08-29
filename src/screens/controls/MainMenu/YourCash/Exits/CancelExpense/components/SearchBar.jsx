/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date('2030-09-23'));
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [allDates, setAllDates] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleSearch = () => {
    if (allDates) {
      // Pesquisa sem restrição de data
      onSearch('1900-01-01', '2100-12-31', searchValue);
    } else {
      // Verificação para garantir que startDate e endDate são válidos
      if (startDate && endDate && startDate <= endDate) {
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        onSearch(formattedStartDate, formattedEndDate, searchValue);
      } else {
        Alert.alert('Erro', 'Datas inválidas. Por favor, selecione um intervalo de datas válido.');
      }
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Todas as Datas</Text>
        <Switch
          value={allDates}
          onValueChange={(value) => setAllDates(value)}
        />
      </View>

      {!allDates && (
        <>
          <Text style={styles.label}>Data Inicial</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartDatePicker(true)}>
            <Text style={styles.textDate}>{startDate.toLocaleDateString()}</Text>
            <Icon name="calendar-outline" size={20} color="#000" />
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
              maximumDate={endDate}
              locale="pt-BR"
            />
          )}

          <Text style={styles.label}>Data Final</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndDatePicker(true)}>
            <Text style={styles.textDate}>{endDate.toLocaleDateString()}</Text>
            <Icon name="calendar-outline" size={20} color="#000" />
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
              minimumDate={startDate}
              locale="pt-BR"
            />
          )}
        </>
      )}

      <Text style={styles.label}>Valor da Despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={searchValue}
        onChangeText={setSearchValue}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  textDate: {
    fontSize: 16,
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchBar;
