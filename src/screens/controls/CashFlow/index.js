/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../../constants';
import BarTop from '../../../components/BarTop';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import '../../../translation';
import styles from './styles';
import IncomeDetails from './components/IncomeDatails';
import ExpenseDetails from './components/ExpenseDetails';
import DailyTable from './components/DailyTable';

const { width } = Dimensions.get('window');
const DAY_WIDTH = width / 6; // 5 dias visíveis por vez

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push({
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleString('pt-BR', { month: 'short' }).toUpperCase(),
      isSelected: false,
      isToday:
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear(),
    });
    date.setDate(date.getDate() + 1);
  }

  return days; // Garante que um array de dias seja sempre retornado
};

const TimePeriodFilter = ({ selectedPeriod, onSelectPeriod }) => {
  const periods = ['Diário', 'Semanal', 'Mensal', 'Anual'];

  return (
    <View style={styles.periodFilterContainer}>
      <Text style={styles.periodLabel}>Período de tempo:</Text>
      <View style={styles.periodButtonContainer}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period}
            style={[
              styles.periodButton,
              selectedPeriod === period && styles.selectedPeriodButton,
            ]}
            onPress={() => onSelectPeriod(period)}
          >
            <Text style={[
              styles.periodButtonText,
              selectedPeriod === period && styles.selectedPeriodButtonText,
            ]}>
              {period}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
const ViewSwitcher = ({ selectedView, onSelectView }) => {
  return (
    <View style={styles.viewSwitcherContainer}>
      <TouchableOpacity
        style={[
          styles.viewButton,
          selectedView === 'Por categoria' && styles.selectedViewButton,
        ]}
        onPress={() => onSelectView('Por categoria')}
      >
        <Text style={[
          styles.viewButtonText,
          selectedView === 'Por categoria' && styles.selectedViewButtonText,
        ]}>
          Por categoria
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.viewButton,
          selectedView === 'Por dia' && styles.selectedViewButton,
        ]}
        onPress={() => onSelectView('Por dia')}
      >
        <Text style={[
          styles.viewButtonText,
          selectedView === 'Por dia' && styles.selectedViewButtonText,
        ]}>
          Por dia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const DatePicker = ({ dates, selectedDateIndex, onDateSelect, onFilterPress }) => {
  const scrollViewRef = useRef(null);

  // Rola automaticamente para o dia atual ao carregar a tela
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollToSelectedDate(selectedDateIndex);
    }
  }, [selectedDateIndex]);

  // Função para rolar até a data selecionada
  const scrollToSelectedDate = (index) => {
    if (scrollViewRef.current) {
      const scrollPosition = index * DAY_WIDTH - (width / 2 - DAY_WIDTH / 2);
      scrollViewRef.current.scrollTo({ x: scrollPosition, animated: true });
    }
  };

  const handleDateSelect = (date, index) => {
    onDateSelect(date, index);
    scrollToSelectedDate(index); // Centraliza o dia selecionado
  };

  return (
    <View style={styles.datePickerContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        scrollEventThrottle={16}
        overScrollMode="never"
      >
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateContainer,
              date.isSelected && styles.selectedDate,
              date.isToday && styles.todayDate,
            ]}
            onPress={() => handleDateSelect(date, index)}
            activeOpacity={1}
          >
            <Text style={[styles.dateText, date.isSelected && styles.selectedDateText]}>
              {date.day}
            </Text>
            <Text style={[styles.monthText, date.isSelected && styles.selectedMonthText]}>
              {date.month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
        <Icon name="filter-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const FinanceSummary = () => {
  return (
    <View style={styles.financeSummaryContainer}>
      <View style={styles.row}>
        <Text style={styles.label}>Entradas</Text>
        <Text style={[styles.value, styles.income]}>R$ 210,00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Saídas</Text>
        <Text style={[styles.value, styles.expense]}>R$ 100,00</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={styles.label}>Resultado</Text>
        <Text style={[styles.value, styles.result]}>R$ 110,00</Text>
      </View>
    </View>
  );
};

const Winning = ({ navigation }) => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [dates, setDates] = useState(getDaysInMonth(month, year));
  const [selectedDateIndex, setSelectedDateIndex] = useState(new Date().getDate() - 1);
  const [selectedPeriod, setSelectedPeriod] = useState('Mensal');
  const [selectedView, setSelectedView] = useState('Por categoria');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const handleMonthSelect = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
    setDates(getDaysInMonth(selectedMonth, selectedYear)); // Atualiza a lista de dias conforme o mês e ano
    setSelectedDateIndex(0); // Reset para o primeiro dia do mês selecionado
    setModalVisible(false);  // Fecha o modal
  };
  
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setDates(getDaysInMonth(selectedMonth, year)); // Atualiza a lista de dias conforme o ano
  };
  
  const handleDateSelect = (selectedDate, index) => {
    const updatedDates = dates.map((date, i) => ({
      ...date,
      isSelected: i === index,
    }));
    setDates(updatedDates);
    setSelectedDateIndex(index);
  };

  const handleFilterPress = () => {
    setModalVisible(true);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.background }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }}>
          <>
            <BarTop
              uriAvatar={'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'}
              titulo={t('partner')}
              subtitulo={'Planeta Cell'}
              backColor={COLORS.primary}
              foreColor={'#000000'}
            />
            <DatePicker
              dates={dates || []}  // Garante que dates sempre seja um array
              selectedDateIndex={selectedDateIndex}
              onDateSelect={handleDateSelect}
              onFilterPress={handleFilterPress}
            />

            <TimePeriodFilter
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
            />
            <ViewSwitcher
              selectedView={selectedView}
              onSelectView={setSelectedView}
            />
            {selectedView === 'Por categoria' && (
            <View style={styles.categoryViewContainer}>
            <View style={{ backgroundColor: COLORS.background }}>
              <View style={styles.containerBase}>
                <View style={styles.containerInfo}>
                  <Text style={styles.balanceRecommended}>Saldo de caixa inicial</Text>
                  <Icon name="alert-circle" size={20} color={COLORS.lightGray} style={{ marginTop: 10 }} />
                </View>
                <Text style={styles.balanceRecommendedValue}>R$1.430,00</Text>
              </View>
              <FinanceSummary />
              <View style={styles.containerBase}>
                <View style={styles.containerInfo}>
                  <Text style={styles.balanceRecommended}>Saldo de caixa final</Text>
                  <Icon name="alert-circle" size={20} color={COLORS.lightGray} style={{ marginTop: 10 }} />
                </View>
                <Text style={styles.balanceRecommendedValue}>R$1.540,00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.incomeHeaderContainer}>
                <Icon name="arrow-up-outline" size={20} color={COLORS.green} />
                <Text style={styles.incomeHeaderText}>Entradas</Text>
              </View>
              <IncomeDetails />
              <View style={styles.divider} />
              <View style={styles.incomeHeaderContainer}>
                <Icon name="arrow-down-outline" size={20} color={COLORS.red} />
                <Text style={[styles.incomeHeaderText, { color: COLORS.red }]}>Despesas</Text>
              </View>
              <View style={{ marginBottom: 120 }}>
                <ExpenseDetails />
              </View>
            </View>

            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text>Selecione o Mês</Text>
                {Array.from({ length: 12 }).map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleMonthSelect(i)}
                    style={styles.monthOption}
                  >
                    <Text style={styles.monthText}>
                      {new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
            </View>
          )}
          {selectedView === 'Por dia' && (
          <View>
              <View style={styles.containerBase}>
                <View style={styles.containerInfo}>
                  <Text style={styles.balanceRecommended}>Saldo de caixa inicial</Text>
                  <Icon name="alert-circle" size={20} color={COLORS.lightGray} style={{ marginTop: 10 }} />
                </View>
                <Text style={styles.balanceRecommendedValue}>R$1.430,00</Text>
              </View>
            <FinanceSummary />
           <View style={styles.containerBase}>
              <View style={styles.containerInfo}>
                <Text style={styles.balanceRecommended}>Saldo de caixa final</Text>
                <Icon name="alert-circle" size={20} color={COLORS.lightGray} style={{ marginTop: 10 }} />
              </View>
              <Text style={styles.balanceRecommendedValue}>R$1.540,00</Text>
           </View>
           <View style={styles.divider} />
           
              <DailyTable selectedMonth={selectedMonth} selectedYear={selectedYear} />
           <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text>Selecione o Mês</Text>
                {Array.from({ length: 12 }).map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => handleMonthSelect(i)}
                    style={styles.monthOption}
                  >
                    <Text style={styles.monthText}>
                      {new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
         </View>
         
      )}
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

export default Winning;
