/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ícone para o dropdown
import styles from '../styles';
import { COLORS } from '../../../../../../../constants';

const SupplierDropdown = ({ suppliers, onSelectSupplier, selectedSupplier, navigation }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleIncludeSupplier = () => {
        navigation.navigate('IncludeSupplier');
      };

  // Alterna a visibilidade do dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <View style={styles.recurrenceContainer}>
      {/* Dropdown de Fornecedores */}
      <View style={styles.containerSupplier}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>
          {selectedSupplier ? selectedSupplier.label : 'Selecione um Fornecedor...'}
        </Text>
        <Icon name={dropdownOpen ? 'arrow-up' : 'arrow-down'} size={22} color={COLORS.gray} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton2} onPress={handleIncludeSupplier}>
        <Icon name="add" size={30} color={COLORS.black} />
      </TouchableOpacity>
      </View>

      {dropdownOpen && (
        <View style={styles.dropdownContainer}>
          {suppliers.map((supplier, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => {
                onSelectSupplier(supplier);  // Função para selecionar o fornecedor
                setDropdownOpen(false);  // Fecha o dropdown
              }}
            >
              <Text style={styles.dropdownItemText}>{supplier.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SupplierDropdown;
