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
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../services/apiConfig';
import mixpanel from '../../../services/mixpanelClient';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);

  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(Number(storedEmpresaId));
        mixpanel.identify(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
  }, []);

  const fetchSaldoCaixa = useCallback(async () => {
    try {
      if (empresaId && selectedDate) {
        const { dt_ini, dt_end } = selectedDate;
        const response = await axios.get(
           `${API_BASE_URL}/api/ms_datainf/composite/?empresa_id=${empresaId}&dt_ini=${dt_ini}&dt_end=${dt_end}`
        );

        if (response.status === 200 && response.data.status === 'success') {
          const saldoData = response.data.data.find(item => item.item === "Saldo Caixa");
          const saldoTotal = saldoData ? parseFloat(saldoData.valor.replace(/\./g, '').replace(',', '.')) : 0;
          setSaldoCaixa(saldoTotal);

          // Exibe o modal se o saldo for zero
          if (saldoTotal === 0) {
            setIsModalVisible(true);
          } else {
            setIsModalVisible(false);
          }
        } else {
          Alert.alert('Erro', 'Não foi possível recuperar o saldo de caixa.');
          setSaldoCaixa(0);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
      setSaldoCaixa(0);
    } finally {
      setLoading(false);
    }
  }, [empresaId, selectedDate]);

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
    initializeDateFilter();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchSaldoCaixa();
    }
  }, [selectedDate, fetchSaldoCaixa]);


  const handleBalanceClick = async () => {
    if (saldoCaixa === 0) {
      setIsModalVisible(true);
    } else {
      Alert.alert("Informação", "O saldo inicial já foi adicionado.");
    }
  };

  const formatCurrency = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const formattedValue = (cleanedValue / 100).toFixed(2);
    return formattedValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const initializeDateFilter = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate({ dt_ini: today, dt_end: today });
  };

  const handleDateChange = useCallback((startDate, endDate) => {
    setSelectedDate({ dt_ini: startDate, dt_end: endDate });
  }, []);

  useEffect(() => {
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
        <OpeningBalanceModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onBalanceSaved={fetchSaldoCaixa} // Chama fetchSaldoCaixa após salvar o saldo inicial
        />
      </ScrollView>
      <View style={styles.containerBottons}>
        <ActionButtons navigation={navigation} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default MainMenu;

