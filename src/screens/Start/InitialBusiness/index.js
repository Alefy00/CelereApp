/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from '../components/ProgressBar';
import styles from './styles';

const API_URL_CARGOS = 'https://api.celereapp.com.br/api/cargos_negocio/';
const API_URL_CLASSIFICAR = 'https://api.celereapp.com.br/config/classificar_empreendedor/';

const BusinessInfoScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [role, setRole] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userPhone');
        if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
        } else {
          showModal('Erro', 'Dados do usuário não encontrados.');
          navigation.navigate('InitialRegistration');
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        showModal('Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, [navigation, showModal]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL_CARGOS}?page_size=100&max_page_size=100`);
        setRolesList(response.data.data);
      } catch (error) {
        showModal('Erro', 'Não foi possível carregar a lista de cargos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, [showModal]);

  const validateFields = useCallback(() => {
    if (!businessName) {
      showModal('Erro', 'O nome do negócio é obrigatório.');
      return false;
    }
    if (!role) {
      showModal('Erro', 'Selecione um cargo.');
      return false;
    }
    return true;
  }, [businessName, role, showModal]);

  const showModal = useCallback((title, message) => {
    setModalMessage(`${title}\n${message}`);
    setModalVisible(true);
  }, []);

  const handleNext = useCallback(async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      showModal('Erro', 'Dados do usuário não carregados. Tente novamente.');
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        nome_negocio: businessName,
        cargo: role,
        cnpj: cnpj || null
      };

      const response = await axios.patch(`${API_URL_CLASSIFICAR}${userData.id}/`, dataToSend);

      if (response.status === 200 && response.data.status === 'success') {
        showModal('Sucesso', 'Informações salvas com sucesso.');
      } else {
        showModal('Erro', response.data.message || 'Erro ao salvar as informações. Tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta da API:', error.response.data);
      } else if (error.request) {
        console.error('Erro na requisição:', error.request);
      } else {
        console.error('Erro desconhecido:', error.message);
      }
      showModal('Erro', 'Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  }, [businessName, role, cnpj, userData, validateFields, showModal]);

  const handleModalClose = useCallback(() => {
    setModalVisible(false);
    if (modalMessage.includes('Sucesso')) {
      navigation.navigate('InitialBranch');
    }
  }, [modalMessage, navigation]);

  return (
    <View style={styles.container}>
      <ProgressBar currentStep={3} totalSteps={4} />
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Nome do seu negócio"
              value={businessName}
              onChangeText={setBusinessName}
            />

            <Text style={styles.label}>Você é?</Text> 
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={role}
                style={styles.picker}
                onValueChange={(itemValue) => setRole(itemValue)}
              >
                <Picker.Item label="Selecione..." value="" />
                {rolesList && rolesList.length > 0 && rolesList.map((roleItem) => (
                  <Picker.Item key={roleItem.id} label={roleItem.nome} value={roleItem.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="CNPJ (se tiver)"
              value={cnpj}
              onChangeText={setCnpj}
              keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleNext} disabled={loading}>
              <Text style={styles.buttonText}>Avançar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity onPress={handleModalClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BusinessInfoScreen;
