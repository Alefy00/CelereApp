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
  const [isModalVisible, setIsModalVisible] = useState(false); // Visibilidade do OpeningBalanceModal
  const [isTaxModalVisible, setIsTaxModalVisible] = useState(false); // Estado para controlar a visibilidade do TaxModal
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  // Função para recuperar o saldo de caixa com base no ID da empresa logada
  const fetchSaldoCaixa = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId !== null) {
        // Faz a requisição para buscar o saldo de caixa
        const response = await axios.get(`${API_URL_SALDO}?empresa_id=${empresaId}`);

        if (response.status === 200 && response.data.results.length > 0) {
          // Pega o último saldo inserido (maior ID ou mais recente)
          const saldoData = response.data.results.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          });

          const saldoTotal = parseFloat(saldoData.valor_especie) + parseFloat(saldoData.saldo_banco); // Soma valor_especie e saldo_banco
          setSaldoCaixa(saldoTotal); // Armazena o saldo total

          // Se há saldo, abre o TaxModal
          const taxInfoAdded = await AsyncStorage.getItem('taxInfoAdded');
          if (!taxInfoAdded) {
            setIsTaxModalVisible(true);
          }
        } else {
          // Se não há saldo, abre o OpeningBalanceModal
          setSaldoCaixa(0);
          const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
          if (!initialBalanceAdded) {
            setIsModalVisible(true);
          }
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
    fetchSaldoCaixa(); // Faz a requisição de saldo ao montar o componente
  }, [fetchSaldoCaixa]);

  // Função para fechar o OpeningBalanceModal e atualizar o saldo
  const handleCloseModal = async () => {
    setIsModalVisible(false);
    await fetchSaldoCaixa(); // Atualiza o saldo de caixa após fechar o modal
  };

  // Função para salvar o saldo inicial
  const handleBalanceSave = async (saldo) => {
    if (saldo > 0) {
      await AsyncStorage.setItem('initialBalanceAdded', 'true'); // Marca que o saldo foi adicionado
      setIsModalVisible(false); // Fecha o modal de saldo
      await fetchSaldoCaixa(); // Atualiza o saldo
    } else {
      Alert.alert('Erro', 'Por favor, preencha o saldo inicial antes de continuar.');
    }
  };

  // Função para fechar o TaxModal após preenchido
  const handleTaxModalSuccess = async () => {
    setIsTaxModalVisible(false); // Fecha o TaxModal
    await AsyncStorage.setItem('taxInfoAdded', 'true'); // Armazena que o TaxModal foi preenchido
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
                  <Text style={styles.amount}>R${saldoCaixa ? formatCurrency(saldoCaixa.toFixed(2)) : '0,00'}</Text>
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

        <OpeningBalanceModal visible={isModalVisible} onClose={handleCloseModal} onSave={handleBalanceSave} />
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
