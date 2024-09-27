/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Modal, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigida a importação
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../constants';

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
      console.log('Tentando salvar dados no AsyncStorage...');
      await AsyncStorage.setItem('taxInfoAdded', 'true'); // Salvando no AsyncStorage
      console.log('Salvamento no AsyncStorage foi bem-sucedido.');

      // Simula o envio dos dados salvos
      setTimeout(() => {
        Alert.alert('Sucesso', 'Dados de tributos salvos com sucesso!');
        onSuccess(); // Notifica o MainMenu que o modal foi preenchido
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.error('Erro ao salvar dados no AsyncStorage:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados. Tente novamente.');
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
            keyboardType="numeric"
            placeholder={
              selectedTax === 'Simples Nacional'
                ? 'Insira a sua alíquota (%) do Simples Nacional'
                : 'Insira sua alíquota média ou aproximada sobre o faturamento'
            }
            value={aliquota}
            onChangeText={setAliquota}
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

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para o modal
    },
    modalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      width: '90%',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '900',
      color: COLORS.black,
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 18,
      color: COLORS.black,
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: COLORS.black,
      textAlign: 'center',
      marginBottom: 20,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',

    },
    toggleButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.black,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: COLORS.primary, // Cor de fundo para o botão selecionado
      borderWidth: 0,
    },
    toggleButtonText: {
      fontSize: 15,
      color: COLORS.black,
    },
    input: {
      width: '100%',
      height: 60,
      borderColor: COLORS.black,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      color: COLORS.black,
      marginBottom: 20,
      borderBottomWidth: 1,
    },
    saveButton: {
      width: '100%',
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      paddingVertical: 25,
    },
    disabledButton: {
      backgroundColor: COLORS.gray, // Cor de fundo para o botão desabilitado
    },
    deferButton: {
      width: '100%',
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.black,
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 25,
    },
    buttonText: {
      fontSize: 16,
      color: COLORS.black,
      marginLeft: 10,
    },
    successModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    successModalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 30,
      alignItems: 'center',
      width: '85%',
    },
    successMessage: {
      fontSize: 18,
      color: COLORS.black,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 25,
    },
    successButton: {
      backgroundColor: COLORS.yellow,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
  });


export default TaxModal;
