/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../components/BarTop2';
import { COLORS } from '../../../../constants';


const MonthlySalesForecast = ({ navigation }) => {
  const [salesForecast, setSalesForecast] = useState(''); 

  // Função para salvar os dados e navegar para a próxima tela
  const handleNext = () => {
    // TODO: Lógica para salvar os dados no banco
    console.log('Previsão de venda mensal:', salesForecast);
    navigation.navigate('HowBusiness'); // Navega para a tela de Como Funciona Seu Negócio
  };

  // Retorna o layout principal do componente
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Retorno'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Qual que é a sua previsão de venda mensal?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='R$ 0,00'
                keyboardType="numeric"
                value={salesForecast}
                onChangeText={setSalesForecast}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MonthlySalesForecast;
