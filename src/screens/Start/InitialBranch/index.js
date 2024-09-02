/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, Animated, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ProgressBar from '../components/ProgressBar';
import BarTop3 from '../../../components/BarTop3'; // Importando o BarTop3
import CustomModal from './components/CustomModal'; // Importando o CustomModal
import { COLORS } from '../../../constants'; // Importando as cores definidas
import VarejoIcon from '../../../assets/images/svg/initial/Varejo.svg'; // Importando os ícones
import AlimentosIcon from '../../../assets/images/svg/initial/food.svg';
import ServicosIcon from '../../../assets/images/svg/initial/service.svg';
import FabricacaoIcon from '../../../assets/images/svg/initial/fabrication.svg';

const API_URL_RAMO_ATIVIDADE = 'https://api.celereapp.com.br/cad/ramosatividades/';
const API_URL_ASSOCIAR_RAMO = 'https://api.celereapp.com.br/cad/associar_ramo_atividade/';

const subcategories = {
  varejo: 'V',
  servicos: 'S',
  fabricacao: 'F',
  alimentos: 'A',
};

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
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        Alert.alert('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  return userData;
};

const InitialBranch = ({ navigation }) => {
  const userData = useUserData(navigation);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);

  const openModal = async (category) => {
    setSelectedCategory(category);
    const tipo = subcategories[category];

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL_RAMO_ATIVIDADE}?page_size=100&max_page_size=100&tipo=${tipo}`);
      setCurrentSubcategories(response.data.data);
      setModalVisible(true);

      // Animação de entrada
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ramos de atividades. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    // Animação de saída
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleSave = async () => {
    if (!selectedSubcategory) {
      Alert.alert('Atenção', 'Por favor, selecione um ramo de atividade antes de prosseguir.');
      return;
    }
  
    if (!userData || !userData.id) {
      Alert.alert('Erro', 'Dados do usuário não carregados. Tente novamente.');
      return;
    }
  
    try {
      setLoading(true);
  
      // Log para verificar os dados que estão sendo enviados
      console.log('Dados enviados para a API:', {
        empresa_id: userData.id,
        ramo_atividade_id: selectedSubcategory,
      });
  
      const response = await axios.post(
        API_URL_ASSOCIAR_RAMO,
        {
          empresa_id: userData.id,
          ramo_atividade_id: selectedSubcategory,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Adicionando o cabeçalho Content-Type
          },
        }
      );
  
      console.log('API Response:', response.data);
  
      if (response.status >= 200 && response.status < 300 && response.data.status && response.data.status.toLowerCase() === 'success') {
        navigation.navigate('MainTab'); // Navegação direta em caso de sucesso
      } else {
        console.log('Unexpected response:', response.data);
        Alert.alert("Erro", response.data.message || 'Erro ao salvar o ramo de atividade. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      if (error.response) {
        // Mostrar mensagem de erro mais detalhada do servidor, se disponível
        console.log('Erro na resposta da API:', error.response.data);
        Alert.alert("Erro", error.response.data.message || 'Erro ao conectar à API.');
      } else {
        Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  
    closeModal();
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ProgressBar currentStep={4} totalSteps={4} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Ramo de atividade predominante</Text>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedCategory === 'varejo' && styles.optionSelected,
            ]}
            onPress={() => openModal('varejo')}
            disabled={loading}
          >
            <VarejoIcon width={50} height={50} />
            <Text style={styles.optionText}>Varejo</Text>
            <Text style={styles.optionSubText}>Revenda de produtos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedCategory === 'alimentos' && styles.optionSelected,
            ]}
            onPress={() => openModal('alimentos')}
            disabled={loading}
          >
            <AlimentosIcon width={50} height={50} />
            <Text style={styles.optionText}>Alimentos</Text>
            <Text style={styles.optionSubText}>Preparo e venda de alimentos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedCategory === 'servicos' && styles.optionSelected,
            ]}
            onPress={() => openModal('servicos')}
            disabled={loading}
          >
            <ServicosIcon width={50} height={50} />
            <Text style={styles.optionText}>Serviços</Text>
            <Text style={styles.optionSubText}>Serviços prestados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedCategory === 'fabricacao' && styles.optionSelected,
            ]}
            onPress={() => openModal('fabricacao')}
            disabled={loading}
          >
            <FabricacaoIcon width={50} height={50} />
            <Text style={styles.optionText}>Fabricação</Text>
            <Text style={styles.optionSubText}>Tipo de fabricação</Text>
          </TouchableOpacity>
        </View>

        {loading && <ActivityIndicator size="large" color="#000" style={styles.activityIndicator} />}

        <CustomModal
          visible={modalVisible}
          fadeAnim={fadeAnim}
          subcategories={currentSubcategories}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          onClose={closeModal}
          onSave={handleSave}
        />
      </View>
    </View>
  );
};

export default InitialBranch;
