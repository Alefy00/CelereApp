/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../components/BarTop3';
import styles from './styles';
import { COLORS } from '../../../../constants';
import CelerePayIcon from '../../../../assets/images/svg/CelerePay/CelerePayIcon.svg'; // Importe o SVG como componente

const MaxTransparency = ({ navigation }) => {

  const handleContinue = () => {
    navigation.navigate('CelerePayRegister');
  };

  return (
    <View style={styles.containerBase}>
      {/* Barra superior */}
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
        />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.container}>
        <Text style={styles.title}>Célere Pay</Text>
        <Text style={styles.subTitle}>Máxima transparência</Text>
        <Text style={styles.taxInfo}>
            Em cada venda, nós mostramos o valor da taxa{'\n'}descontada e valor líquido que você receberá.
        </Text>

        <View style={styles.containerIcon}>
            <CelerePayIcon width={245} height={245} style={styles.icon} />
            <Text style={styles.installmentText}>Em até 12x</Text>
        </View>

        <Text style={styles.descriptionTitle}>Máximo controle</Text>
        <Text style={styles.description}>
          Despesa categorizada no seu fluxo de caixa{'\n'}
          por dia, semana, mês e ano.
        </Text>
      </View>

      {/* Botão de continuar no final */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleContinue}>
          <Icon name="arrow-forward" size={22} color={COLORS.primary} />
          <Text style={styles.confirmButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MaxTransparency;
