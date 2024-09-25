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

const API_URL_SALDO = 'https://api.celereapp.com.br/cad/saldo_caixa_inicial/';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const [saldoCaixa, setSaldoCaixa] = useState(null); // Estado para armazenar o saldo de caixa
  const [loading, setLoading] = useState(true); // Estado para exibir o indicador de carregamento
  const [modalWasShown, setModalWasShown] = useState(false); // Controle para verificar se o modal já foi mostrado

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
        console.log('Resposta da API:', response.data); // Log para verificar a resposta completa da API

        if (response.status === 200 && response.data.results.length > 0) {
          // Pega o último saldo inserido (maior ID ou mais recente)
          const saldoData = response.data.results.reduce((latest, current) => {
            return current.id > latest.id ? current : latest;
          });

          console.log('Último saldo encontrado:', saldoData); // Log para verificar o saldo retornado

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

  // Exibe o modal automaticamente na primeira vez que o usuário acessa a tela e não inseriu o saldo inicial
  useEffect(() => {
    const checkInitialBalance = async () => {
      const initialBalanceAdded = await AsyncStorage.getItem('initialBalanceAdded');
      if (!initialBalanceAdded && !modalWasShown) {
        setIsModalVisible(true);
        setModalWasShown(true); // Marca que o modal foi exibido
      }
    };

    checkInitialBalance();
    fetchSaldoCaixa(); // Carrega o saldo de caixa quando a tela é montada
  }, [fetchSaldoCaixa, modalWasShown]);

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Fecha o modal após adicionar o saldo
    fetchSaldoCaixa(); // Atualiza o saldo de caixa ao fechar o modal, exibindo o valor inserido
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

          {/* Campo de Saldo Caixa */}
          <View style={styles.ContainerCarousel}>
            <View style={styles.pageContainer}>
              <Text style={styles.title}>
                Saldo Caixa <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
              </Text>
              
              {/* Verifica se está carregando os dados */}
              {loading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <TouchableOpacity onPress={handleBalanceClick}>
                  <Text style={styles.amount}>R$ {saldoCaixa ? saldoCaixa.toFixed(2) : '0,00'}</Text>
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
          <View style={styles.containerBottons}>
            <ActionButtons navigation={navigation} />
          </View>
        </View>

        {/* Modal de saldo inicial */}
        <OpeningBalanceModal visible={isModalVisible} onClose={handleCloseModal} />

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MainMenu;
