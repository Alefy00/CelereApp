/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'

const Loan = ({ navigation }) => {
  const [valorPrestacao, setValorPrestacao] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('');
  const [dataVencimento, setDataVencimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Função para lidar com o salvamento dos dados do empréstimo
  const handleSave = () => {
    if (!valorPrestacao || !prazoMeses || !dataVencimento) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }

    //TODO: Lógica para salvar o empréstimo
    console.log('Empréstimo salvo:', { valorPrestacao, prazoMeses, dataVencimento });
    Alert.alert('Sucesso', 'Empréstimo salvo com sucesso.');
  };

  // Função para lidar com a mudança da data no DateTimePicker
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dataVencimento;
    setShowDatePicker(false);
    setDataVencimento(currentDate);
  };

  // Função para formatar a data para o formato 'pt-BR'
  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <BarTop2
            titulo={'Entradas'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
          <View style={styles.inputContainer}>
            <Text style={styles.textEmprestimo}>Empréstimo</Text>
            <TextInput
              style={styles.input}
              placeholder="Valor da prestação"
              value={valorPrestacao}
              onChangeText={setValorPrestacao}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Prazo em meses"
              value={prazoMeses}
              onChangeText={setPrazoMeses}
              keyboardType="numeric"
            />
            {/* Botão para abrir o DateTimePicker */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{formatDate(dataVencimento)}</Text>
            </TouchableOpacity>
            {/* Exibe o DateTimePicker se showDatePicker for verdadeiro */}
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={dataVencimento}
                mode={'date'}
                display="default"
                onChange={handleDateChange}
                locale="pt-BR"
              />
            )}
          </View>
          {/* Botão para salvar os dados do empréstimo */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Loan;
