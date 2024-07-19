/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import styles from './styles';


const InitialRegistration = ({ navigation }) => {
  const [ddi, setDdi] = useState(''); // Estado para armazenar o DDI (código do país)
  const [isoCode, setIsoCode] = useState(''); // Estado para armazenar o código ISO do país

  // Mapeamento de DDI para código ISO
  const ddiToIso = {
    '1': 'US',
    '55': 'BR',
    '44': 'GB',
    '91': 'IN',
  };

  // Função para lidar com mudanças no campo DDI
  const handleDdiChange = (text) => {
    setDdi(text);
    const trimmedDdi = text.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (ddiToIso[trimmedDdi]) {
      setIsoCode(ddiToIso[trimmedDdi]);
    } else {
      setIsoCode('');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Informe o seu Telefone: </Text>
      <View style={styles.inputContainer}>
        {isoCode ? <CountryFlag isoCode={isoCode} size={25} /> : null}
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="DDI"
          value={ddi}
          onChangeText={handleDdiChange}
        />
        <TextInput
          style={styles.input}
          placeholder='DDD'
        />
        <TextInput
          style={styles.inputNumber}
          placeholder='0 0000-0000'
        />
      </View>
      <Button title="Enviar" onPress={() => navigation.navigate('InitialCode')} />
    </View>
  );
};

export default InitialRegistration;
