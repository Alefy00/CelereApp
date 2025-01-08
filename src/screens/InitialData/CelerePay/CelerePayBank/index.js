/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Modal, ScrollView, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { Picker } from '@react-native-picker/picker';
import { API_BASE_URL } from '../../../../services/apiConfig';

const CelerePayBank = ({ navigation }) => {
  const [empresaId, setEmpresaId] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de loading
  const [isCnpjChecked, setIsCnpjChecked] = useState(false);
  const [isCpfChecked, setIsCpfChecked] = useState(false);
  const [documentInput, setDocumentInput] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [NameHolder, setNameHolder] = useState('');
  const [agency, setAgency] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false); // Controle do primeiro modal
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false); // Controle do segundo modal
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Controle da visibilidade do teclado
  const [plans, setPlans] = useState([]); // Lista de planos
  const [selectedPlan, setSelectedPlan] = useState(''); // Plano selecionado
  const [loadingPlans, setLoadingPlans] = useState(false); // Estado de carregamento de planos

      // Função para obter o ID da empresa logada
      const getEmpresaId = useCallback(async () => {
        try {
            const storedEmpresaId = await AsyncStorage.getItem('empresaId');
            if (storedEmpresaId) {
                setEmpresaId(Number(storedEmpresaId));
            } else {
                Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
        }
    }, []);

    const getSellerId = useCallback(async () => {
      try {
          // 1. Tentar recuperar o SellerId salvo no AsyncStorage
          const storedSellerId = await AsyncStorage.getItem('sellerId');
          if (storedSellerId) {
              console.log('SellerId recuperado do AsyncStorage:', storedSellerId);
              return { sellerId: storedSellerId };
          }
  
          // 2. Se não encontrado, buscar no endpoint local usando o empresaId
          const response = await fetch(`${API_BASE_URL}/api/celerepay/?empresa=${empresaId}`);
          const data = await response.json();
  
          if (data.count > 0 && data.results[0]?.identificador) {
              const identifier = data.results[0].identificador;
              const tipoSeller = data.results[0].tipo_seller;  // 'CPF' ou 'CNPJ'
  
              // 3. Definir o parâmetro correto para a Zoop
              const queryParam = tipoSeller === 'CNPJ' ? `ein=${identifier}` : `taxpayer_id=${identifier}`;
              const zoopUrl = `https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/sellers/search?${queryParam}`;
  
              // 4. Buscar o Seller na Zoop usando o parâmetro correto
              const zoopResponse = await fetch(zoopUrl, {
                  headers: {
                      Authorization: `Basic ${Buffer.from('zpk_prod_fLDQqil50te59vqiqsSJ7AZ9:').toString('base64')}`
                  }
              });
  
              const zoopData = await zoopResponse.json();
              if (zoopData?.items?.length > 0) {
                  const sellerId = zoopData.items[0].id;
                  console.log('SellerId encontrado na Zoop:', sellerId);
  
                  // 5. Armazenar o SellerId no AsyncStorage para uso futuro
                  await AsyncStorage.setItem('sellerId', sellerId);
                  return { sellerId, doc: identifier };
              } else {
                  throw new Error('Nenhum seller encontrado para esse CPF/CNPJ na Zoop.');
              }
          } else {
              throw new Error('Nenhum identificador encontrado no endpoint local.');
          }
      } catch (error) {
          console.error('Erro na função getSellerId:', error);
          Alert.alert('Erro', 'Não foi possível recuperar o ID do Seller.');
          return null;
      }
  }, [empresaId]);
  

    // Função para criar conta bancária
    const createBankAccount = async () => {
      setLoading(true);
      try {
          const result = await getSellerId();
          if (!result) {
              throw new Error('Falha ao recuperar dados do Seller.');
          }
          const { sellerId } = result;
  
          if (!sellerId) {
              throw new Error('SellerId não encontrado.');
          }
  
          const body = {
              holder_name: NameHolder,
              bank_code: bankNumber,
              routing_number: agency,
              account_number: accountNumber,
              taxpayer_id: isCpfChecked ? documentInput : null,
              ein: isCnpjChecked ? documentInput : null,
              type: 'checking',
          };
  
          const tokenResponse = await fetch(
              'https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/bank_accounts/tokens',
              {
                  method: 'POST',
                  headers: {
                      Authorization: `Basic ${Buffer.from('zpk_prod_fLDQqil50te59vqiqsSJ7AZ9:').toString('base64')}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(body),
              }
          );
  
          const tokenData = await tokenResponse.json();
  
          if (!tokenResponse.ok) {
              throw new Error(tokenData?.message || 'Erro ao criar token.');
          }
  
          // Associar Conta Bancária ao Seller
          const associateResponse = await fetch(
              'https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/bank_accounts',
              {
                  method: 'POST',
                  headers: {
                      Authorization: `Basic ${Buffer.from('zpk_prod_fLDQqil50te59vqiqsSJ7AZ9:').toString('base64')}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      customer: sellerId, // Enviar apenas o ID
                      token: tokenData.id,
                  }),
              }
          );
  
          const associateData = await associateResponse.json();
  
          if (!associateResponse.ok) {
              throw new Error(associateData?.message || 'Erro ao associar conta.');
          }
  
      } catch (error) {
          console.error('Erro ao criar conta bancária:', error);
          Alert.alert('Erro', error.message);
      } finally {
          setLoading(false);
      }
  };
  
    
// Função para carregar planos da Zoop com Buffer corrigido
const fetchPlans = useCallback(async () => {
  setLoadingPlans(true);
  try {
      const credentials = 'zpk_prod_fLDQqil50te59vqiqsSJ7AZ9';
      const encodedCredentials = Buffer.from(`${credentials}:`).toString('base64'); // Corrigido com ':' no final

      const response = await fetch(
          'https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/plans',
          {
              method: 'GET',
              headers: {
                  Authorization: `Basic ${encodedCredentials}`,
                  'Content-Type': 'application/json'
              },
          }
      );

      const data = await response.json();
      if (response.ok && data.items) {
          setPlans(data.items.filter((plan) => plan.is_active)); // Apenas planos ativos
      } else {
          throw new Error(data.message || 'Erro ao carregar planos.');
      }
  } catch (error) {
      console.error('Erro ao buscar planos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
  } finally {
      setLoadingPlans(false);
  }
}, []);

// Garantir que o efeito execute corretamente
useEffect(() => {
  getEmpresaId();
  fetchPlans();
}, [getEmpresaId, fetchPlans]);


const associatePlanToSeller = async () => {
  setLoading(true);
  try {
      const mySellerId = await getSellerId(); // Garante a recuperação do SellerId
      if (!mySellerId || !mySellerId.sellerId) {
          Alert.alert('Erro', 'ID do Seller não encontrado.');
          return;
      }

      if (!selectedPlan) {
          Alert.alert('Erro', 'Por favor, selecione um plano.');
          return;
      }

      const body = {
          customer: mySellerId.sellerId,  // Corrigido para enviar apenas o ID
          plan: selectedPlan,
          quantity: '1',
      };

      const response = await fetch(
          'https://api.zoop.ws/v1/marketplaces/a218f4e829f749278a8608c478dd9ba5/subscriptions',
          {
              method: 'POST',
              headers: {
                  Authorization: `Basic ${Buffer.from('zpk_prod_fLDQqil50te59vqiqsSJ7AZ9:').toString('base64')}`,
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
          }
      );

      if (!response.ok) {
          // Caso a resposta não seja um JSON válido ou seja vazia
          const errorText = await response.text();
          throw new Error(`Erro: ${errorText}`);
      }

  } catch (error) {
      console.error('Erro ao associar plano ao seller:', error);
      Alert.alert('Erro', error.message);
  } finally {
      setLoading(false);
  }
};

  useEffect(() => {
    // Monitorando a exibição e ocultação do teclado
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      // Removendo os listeners quando o componente for desmontado
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleConfirm = () => {
    setIsFirstModalVisible(true); // Exibe o primeiro modal ao clicar em Confirmar
  };

  const handleFirstModalConfirm = () => {
    setIsFirstModalVisible(false); // Fecha o primeiro modal
    setIsSecondModalVisible(true);
    createBankAccount();
    associatePlanToSeller();
  };
  const handleFirstModalClose = () => {
    setIsFirstModalVisible(false); // Fecha o primeiro modal
  };

  const handleSecondModalConfirm = () => {
    setIsSecondModalVisible(false); // Fecha o segundo modal
    navigation.navigate('MainTab'); // Navega para a próxima tela
  };

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

        {/* Conteúdo principal com ScrollView */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Text style={styles.title}>Célere Pay</Text>
            <Text style={styles.subTitle}>
              Domicílio bancário para receber os valores de seus clientes.
            </Text>
            <Text style={styles.description}>
              O titular da conta deve ser, necessariamente, o seu CNPJ ou CPF.
            </Text>

            {/* Checkbox para CNPJ e CPF */}
            <Text style={styles.checkboxTitle}>Quem é o titular?</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isCnpjChecked}
                onValueChange={() => {
                  setIsCnpjChecked(!isCnpjChecked);
                  setIsCpfChecked(false); // Desmarca o CPF se CNPJ for marcado
                }}
                tintColors={{ true: COLORS.black, false: COLORS.grey }}
              />
              <Text style={styles.checkboxLabel}>CNPJ</Text>
              <CheckBox
                value={isCpfChecked}
                onValueChange={() => {
                  setIsCpfChecked(!isCpfChecked);
                  setIsCnpjChecked(false); // Desmarca o CNPJ se CPF for marcado
                }}
                tintColors={{ true: COLORS.black, false: COLORS.grey }}
              />
              <Text style={styles.checkboxLabel}>CPF</Text>
            </View>
            {(isCnpjChecked || isCpfChecked) && (
                <TextInput
                    style={styles.input}
                    placeholder={isCnpjChecked ? 'Digite seu CNPJ' : 'Digite seu CPF'}
                    value={documentInput}
                    onChangeText={setDocumentInput}
                    keyboardType="numeric"
                />
            )}

            {/* Inputs para dados bancários */}
            <TextInput
              style={styles.input}
              placeholder="Código do banco"
              value={bankNumber}
              onChangeText={setBankNumber}
              keyboardType="numeric"
            />
            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Agência"
                value={agency}
                onChangeText={setAgency}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Número da conta"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nome do titular"
              value={NameHolder}
              onChangeText={setNameHolder}
            />
          </View>
                   {/* Picker de Planos */}
                   <View style={styles.pickerContainer}>
                {loadingPlans ? (
                    <ActivityIndicator size="small" color="#000" />
                ) : (
                    <Picker
                        selectedValue={selectedPlan}
                        onValueChange={(itemValue) => setSelectedPlan(itemValue)}
                    >
                        <Picker.Item label="Selecione um plano" value="" />
                        {plans.map((plan) => (
                            <Picker.Item key={plan.id} label={plan.name} value={plan.id} />
                        ))}
                    </Picker>
                )}
            </View>
        </ScrollView>

        {/* Botão de confirmar (oculto quando o teclado estiver visível) */}
        {!isKeyboardVisible && (
          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Icon name="checkmark-circle" size={24} color={COLORS.black} />
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Primeiro Modal de confirmação */}
        <Modal
          visible={isFirstModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleFirstModalClose}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
                <TouchableOpacity onPress={handleFirstModalClose}>
                  <Icon name="close" size={24} color={COLORS.grey} />
                </TouchableOpacity>
              </View>

              {/* Exibição dos dados inseridos */}
              <View style={styles.modalDataContainer}>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Quem é o titular?</Text>
                  <Text style={styles.modalValue}>{isCnpjChecked ? 'CNPJ' : 'CPF'}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Número do banco:</Text>
                  <Text style={styles.modalValue}>{bankNumber}</Text>
                </View>
                <View style={styles.modalDataRow}>
                  <View style={styles.modalDataItem}>
                    <Text style={styles.modalText}>Agência:</Text>
                    <Text style={styles.modalValue}>{agency}</Text>
                  </View>
                  <View style={styles.modalDataItem}>
                    <Text style={styles.modalText}>Número da conta:</Text>
                    <Text style={styles.modalValue}>{accountNumber}</Text>
                  </View>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Nome do Titular:</Text>
                  <Text style={styles.modalValue}>{NameHolder}</Text>
                </View>
              </View>

              {/* Botão de confirmar dentro do modal */}
              <TouchableOpacity style={styles.modalButton} onPress={handleFirstModalConfirm}>
                <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                <Text style={styles.modalButtonText}>Confirmar dados</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Segundo Modal de sucesso */}
        <Modal
          visible={isSecondModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleSecondModalConfirm}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent2}>
              <View style={styles.modalHeader2}>
                <Icon name="checkmark-circle" size={88} color={COLORS.green} />
              </View>

              <Text style={styles.modalTitle2}>Pronto!</Text>
              <Text style={styles.modalText2}>Você receberá uma mensagem no seu whatsapp assim que seus dados tiverem atualizados.</Text>

              {/* Botão de OK no segundo modal */}
              <TouchableOpacity style={styles.modalButton2} onPress={handleSecondModalConfirm}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CelerePayBank;
