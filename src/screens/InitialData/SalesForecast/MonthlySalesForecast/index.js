/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';  // Já componentizada, sem mudança
import { COLORS } from '../../../../constants';
import ProgressBar2 from '../components/ProgressBar2';
import Icon from 'react-native-vector-icons/Ionicons';

const MonthlySalesForecast = ({ navigation }) => {
  const [salesForecast, setSalesForecast] = useState(''); 

  const handleNext = () => {
    navigation.navigate('HowBusiness'); // Navega para a próxima tela
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Componente de Barra de Progresso */}
          <View style={{ height: 50 }}>
            <BarTop3
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
          <ProgressBar2 currentStep={1} totalSteps={3} />

          {/* Corpo principal */}
          <View style={styles.content}>
            <Text style={styles.title}>Quanto você faturou mês passado?</Text>

            {/* Input de valor */}
            <View style={styles.inputContainer}>
            <Text style={styles.subtitle}>
              Se você não teve faturamento, coloque sua previsão para esse mês.
            </Text>
              <TextInput
                style={styles.input}
                placeholder='Digite um valor (R$)'
                keyboardType="numeric"
                value={salesForecast}
                onChangeText={setSalesForecast}
              />
            </View>

            {/* Botão de continuar */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Icon name="arrow-forward" size={24} color={COLORS.black} />
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MonthlySalesForecast;
