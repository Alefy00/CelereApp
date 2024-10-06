/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop2 from '../../../../components/BarTop2';
import { COLORS } from '../../../../constants';

const ConsultClient = ({ navigation }) => {

    const handleIncludeNew = () => {
        navigation.navigate("IncludeClient");
    };

    const [search, setSearch] = useState('');
    const [clients, setClients] = useState([
      { id: '1', name: 'Rodrigo Silva (você)', avatar: 'https://via.placeholder.com/40', isCurrentUser: true },
      { id: '2', name: 'Letícia de Souza', avatar: 'https://via.placeholder.com/40', isCurrentUser: false },
      // Adicione mais clientes fictícios para testar o scroll
      { id: '3', name: 'Carlos Alberto', avatar: 'https://via.placeholder.com/40', isCurrentUser: false },
      { id: '4', name: 'Ana Pereira', avatar: 'https://via.placeholder.com/40', isCurrentUser: false },
      { id: '5', name: 'Maria João', avatar: 'https://via.placeholder.com/40', isCurrentUser: false },
      { id: '6', name: 'José da Silva', avatar: 'https://via.placeholder.com/40', isCurrentUser: false },
    ]);
  
    const filteredClients = clients.filter(client => 
      client.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const renderClient = ({ item }) => (
      <View style={styles.clientContainer}>
        <View style={styles.clientInfo}>
          <View style={styles.avatarContainer}>
            <Icon name="person-circle" size={40} color={COLORS.gray} />
          </View>
          <Text style={styles.clientName}>{item.name}</Text>
        </View>
      </View>
    );
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerBase}>
          <View style={styles.containerBartop}>
            <BarTop2
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
  
          <View style={styles.container}>
            <Text style={styles.title}>Clientes</Text>
            <Text style={styles.subtitle}>Aqui estão todos os clientes registrados no momento.</Text>
  
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise um cliente..."
                placeholderTextColor={COLORS.gray}
                value={search}
                onChangeText={setSearch}
              />
              <Icon name="search" size={24} color={COLORS.gray} />
            </View>
  
            {/* Lista de clientes com rolagem */}
            <View style={styles.clientListContainer}>
              <FlatList
                data={filteredClients}
                renderItem={renderClient}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            </View>
  
            {/* Botão de adicionar clientes */}
            <TouchableOpacity style={styles.addButton} onPress={handleIncludeNew}>
              <Icon name="add" size={24} color="black" />
              <Text style={styles.addButtonText}>Adicionar clientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  

export default ConsultClient;
