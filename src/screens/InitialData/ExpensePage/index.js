/* eslint-disable prettier/prettier */
import styles from './styles';
import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from './components/DatePicker';
import BarTop2 from '../../../components/BarTop2';
import { COLORS } from '../../../constants';

const ExpensePage = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [item, setItem] = useState('');
  const [supplier, setSupplier] = useState('');
  const [isRepeated, setIsRepeated] = useState(false);
  const [months, setMonths] = useState('');
  const [monthsOptions, setMonthsOptions] = useState([]);

  useEffect(() => {
    const fetchMonthsOptions = async () => {
      try {
        //TODO: substituir pelo endpoint real
        const response = await fetch('https://api.example.com/months');
        const data = await response.json();
        setMonthsOptions(data);
      } catch (error) {
       // console.error("Erro ao buscar opções de meses:", error);
      }
    };

    fetchMonthsOptions();
  }, []);

  const handleSave = () => {
    //TODO: Lógica para salvar os dados no banco
    console.log('Categoria:', category);
    console.log('Valor:', value);
    console.log('Item:', item);
    console.log('Fornecedor:', supplier);
    console.log('Despesas se repete:', isRepeated);
    console.log('Meses:', months);
    navigation.navigate('Start')
  };

  return (
    <View style={{ flex: 1 }}>
      <BarTop2
        titulo={'Retorno'}
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer={''}
        routeCalculator={''}
      />
      <ScrollView contentContainerStyle={[styles.container, { paddingTop: 50 }]}>
        <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Contas a pagar</Text>
        </View>
        <DatePicker label="Data de pagamento" onConfirm={(date) => console.log(date)} />

        <Text style={styles.label}>Categoria de despesa *</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione uma categoria" value='' />
            <Picker.Item label="Aluguel" value="Aluguel" />
            <Picker.Item label="Mercadoria" value="Mercadoria" />
            <Picker.Item label="Limpeza" value="Limpeza" />
            <Picker.Item label="Materia Prima" value="MateriaPrima" />
          </Picker>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ incluir</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Valor *</Text>
        <TextInput
          style={styles.input}
          placeholder='Digite um valor'
          keyboardType="numeric"
          value={value}
          onChangeText={setValue}
        />

        <Text style={styles.label}>Item</Text>
        <TextInput
          style={styles.input}
          placeholder='Produto'
          value={item}
          onChangeText={setItem}
        />

        <Text style={styles.label}>Fornecedor *</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder='Escolha ou cadastre um fornecedor'
            value={supplier}
            onChangeText={setSupplier}
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ incluir</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.checkBoxContainer}>
          <CheckBox
            value={isRepeated}
            onValueChange={setIsRepeated}
            tintColors={{ true: '#007bff', false: '#ccc' }}
          />
          <Text style={styles.label}>A despesa se repete</Text>
        </View>

        {isRepeated && (
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantos meses?</Text>
            <Picker
              selectedValue={months}
              onValueChange={(itemValue) => setMonths(itemValue)}
              style={styles.picker}
            >
              {monthsOptions.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ExpensePage;
