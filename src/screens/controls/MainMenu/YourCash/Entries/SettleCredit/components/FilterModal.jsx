/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';


const FilterModal = ({ visible, onClose, onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);

  const clients = [
    { id: '1', name: 'Ana Costa' },
    { id: '2', name: 'Beatriz Ferreira' },
    { id: '3', name: 'Gabriel Santos' },
    { id: '4', name: 'Juliana Pereira' },
    { id: '5', name: 'Lucas Silva' },
    { id: '6', name: 'Mariana Souza' }
  ]; // Dados fictícios para os clientes

  // Função para selecionar/deselecionar um cliente
  const toggleClientSelection = (id) => {
    setSelectedClients((prevSelectedClients) => {
      if (prevSelectedClients.includes(id)) {
        return prevSelectedClients.filter((clientId) => clientId !== id);
      } else {
        return [...prevSelectedClients, id];
      }
    });
  };

  // Função para renderizar os clientes na lista
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.clientItem} onPress={() => toggleClientSelection(item.id)}>
      <Icon
        name={selectedClients.includes(item.id) ? 'checkbox' : 'square-outline'}
        size={24}
        color="black"
      />
      <Text style={styles.clientName}>{item.name}</Text>
    </TouchableOpacity>
  );

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
          <Text style={styles.modalTitle}>Filtrar Contas a receber</Text>

          {/* Lista de clientes */}
          <FlatList
            data={clients}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.clientList}
          />

          {/* Campo de pesquisa */}
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
            placeholder="Valor da prestação"
            value={valorPrestacao}
            onChangeText={setValorPrestacao}
            keyboardType="numeric"
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
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.black,
      marginTop:-20,
      marginBottom:20,
    },
    clientList: {
      width: '100%',
      maxHeight: 200, // Limitar altura da lista para caber no modal
      marginBottom: 15,
    },
    clientItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    clientName: {
      marginLeft: 10,
      fontSize: 16,
      color: 'black',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: COLORS.black,
      borderRadius: 8,
      paddingHorizontal: 10,
      width: '100%',
      marginBottom: 15,
      borderBottomWidth:1,
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
      borderBottomWidth:1,
    },
    filterButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
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
