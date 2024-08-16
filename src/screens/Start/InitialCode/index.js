/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Text, TextInput, View, Alert, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles';

const API_URL = 'https://api.celereapp.com.br/config/ativar-empreendedor/';

const InitialCode = ({ navigation, route }) => {
  const { userData } = route.params || {}; // Recebe os dados do usuário passados pela navegação
  const [codigoAtivacao, setCodigoAtivacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const validateFields = () => {
    if (!codigoAtivacao) {
      showModal('O código de ativação deve ser preenchido.');
      return false;
    }
    return true;
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleValidate = async () => {
    if (!validateFields()) return;

    if (!userData || !userData.id) {
      showModal('Dados do usuário não encontrados.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}${userData.id}/`, {
        codigo_ativacao: codigoAtivacao,
      });

      if (response.status === 200 && response.data.status === 'success' && response.data.data.esta_ativo) {
        // Redireciona para BusinessInfoScreen após a ativação bem-sucedida
        Alert.alert('Sucesso', 'Conta ativada com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('BusinessInfoScreen', { userData }) }
        ]);
      } else {
        showModal('Código de ativação incorreto. Tente novamente.');
      }
    } catch (error) {
      showModal('Não foi possível conectar à API. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
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
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button
              title="OK"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InitialCode;
