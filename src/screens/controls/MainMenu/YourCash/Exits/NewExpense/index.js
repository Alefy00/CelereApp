/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import ConfirmModal from './components/ConfirmModal';
import SucessModal from './components/SucessModal';
import styles from './styles';

const categories = [
  "Selecione a categoria",
  "Fornecedores de matéria-prima",
  "Marketing e anúncios",
  "Folha de pagamento",
  "Taxas e Tributos",
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
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    if (currentDate <= new Date()) {
      setDate(currentDate);
    } else {
      alert('Por favor, selecione uma data que não seja no futuro.');
    }
  };

  const handleSave = () =>{
    setModalVisible(true);
  };

  const handleConfirm = () => {
    //TODO: lógica de confirmação
    setModalVisible(false);
    setSuccessModalVisible(true);
  };

  const handleRegisterNew = () => {
    setSuccessModalVisible(false);
    setCategoria(categories[0]);
    setValor('');
    setItem('');
    setParceiro('');
    setRepeats(false);
    setQuantosMeses('1');
    setDate(new Date());
  };


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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
            <Text style={{color:'#000'}}>Data de pagamento</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
              <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
              <Icon name="calendar-outline" size={20} color={COLORS.black} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
                maximumDate={new Date()}
              />
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={{color:'#000'}}>Categoria de despesa *</Text>
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
            <Text style={{color:'#000'}}>Valor *</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite um valor"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{color:'#000'}}>Item</Text>
            <TextInput
              style={styles.input}
              placeholder="Dê um nome"
              value={item}
              onChangeText={setItem}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={{color:'#000'}}>Parceiro *</Text>
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
              tintColors={{ true: COLORS.green, false: COLORS.black }}
            />
            <Text style={styles.checkboxLabel}>A despesa se repete</Text>
          </View>
          {repeats && (
            <View style={styles.inputContainer}>
              <Text style={{color:'#000'}}>Quantos meses?</Text>
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
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ConfirmModal
      visible={modalVisible}
      onClose={()=> setModalVisible(false)}
      onConfirm={handleConfirm}
      valor={valor}
      parceiro={parceiro}
      dataPagamento={date.toLocaleDateString()}
      recorrencia={repeats ? `Pagamento se repete todo dia ${date.getDate()}` : 'Pagamento único' }
      />
      <SucessModal
      visible={successModalVisible}
      onClose={()=> navigation.navigate('Exits')}
      onRegisterNew={handleRegisterNew}
      />
    </View>
  );
};

export default NewExpense;
