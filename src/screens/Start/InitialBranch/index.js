/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Alert, Animated, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import ProgressBar from '../components/ProgressBar';
import CustomModal from './components/CustomModal';


const API_URL_RAMO_ATIVIDADE = 'https://api.celereapp.com.br/cad/ramosatividades/';
const API_URL_ASSOCIAR_RAMO = 'https://api.celereapp.com.br/cad/associar_ramo_atividade/';

const subcategories = {
  varejo: 'V',
  servicos: 'S',
  fabricacao: 'F',
};

// Hook personalizado para carregar dados do usuário
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
      const response = await axios.post(API_URL_ASSOCIAR_RAMO, {
        empresa_id: userData.id,
        ramo_atividade_id: selectedSubcategory,
      });
    
      console.log('API Response:', response.data);
    
      // Verifica se o status HTTP é 200 e se a resposta contém "success" no campo "status"
      if (response.status >= 200 && response.status < 300 && response.data.status && response.data.status.toLowerCase() === 'success') {
        Alert.alert('Sucesso', 'Ramo de atividade associado com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('Start') }
        ]);
      } else {
        console.log('Unexpected response:', response.data);
        Alert.alert("Erro", response.data.message || 'Erro ao salvar o ramo de atividade. Tente novamente.');
      }
    } catch (error) {
      console.error("Erro ao conectar à API:", error);
      Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
    

    closeModal();
  };

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={4} totalSteps={4} />
      <Text style={styles.label}>Qual seu ramo de atuação?</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'varejo' && styles.optionSelected,
        ]}
        onPress={() => openModal('varejo')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Varejo</Text>
        <Text style={styles.optionSubText}>Revenda de produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'servicos' && styles.optionSelected,
        ]}
        onPress={() => openModal('servicos')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'fabricacao' && styles.optionSelected,
        ]}
        onPress={() => openModal('fabricacao')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Fabricação / Produção</Text>
      </TouchableOpacity>

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
  );
};

export default InitialBranch;
