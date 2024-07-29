/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import BarTop2 from "../../../../../components/BarTop2";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';
import styles from './styles';

const CashBalance = ({ navigation }) => {
  const [selectedMode, setSelectedMode] = useState('Diário');
  const data = [
    { date: '31 Jan', value: 'R$ 1520,00', percentage: '+38.18%', isToday: false },
    { date: '01 Fev', value: 'R$ 1520,00', percentage: '+38.18%', isToday: false },
    { date: '02 Fev', value: 'R$ 1220,00', percentage: '+10.90%', isToday: false },
    { date: '03 Fev', value: 'R$ 1430,00', percentage: '+30%', isToday: false },
    { date: '04 Fev', value: 'R$ 1130,00', percentage: '+2.72%', isToday: false },
    { date: '05 Fev', value: 'R$ 625,00', percentage: '-48.18%', isToday: false },
    { date: '06 Fev (hoje)', value: 'R$ 810,00', percentage: '-26.36%', isToday: true },
    { date: '07 Fev', value: 'R$ 790,00', percentage: '-28.18%', isToday: false },
    { date: '08 Fev', value: 'R$ 1100,00', percentage: '', isToday: false, isStarred: true },
    { date: '09 Fev', value: 'R$ 1250,00', percentage: '+13.63%', isToday: false },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.item, item.isToday && styles.todayItem]}>
      <Text style={[styles.date, item.isToday && styles.todayText]}>{item.date}</Text>
      <View style={styles.valueContainer}>
        {item.isStarred ? (
          <Icon name="star" size={20} color="#FFF200" style={styles.starIcon} />
        ) : (
          <Text style={[
            styles.percentage,
            item.percentage.startsWith('+') ? styles.positive : styles.negative
          ]}>{item.percentage}</Text>
        )}
        <Text style={[styles.value, item.isToday && styles.todayText]}>{item.value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BarTop2
        titulo={'Retorno'}
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.textSaldo}>Saldo de Caixa</Text>
      <Text style={styles.textModo}>Periodo de tempo:</Text>
      <View style={styles.modeSelector}>
        {['Diário', 'Semanal', 'Mensal', 'Anual'].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.modeButton,
              selectedMode === mode && styles.selectedModeButton,
            ]}
            onPress={() => setSelectedMode(mode)}
          >
            <Text style={[
              styles.modeButtonText,
              selectedMode === mode && styles.selectedModeButtonText,
            ]}>{mode}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Meta de saldo de caixa</Text>
        <Text style={styles.footerValue}>R$ 1.100,00</Text>
      </View>
    </SafeAreaView>
  );
};

export default CashBalance;
