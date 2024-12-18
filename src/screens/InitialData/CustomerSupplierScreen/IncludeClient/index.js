/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableWithoutFeedback, Keyboard, SafeAreaView,  Alert, PermissionsAndroid, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Contacts from 'react-native-contacts';  // Biblioteca para acessar contatos
import { API_BASE_URL } from '../../../../services/apiConfig';
import ProminentDisclosureModal from './components/ProminentDisclosureModal';

const IncludeClient = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar o foco
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [empresaId, setEmpresaId] = useState(null);  // Estado para armazenar o ID da empresa
  const [contactsList, setContactsList] = useState([]);  // Estado para armazenar os contatos
  const [contactPickerVisible, setContactPickerVisible] = useState(false);  // Estado para controlar o picker de contatos
  const [disclosureVisible, setDisclosureVisible] = useState(false);

  // Função para buscar o ID da empresa logada no AsyncStorage
  useEffect(() => {
    const fetchEmpresaId = async () => {
      try {
        const storedEmpresaId = await AsyncStorage.getItem('empresaId');
        if (storedEmpresaId) {
          setEmpresaId(Number(storedEmpresaId));  // Converte para número
        } else {
          Alert.alert('Erro', 'ID da empresa não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar o ID da empresa:', error);
        Alert.alert('Erro', 'Erro ao recuperar o ID da empresa.');
      }
    };

    fetchEmpresaId();
  }, []);

  const handleFocus = () => { setIsFocused(true); };
  const handleBlur = () => { setIsFocused(false); };

  const formatPhoneNumber = (phone) => {
    if (!phone.startsWith('+55')) {
      return `+55${phone.replace(/\D/g, '')}`;
    }
    return phone;
  };

  const requestContactsPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Permissão de Contatos",
          message: "O aplicativo precisa acessar seus contatos para selecionar clientes.",
          buttonNeutral: "Pergunte-me depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissão de contatos concedida");
        return true;
      } else {
        console.log("Permissão de contatos negada");
        Alert.alert("Erro", "Permissão para acessar contatos foi negada.");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const fetchContacts = async () => {
    try {
      const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
      if (!hasPermission) {
        const permissionGranted = await requestContactsPermission();
        if (!permissionGranted) return;
      }

      Contacts.getAll()
        .then(contacts => {
          setContactsList(contacts);
          setContactPickerVisible(true);
        })
        .catch((err) => {
          console.error('Erro ao obter os contatos: ', err);
          Alert.alert('Erro', 'Não foi possível acessar os contatos.');
        });
    } catch (err) {
      console.error('Erro ao acessar os contatos: ', err);
      Alert.alert('Erro', 'Erro ao acessar seus contatos. Verifique as permissões.');
    }
  };

  const selectContact = (contact) => {
    const phoneNumber = contact.phoneNumbers[0]?.number || '';
    const formattedPhone = formatPhoneNumber(phoneNumber);
    setClientName(contact.givenName);
    setClientPhone(formattedPhone);
    setContactPickerVisible(false);
  };

  const handleConfirm = async () => {
    if (!clientName) {
      Alert.alert("Erro", "Por favor, insira o nome do cliente.");
      return;
    }

    if (!empresaId) {
      Alert.alert("Erro", "ID da empresa não disponível. Tente novamente.");
      return;
    }

    const formattedPhone = formatPhoneNumber(clientPhone);

    try {
      const response = await axios.post(`${API_BASE_URL}/cad/cliente/`, {
        nome: clientName,
        celular: formattedPhone || null,
        empresa: empresaId,
      });

      if (response.data && response.data.status === "success") {
        setModalVisible(true);
      } else {
        Alert.alert("Erro", "Erro ao incluir o cliente. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao incluir cliente: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao incluir o cliente. Verifique sua conexão e tente novamente.");
    }
  };

  const handleIncludeNew = () => {
    setClientName('');
    setClientPhone('');
    setAdditionalInfo('');
    setModalVisible(false);
  };

  const handleReturnToMenu = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  // Ao clicar no botão para adicionar dos contatos, primeiro mostramos o disclosure.
  const handleAddFromContacts = () => {
    setDisclosureVisible(true);
  };

  const handleDisclosureAgree = () => {
    // Usuário concordou com o uso dos dados
    setDisclosureVisible(false);
    fetchContacts();
  };

  const handleDisclosureClose = () => {
    // Usuário não concordou
    setDisclosureVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerBase}>
          <View style={styles.containerBartop}>
            <BarTop3
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Incluir clientes</Text>

            {/* Botão de adicionar dos contatos */}
            <TouchableOpacity style={styles.addFromContactsButton} onPress={handleAddFromContacts}>
              <Icon name="person" size={24} color="black" />
              <Text style={styles.buttonText}>Adicionar dos seus contatos</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Cliente</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Alexandre da Silva"
                placeholderTextColor={COLORS.lightGray}
                value={clientName}
                onChangeText={setClientName}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Celular (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: (11) 91234-5678"
                placeholderTextColor={COLORS.lightGray}
                value={clientPhone}
                onChangeText={setClientPhone}
                keyboardType="phone-pad"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Informações adicionais (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Cliente de Ribeirão Preto"
                placeholderTextColor={COLORS.lightGray}
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
          </ScrollView>

          {!isFocused && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Icon name="checkmark-circle" size={80} color={COLORS.green} />
                <Text style={styles.modalTitle}>Inclusão de cliente realizada com sucesso!</Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleIncludeNew}>
                  <Icon name="add" size={24} color={COLORS.black} />
                  <Text style={styles.modalButtonText}>Incluir novo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButtonSecondary} onPress={handleReturnToMenu}>
                  <Text style={styles.modalButtonText}>Retornar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            visible={contactPickerVisible}
            onRequestClose={() => setContactPickerVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Selecione um contato</Text>
              <FlatList
                data={contactsList}
                keyExtractor={(item) => item.recordID}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.contactItem} onPress={() => selectContact(item)}>
                    <Text style={styles.contactItemNome}>{item.givenName} - {item.phoneNumbers[0]?.number || 'Sem número'}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.modalButton} onPress={() => setContactPickerVisible(false)}>
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* Modal de Prominent Disclosure */}
          <ProminentDisclosureModal
            visible={disclosureVisible}
            onClose={handleDisclosureClose}
            onAgree={handleDisclosureAgree}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default IncludeClient;
