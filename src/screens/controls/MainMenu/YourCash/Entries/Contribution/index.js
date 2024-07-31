/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from './styles'
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';

const Contribution = ({ navigation }) => {
    const [dataAporte, setDataAporte] = useState(new Date());
    const [valorAporte, setValorAporte] = useState('');
    const [origemAporte, setOrigemAporte] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    const origens = [
      'Investidor Anjo',
      'Venture Capital',
      'Crowdfunding',
      'Fundos de Investimento',
      'Outros'
    ];
  
    const handleSave = () => {
      if (!dataAporte || !valorAporte || !origemAporte) {
        Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
        return;
      }
  
      // Lógica para salvar o aporte
      console.log('Aporte salvo:', { dataAporte, valorAporte, origemAporte });
      Alert.alert('Sucesso', 'Aporte salvo com sucesso.');
      navigation.navigate('Entries')
    };
  
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dataAporte;
      setShowDatePicker(false);
      setDataAporte(currentDate);
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
              <Text style={styles.textAporte}>Aporte</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
                <Text>{dataAporte.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dataAporte}
                  mode={'date'}
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <TextInput
                style={styles.input}
                placeholder="Valor do aporte"
                value={valorAporte}
                onChangeText={setValorAporte}
                keyboardType="numeric"
              />
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={origemAporte}
                  onValueChange={(itemValue) => setOrigemAporte(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecione a origem do aporte" value="" />
                  {origens.map((origem, index) => (
                    <Picker.Item key={index} label={origem} value={origem} />
                  ))}
                </Picker>
              </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

export default Contribution;