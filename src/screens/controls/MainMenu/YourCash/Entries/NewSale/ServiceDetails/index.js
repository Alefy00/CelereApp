/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../../constants';
import LiquidateNow from './components/LiquidateNow';
import AccountsReceivable from './components/AccountsReceivable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://api.celere.top/cad/cliente/';  // URL da API

const ServiceDetails = ({ navigation, route}) => {
  const { services, products = [] } = route.params; // Recebe serviços e produtos via rota
  const clearCart = route.params.clearCart;
  const [activeTab, setActiveTab] = useState('liquidar');
  const [clients, setClients] = useState([]);  // Estado para armazenar os clientes
  const [loading, setLoading] = useState(false);

    // Função para buscar o ID da empresa logada
    const getEmpresaId = async () => {
      try {
        const storedEmpresaId = await AsyncStorage.getItem('empresaId');
        if (storedEmpresaId) {
          return Number(storedEmpresaId); // Converte para número se estiver como string
        } else {
          Alert.alert('Erro', 'ID da empresa não encontrado.');
          return null;
        }
      } catch (error) {
        console.error('Erro ao buscar o ID da empresa:', error);
        return null;
      }
    };
  
// Função para buscar a lista de clientes da API
const fetchClients = useCallback(async () => {
  setLoading(true);  // Exibe o carregamento
  try {
    const empresaId = await getEmpresaId();
    if (empresaId) {
      const response = await axios.get(`${API_URL}?empresa=${empresaId}`);
      if (response.data && response.data.results && response.data.results.data) {
        setClients(response.data.results.data);  // Armazena a lista de clientes no estado
      } else {
        Alert.alert("Erro", "Erro ao recuperar clientes. Tente novamente.");
      }
    }
  } catch (error) {
    console.error("Erro ao buscar clientes: ", error);
    Alert.alert("Erro", "Erro ao conectar à API.");
  } finally {
    setLoading(false);  // Oculta o carregamento
  }
}, []);

  
    // Chamada sempre que a tela ganha foco
    useFocusEffect(
      useCallback(() => {
        fetchClients();  // Faz a requisição de clientes ao ganhar foco
      }, [fetchClients])
    );  
  
  useEffect(() => {
    // Defina a função clearCart nas opções de navegação
    navigation.setOptions({
      clearCart: clearCart, // Defina clearCart nas opções
    });
  }, [navigation, clearCart]);
  
  const service = services[0]; // Acessa o primeiro serviço da lista
  
  // Verifica se há serviços disponíveis
  if (!services || services.length === 0) {
    Alert.alert('Erro', 'Nenhum serviço encontrado.');
    return null; // Não renderiza a tela caso não haja serviços
  }
  return (
    <ScrollView style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      {/* Botão de Alternância */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'liquidar' && styles.activeTab]}
          onPress={() => setActiveTab('liquidar')}
        >
          <Text style={styles.toggleText}>Liquidar agora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'contas' && styles.activeTab]}
          onPress={() => setActiveTab('contas')}
        >
          <Text style={styles.toggleText}>Contas a receber</Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza o componente correspondente */}
      {activeTab === 'liquidar' ? (
        <LiquidateNow 
            service={service}
            products={products}  
            navigation={navigation}
            route={route}
            clients={clients}  // Passa a lista de clientes
            clearCart={clearCart}
          />

      ) : (
        <AccountsReceivable
          service={service}
          products={products}
          navigation={navigation}
          route={route}
          clients={clients}
          clearCart={clearCart}
        />
      )}
    </ScrollView>
  );
};

export default ServiceDetails;
