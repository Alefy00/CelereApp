/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import styles from './styles';

const API_URL_CARGOS = 'https://api.celereapp.com.br/api/cargos_negocio/';
const API_URL_CLASSIFICAR = 'https://api.celereapp.com.br/config/classificar_empreendedor/';

const BusinessInfoScreen = ({ navigation, route }) => {
  const { userData } = route.params;
  const [businessName, setBusinessName] = useState('');
  const [role, setRole] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [rolesList, setRolesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL_CARGOS}?page_size=100&max_page_size=100`);
        setRolesList(response.data.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a lista de cargos. Tente novamente');
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const validateFields = () => {
    if (!businessName) {
      Alert.alert('Erro', 'O nome do negócio é obrigatório.');
      return false;
    }
    if (!role) {
      Alert.alert("Erro", "Selecione um cargo");
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!validateFields()) return;

    setLoading(true);
    try {
      const dataToSend = {
        nome_negocio: businessName,
        cargo: role,
        cnpj: cnpj || ""
      };

      console.log('Enviando os dados:', dataToSend);

      const response = await axios.patch(`${API_URL_CLASSIFICAR}${userData.id}/`, dataToSend);

      console.log('Resposta da API:', response.data);

      if (response.status === 200 && response.data.status === 'success') {
        Alert.alert('Sucesso', 'Informações salvas com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('InitialBranch') }
        ]);
      } else {
        Alert.alert("Erro", response.data.message || 'Erro ao salvar as informações. Tente novamente.');
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro na resposta da API:", error.response.data);
      } else if (error.request) {
        console.error("Erro na requisição:", error.request);
      } else {
        console.error("Erro desconhecido:", error.message);
      }
      Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
        <Text style={styles.stepText}>3 de 4 passos</Text>
      </View>

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
  );
};

export default BusinessInfoScreen;
