/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import BarTop from '../../../components/BarTop';
import { useTranslation } from 'react-i18next';
import '../../../translation';
import styles from './styles';

const Expiring = () => {
  const { t } = useTranslation();

  const renderSection = (title, receivable, expenses, balance, forecast) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Contas a receber</Text>
        <Text style={styles.valuePositive}>{`R$ ${receivable}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Contas a pagar</Text>
        <Text style={styles.valueNegative}>{`R$ ${expenses}`}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>
          Diferença
        </Text>
        <Text style={styles.value}>{`R$ ${forecast}`}</Text>
      </View>
    </View>
  );
   // Novo container para previsão de saldo de caixa
   const renderForecastContainer = (title, balance) => (
    <View style={styles.forecastContainer}>
      <Text style={styles.forecastTitle}>{title}</Text>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>Saldo</Text>
        <Text style={styles.forecastValue}>{`R$ ${balance}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <BarTop
        uriAvatar={'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'}
        titulo={t('partner')}
        subtitulo={'Planet Cellphones'}
        backColor={COLORS.primary}
        foreColor={'#000000'}
        routeMailer={''}
        routeCalculator={''}
      />
      <ScrollView style={styles.scrollContainer}>
        {renderSection('Vencendo hoje', '210,00', '100,00', '110,00', '110,00')}
        {renderSection('Próximos 7 dias', '2.100', '1.000', '1.100', '1.000,00')}
        <View style={styles.containerBase}>
        {renderSection('Próximos 30 dias', '21.000', '10.000', '11.000', '11.000,00')}
        {renderForecastContainer('Previsão de saldo de caixa daqui 30 dias', '23.000,00')}
        </View>
      </ScrollView>
    </View>
  );
};

export default Expiring;