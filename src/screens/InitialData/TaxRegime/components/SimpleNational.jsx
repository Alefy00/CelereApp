/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../constants';

const SimpleNational = ({navigation}) => {
  const [aliquota, setAliquota] = useState('');  // Alíquota
  const [receitasOption, setReceitasOption] = useState(null);  // Opção de receita
  const [isModalVisible, setIsModalVisible] = useState(false);  // Controle do modal

  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('Start');
  };

  return (
    <View style={styles.screenContainer}>
      {/* Input para a alíquota */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sua alíquota atual em %"
          keyboardType="numeric"
          value={aliquota}
          onChangeText={setAliquota}
        />
      </View>

      {/* Opções de receita */}
      <Text style={styles.subtitleSimpesNacional}>
        Selecione com atenção:
      </Text>
      <Text style={styles.subtitleSimpesNacionalInfo}>
          Essas informações são apenas efeito de projeção de fluxo de caixa.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            receitasOption === 'Pago sobre todas as minhas receitas' && styles.selectedOptionButton
          ]}
          onPress={() => setReceitasOption('Pago sobre todas as minhas receitas')}
        >
          <Text style={styles.selectedbuttonText}>Pago sobre todas as minhas receitas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            receitasOption === 'Não pago sobre todas as minhas receitas' && styles.selectedOptionButton
          ]}
          onPress={() => setReceitasOption('Não pago sobre todas as minhas receitas')}
        >
          <Text style={styles.buttonText2}>Não pago sobre todas as minhas receitas</Text>
        </TouchableOpacity>
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
        <View style={styles.SimpleNationalmodalOverlay}>
          <View style={styles.SimpleNationalmodalContent}>
            <View style={styles.SimpleNationalmodalHeader}>
              <Text style={styles.SimpleNationalmodalTitle}>Confirme os seguintes dados</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.SimpleNationalmodalText}>Insira alíquota atual em %</Text>
            <Text style={styles.SimpleNationalmodalValue}>{aliquota}%</Text>

              <Text style={styles.SimpleNationalmodalValue2}>{receitasOption}</Text>

            <TouchableOpacity style={styles.SimpleNationalmodalButton} onPress={closeModal}>
              <Icon name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.SimpleNationalmodalButtonText}>Confirmar dados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SimpleNational;