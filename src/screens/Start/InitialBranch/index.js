/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ProgressBar from '../components/ProgressBar';
import VarejoIcon from '../../../assets/images/svg/initial/Varejo.svg'; // Importando os ícones
import AlimentosIcon from '../../../assets/images/svg/initial/food.svg';
import ServicosIcon from '../../../assets/images/svg/initial/service.svg';
import FabricacaoIcon from '../../../assets/images/svg/initial/fabrication.svg';
import { API_BASE_URL } from '../../../services/apiConfig';

const subcategories = {
  varejo: 'V',
  servicos: 'S',
  fabricacao: 'F',
  alimentos: 'A',
};

const InitialBranch = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

            // Função para mostrar alertas
            const showAlert = (title, message) => {
              Alert.alert(title, message);
            };
      
          // Função para buscar o ID da empresa logada
          const getEmpresaId = useCallback(async () => {
            try {
              const storedEmpresaId = await AsyncStorage.getItem('empresaId');
              if (storedEmpresaId) {
                return Number(storedEmpresaId); // Converte para número se estiver como string
              } else {
                showAlert('Erro', 'ID da empresa não encontrado.');
                return null;
              }
            } catch (error) {
              console.error('Erro ao buscar o ID da empresa:', error);
              return null;
            }
          }, []);

  // Função para carregar subcategorias e navegar para a tela correta
  const openSubcategoryScreen = async (category) => {
    const tipo = subcategories[category];
    
    try {
      setLoading(true);
  
      // Obtendo o ID da empresa logada
      const empresaId = await getEmpresaId();
      console.log("ID empresa", empresaId);
      if (!empresaId) {
        Alert.alert('Erro', 'ID da empresa não encontrado. Tente novamente.');
        return;
      }
  
      const response = await axios.get(`${API_BASE_URL}/cad/ramosatividades/?page_size=100&max_page_size=100&tipo=${tipo}`);
      const subcategoriesData = response.data.data;
  
      // Navegar dinamicamente para a tela correspondente com base na categoria
      const screenName = `${category.charAt(0).toUpperCase() + category.slice(1)}Screen`;
  
      // Passando `empresaId` em vez de `userData`
      navigation.navigate(screenName, { subcategories: subcategoriesData, empresaId });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ramos de atividades. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>

      </View>

      <ProgressBar currentStep={4} totalSteps={4} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ramo de atividade predominante</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => openSubcategoryScreen('varejo')}
            disabled={loading}
          >
            <VarejoIcon width={50} height={50} />
            <Text style={styles.optionText}>Varejo</Text>
            <Text style={styles.optionSubText}>Revenda de produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => openSubcategoryScreen('alimentos')}
            disabled={loading}
          >
            <AlimentosIcon width={50} height={50} />
            <Text style={styles.optionText}>Alimentos</Text>
            <Text style={styles.optionSubText}>Preparo e venda de alimentos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => openSubcategoryScreen('servicos')}
            disabled={loading}
          >
            <ServicosIcon width={50} height={50} />
            <Text style={styles.optionText}>Serviços</Text>
            <Text style={styles.optionSubText}>Serviços prestados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => openSubcategoryScreen('fabricacao')}
            disabled={loading}
          >
            <FabricacaoIcon width={50} height={50} />
            <Text style={styles.optionText}>Fabricação</Text>
            <Text style={styles.optionSubText}>Tipo de fabricação</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#000" style={styles.activityIndicator} />}
      </View>
    </View>
  );
};

export default InitialBranch;
