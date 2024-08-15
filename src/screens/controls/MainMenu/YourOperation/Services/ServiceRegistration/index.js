/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const AddService = ({ navigation }) => {
    const [barcode, setBarcode] = useState('');
    const [name, setName] = useState('');
    const [unitMeasure, setUnitMeasure] = useState('');
    const [price, setPrice] = useState('');
    const [issRate, setIssRate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [pickerType, setPickerType] = useState('');
  
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
  
    const unitsOfMeasure = ["Livre", "M²", "Hora"];
    const issRates = ["Não Incluir", "2%", "3%", "5%"];
  
    const handleSave = () => {
      console.log({
        barcode,
        name,
        unitMeasure,
        price,
        issRate,
        category,
        description,
      });
      // Navegar para a próxima tela ou salvar no banco de dados
    };
  
    const handlePickerSelect = (value) => {
      if (pickerType === 'unitMeasure') {
        setUnitMeasure(value);
      } else if (pickerType === 'issRate') {
        setIssRate(value);
      } else if (pickerType === 'category') {
        setCategory(value);
      }
      setShowPicker(false);
    };
  
    const renderPicker = () => {
      let data = [];
      if (pickerType === 'unitMeasure') {
        data = unitsOfMeasure;
      } else if (pickerType === 'issRate') {
        data = issRates;
      } else if (pickerType === 'category') {
        data = categories;
      }
  
      return (
        <Modal
          visible={showPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowPicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={
                  pickerType === 'unitMeasure'
                    ? unitMeasure
                    : pickerType === 'issRate'
                    ? issRate
                    : category
                }
                onValueChange={handlePickerSelect}
              >
                {data.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
              <TouchableOpacity onPress={() => setShowPicker(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <BarTop2
          titulo="Adicionar serviço"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
  
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Icon name="camera" size={40} color={COLORS.black} />
            </View>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Código"
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
            />
            <TouchableOpacity>
              <Icon name="barcode-outline" size={30} color={COLORS.black} />
            </TouchableOpacity>
          </View>
  
          <TextInput
            style={styles.input}
            placeholder="Nome*"
            value={name}
            onChangeText={setName}
          />
  
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.dropdown, styles.halfWidth]}
              onPress={() => {
                setPickerType('unitMeasure');
                setShowPicker(true);
              }}
            >
              <Text>{unitMeasure || 'Unidade de medida'}</Text>
              <Icon name="filter" size={20} color={COLORS.black} />
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[styles.dropdown, styles.halfWidth]}
              onPress={() => {
                setPickerType('issRate');
                setShowPicker(true);
              }}
            >
              <Text>{issRate || 'Alíquota ISS'}</Text>
              <Icon name="filter" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
  
          <TextInput
            style={styles.input}
            placeholder="Preço de venda*"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
  
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => {
              setPickerType('category');
              setShowPicker(true);
            }}
          >
            <Text>{category || 'Categoria'}</Text>
            <Icon name="filter" size={20} color={COLORS.black} />
          </TouchableOpacity>
  
          <TextInput
            style={styles.textArea}
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
          />
  
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
  
          {renderPicker()}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default AddService;