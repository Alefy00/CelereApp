/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles'; // Certifique-se de ajustar o arquivo de estilos
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import RestauranteIcon from '../../../../assets/images/svg/InitialBranch/RestauranteIcon.svg';
import DeliveryIcon from '../../../../assets/images/svg/InitialBranch/DeliveryIcon.svg';
import FoodTruckIcon from '../../../../assets/images/svg/InitialBranch/FoodTruckIcon.svg';
import HomeIcon from '../../../../assets/images/svg/InitialBranch/HomeIcon.svg';
import { API_BASE_URL } from '../../../../services/apiConfig';

const AlimentosScreen = ({ route, navigation }) => {
  const { subcategories, userData } = route.params;
  const [loading, setLoading] = useState(false);

  // Mapeamento de ícones dinâmicos com base no nome da subcategoria
  const iconMapping = {
    'Restaurante': <RestauranteIcon width={50} height={50} />,
    'Delivery': <DeliveryIcon width={50} height={50} />,
    'Comida de rua': <FoodTruckIcon width={50} height={50} />,
    'Em casa': <HomeIcon width={50} height={50} />,
  };

  // Função para associar o ramo de atividade ao clicar em uma subcategoria
  const handleSubcategorySelect = async (subcategoryId) => {
    if (!userData || !userData.id) {
      Alert.alert('Erro', 'Dados do usuário não carregados. Tente novamente.');
      return;
    }

    try {
      setLoading(true);
      
      // Enviando a requisição para associar o ramo de atividade
      const response = await axios.post(
        `${API_BASE_URL}/cad/associar_ramo_atividade/`,
        {
          empresa_id: userData.id,
          ramo_atividade_id: subcategoryId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status >= 200 && response.status < 300 && response.data.status && response.data.status.toLowerCase() === 'success') {
        // Navegar para a MainTab em caso de sucesso
        navigation.navigate('MainTab');
      } else {
        console.log('Resposta inesperada:', response.data);
        Alert.alert("Erro", response.data.message || 'Erro ao salvar o ramo de atividade. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error);
      if (error.response) {
        console.log('Erro na resposta da API:', error.response.data);
        Alert.alert("Erro", error.response.data.message || 'Erro ao conectar à API.');
      } else {
        Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderSubcategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.option}
        onPress={() => handleSubcategorySelect(item.id)} // Chamando a função ao clicar
      >
        {/* Mapeando dinamicamente os ícones com base no nome da subcategoria */}
        {iconMapping[item.nome] || <RestauranteIcon width={50} height={50} />} 
        <Text style={styles.optionText}>{item.nome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>
        <BarTop3
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          style={styles.barTop}
        />
      </View>

      <Text style={styles.title}>Alimentos</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={subcategories} // As subcategorias virão dinamicamente da API
          renderItem={renderSubcategoryItem}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </View>
  );
};

export default AlimentosScreen;
