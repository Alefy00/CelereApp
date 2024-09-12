/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../constants';

const LucroPresumido = ({ navigation }) => {
  const [percentual, setPercentual] = useState('');  // Percentual do faturamento
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
      {/* Input para percentual */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Média você paga sobre o seu faturamento em %"
          keyboardType="numeric"
          value={percentual}
          onChangeText={setPercentual}
        />
      </View>


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
        <View style={styles.LucroPresumidomodalOverlay}>
          <View style={styles.LucroPresumidomodalContent}>
            <View style={styles.LucroPresumidomodalHeader}>
              <Text style={styles.LucroPresumidomodalTitle}>Confirme os seguintes dados</Text>
              <TouchableOpacity onPress={closeModal}>
                <Icon name="close" size={24} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.LucroPresumidomodalText}>Quanto em média você paga sobre o seu faturamento em %</Text>
            <Text style={styles.LucroPresumidomodalValue}>{percentual}% do meu faturamente</Text>
       
              <Text style={styles.LucroPresumidomodalValue2}>{receitasOption}</Text>

            <TouchableOpacity style={styles.LucroPresumidomodalButton} onPress={closeModal}>
              <Icon name="checkmark-circle" size={24} color="#000" />
              <Text style={styles.LucroPresumidomodalButtonText}>Confirmar dados</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LucroPresumido;