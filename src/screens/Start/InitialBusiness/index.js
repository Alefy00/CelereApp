/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';

const BusinessInfoScreen = ({ navigation }) => {
  const [businessName, setBusinessName] = useState('');
  const [role, setRole] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleNext = () => {
    // Aqui você pode adicionar a lógica para salvar os dados e navegar para a próxima tela
    navigation.navigate('InitialBranch'); // Substitua 'NextScreen' pelo nome da próxima tela
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={styles.progress} />
        <Text style={styles.stepText}>3 de 4 passos</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome do seu negócio"
        value={businessName}
        onChangeText={setBusinessName}
      />

      <Text style={styles.label}>Você é?</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          style={styles.picker}
          onValueChange={(itemValue) => setRole(itemValue)}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Proprietário(a)" value="Proprietário(a)" />
          <Picker.Item label="Sócio(a)" value="Sócio(a)" />
          <Picker.Item label="Gerente" value="Gerente" />
          <Picker.Item label="Vendedor(a)" value="Vendedor(a)" />
          <Picker.Item label="Funcionário(a)" value="Funcionário(a)" />
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="CNPJ (se tiver)"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Avançar</Text>
      </TouchableOpacity>
    </View>
  );
};


export default BusinessInfoScreen;
