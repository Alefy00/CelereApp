/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';

const IncludeCategoryProducts = ({ navigation }) => {
  const [categoryName, setCategoryName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal

  const handleConfirm = () => {
    // Lógica para confirmação da categoria
    console.log("Categoria confirmada:", categoryName);
    setIsModalVisible(true); // Exibir o modal após a confirmação
  };

  const closeModal = () => {
    setIsModalVisible(false); // Fechar o modal
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
            placeholder="ex: Manutenção de motor"
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
