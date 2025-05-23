/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

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

const IncludeCategoryProducts = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal
  const [empresaId, setEmpresaId] = useState(null); // Estado para armazenar o ID da empresa

  // Busca o ID da empresa quando a tela é carregada
  useEffect(() => {
    const fetchEmpresaId = async () => {
      const id = await getEmpresaId();
      setEmpresaId(id); // Armazena o ID da empresa no estado
    };

    fetchEmpresaId();
  }, []);

  const handleConfirm = async () => {
    if (!categoryName) {
      Alert.alert("Erro", "O campo nome da categoria é obrigatório!");
      return;
    }

    if (!empresaId) {
      Alert.alert("Erro", "Não foi possível obter o ID da empresa.");
      return;
    }

    const categoryData = {
      status: true,
      nome: categoryName,
      descricao: null, // Descrição enviada como null
      empresa: empresaId, // Usa o ID da empresa logada
      usuario: 1, // Ajuste conforme necessário
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/mnt/categoriasprodutos/`,
        categoryData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.status === 'success') {
        setIsModalVisible(true); // Exibir modal de sucesso
      } else {
        Alert.alert("Erro", "Falha ao registrar a categoria. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao registrar categoria:', error);
      Alert.alert("Erro", "Ocorreu um erro ao registrar a categoria.");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); // Fechar o modal
    navigation.navigate('AddProductScreen'); // Retorna à tela de produtos
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Incluir Categoria Produtos</Text>

        {/* Campo de Nome da Categoria */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome da categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Eletrônicos"
            value={categoryName}
            onChangeText={setCategoryName}
          />
        </View>

        {/* Botão de Confirmação */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>

        {/* Modal de confirmação */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={90} color={COLORS.green} />
              <Text style={styles.modalText}>Categoria de Produtos{'\n'}incluída com sucesso!</Text>

              {/* Botão Ok */}
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default IncludeCategoryProducts;
