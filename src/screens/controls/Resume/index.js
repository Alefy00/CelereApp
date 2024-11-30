/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, View, Text, Alert, BackHandler, StyleSheet } from 'react-native';
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
import moment from 'moment-timezone';
import BaseCarousel from './components/Carousel/BaseCarousel';
import { useTour } from './components/TourContext';
import { useScroll } from './components/ScrollContext';


const MainMenu = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [saldoCaixa, setSaldoCaixa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);
  const { elementPositions, setElementPositions } = useTour();
  const dateCarouselRef = useRef(null);
  const baseCarouselRef = useRef(null);
  const SalesChartCardRef = useRef(null);
  const FilteredListCardRef = useRef(null);
  const { scrollViewRef } = useScroll();
  const { isTourVisible } = useTour();

  const handleDelayedLayout = (key, ref) => {
    setTimeout(() => {
      ref.current?.measure((fx, fy, width, height, px, py) => {
        setElementPositions((prev) => ({
          ...prev,
          [key]: { x: px, y: py, width, height },
        }));
      });
    }, 500); // Atraso de 500ms
  };
    
    // Função para lidar com o botão de voltar do dispositivo
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          Alert.alert(
            'Sair do Aplicativo',
            'Você já está na tela principal. Deseja sair?',
            [
              { text: 'Não', style: 'cancel' },
              { text: 'Sim', onPress: () => BackHandler.exitApp() }
            ]
          );
          return true;
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
    );

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
// Atualize a função fetchSaldoCaixa para lidar com saldos negativos
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
        
        // Define o saldo e impede novas requisições se o saldo for negativo
        setSaldoCaixa(saldoTotal);

        if (saldoTotal >= 0) {
          const modalDismissed = await checkModalStatus();
          if (saldoTotal === 0 && !modalDismissed) {
            setIsModalVisible(true);
          }
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

useEffect(() => {
  initializeDateFilter();
}, [initializeDateFilter]);
  
  // Função para verificar se o modal já foi exibido e "deixado para depois"
  const checkModalStatus = async () => {
    const dismissed = await AsyncStorage.getItem('openingBalanceDismissed');
    return dismissed === 'true';
  };

  // Função para salvar o estado de "deixar para depois"
  const setModalDismissed = async () => {
    await AsyncStorage.setItem('openingBalanceDismissed', 'true');
  };

  useEffect(() => {
    const checkAndShowOpeningBalance = async () => {
      const modalDismissed = await checkModalStatus();
      if (!isTourVisible && !modalDismissed && saldoCaixa === 0) {
        setIsModalVisible(true); // Exibe o OpeningBalanceModal somente após o TourModal ser concluído
      }
    };

    checkAndShowOpeningBalance();
  }, [isTourVisible, saldoCaixa]);

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
    if (selectedDate) {
      fetchSaldoCaixa();
    }
  }, [selectedDate, fetchSaldoCaixa]);


// Função de inicialização para exibir o modal apenas se necessário
const initializeDateFilter = useCallback(async () => {
  const brasilTime = moment().tz('America/Sao_Paulo');
  const today = brasilTime.format('YYYY-MM-DD');
  setSelectedDate({ dt_ini: today, dt_end: today });

  const modalDismissed = await checkModalStatus();
  
  // Verifica o saldo apenas se ainda não tiver sido "deixado para depois"
  if (!modalDismissed && saldoCaixa === 0) {
    setIsModalVisible(true);
  }
}, [saldoCaixa]);

  const handleDateChange = useCallback((startDate, endDate) => {
    setSelectedDate({ dt_ini: startDate, dt_end: endDate });
  }, []);

  useEffect(() => {
    mixpanel.track('Tela principal Exibida');
  }, []);

  // Modifique handleModalClose para definir que o modal foi "deixado para depois" quando fechado
  const handleModalClose = useCallback(() => {
    setIsModalVisible(false);
    setModalDismissed(); // Salva o estado de "deixado para depois"
    
    if (saldoCaixa >= 0) {
      fetchSaldoCaixa();   // Atualiza o saldo apenas se ele não for negativo
    }
  }, [fetchSaldoCaixa, saldoCaixa]);

  const refreshDataWithCurrentDate = () => {
    const brasilTime = moment().tz('America/Sao_Paulo');
    const today = brasilTime.format('YYYY-MM-DD');
    setSelectedDate({ dt_ini: today, dt_end: today }); // Atualiza selectedDate para a data atual
  };

  const refreshFilteredList = useCallback(() => {
    // Implementação para atualizar o FilteredListCard, por exemplo, alterando um estado trigger.
    setSelectedDate((prevDate) => ({ ...prevDate })); // Isso força uma re-renderização do componente com a mesma data.
  }, []);
  

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <ScrollView ref={scrollViewRef} style={{ backgroundColor: "#FDFCF0" }}>
        <BarTop
          subtitulo={'Célere'}
          backColor={COLORS.primary}
          foreColor={'#000000'}
        />
        <View ref={dateCarouselRef} onLayout={() => handleDelayedLayout('dateCarousel', dateCarouselRef)}
        style={styles.container}>
          <DateCarousel  onDateSelected={(startDate, endDate) => handleDateChange(startDate, endDate)} />
          <Text style={styles.label}>Resumo do dia</Text>

          <View
            ref={baseCarouselRef}
            onLayout={() => handleDelayedLayout('baseCarousel', baseCarouselRef)}
            style={{ flex: 1 }}
          >
            <BaseCarousel
              empresaId={empresaId}
              selectedDate={selectedDate}
              onAdjustPress={() => setIsModalVisible(true)}
            />
          </View>

          <View ref={SalesChartCardRef} onLayout={() => handleDelayedLayout('SalesChartCard', SalesChartCardRef)} style={styles.ContainerCircle}>
            <SalesChartCard selectedDate={selectedDate} />
          </View>
          <Text style={styles.label2}>Fluxo de caixa por lançamento</Text>
          <View ref={FilteredListCardRef} onLayout={() => handleDelayedLayout('FilteredListCard', FilteredListCardRef)} style={styles.ContainerFilter}>
          <FilteredListCard
            selectedDate={selectedDate}
            navigation={navigation} 
            onSaleCanceledRefresh={refreshDataWithCurrentDate} // Passa a função para atualizar a data
          />
          </View>
        </View>
        <OpeningBalanceModal
          visible={isModalVisible && !isTourVisible}
          onClose={handleModalClose}
          onBalanceSaved={() => {
            fetchSaldoCaixa(); // Chama fetchSaldoCaixa após salvar o saldo inicial
            refreshFilteredList(); // Atualiza o FilteredListCard
          }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MainMenu;
