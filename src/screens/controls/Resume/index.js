/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants';
import BarTop from '../../../components/BarTop';
import DateCarousel from './components/DateCarousel';
import styles from './styles';
import SalesChartCard from './components/SalesChartCard';
import FilteredListCard from './components/FilteredListCard';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import OpeningBalanceModal from './components/OpeningBalanceModal';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../services/apiConfig';
import mixpanel from '../../../services/mixpanelClient';
import TourWrapper from './components/TourWrapper';
import { TourProvider, useTour } from '../../../services/TourContext';

const MainMenu = ({ navigation }) => {
  const { setIsTourActive } = useTour();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [saldoInicialInserido, setSaldoInicialInserido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const [tourStep, setTourStep] = useState(0);
  const tourMessages = useMemo(() => [
    { text: "Aqui você pode escolher o período de visualização.", key: 'dateCarousel', position: { top: 120, left: 80 }, arrowPosition: 'top' },
    { text: "Aqui você acompanha quanto seu negócio tem de dinheiro automaticamente a cada venda ou pagamento de despesa.", key: 'saldoCaixa', position: { top: 255, left: 70 }, arrowPosition: 'top' },
    { text: "Sempre que você tocar neste ícone, uma explicação irá aparecer.", key: 'icon', position: { top: 220, left: 92 }, arrowPosition: 'top' },
    { text: "Aqui serão listadas as entradas e saídas uma a uma.", key: 'filteredListCard', position: { top: 330, left: 55 }, arrowPosition: 'bottom' },
    { text: "Por aqui você insere vendas e despesas, realiza consultas, cadastra produtos, e muito mais.", key: 'ActionBotton', position: { top: 400, left: 70 }, arrowPosition: 'bottom' },
  ], []);

  const scrollViewRef = useRef(null);

  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(Number(storedEmpresaId));
        mixpanel.identify(storedEmpresaId);
      } else {
        throw new Error('ID da empresa não carregado. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
      Alert.alert('Erro', error.message);
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
          return saldoTotal;
        } else {
          throw new Error('Não foi possível recuperar o saldo de caixa.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
      throw error;
    }
  }, [empresaId, selectedDate]);

  const updateSaldoCaixa = useCallback(async () => {
    setLoading(true);
    try {
      const saldo = await fetchSaldoCaixa();
      setSaldoCaixa(saldo);

      if (saldo === 0 && !saldoInicialInserido && tourStep === tourMessages.length) {
        setIsModalVisible(true);
      } else {
        setSaldoInicialInserido(true);
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }, [fetchSaldoCaixa, saldoInicialInserido, tourStep, tourMessages.length]);

  useFocusEffect(
    useCallback(() => {
      getEmpresaId();
      updateSaldoCaixa();
    }, [getEmpresaId, updateSaldoCaixa])
  );

  const handleDateChange = useCallback((startDate, endDate) => {
    setSelectedDate({ dt_ini: startDate, dt_end: endDate });
  }, []);

  const handleBalanceClick = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSaldoInicialInserido(true); // Garante que o modal só apareça manualmente após o primeiro fechamento
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <TourProvider>
      <TourWrapper
        tourMessages={tourMessages}
        onTourComplete={() => setIsTourActive(false)} // Finaliza o tour e desbloqueia o menu
      >
    <KeyboardAvoidingView behavior="position" enabled>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: "#FDFCF0" }} scrollEnabled={tourStep >= tourMessages.length}>
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
                <View>
                  <TouchableOpacity disabled={true}>
                    <Text 
                      style={[
                        styles.amount,
                        { color: parseFloat(saldoCaixa) < 0 ? COLORS.red : COLORS.green }
                      ]}
                    >
                      {formatCurrency(saldoCaixa || 0)}
                    </Text>
                  </TouchableOpacity>
                  {saldoCaixa !== null && (
                    <TouchableOpacity onPress={handleBalanceClick} style={styles.updateButton}>
                      <Text style={styles.updateButtonText}>Atualizar Saldo</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.ContainerCircle}>
            <SalesChartCard selectedDate={selectedDate} />
          </View>
          <Text style={styles.label2}>Fluxo de caixa do dia</Text>
          <View style={styles.ContainerFilter}>
            <FilteredListCard selectedDate={selectedDate} navigation={navigation} />
          </View>
        </View>
        
        {/* Modal de Saldo Inicial */}
        <OpeningBalanceModal
          visible={isModalVisible}
          onClose={handleModalClose}
          onBalanceSaved={updateSaldoCaixa}
        />
      </ScrollView>
    </KeyboardAvoidingView>
    </TourWrapper>
    </TourProvider>
  );
};

export default MainMenu;
