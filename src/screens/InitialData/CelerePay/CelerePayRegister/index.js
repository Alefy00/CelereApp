/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Alert, TouchableWithoutFeedback, Keyboard, ScrollView, ActivityIndicator} from 'react-native';
import BarTop3 from '../../../../components/BarTop3';
import styles from './styles';
import { COLORS } from '../../../../constants';
import ConfirmationModal from './components/ConfirmationModal';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
import AsyncStorage from '@react-native-async-storage/async-storage';
import CelerePayIndividualForm from './components/CelerePayIndividualForm';
import { API_BASE_URL } from '../../../../services/apiConfig';

const CelerePayRegister = ({ navigation }) => {
  const [empresaId, setEmpresaId] = useState(null);
  const [entrepreneurData, setEntrepreneurData] = useState(null);
  const [loading, setLoading] = useState(false);

  // States do formulário individual
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cpf, setCpf] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [countryCode, setCountryCode] = useState('BR');
  const [hasCnpj, setHasCnpj] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(false);

  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(Number(storedEmpresaId));
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao obter ID da empresa do AsyncStorage:', error);
    }
  }, []);

  const fetchEntrepreneurData = useCallback(async () => {
    if (!empresaId) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/config/empreendedor/?empresa=${empresaId}`);
      const data = await response.json();

      if (data.status === 'success' && data.data.length > 0) {
        setEntrepreneurData(data.data[0]);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados do empreendedor.');
      }
    } catch (error) {
      console.error('Erro ao buscar dados do empreendedor:', error);
    } finally {
      setLoading(false);
    }
  }, [empresaId]);

  // Carregar ID da empresa ao montar o componente
  useEffect(() => {
    getEmpresaId();
  }, [getEmpresaId]);

  // Buscar dados do empreendedor quando o ID da empresa estiver disponível
  useEffect(() => {
    if (empresaId) {
      fetchEntrepreneurData();
    }
  }, [empresaId, fetchEntrepreneurData]);

// Carregar categorias (MCC)
useEffect(() => {
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const credentials = 'zpk_prod_fLDQqil50te59vqiqsSJ7AZ9';
      const encodedCredentials = Buffer.from(`${credentials}:`).toString('base64');

      const response = await fetch('https://api.zoop.ws/v1/merchant_category_codes', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data.items || []);
    } catch (error) {
      console.error('Erro no fetch:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  fetchCategories();
}, []);

  // Listener de teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  // --- Lógica de criação de Seller na Zoop ---
  const createSellerInZoop = async () => {
    // Validação básica
    if (!firstName || !lastName || !cpf || !birthDate || !selectedCategory) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Limpar pontuações do CPF e CEP
    const onlyNumbersCpf = cpf.replace(/\D/g, '');
    const onlyNumbersCep = cep.replace(/\D/g, '');

    const body = {
      first_name: firstName,
      last_name: lastName,
      email: entrepreneurData.email,
      phone_number: `${entrepreneurData.ddd}${entrepreneurData.celular}`,
      taxpayer_id: onlyNumbersCpf,
      birthdate: birthDate, // Formato YYYY-MM-DD
      address: {
        line1: street,
        line2: number,
        neighborhood,
        city,
        state,
        postal_code: onlyNumbersCep,
        country_code: countryCode,
      },
      mcc: selectedCategory,
    };

    setLoading(true);
    try {
      const credentials = 'zpk_prod_fLDQqil50te59vqiqsSJ7AZ9'; 
      const encodedCredentials = Buffer.from(`${credentials}:`).toString('base64');

      const response = await fetch(
        'https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/sellers/individuals',
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Sucesso', 'Vendedor criado com sucesso na Zoop!');
        const sellerId = data.id; // Supondo que o ID do seller esteja no campo 'id' da resposta
        console.log('ID do seller:', sellerId);
        await AsyncStorage.setItem('sellerId', sellerId.toString()); // Armazena o ID do seller no AsyncStorage
        navigation.navigate('CelerePayBank');
      } else {
        Alert.alert('Erro', `Erro ao criar vendedor: ${data.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro ao criar vendedor na Zoop:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSellerLocally = async (sellerId) => {
    try {
      // Construção do payload para CPF
      const localPayload = {
        empresa: empresaId, // ID da empresa logada
        tipo_seller: 'CPF', // Apenas CPF
        identificador: cpf.replace(/\D/g, ''), // Limpa formatação do CPF
        first_name: firstName,
        last_name: lastName,
        birthdate: birthDate,
        address_line1: street,
        address_line2: number,
        neighborhood,
        city,
        state,
        postal_code: cep.replace(/\D/g, ''), // Limpa formatação do CEP
        // Campos de CNPJ são omitidos
        nome_empresa: null,
        telefone_empresa: null,
        email_empresa: null,
        address_empresa_line1: null,
        address_empresa_line2: null,
        neighborhood_empresa: null,
        city_empresa: null,
        state_empresa: null,
        postal_code_empresa: null,
      };
  
      // Requisição ao endpoint do backend local
      const response = await fetch(`${API_BASE_URL}/api/celerepay/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localPayload),
      });
  
      // Processamento da resposta
      const result = await response.json();
      if (response.ok) {
        console.log('Vendedor salvo no backend local:', result);
        Alert.alert('Sucesso', 'Vendedor salvo no sistema local com sucesso!');
      } else {
        Alert.alert('Erro', `Erro ao salvar vendedor localmente: ${result.message || 'Erro desconhecido.'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar vendedor localmente:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o vendedor no sistema local.');
    }
  };
 

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleConfirmData = () => {
    setIsModalVisible(true);
  };
  const handleConfirmModal = () => {
    // Fecha modal e de fato cria o seller
    setIsModalVisible(false);
    createSellerInZoop();
    saveSellerLocally();
  };

  if (loading) {
    return (
      <View style={[styles.containerBase, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerBase}>
        {/* Barra superior */}
        <View style={styles.containerBartop}>
          <BarTop3
            titulo={'Voltar'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
          />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CelerePayIndividualForm
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            birthDate={birthDate}
            setBirthDate={setBirthDate}
            cpf={cpf}
            setCpf={setCpf}
            cnpj={cnpj}
            setCnpj={setCnpj}
            hasCnpj={hasCnpj}
            setHasCnpj={setHasCnpj}
            cep={cep}
            setCep={setCep}
            street={street}
            setStreet={setStreet}
            number={number}
            setNumber={setNumber}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            loadingCategories={loadingCategories}
            isCalendarVisible={isCalendarVisible}
            setIsCalendarVisible={setIsCalendarVisible}
            isKeyboardVisible={isKeyboardVisible}
            // Função para quando clicar em "Confirmar"
            handleConfirmData={handleConfirmData}
          />
        </ScrollView>

        {/* Modal de confirmação */}
        <ConfirmationModal
          visible={isModalVisible}
          onClose={closeModal}
          onConfirm={handleConfirmModal}
          data={{
            firstName,
            lastName,
            cpf,
            cep,
            number,
            street,
            neighborhood,
            city,
            state,
            countryCode,
            hasCnpj,
            cnpj,
            birthDate,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CelerePayRegister;
