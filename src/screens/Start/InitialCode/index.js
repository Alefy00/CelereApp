/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import styles from './styles';


const InitialCode = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Insira o código recebido:</Text>
      <TextInput
        style={styles.input}
        placeholder='Insira o código'
      />
      <Button title='Enviar' onPress={() => navigation.navigate('BusinessInfoScreen')}/>
    </View>
  );
};

export default InitialCode;
