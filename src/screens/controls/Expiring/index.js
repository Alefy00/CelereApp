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
        <Text style={styles.label}>Despesas</Text>
        <Text style={styles.valueNegative}>{`R$ ${expenses}`}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.label}>
          Saldo{' '}
          <Text style={styles.labelSmall}>(Contas a receber - Despesas)</Text>
        </Text>
        <Text style={styles.value}>{`R$ ${balance}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>
          Saldo de caixa previsto{' '}
          <Text style={styles.labelSmall}>(fim do dia)</Text>
        </Text>
        <Text style={styles.value}>{`R$ ${forecast}`}</Text>
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
        {renderSection('Vencendo hoje', '210', '100', '110', '1.310')}
        {renderSection('Próximos 7 dias', '2.100', '1.000', '1.100', '2.810')}
        <View style={styles.containerBase}>
        {renderSection('Próximos 30 dias', '21.000', '10.000', '11.000', '14.540')}
        </View>
      </ScrollView>
    </View>
  );
};

export default Expiring;