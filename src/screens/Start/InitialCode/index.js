/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button, Text, TextInput, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';
import BarTop3 from '../../../components/BarTop3';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import styles from './styles';
import { API_BASE_URL } from '../../../services/apiConfig';
import ErrorModal from '../../../components/ErrorModal';

const InitialCode = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [codigoAtivacao1, setCodigoAtivacao1] = useState('');
  const [codigoAtivacao2, setCodigoAtivacao2] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Adicionar refs para os campos de input
  const codigoAtivacao2Ref = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          showError('Dados do usuário não encontrados.');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        showError('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  const showError = (message) => {
    setErrorMessage(message);
    setErrorVisible(true);
  };

  const validateFields = useCallback(() => {
    if (codigoAtivacao1.length !== 1 || codigoAtivacao2.length !== 1) {
      showError('O código de ativação deve ter 2 dígitos.');
      return false;
    }
    return true;
  }, [codigoAtivacao1, codigoAtivacao2]);

  const handleValidate = useCallback(async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      showError('Dados do usuário não encontrados.');
      return;
    }

    setLoading(true);
    const codigoAtivacao = `${codigoAtivacao1}${codigoAtivacao2}`;
    try {
      const response = await axios.patch(`${API_BASE_URL}/config/ativar-empreendedor/${userData.id}/`, {
        codigo_ativacao: codigoAtivacao,
      });

      if (response.status === 200 && response.data.status === 'success' && response.data.data.esta_ativo) {
        await AsyncStorage.mergeItem('userPhone', JSON.stringify({ isValidated: true }));
        navigation.navigate('BusinessInfoScreen');
      } else {
        showError('Código de ativação incorreto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      showError('Não foi possível conectar. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [codigoAtivacao1, codigoAtivacao2, userData, validateFields, navigation]);

  const handleCodigoAtivacao1Change = (text) => {
    setCodigoAtivacao1(text);
    if (text.length === 1) {
      codigoAtivacao2Ref.current.focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.barTopContainer}>
        <BarTop3
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ProgressBar currentStep={2} totalSteps={4} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Um código foi enviado para o seu número via SMS</Text>
        <View style={styles.cardContainer}>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeInput}
              value={codigoAtivacao1}
              onChangeText={handleCodigoAtivacao1Change}
              keyboardType='numeric'
              maxLength={1}
              placeholder='-'
            />
            <TextInput
              ref={codigoAtivacao2Ref}
              style={styles.codeInput}
              value={codigoAtivacao2}
              onChangeText={setCodigoAtivacao2}
              keyboardType='numeric'
              maxLength={1}
              placeholder='-'
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleValidate} disabled={loading}>
            <Icon name="checkmark-circle-sharp" size={22} color="#000" />
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
        )}

      </View>
      <ErrorModal
        visible={errorVisible}
        message={errorMessage}
        onClose={() => setErrorVisible(false)}
      />
    </View>
  );
};

export default InitialCode;
