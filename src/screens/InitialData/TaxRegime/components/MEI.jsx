/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../constants';

const MEI = ({navigation}) => {
  const [dasValue, setDasValue] = useState('');  // Valor do DAS
  const [isModalVisible, setIsModalVisible] = useState(false);  // Controle do modal

  // Função de formatação de moeda brasileira
  const formatCurrency = (value) => {
    const numberValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleDasChange = (value) => {
    const formattedValue = formatCurrency(value);
    setDasValue(formattedValue);
  };

  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('Start');
  };

  return (
    <View style={styles.screenContainer}>
      {/* Conteúdo da tela */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Insira o valor da DAS Mensal"
          placeholderTextColor={COLORS.gray}
          keyboardType="numeric"
          value={dasValue}
          onChangeText={handleDasChange}
        />
      </View>

      {/* Botão de confirmar no final */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Icon name="checkmark-circle" size={24} color="#000" />
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de confirmação */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalText}>Insira o valor da DAS Mensal</Text>
            <Text style={styles.modalValue}>R$ {dasValue || '0,00'}</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Icon name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.modalButtonText}>Confirmar dados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MEI;
