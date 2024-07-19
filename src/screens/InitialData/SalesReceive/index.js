/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DatePicker from '../ExpensePage/components/DatePicker';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import BarTop2 from '../../../components/BarTop2';
import { COLORS } from '../../../constants';


const SalesReceive = ({ navigation }) => {
  const [client, setClient] = useState(''); 
  const [dueDate, setDueDate] = useState(''); 
  const [value, setValue] = useState(''); 
  const [recurrence, setRecurrence] = useState(''); 

  // Função para confirmar a data selecionada
  const handleDateConfirm = (date) => {
    setDueDate(date.toLocaleDateString('pt-BR')); 
  };

  // Função para salvar os dados e navegar para a tela inicial
  const handleSave = () => {
    // TODO: Lógica para salvar os dados no banco
    console.log('Cliente:', client);
    console.log('Data de vencimento:', dueDate);
    console.log('Valor:', value);
    console.log('Recorrência:', recurrence);
    navigation.navigate('Start'); // Navega para a tela inicial
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.label}>Cliente</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder='Insira o nome do cliente'
                value={client}
                onChangeText={setClient}
              />
            </View>

            <Text style={styles.label}>Data de vencimento</Text>
            <View style={styles.inputContainer}>
              <DatePicker label="Selecione a data" onConfirm={handleDateConfirm} />
            </View>

            <Text style={styles.label}>Valor</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o valor'
              keyboardType="numeric"
              value={value}
              onChangeText={setValue}
            />

            <Text style={styles.label}>Recorrência (Repete)</Text>
            <View style={styles.inputContainer}>
              <Picker
                selectedValue={recurrence}
                onValueChange={(itemValue) => setRecurrence(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione a recorrência" value="" />
                <Picker.Item label="Diário" value="diario" />
                <Picker.Item label="Semanal" value="semanal" />
                <Picker.Item label="Mensal" value="mensal" />
                <Picker.Item label="Anual" value="anual" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>SALVAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SalesReceive;
