/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../../constants';
import LiquidateNow from './components/LiquidateNow';
import AccountsReceivable from './components/AccountsReceivable';

const ServiceDetails = ({ navigation, route }) => {
  const { services } = route.params;
  const service = services[0];

  const [activeTab, setActiveTab] = useState('liquidar'); 

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      {/* Botão de Alternância */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'liquidar' && styles.activeTab]}
          onPress={() => setActiveTab('liquidar')}
        >
          <Text style={styles.toggleText}>Liquidar agora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, activeTab === 'contas' && styles.activeTab]}
          onPress={() => setActiveTab('contas')}
        >
          <Text style={styles.toggleText}>Contas a receber</Text>
        </TouchableOpacity>
      </View>

      {/* Renderiza o componente correspondente */}
      {activeTab === 'liquidar' ? (
        <LiquidateNow service={service}
        navigation={navigation} />
      ) : (
        <AccountsReceivable service={service}
        navigation={navigation}  />
      )}
    </View>
  );
};

export default ServiceDetails;
