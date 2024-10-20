/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ProgressBar from '../components/ProgressBar';
import BarTop3 from '../../../components/BarTop3'; // Importando o BarTop3
import { COLORS } from '../../../constants'; // Importando as cores definidas
import VarejoIcon from '../../../assets/images/svg/initial/Varejo.svg'; // Importando os ícones
import AlimentosIcon from '../../../assets/images/svg/initial/food.svg';
import ServicosIcon from '../../../assets/images/svg/initial/service.svg';
import FabricacaoIcon from '../../../assets/images/svg/initial/fabrication.svg';

const API_URL_RAMO_ATIVIDADE = 'https://api.celere.top/cad/ramosatividades/';


const subcategories = {
  varejo: 'V',
  servicos: 'S',
  fabricacao: 'F',
  alimentos: 'A',
};

// Função para obter os dados do usuário
const useUserData = (navigation) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          Alert.alert('Erro', 'Dados do usuário não encontrados.');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        Alert.alert('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  return userData;
};

const InitialBranch = ({ navigation }) => {
  const userData = useUserData(navigation);
  const [loading, setLoading] = useState(false);

  // Função para carregar subcategorias e navegar para a tela correta
  const openSubcategoryScreen = async (category) => {
    const tipo = subcategories[category];
  
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL_RAMO_ATIVIDADE}?page_size=100&max_page_size=100&tipo=${tipo}`);
      const subcategoriesData = response.data.data;
  
      // Navegar dinamicamente para a tela correspondente com base na categoria
      const screenName = `${category.charAt(0).toUpperCase() + category.slice(1)}Screen`; // Gera dinamicamente o nome da tela (ex: VarejoScreen, AlimentosScreen)
      
      navigation.navigate(screenName, { subcategories: subcategoriesData, userData });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ramos de atividades. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
        />
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
