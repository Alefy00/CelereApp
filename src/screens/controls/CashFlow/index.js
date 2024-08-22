/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Animated,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../../constants';
import { Container, Scroller } from './styles';
import BarTop from '../../../components/BarTop';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import '../../../translation';
import styles from './styles';
import DailyView from './components/DailyView';

const Winning = ({ navigation }) => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState('JAN');
  const [viewMode, setViewMode] = useState('Por Categoria');
  const [fadeAnim] = useState(new Animated.Value(1));

  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];


  const dailyTransactions = [
    { date: '2024-08-01', entradas: 500, saidas: 200 },
    { date: '2024-08-02', entradas: 300, saidas: 100 },
    // ... outros dias
  ];

  const toggleViewMode = (mode) => {
    if (viewMode !== mode) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setViewMode(mode);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }
  };

  const handleMenu = () => {
    navigation.navigate("MainTab");
  };

  const renderMonth = (month) => (
    <TouchableOpacity
      key={month}
      style={[styles.monthButton, selectedMonth === month && styles.selectedMonthButton]}
      onPress={() => setSelectedMonth(month)}
    >
      <Text style={[styles.monthButtonText, selectedMonth === month && styles.selectedMonthButtonText]}>{month}</Text>
    </TouchableOpacity>
  );

  return (
    <Container backColor={COLORS.background}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop
              uriAvatar={'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'}
              titulo={t('partner')}
              subtitulo={'Planeta Cell'}
              backColor={COLORS.primary}
              foreColor={'#000000'}
            />
            <Scroller style={{ paddingTop: 10 }}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
                {months.map(renderMonth)}
              </ScrollView>
              <View style={styles.toggleContainer}>
                <TouchableOpacity
                  style={[styles.toggleButton, viewMode === 'Por Categoria' && styles.selectedToggleButton]}
                  onPress={() => toggleViewMode('Por Categoria')}
                >
                  <Text style={[styles.toggleButtonText, viewMode === 'Por Categoria' && styles.selectedToggleButtonText]}>
                    Por Categoria
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.toggleButton, viewMode === 'Por dia' && styles.selectedToggleButton]}
                  onPress={() => toggleViewMode('Por dia')}
                >
                  <Text style={[styles.toggleButtonText, viewMode === 'Por dia' && styles.selectedToggleButtonText]}>
                    Por dia
                  </Text>
                </TouchableOpacity>
              </View>
              <Animated.View style={{ opacity: fadeAnim }}>
                {viewMode === 'Por Categoria' ? (
                  <View style={styles.contentContainer}>
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Saldo de caixa Inicial</Text>
                      <Text style={styles.sectionValue}>R$ 1.430,00</Text>
                    </View>
                    <View style={styles.summaryBox}>
                      <View style={styles.summaryItem}>
                        <Text style={styles.summaryText}>Entradas</Text>
                        <Text style={styles.summaryText}>Saídas</Text>
                        <Text style={styles.summaryText}>Saldo</Text>
                      </View>
                      <View style={styles.summaryItemValue}>
                        <Text style={styles.summaryValue}>R$ 10.000</Text>
                        <Text style={styles.summaryValueRed}>R$ 21.000</Text>
                        <Text style={styles.summaryValue}>R$ 11.000</Text>
                      </View>
                    </View>
                    <View style={styles.section2}>
                      <Text style={styles.sectionTitle}>Saldo de caixa Final</Text>
                      <Text style={styles.sectionValue}>R$ 1.540,00</Text>
                    </View>
                    <View style={styles.entrySection}>
                      <View style={styles.containerIcon}>
                        <Icon name="arrow-up" size={20} color={COLORS.green} />
                        <Text style={styles.entryTitle}>Entradas</Text>
                      </View>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryHeaderText}>Descrição</Text>
                        <Text style={styles.entryHeaderText}>Previsto</Text>
                        <Text style={styles.entryHeaderText}>Realizado</Text>
                      </View>
                      <View style={styles.entryItem}>
                        <Text style={styles.entryItemText}>Vendas</Text>
                        <Text style={styles.entryItemValue}>R$ 200</Text>
                        <Text style={styles.entryItemValue}>R$ 210</Text>
                      </View>
                      <View style={styles.entryItem}>
                        <Text style={styles.entryItemText}>Fiados Recebidos</Text>
                        <Text style={styles.entryItemValue}>R$ 0,00</Text>
                        <Text style={styles.entryItemValue}>R$ 0,00</Text>
                      </View>
                      <View style={styles.entryItem}>
                        <Text style={styles.entryItemText}>Outros</Text>
                        <Text style={styles.entryItemValue}>R$ 0,00</Text>
                        <Text style={styles.entryItemValue}>R$ 0,00</Text>
                      </View>
                      <View style={styles.entryTotal}>
                        <Text style={styles.entryTotalText}>Total</Text>
                        <Text style={styles.entryTotalValue}>R$ 200</Text>
                        <Text style={styles.entryTotalValue}>R$ 210</Text>
                      </View>
                    </View>
                    <View style={styles.exitSection}>
                      <View style={styles.containerIcon}>
                        <Icon name="arrow-down" size={20} color={COLORS.red} />
                        <Text style={styles.exitTitle}>Saídas</Text>
                      </View>
                      <View style={styles.exitHeader}>
                        <Text style={styles.exitHeaderText}>Descrição</Text>
                        <Text style={styles.exitHeaderText}>Previsto</Text>
                        <Text style={styles.exitHeaderText}>Liquidado</Text>
                      </View>
                      <View style={styles.exitItem}>
                        <Text style={styles.exitItemText}>Fornecedores</Text>
                        <Text style={styles.exitItemValue}>R$ 100</Text>
                        <Text style={styles.exitItemValue}>R$ 100</Text>
                      </View>
                      <View style={styles.exitItem}>
                        <Text style={styles.exitItemText}>Aluguel</Text>
                        <Text style={styles.exitItemValue}>R$ 0,00</Text>
                        <Text style={styles.exitItemValue}>R$ 0,00</Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <DailyView dailyTransactions={dailyTransactions} selectedMonth={months.indexOf(selectedMonth)} />

                )}
              </Animated.View>
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Winning;
