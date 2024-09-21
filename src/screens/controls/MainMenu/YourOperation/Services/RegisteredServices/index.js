/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const RegisteredServices = ({ navigation }) => {

    // Estado para os filtros
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [value, setValue] = useState('');
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Dados fictícios dos serviços
  const services = [
    { id: '1', name: 'Troca de Tela', price: 300, image: require('../../../../../../assets/images/png/trocacelular.png'), type: 'Serviço livre' },
    { id: '2', name: 'Formatação de aparelho', price: 120, image: require('../../../../../../assets/images/png/formaçaoaparelho.png'), type: 'Serviço livre' },
  ];

  const categories = [
    { id: '1', name: 'Categoria 1' },
    { id: '2', name: 'Categoria 2' },
    { id: '3', name: 'Categoria 3' },
  ];

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setIsDropdownVisible(false);
  };

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Serviços registrados</Text>
        <Text style={styles.subtitle}>Veja e cadastre serviços que sua empresa opera.</Text>

        {/* Campo de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise um serviço..."
          />
          <Icon name="search" size={20} color={COLORS.gray} />
          <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
            <Icon name="filter" size={20} color={COLORS.black} />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Serviços */}
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.serviceCard}>
              <Image source={item.image} style={styles.serviceImage} />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{item.name}</Text>
                <Text style={styles.serviceType}>{item.type}</Text>
              </View>
              <Text style={styles.servicePrice}>R${item.price.toFixed(2)}</Text>
            </View>
          )}
          style={styles.serviceList}
        />

        {/* Botão Cadastrar Novo Serviço */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddService')}>
          <Icon name="add" size={25} color={COLORS.black} />
          <Text style={styles.addButtonText}>Cadastrar novo serviço</Text>
        </TouchableOpacity>


        {/* Modal de filtro */}
        <Modal
          visible={filterModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeFilterModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filtre por data, categoria, valor ou todos.</Text>
                <TouchableOpacity onPress={closeFilterModal}>
                  <Icon name="close" size={30} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              {/* Campo de Data */}
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showDatePicker}
              >
                <Text style={styles.input}>
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Data'}
                </Text>
                <Icon name="calendar" size={20} color={COLORS.grey} />
              </TouchableOpacity>

              {/* Date Picker Modal */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              {/* Campo de Categoria com Dropdown */}
              <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
                  <Text style={styles.input}>
                    {selectedCategory ? selectedCategory.name : 'Categoria'}
                  </Text>
                  <Icon name={isDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              {/* Lista de categorias */}
              {isDropdownVisible && (
                <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
                  <ScrollView nestedScrollEnabled={true}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category.id}
                        style={styles.dropdownItem}
                        onPress={() => selectCategory(category)}
                      >
                        <Text style={styles.dropdownItemText}>{category.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Campo de Valor */}
              <View style={styles.inputContainer2}>
                <TextInput
                  style={styles.input}
                  placeholder="Valor"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={setValue}
                />
              </View>

              {/* Botão Filtrar */}
              <TouchableOpacity style={styles.modalFilterButton} onPress={closeFilterModal}>
                <Icon name="filter" size={20} color={COLORS.black} />
                <Text style={styles.modalFilterButtonText}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RegisteredServices;
