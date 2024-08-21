/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, TextInput, View, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';
import styles from './styles';

const API_URL = 'https://api.celereapp.com.br/config/ativar-empreendedor/';

const InitialCode = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [codigoAtivacao, setCodigoAtivacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({ visible: false, message: '', isSuccess: false });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          showModal('Dados do usuário não encontrados.', false);
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        showModal('Erro ao carregar dados do usuário.', false);
      }
    };

    fetchUserData();
  }, [navigation, showModal]);

  const validateFields = useCallback(() => {
    if (!codigoAtivacao) {
      showModal('O código de ativação deve ser preenchido.', false);
      return false;
    }
    return true;
  }, [codigoAtivacao, showModal]);

  const showModal = useCallback((message, isSuccess) => {
    setModalState({ visible: true, message, isSuccess });
  }, []);

  const handleValidate = useCallback(async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      showModal('Dados do usuário não encontrados.', false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}${userData.id}/`, {
        codigo_ativacao: codigoAtivacao,
      });

      if (response.status === 200 && response.data.status === 'success' && response.data.data.esta_ativo) {
        await AsyncStorage.mergeItem('userPhone', JSON.stringify({ isValidated: true }));
        showModal('Conta ativada com sucesso!', true);
      } else {
        showModal('Código de ativação incorreto. Tente novamente.', false);
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      showModal('Não foi possível conectar à API. Verifique sua conexão e tente novamente.', false);
    } finally {
      setLoading(false);
    }
  }, [codigoAtivacao, userData, validateFields, showModal]);

  const handleModalClose = useCallback(() => {
    setModalState({ ...modalState, visible: false });
    if (modalState.isSuccess) {
      navigation.navigate('BusinessInfoScreen');
    }
  }, [modalState, navigation]);

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={2} totalSteps={4} />
      <Text style={styles.text}>Insira o código recebido:</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira o código'
        value={codigoAtivacao}
        onChangeText={setCodigoAtivacao}
        keyboardType='numeric'
      />
      <Button title='Enviar' onPress={handleValidate} disabled={loading} />

      {loading && (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalState.visible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalState.message}</Text>
            <Button
              title="OK"
              onPress={handleModalClose}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InitialCode;
