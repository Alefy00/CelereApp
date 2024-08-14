/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progress: {
    flex: 1,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  stepText: {
    marginLeft: 10,
    fontSize: 12,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  pickerContainer: {
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  button: {
    height: 50,
    backgroundColor: '#FFEB3B',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default BusinessInfoScreen;
