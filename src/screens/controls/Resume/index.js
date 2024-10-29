/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../constants';
import BarTop from '../../../components/BarTop';
import DateCarousel from './components/DateCarousel';
import styles from './styles';
import SalesChartCard from './components/SalesChartCard';
import FilteredListCard from './components/FilteredListCard';
import TourPopup from './components/TourPopup';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import OpeningBalanceModal from './components/OpeningBalanceModal';
import { useFocusEffect } from '@react-navigation/native';
import { API_BASE_URL } from '../../../services/apiConfig';
import mixpanel from '../../../services/mixpanelClient';

const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal de Saldo Inicial
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [saldoInicialInserido, setSaldoInicialInserido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const [isTourVisible, setIsTourVisible] = useState(true); // Controle de exibição do tour
  const [currentStep, setCurrentStep] = useState(1);

  // Referências para os elementos que terão pop-ups
  const dateCarouselRef = useRef();
  const saldoRef = useRef();

  // Lista de etapas do tour
  const tourSteps = [
    { description: 'Aqui você pode escolher o período de visualização.', ref: dateCarouselRef },
    { description: 'Este é o saldo de caixa, que reflete suas finanças.', ref: saldoRef },
  ];

  const handleNextStep = () => {
    if (currentStep < tourSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsTourVisible(false); // Finaliza o tour
    }
  };

  // Exibir o OpeningBalanceModal após o tour, se o saldo inicial ainda não tiver sido inserido
  useEffect(() => {
    if (!isTourVisible && !saldoInicialInserido) {
      setIsModalVisible(true); // Exibe o modal de saldo inicial após o tour
    }
  }, [isTourVisible, saldoInicialInserido]);

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
      
      if (saldo === 0 && !saldoInicialInserido && !isTourVisible) {
        setIsModalVisible(true); // Exibe o modal de saldo inicial apenas se o tour terminou
      } else {
        setSaldoInicialInserido(true);
      }
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  }, [fetchSaldoCaixa, saldoInicialInserido, isTourVisible]);

  useFocusEffect(
    useCallback(() => {
      getEmpresaId();
      updateSaldoCaixa();
    }, [getEmpresaId, updateSaldoCaixa])
  );

  const handleDateChange = useCallback((startDate, endDate) => {
    setSelectedDate({ dt_ini: startDate, dt_end: endDate });
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate({ dt_ini: today, dt_end: today });
    mixpanel.track('Tela principal Exibida');
  }, []);

  useEffect(() => {
    if (selectedDate) {
      updateSaldoCaixa();
    }
  }, [selectedDate, updateSaldoCaixa]);

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
          <DateCarousel ref={dateCarouselRef} onDateSelected={(startDate, endDate) => handleDateChange(startDate, endDate)} />
          <Text style={styles.label}>Resumo do dia</Text>
          <View style={styles.ContainerCarousel}>
            <View style={styles.pageContainer}>
              <Text ref={saldoRef} style={styles.title}>
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

        {/* Tour Pop-up */}
        {isTourVisible && (
          <TourPopup
            isVisible={isTourVisible}
            onNext={handleNextStep}
            currentStep={currentStep}
            totalSteps={tourSteps.length}
            description={tourSteps[currentStep - 1].description}
            targetRef={tourSteps[currentStep - 1].ref}
            onCloseComplete={handleNextStep} // Avança para o próximo pop-up após fechar o atual
          />
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MainMenu;
