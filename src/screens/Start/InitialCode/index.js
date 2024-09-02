/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, TextInput, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';
import BarTop3 from '../../../components/BarTop3';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import styles from './styles';

const API_URL = 'https://api.celereapp.com.br/config/ativar-empreendedor/';

const InitialCode = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [codigoAtivacao1, setCodigoAtivacao1] = useState('');
  const [codigoAtivacao2, setCodigoAtivacao2] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState(''); // Mantendo apenas mensagens de erro

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          setModalMessage('Dados do usuário não encontrados.');
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        setModalMessage('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  const validateFields = useCallback(() => {
    if (codigoAtivacao1.length !== 1 || codigoAtivacao2.length !== 1) {
      setModalMessage('O código de ativação deve ter 2 dígitos.');
      return false;
    }
    return true;
  }, [codigoAtivacao1, codigoAtivacao2]);

  const handleValidate = useCallback(async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      setModalMessage('Dados do usuário não encontrados.');
      return;
    }

    setLoading(true);
    const codigoAtivacao = `${codigoAtivacao1}${codigoAtivacao2}`; // Concatenar os dois dígitos
    try {
      const response = await axios.patch(`${API_URL}${userData.id}/`, {
        codigo_ativacao: codigoAtivacao,
      });

      if (response.status === 200 && response.data.status === 'success' && response.data.data.esta_ativo) {
        await AsyncStorage.mergeItem('userPhone', JSON.stringify({ isValidated: true }));
        navigation.navigate('BusinessInfoScreen');
      } else {
        setModalMessage('Código de ativação incorreto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      setModalMessage('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [codigoAtivacao1, codigoAtivacao2, userData, validateFields, navigation]);

  return (
    <View style={styles.container}>
      {/* BarTop3 no topo */}
      <View style={styles.barTopContainer}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      {/* Barra de Progresso logo abaixo do BarTop3 */}
      <ProgressBar currentStep={2} totalSteps={4} />

      {/* Conteúdo Centralizado no Meio da Tela */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Um código foi enviado para o seu número via WhatsApp</Text>
        <View style={styles.cardContainer}>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeInput}
              value={codigoAtivacao1}
              onChangeText={setCodigoAtivacao1}
              keyboardType='numeric'
              maxLength={1} // Limitando a 1 dígito
              placeholder='-'
            />
            <TextInput
              style={styles.codeInput}
              value={codigoAtivacao2}
              onChangeText={setCodigoAtivacao2}
              keyboardType='numeric'
              maxLength={1} // Limitando a 1 dígito
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

        {modalMessage ? (
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="OK" onPress={() => setModalMessage('')} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default InitialCode;
