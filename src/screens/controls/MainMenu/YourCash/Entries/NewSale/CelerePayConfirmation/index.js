/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import BarTop3 from '../../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../../constants';
// Ícone será importado quando estiver disponível
import PaymentIcon from '../../../../../../../assets/images/svg/CelerePay/CardPayment.svg';

const CelerePayConfirmation = ({ navigation, route }) => {
  const { totalPrice } = route.params;  // Recebe o valor total

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

      <View style={styles.container}>
        {/* Texto explicativo */}
        <Text style={styles.instructionText}>Aproxime o cartão{'\n'} na parte de trás do seu telefone</Text>

        {/* Ícone central */}
        <PaymentIcon width={250} height={250} style={styles.iconStyle} />

        {/* Exibir valor da transação */}
        <Text style={styles.valueLabel}>Valor</Text>
        <Text style={styles.valueText}>R$ {totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default CelerePayConfirmation;
