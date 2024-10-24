/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants';
import BarTop from '../../../components/BarTop';
import DateCarousel from './components/DateCarousel';
import styles from './styles';
import SalesChartCard from './components/SalesChartCard';
import FilteredListCard from './components/FilteredListCard';
import ActionButtons from './components/ActionButtons';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import OpeningBalanceModal from './components/OpeningBalanceModal';
import TaxModal from './components/TaxModal';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../services/apiConfig';
import mixpanel from '../../../services/mixpanelClient';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Visibilidade do OpeningBalanceModal
  const [isTaxModalVisible, setIsTaxModalVisible] = useState(false); // Estado para controlar a visibilidade do TaxModal
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [empresaId, setEmpresaId] = useState(null); // Armazena o ID da empresa logada

  // Função para buscar o ID da empresa logada e armazenar em estado
  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(Number(storedEmpresaId));
        // Identificar o usuário no Mixpanel ao carregar o ID da empresa
        mixpanel.identify(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
  }, []);

// Função para recuperar o saldo de caixa com base no ID da empresa logada e na data selecionada
const fetchSaldoCaixa = useCallback(async () => {
  try {
    if (empresaId && selectedDate) {
      const { dt_ini, dt_end } = selectedDate;

      // Logs para verificar os valores de data e ID da empresa
      console.log('Recuperando saldo para:', { empresaId, dt_ini, dt_end });

      const response = await axios.get(
         `${API_BASE_URL}/api/ms_datainf/composite/?empresa_id=${empresaId}&dt_ini=${dt_ini}&dt_end=${dt_end}`
      );

      console.log('Resposta da API:', response.data); // Verifique se a resposta está correta

      if (response.status === 200 && response.data.status === 'success') {
        const saldoData = response.data.data.find(item => item.item === "Saldo Caixa");

        // Verificação adicional
        console.log('Dados de saldo:', saldoData);

        if (saldoData) {
          const saldoTotal = parseFloat(saldoData.valor.replace(/\./g, '').replace(',', '.'));
          setSaldoCaixa(saldoTotal); // Atualiza o estado
        } else {
          setSaldoCaixa(0); // Define como 0 se não houver saldo
        }
      } else {
        Alert.alert('Erro', 'Não foi possível recuperar o saldo de caixa.');
        setSaldoCaixa(0); // Define como 0 em caso de erro
      }
    }
  } catch (error) {
    console.error('Erro ao buscar saldo:', error); // Log para verificar se houve erro
    setSaldoCaixa(0); // Define como 0 em caso de erro
  } finally {
    setLoading(false);
  }
}, [empresaId, selectedDate]); // Depende de empresaId e selectedDate


useFocusEffect(
  useCallback(() => {
    const updateSaldoOnFocus = async () => {
      await getEmpresaId();
      if (selectedDate) {
        setLoading(true);
        await fetchSaldoCaixa();
      }
    };
    updateSaldoOnFocus();
  }, [selectedDate, fetchSaldoCaixa, getEmpresaId])
);

useEffect(() => {
  initializeDateFilter(); // Inicializa a data com o dia atual
}, []);

  useEffect(() => {
    if (selectedDate) {
      fetchSaldoCaixa(); // Chama a função apenas quando `selectedDate` mudar
    }
  }, [selectedDate, fetchSaldoCaixa]); // Depende da data selecionada e da função memoizada

  // Função para verificar se o saldo inicial e as informações de tributo foram preenchidas
  useEffect(() => {
    const checkModals = async () => {
      const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
      const taxInfoAdded = await AsyncStorage.getItem('taxInfoAdded');
      
      if (!initialBalanceAdded) {
        setIsModalVisible(true); // Exibe o OpeningBalanceModal se não houver saldo
      } else if (!taxInfoAdded) {
        setIsTaxModalVisible(true); // Exibe o TaxModal se o imposto não tiver sido adicionado
      }
    };

    checkModals(); // Verifica os estados ao carregar a tela
  }, [saldoCaixa]); // Depende do saldoCaixa para saber se já foi recuperado

  const handleBalanceSave = async (saldo) => {
    if (saldo > 0) {
      await AsyncStorage.setItem('initialBalanceAdded', 'true'); // Marca que o saldo foi adicionado
      setIsModalVisible(false); // Fecha o OpeningBalanceModal
  
      console.log('Saldo inserido:', saldo);
  
      // Atualiza o saldo de caixa após fechar o modal
      try {
        console.log('Chamando fetchSaldoCaixa() para atualizar o saldo...');
        await fetchSaldoCaixa(); // Faz a requisição para buscar o saldo atualizado
  
        console.log('Saldo atualizado com sucesso.');
      } catch (error) {
        console.error('Erro ao atualizar saldo:', error);
      }
  
      // Verifica se as informações de tributo foram preenchidas
      const taxInfoAdded = await AsyncStorage.getItem('taxInfoAdded');
      
      if (!taxInfoAdded) {
        console.log('Exibindo TaxModal...');
        // Abre o TaxModal após o saldo ser atualizado
        setIsTaxModalVisible(true);
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha o saldo inicial antes de continuar.');
    }
  };
  

  // Função para fechar o TaxModal após preenchido
  const handleTaxModalSuccess = async () => {
    await AsyncStorage.setItem('taxInfoAdded', 'true'); // Marca que o imposto foi adicionado
    setIsTaxModalVisible(false); // Fecha o TaxModal
  };

  // Função para abrir o modal de saldo ao clicar em "Saldo Caixa"
  const handleBalanceClick = async () => {
    const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
    if (!initialBalanceAdded) {
      setIsModalVisible(true); // Se o saldo ainda não foi adicionado, exibe o OpeningBalanceModal
    } else {
      Alert.alert("Informação", "O saldo inicial já foi adicionado.");
    }
  };

  // Função para formatar os valores de moeda
  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = (cleanedValue / 100).toFixed(2);
    return formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Função para inicializar a data atual ao carregar a tela
  const initializeDateFilter = () => {
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    setSelectedDate({ dt_ini: formattedToday, dt_end: formattedToday });
  };

  useEffect(() => {
    initializeDateFilter(); // Inicializa a data com o dia atual
  }, []);

  // Função para mudar as datas quando o usuário selecionar novas no DateCarousel
  const handleDateChange = useCallback((startDate, endDate) => {
    setSelectedDate({
      dt_ini: startDate,
      dt_end: endDate,
    });
  }, []);

  useEffect(() => {
    // Exemplo de rastreamento de evento de interação do usuário
    mixpanel.track('Tela principal Exibida');
  }, []);

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <ScrollView style={{ backgroundColor: "#FDFCF0" }}>
        <BarTop
          uriAvatar={'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'}
          titulo={'Planeta '}
          subtitulo={'Planeta '}
          backColor={COLORS.primary}
          foreColor={'#000000'}
        />
        <View style={styles.container}>
          <DateCarousel onDateSelected={(startDate, endDate) => handleDateChange(startDate, endDate)} />

          <Text style={styles.label}>Resumo do dia</Text>

          <View style={styles.ContainerCarousel}>
            <View style={styles.pageContainer}>
              <Text style={styles.title}>
                Saldo Caixa <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
              </Text>
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <TouchableOpacity onPress={handleBalanceClick}>
                  <Text style={styles.amount}>R${saldoCaixa ? formatCurrency(saldoCaixa.toFixed(2)) : '0,00'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.ContainerCircle}>
            <SalesChartCard selectedDate={selectedDate} />
          </View>
          <Text style={styles.label2}>Transações do dia</Text>
          <View style={styles.ContainerFilter}>
            <FilteredListCard selectedDate={selectedDate} />
          </View>
        </View>

        <OpeningBalanceModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} onSave={handleBalanceSave} />
        <TaxModal visible={isTaxModalVisible} onClose={() => setIsTaxModalVisible(false)} onSuccess={handleTaxModalSuccess} />
      </ScrollView>

      {/* View que contém os botões ActionButtons, flutuando e acompanhando o scroll */}
      <View style={styles.containerBottons}>
        <ActionButtons navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MainMenu;
