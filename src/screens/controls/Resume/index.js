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
import OpeningBalanceModal from './components/OpeningBalanceModal'; // Importe o modal
import TaxModal from './components/TaxModal';

const API_URL_SALDO = 'https://api.celereapp.com.br/cad/saldo_caixa_inicial/';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); //visibilidade do OpeningBalanceModal
  const [isTaxModalVisible, setIsTaxModalVisible] = useState(false); // Estado para controlar a visibilidade do TaxModal
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalWasShown, setModalWasShown] = useState(false);

    // Função para abrir o modal de impostos (TaxModal)
    const openTaxModal = () => {
      setIsTaxModalVisible(true);
    };

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        console.log('ID da empresa recuperado:', storedEmpresaId); // Verifica se o ID foi recuperado corretamente
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
        console.log('ID da empresa não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  // Função para recuperar o saldo de caixa com base no ID da empresa logada
  const fetchSaldoCaixa = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId(); // Usamos a função para pegar o ID da empresa
      console.log('ID da empresa recuperado:', empresaId); // Log para verificar o ID da empresa

      if (empresaId !== null) {
        // Faz a requisição para buscar o saldo de caixa
        const response = await axios.get(`${API_URL_SALDO}?empresa_id=${empresaId}`);

        if (response.status === 200 && response.data.results.length > 0) {
          // Pega o último saldo inserido (maior ID ou mais recente)
          const saldoData = response.data.results.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          });

          const saldoTotal = parseFloat(saldoData.valor_especie) + parseFloat(saldoData.saldo_banco); // Soma valor_especie e saldo_banco
          console.log('Saldo total calculado:', saldoTotal); // Log para verificar o saldo total
          
          setSaldoCaixa(saldoTotal); // Armazena o saldo total
        } else {
          console.log('Nenhum saldo encontrado para a empresa'); // Log para caso não haja resultados
          setSaldoCaixa(0); // Se não houver saldo, define como 0
        }
      }
    } catch (error) {
      console.error('Erro ao buscar o saldo de caixa:', error.message);
      setSaldoCaixa(0); // Define como 0 em caso de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }, []);

  useEffect(() => {
    const checkInitialBalanceAndTax = async () => {
      const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
      const taxInfoAdded = await AsyncStorage.getItem('taxInfoAdded');
  
      // Verifica se o saldo inicial já foi adicionado
      if (!initialBalanceAdded && !modalWasShown) {
        setIsModalVisible(true); // Abre o modal de saldo inicial
        setModalWasShown(true);
      }
      // Só verifica o TaxModal após o saldo inicial ter sido adicionado
      else if (initialBalanceAdded && !taxInfoAdded) {
        setIsTaxModalVisible(true); // Exibe o TaxModal se ainda não tiver sido preenchido
      }
    };
  
    checkInitialBalanceAndTax();
    fetchSaldoCaixa();
  }, [fetchSaldoCaixa, modalWasShown]);
  

 // Função para fechar o modal de saldo e abrir o modal de impostos
 const handleCloseModal = () => {
  setIsModalVisible(false); // Fecha o OpeningBalanceModal
  fetchSaldoCaixa(); // Atualiza o saldo de caixa
  openTaxModal(); // Abre o modal de impostos (TaxModal)
};

 // Função para fechar o TaxModal após preenchido
  const handleTaxModalSuccess = async () => {
    setIsTaxModalVisible(false); // Fecha o TaxModal
    await AsyncStorage.setItem('taxInfoAdded', 'true'); // Armazena que o TaxModal foi preenchido
  };

  // Função para abrir o modal ao clicar em "Saldo Caixa" se o saldo inicial ainda não foi preenchido
  const handleBalanceClick = async () => {
    const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
    if (!initialBalanceAdded) {
      setIsModalVisible(true); // Se o saldo ainda não foi adicionado, exibe o modal
    } else {
      Alert.alert("Informação", "O saldo inicial já foi adicionado.");
    }
  };
  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = (cleanedValue / 100).toFixed(2);
    return formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
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
          <DateCarousel onDateSelected={() => {}} />
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
                  <Text style={styles.amount}>R${saldoCaixa ?  formatCurrency(saldoCaixa.toFixed(2)) : '0,00'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.ContainerCircle}>
            <SalesChartCard />
          </View>
          <Text style={styles.label2}>Transações do dia</Text>
          <View style={styles.ContainerFilter}>
            <FilteredListCard />
          </View>
        </View>

        <OpeningBalanceModal visible={isModalVisible} onClose={handleCloseModal} />
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
