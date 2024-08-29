/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles';

const SearchBar = ({ searchDate, setSearchDate, searchValue, setSearchValue, onSearch }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Data da despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Ano (ex: 2024)"
        value={searchDate}
        onChangeText={setSearchDate}
      />
      <Text style={styles.label}>Valor da despesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Valor da despesa"
        value={searchValue}
        onChangeText={setSearchValue}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <Text style={styles.searchButtonText}>Pesquisar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
