/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList, Alert } from 'react-native';
import axios from 'axios';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import IndustriaIcon from '../../../../assets/images/svg/InitialBranch/IndustriaIcon.svg';
import PaesIcon from '../../../../assets/images/svg/InitialBranch/PaesIcon.svg';
import ArtesenatoIcon from '../../../../assets/images/svg/InitialBranch/ArtesanatoIcon.svg';
import Outros from '../../../../assets/images/svg/InitialBranch/Outros.svg';
import { API_BASE_URL } from '../../../../services/apiConfig';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para exibir alertas
const showAlert = (title, message) => {
  Alert.alert(title, message);
};

const FabricacaoScreen = ({ route, navigation }) => {
  const { subcategories } = route.params;
  const [loading, setLoading] = useState(false);

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

  const iconMapping = {
    'Indústria': <IndustriaIcon width={50} height={50} />,
    'Pães, bolos, doces ou outros': <PaesIcon width={50} height={50} />,
    'Artesanatos': <ArtesenatoIcon width={50} height={50} />,
    'Alumínio': <Outros width={50} height={50} />,
  };

  const handleSubcategorySelect = async (subcategoryId) => {
    const empresaId = await getEmpresaId(); // Obtendo o ID da empresa logada
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não encontrado. Tente novamente.');
      return;
    }

    try {
      setLoading(true);

      // Enviando a requisição para associar o ramo de atividade
      const response = await axios.post(
        `${API_BASE_URL}/cad/associar_ramo_atividade/`,
        {
          empresa_id: empresaId,
          ramo_atividade_id: subcategoryId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const responseData = response.data;
      if (response.status === 201 && responseData.status === 'success' && responseData.data) {
        Alert.alert('Sucesso', responseData.message || 'Ramo de atividade associado com sucesso!');
        navigation.navigate('MainTab');
      } else {
        console.log('Resposta inesperada:', responseData);
        Alert.alert("Erro", responseData.message || 'Erro ao salvar o ramo de atividade. Tente novamente.');
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

  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.option}
      onPress={() => handleSubcategorySelect(item.id)}
    >
      {iconMapping[item.nome] || <Outros width={50} height={50} />}
      <Text style={styles.optionText}>{item.nome}</Text>
    </TouchableOpacity>
  );

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

      <Text style={styles.title}>Fabricação</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={subcategories}
          renderItem={renderSubcategoryItem}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
        />
      )}
    </View>
  );
};

export default FabricacaoScreen;
