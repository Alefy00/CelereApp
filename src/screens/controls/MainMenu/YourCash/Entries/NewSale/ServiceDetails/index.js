/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../../constants';
import LiquidateNow from './components/LiquidateNow';
import AccountsReceivable from './components/AccountsReceivable';

const ServiceDetails = ({ navigation, route }) => {
  const { services, products = [] } = route.params; // Recebe serviços e produtos via rota
  const [activeTab, setActiveTab] = useState('liquidar');

  // Verifica se há serviços disponíveis
  if (!services || services.length === 0) {
    Alert.alert('Erro', 'Nenhum serviço encontrado.');
    return null; // Não renderiza a tela caso não haja serviços
  }

  const service = services[0]; // Acessa o primeiro serviço da lista

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
        <LiquidateNow 
          service={service} 
          products={products}  // Passa os produtos para o LiquidateNow
          navigation={navigation} 
          route={route} 
        />
      ) : (
        <AccountsReceivable 
          service={service} 
          navigation={navigation}
          route={route} 
        />
      )}
    </View>
  );
};

export default ServiceDetails;
