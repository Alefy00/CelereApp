/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import styles from './styles';

const categories = [
  "Selecione a categoria",
  "Fornecedores de matéria-prima, produtos ou suprimentos",
  "Marketing e anúncios",
  "Folha de pagamento",
  "Frete, transporte e logística",
  "Aluguel",
  "Máquinas e equipamentos",
  "Despesas administrativas",
  "Pró-labore",
  "Despesas pessoais (não recomendável)",
  "Outros"
];

const NewExpense = ({ navigation }) => {
  const [categoria, setCategoria] = useState(categories[0]);
  const [valor, setValor] = useState('');
  const [item, setItem] = useState('');
  const [parceiro, setParceiro] = useState('');
  const [repeats, setRepeats] = useState(false);
  const [quantosMeses, setQuantosMeses] = useState('1');

  return (
    <View style={styles.container}>
      <BarTop2
        titulo="Saídas"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
        routeMailer=""
        routeCalculator=""
        style={{ height: 50 }}
      />
      <View style={styles.formContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Imediato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonActive}>
            <Text style={styles.buttonTextActive}>Contas a pagar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.datePicker}>
          <Text>Data de pagamento</Text>
          <TouchableOpacity style={styles.dateButton}>
            <Text>15 dias, 19 fev</Text>
            <Icon name="calendar-outline" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Text>Categoria de despesa *</Text>
          <Picker
            selectedValue={categoria}
            style={styles.picker}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text>Valor *</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite um valor"
            value={valor}
            onChangeText={setValor}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Item</Text>
          <TextInput
            style={styles.input}
            placeholder="Dê um nome"
            value={item}
            onChangeText={setItem}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Parceiro *</Text>
          <TextInput
            style={styles.input}
            placeholder="Escolha o parceiro cadastrado ou da sua lista"
            value={parceiro}
            onChangeText={setParceiro}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={repeats}
            onValueChange={setRepeats}
            tintColors={{ true: COLORS.primary, false: COLORS.black }}
          />
          <Text style={styles.checkboxLabel}>A despesa se repete</Text>
        </View>
        {repeats && (
          <View style={styles.inputContainer}>
            <Text>Quantos meses?</Text>
            <Picker
              selectedValue={quantosMeses}
              style={styles.picker}
              onValueChange={(itemValue) => setQuantosMeses(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
            </Picker>
          </View>
        )}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewExpense;
