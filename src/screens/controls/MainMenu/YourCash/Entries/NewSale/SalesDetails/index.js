/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import { KeyboardAvoidingView, Platform, View, TouchableOpacity, Text, Alert, ScrollView } from "react-native";
import LiquidateNow from './components/LiquidateNow'; // Importando o componente para liquidar
import styles from "./styles";
import ReceivableDetails from "./components/ReceivableDetails";
import axios from "axios";  // Biblioteca para requisição HTTP
import AsyncStorage from "@react-native-async-storage/async-storage";  // Para acessar o ID da empresa
import { useFocusEffect } from '@react-navigation/native';  // Para recarregar a lista quando a tela ganha foco

const API_URL = 'https://api.celere.top/cad/cliente/';  // URL da API

const SaleDetails = ({ navigation, route }) => {
  const { products, totalPrice, clearCart } = route.params;
  const [viewMode, setViewMode] = useState('Liquidar agora');
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

  const toggleViewMode = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  useEffect(() => {
    // Defina a função clearCart nas opções de navegação
    navigation.setOptions({
      clearCart: clearCart, // Defina clearCart nas opções
    });
  }, [navigation, clearCart]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={{ flex: 1 }}>
        {/* Barra superior */}
        <View style={{ height: 55 }}>
          <BarTop2
            titulo={'Voltar'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
        </View>

        {/* Botões de alternância */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'Liquidar agora' && styles.activeButton]}
            onPress={() => toggleViewMode('Liquidar agora')}
          >
            <Text style={viewMode === 'Liquidar agora' ? styles.activeButtonText : styles.inactiveButtonText}>
              Liquidar agora
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'Contas a receber' && styles.activeButton]}
            onPress={() => toggleViewMode('Contas a receber')}
          >
            <Text style={viewMode === 'Contas a receber' ? styles.activeButtonText : styles.inactiveButtonText}>
              Contas a receber
            </Text>
          </TouchableOpacity>
        </View>

        {/* Renderizando o conteúdo da aba selecionada */}
        {viewMode === 'Liquidar agora' && (
          <LiquidateNow
            products={products}
            totalPrice={totalPrice}
            clients={clients}  // Passa os clientes reais
            navigation={navigation}
            loading={loading}  // Passa o estado de carregamento
            clearCart={clearCart}  // Passe clearCart aqui
          />
        )}

        {viewMode === 'Contas a receber' && (
          <ReceivableDetails
            products={products}
            totalPrice={totalPrice}
            clients={clients}  // Passa os clientes reais
            navigation={navigation}
            loading={loading}  // Passa o estado de carregamento
            clearCart={clearCart}  // Passe clearCart aqui
          />
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SaleDetails;
