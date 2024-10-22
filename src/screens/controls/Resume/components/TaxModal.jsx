/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios'; // Importar axios para fazer a requisição
import { COLORS } from '../../../../constants';
import styles from './stylesTax';
import { API_BASE_URL } from '../../../../services/apiConfig';

const TaxModal = ({ visible, onClose, onSuccess }) => {
  const [selectedTax, setSelectedTax] = useState('Simples Nacional');
  const [aliquota, setAliquota] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTaxSelection = (tax) => {
    setSelectedTax(tax);
    setAliquota('');
  };

  const handleSave = async () => {
    if (!aliquota || parseFloat(aliquota) <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma alíquota válida.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Obter o ID da empresa do AsyncStorage
      const empresaId = await AsyncStorage.getItem('empresaId');
      if (!empresaId) {
        Alert.alert('Erro', 'ID da empresa não encontrado. Por favor, tente novamente.');
        setLoading(false);
        return;
      }
  
      // Definir o regime tributário com base na escolha do usuário
      const regimeTributario = selectedTax === 'Simples Nacional' ? 'simplesnac' : 'lucropres';
  
      // Preparar o corpo da requisição
      const body = {
        empresa_id: Number(empresaId),
        regime_tributario: regimeTributario,
        aliquota: parseFloat(aliquota), // Enviar o valor exato inserido pelo usuário
        is_pago_sobre_receitas: true
      };
  
      // Fazer a requisição POST para registrar o regime tributário
      const response = await axios.post(`${API_BASE_URL}/api/regimetributario/`, body);
  
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Tributo registrado com sucesso!');
        await AsyncStorage.setItem('taxInfoAdded', 'true'); // Marcar que os tributos foram registrados
        onSuccess(); // Notifica o MainMenu que o modal foi preenchido
      } else {
        Alert.alert('Erro', 'Houve um erro ao registrar o tributo. Tente novamente.');
      }
  
    } catch (error) {
      console.error('Erro ao registrar o tributo:', error);
      Alert.alert('Erro', 'Erro ao registrar o tributo. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false); // Finalizar o estado de carregamento
    }
  };
  

  const handleDefer = async () => {
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={24} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>2º Passo</Text>
          <Text style={styles.subTitle}>Tributos</Text>
          <Text style={styles.description}>
            Só para embutir nos custos diretos de vendas. MEI não precisa, pois paga taxa única.
          </Text>

          {/* Botões para alternar entre Simples Nacional e Lucro Presumido */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTax === 'Simples Nacional' && styles.selectedButton,
              ]}
              onPress={() => handleTaxSelection('Simples Nacional')}
            >
              <Text style={styles.toggleButtonText}>Simples Nacional</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                selectedTax === 'Lucro Presumido' && styles.selectedButton,
              ]}
              onPress={() => handleTaxSelection('Lucro Presumido')}
            >
              <Text style={styles.toggleButtonText}>Lucro Presumido</Text>
            </TouchableOpacity>
          </View>

          {/* Campo de alíquota */}
          <TextInput
              style={styles.input}
              keyboardType="numeric" // Mantém o teclado numérico
              placeholder={
                selectedTax === 'Simples Nacional'
                  ? 'Insira a sua alíquota (%) do Simples Nacional'
                  : 'Insira sua alíquota (%) média ou aproximada sobre o faturamento'
              }
              value={aliquota}
              onChangeText={(text) => {
                // Remove qualquer caractere que não seja número
                const cleanedValue = text.replace(/\D/g, '');

                // Formatar o número para flutuante com duas casas decimais
                const formattedValue = (parseFloat(cleanedValue) / 100).toFixed(2);

                // Atualizar o valor da alíquota no estado
                setAliquota(formattedValue);
              }}
            />


          {/* Botões de Ação */}
          <TouchableOpacity
            style={[styles.saveButton, loading && styles.disabledButton]}
            onPress={handleSave}
            disabled={loading}
          >
            <Icon name="checkmark-circle" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Salvar Tudo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deferButton} onPress={handleDefer}>
            <Icon name="time-outline" size={20} color={COLORS.black} />
            <Text style={styles.buttonText}>Deixar para depois</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TaxModal;
