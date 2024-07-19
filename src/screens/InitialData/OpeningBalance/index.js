/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../components/BarTop2';
import { COLORS } from '../../../constants';

// Componente principal da página de Saldo Inicial
const OpeningBalance = ({ navigation }) => {
  const [cash, setCash] = useState('');
  const [bank, setBank] = useState('');

  // Função para salvar os dados e navegar para a tela inicial
  const handleSave = () => {
    // TODO: Lógica para salvar os dados no banco
    console.log('Dinheiro em espécie: ', cash);
    console.log('Dinheiro no banco: ', bank);
    navigation.navigate("Start"); // Navega para a tela inicial
  };

  // Retorna o layout principal do componente
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: Platform.OS === 'android' ? 55 : 105 }}>
        <BarTop2
          titulo={'Retorno'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>
      <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: Platform.OS === 'android' ? 0 : 50 }}>
        <Text style={styles.label}>
          Quanto seu negócio tem de dinheiro em espécie (em papel e moedas)
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currency}>R$</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0,00"
            value={cash}
            onChangeText={setCash}
          />
        </View>
        <Text style={styles.label}>Quanto seu negócio tem de saldo no banco?</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currency}>R$</Text>
          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='0,00'
            value={bank}
            onChangeText={setBank}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OpeningBalance;
