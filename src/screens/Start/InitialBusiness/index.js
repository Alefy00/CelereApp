/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';
import BarTop3 from '../../../components/BarTop3'; // Importando o BarTop3
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants';
import styles from './styles';

const API_URL_CARGOS = 'https://api.celereapp.com.br/api/cargos_negocio/';
const API_URL_CLASSIFICAR = 'https://api.celereapp.com.br/config/classificar_empreendedor/';

const BusinessInfoScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState(''); // Novo estado para o nome do usuário
  const [businessName, setBusinessName] = useState('');
  const [role, setRole] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(''); // Mantendo apenas mensagens de erro

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          setErrorMessage('Dados do usuário não encontrados.');
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        setErrorMessage('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL_CARGOS}?page_size=100&max_page_size=100`);
        setRolesList(response.data.data);
      } catch (error) {
        setErrorMessage('Não foi possível carregar a lista de cargos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const validateFields = useCallback(() => {
    if (!name) {
      setErrorMessage('O nome é obrigatório.');
      return false;
    }
    if (!businessName) {
      setErrorMessage('O nome do negócio é obrigatório.');
      return false;
    }
    if (!role) {
      setErrorMessage('Selecione um cargo.');
      return false;
    }
    return true;
  }, [name, businessName, role]);

  const handleNext = useCallback(async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      setErrorMessage('Dados do usuário não carregados. Tente novamente.');
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        nome: name, // Enviar o nome do usuário para a API
        nome_negocio: businessName,
        cargo: role,
        cnpj: cnpj || null,
      };

      const response = await axios.patch(`${API_URL_CLASSIFICAR}${userData.id}/`, dataToSend);

      if (response.status === 200 && response.data.status === 'success') {
        navigation.navigate('InitialBranch'); // Navegação direta em caso de sucesso
      } else {
        setErrorMessage(response.data.message || 'Erro ao salvar as informações. Tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
      setErrorMessage('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [name, businessName, role, cnpj, userData, validateFields, navigation]);

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
      <ProgressBar currentStep={3} totalSteps={4} />

      {/* Conteúdo Centralizado no Meio da Tela */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Quase lá!</Text>
        <View style={styles.cardContainer}>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Nome do seu negócio"
            placeholderTextColor="#ccc"
            value={businessName}
            onChangeText={setBusinessName}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={role}
              style={styles.picker}
              onValueChange={(itemValue) => setRole(itemValue)}
            >
              <Picker.Item label="Sua posição no negócio" value=""  color='#ccc'/>
              {rolesList && rolesList.length > 0 && rolesList.map((roleItem) => (
                <Picker.Item key={roleItem.id} label={roleItem.nome} value={roleItem.id} />
              ))}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Digite o CNPJ (se houver)"
            placeholderTextColor="#ccc"
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
            <Icon name="checkmark-circle-sharp" size={22} color="#000" />
            <Text style={styles.buttonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>

        {/* Exibição de mensagem de erro */}
        {errorMessage ? (
          <View style={styles.errorMessageContainer}>
            <Text style={styles.errorMessageText}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default BusinessInfoScreen;
