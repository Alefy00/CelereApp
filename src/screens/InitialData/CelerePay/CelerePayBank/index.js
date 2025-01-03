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

const CelerePayBank = ({ navigation }) => {
  const [empresaId, setEmpresaId] = useState(null);
  const [sellerId, setSellerId] = useState(null); // ID do Seller
  const [loading, setLoading] = useState(false); // Estado de loading
  const [docUser, setDocUser] = useState(''); // Guardará CPF ou CNPJ real

  const [isCnpjChecked, setIsCnpjChecked] = useState(false);
  const [isCpfChecked, setIsCpfChecked] = useState(false);
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
        console.log('Iniciando a função getSellerId...');
    
        // 1. Recuperar sellerId do AsyncStorage
        const storedSellerId = await AsyncStorage.getItem('sellerId');
    
        if (storedSellerId) {
          console.log('ID do Seller recuperado do AsyncStorage:', storedSellerId);
    
          // Buscar CPF/CNPJ do backend porque ele não é salvo no AsyncStorage
          const response = await fetch(`https://api.celere.top/config/empreendedor/?empresa=${empresaId}`);
          const data = await response.json();
    
          if (data.status === 'success' && data.data && data.data.length > 0) {
            const empreendedor = data.data[0];
    
            // Recuperar CPF ou CNPJ baseado no campo correto
            let sellerDocument = '';
            if (empreendedor.possui_cnpj && empreendedor.cnpj) {
              sellerDocument = empreendedor.cnpj;
            } else {
              sellerDocument = empreendedor.cpf;
            }
    
            if (!sellerDocument) {
              throw new Error('CPF ou CNPJ não encontrado no backend.');
            }
    
            console.log('Documento recuperado do backend:', sellerDocument);
    
            // Retornar tanto o SellerID quanto o Documento
            return {
              sellerId: storedSellerId,
              doc: sellerDocument,
            };
          } else {
            throw new Error('Nenhum empreendedor retornado do backend.');
          }
        }
    
        console.log('ID do Seller não encontrado no AsyncStorage. Buscando no banco...');
    
        // 2. Buscar dados do empreendedor no backend se sellerId não estiver salvo
        const response = await fetch(`https://api.celere.top/config/empreendedor/?empresa=${empresaId}`);
        const data = await response.json();
    
        if (data.status === 'success' && data.data && data.data.length > 0) {
          const empreendedor = data.data[0];
    
          let sellerDocument = '';
          if (empreendedor.possui_cnpj && empreendedor.cnpj) {
            sellerDocument = empreendedor.cnpj;
          } else {
            sellerDocument = empreendedor.cpf;
          }
    
          if (!sellerDocument) {
            throw new Error('CPF ou CNPJ não encontrado no backend.');
          }
    
          console.log('Documento (taxpayer_id) selecionado:', sellerDocument);
    
          // Buscar Seller na Zoop usando o documento
          const zoopResponse = await fetch(
            `https://api.zoop.ws/v1/marketplaces//sellers/search?taxpayer_id=${sellerDocument}`,
            {
              headers: {
                Authorization: `Basic ${Buffer.from('').toString('base64')}`,
              },
            }
          );
    
          const zoopData = await zoopResponse.json();
          console.log('Dados da resposta da API Zoop:', zoopData);
    
          if (zoopData?.items?.length > 0) {
            const retrievedSellerId = zoopData.items[0].id;
            console.log('ID do Seller recuperado da Zoop:', retrievedSellerId);
    
            // Armazenar no AsyncStorage
            await AsyncStorage.setItem('sellerId', retrievedSellerId);
    
            return {
              sellerId: retrievedSellerId,
              doc: sellerDocument,
            };
          } else {
            throw new Error('Nenhum seller encontrado para esse CPF/CNPJ na Zoop.');
          }
        } else {
          throw new Error('Nenhum empreendedor retornado do backend.');
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
        const { sellerId, doc } = result;
    
        if (!sellerId) {
          throw new Error('SellerId não encontrado.');
        }
        if (!doc) {
          throw new Error('CPF/CNPJ (doc) está vazio. Não podemos criar o token.');
        }
    
        console.log('Documento (taxpayer_id) que iremos usar:', doc);
    
        const body = {
          holder_name: NameHolder,
          bank_code: bankNumber,
          routing_number: agency,
          account_number: accountNumber,
          taxpayer_id: doc,
          type: 'checking',
        };
    
        console.log('Corpo da requisição para criação do token da conta bancária:', body);
    
        // Criar Token da Conta Bancária
        const tokenResponse = await fetch(
          'https://api.zoop.ws/v1/marketplaces//bank_accounts/tokens',
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from('').toString('base64')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
    
        const tokenData = await tokenResponse.json();
        console.log('Resposta da API para criação do token:', tokenData);
    
        if (!tokenResponse.ok) {
          throw new Error(`Erro ao criar token: ${tokenData?.message || 'Sem mensagem de erro.'}`);
        }
    
        // Associar Conta Bancária ao Seller
        const associateResponse = await fetch(
          'https://api.zoop.ws/v1/marketplaces//bank_accounts',
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${Buffer.from('').toString('base64')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customer: sellerId,
              token: tokenData.id,
            }),
          }
        );
    
        const associateData = await associateResponse.json();
        console.log('Resposta da API para associação da conta bancária:', associateData);
    
        if (!associateResponse.ok) {
          throw new Error(`Erro ao associar conta: ${associateData?.message || 'Sem mensagem de erro.'}`);
        }
    
        Alert.alert('Sucesso', 'Conta bancária associada com sucesso!');
        navigation.navigate('MainTab');
      } catch (error) {
        console.error('Erro ao criar conta bancária:', error);
        Alert.alert('Erro', error.message);
      } finally {
        setLoading(false);
      }
    };
    
      // Função para carregar planos da Zoop
      const fetchPlans = useCallback(async () => {
        setLoadingPlans(true);
        try {
            const response = await fetch(
                'https://api.zoop.ws/v1/marketplaces//plans',
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from('').toString('base64')}`,
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

    useEffect(() => {
      getEmpresaId();
      fetchPlans();
  }, [getEmpresaId, fetchPlans]);

const associatePlanToSeller = async () => {
  setLoading(true);
  try {
    console.log('associatePlanToSeller: chamando getSellerId...');
    const mySellerId = await getSellerId(); // Força a busca do sellerId
    if (!mySellerId) {
      console.error('Erro: ID do Seller não encontrado.');
      Alert.alert('Erro', 'ID do Seller não encontrado.');
      return;
    }

    if (!selectedPlan) {
      console.error('Erro: Nenhum plano selecionado.');
      Alert.alert('Erro', 'Por favor, selecione um plano.');
      return;
    }

    const body = {
      customer: mySellerId,
      plan: selectedPlan,
      quantity: '1',
    };

    console.log('Corpo da requisição para associação do plano:', body);

    const response = await fetch(
      'https://api.zoop.ws/v1/marketplaces//subscriptions',
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from('').toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log('Resposta da API Zoop (association do plano):', data);

    if (response.ok) {
      Alert.alert('Sucesso', 'Plano associado ao Seller com sucesso!');
      navigation.navigate('MainTab');
    } else {
      throw new Error(data.message || 'Erro desconhecido.');
    }
  } catch (error) {
    console.error('Erro ao associar plano ao seller:', error);
    Alert.alert('Erro', 'Não foi possível associar o plano ao seller.');
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
    createBankAccount();
  };
  const handleFirstModalConfirm2 = () => {
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
          onRequestClose={handleFirstModalConfirm}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
                <TouchableOpacity onPress={handleFirstModalConfirm2}>
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
