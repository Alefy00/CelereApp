/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import axios from 'axios';

const IncludeCategoryProducts = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal

  const handleConfirm = async () => {
    if (!categoryName) {
      Alert.alert("Erro", "O campo nome da categoria é obrigatório!");
      return;
    }

    const categoryData = {
      status: true,
      nome: categoryName,
      descricao: null, // Descrição enviada como null
      empresa: 1, // Ajustar conforme necessário
      usuario: 1, // Ajustar conforme necessário
    };

    try {
      const response = await axios.post(
        'https://api.celereapp.com.br/mnt/categoriasprodutos/',
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
    navigation.navigate('AddProductScreen');
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
