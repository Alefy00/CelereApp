/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import BarTop2 from '../../../../components/BarTop2';
import { COLORS } from '../../../../constants';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './styles';


const DistributionSales = ({ navigation }) => {
  const [week1, setWeek1] = useState(''); 
  const [week2, setWeek2] = useState(''); 
  const [week3, setWeek3] = useState(''); 
  const [week4, setWeek4] = useState(''); 
  const [total, setTotal] = useState('3000,00'); 

  // Função para editar o total previsto mensal
  const handleEditTotal = () => {
    navigation.navigate('MonthlySalesForecast');
  };

  // Função para salvar os dados e navegar para a tela inicial
  const handleSave = () => {
    // TODO: lógica para salvar dados no banco
    console.log('Semana 1:', week1);
    console.log('Semana 2:', week2);
    console.log('Semana 3:', week3);
    console.log('Semana 4:', week4);
    console.log('Total:', total);
    navigation.navigate("Start"); // Navega para a tela inicial
  };

  // Função para voltar para a tela anterior
  const handleBack = () => {
    navigation.goBack();
  };

  // Retorna o layout principal do componente
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
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
            <Text style={styles.label}>Distribua suas vendas por semana</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.weekLabel}>1ª Semana do mês</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={week1}
                onChangeText={setWeek1}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.weekLabel}>2ª Semana do mês</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={week2}
                onChangeText={setWeek2}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.weekLabel}>3ª Semana do mês</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={week3}
                onChangeText={setWeek3}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.weekLabel}>4ª Semana do mês</Text>
              <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={week4}
                onChangeText={setWeek4}
              />
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total Previsto Mensal</Text>
                <View style={styles.totalRow}>
                    <Text style={styles.totalValue}>R$ {total}</Text>
                    <TouchableOpacity onPress={handleEditTotal}>
                        <Text style={styles.editIcon}>✎</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DistributionSales;
