/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../../../../../components/CustomCalendar';
import styles from '../styles';
import { COLORS } from '../../../../../constants';

const CelerePayIndividualForm = ({
  // Propriedades/estados vindos do componente pai:
  firstName,
  setFirstName,
  lastName,
  setLastName,
  birthDate,
  setBirthDate,
  cpf,
  setCpf,
  cep,
  setCep,
  street,
  setStreet,
  number,
  setNumber,
  neighborhood,
  setNeighborhood,
  city,
  setCity,
  state,
  setState,
  countryCode,
  setCountryCode,
  selectedCategory,
  setSelectedCategory,
  categories,
  loadingCategories,
  isCalendarVisible,
  setIsCalendarVisible,
  isKeyboardVisible,
  handleConfirmData,
}) => {


  const formatCpf = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 11);
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    setCpf(formatted);
  };

  const formatCep = (text) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 8);
    const formatted = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
    setCep(formatted);
  };

  return (
    <View style={styles.container}>


      {/* Picker de Categorias */}
      <View style={styles.pickerContainer}>
        {loadingCategories ? (
          <ActivityIndicator size="small" color={COLORS.primary} />
        ) : (
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Selecione uma categoria" value="" />
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={category.description}
                value={category.id}
              />
            ))}
          </Picker>
        )}
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.inputLargeComplemento]}
          placeholder="Primeiro Nome"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={[styles.input, styles.inputSmallBairro]}
          placeholder="Sobrenome completo"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      {/* Botão para abrir o calendário */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setIsCalendarVisible(true)}
      >
        <Text style={{ color: birthDate ? COLORS.black : COLORS.grey }}>
          {birthDate || 'Data de Nascimento'}
        </Text>
      </TouchableOpacity>

      <CustomCalendar
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onDayPress={(date) => {
          setBirthDate(date.dateString);
          setIsCalendarVisible(false);
        }}
      />

      {/* CPF, RG, Expeditor e UF */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={formatCpf}
        keyboardType="numeric"
      />
      {/* Endereço */}
      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.inputLargeRUA]}
          placeholder="Digite o seu endereço"
          value={street}
          onChangeText={setStreet}
        />
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="Número"
          value={number}
          onChangeText={setNumber}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.inputSmallBairro]}
          placeholder="Bairro"
          value={neighborhood}
          onChangeText={setNeighborhood}
        />
        <TextInput
          style={styles.inputCEP}
          placeholder="Digite seu CEP"
          value={cep}
          onChangeText={formatCep}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.inputSmallRG]}
          placeholder="Cidade"
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="Estado"
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={[styles.input, styles.inputSmall]}
          placeholder="Código do País"
          value={countryCode}
          onChangeText={setCountryCode}
        />
      </View>

      {/* Botão de confirmar (oculto quando o teclado estiver visível) */}
      {!isKeyboardVisible && (
        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmData}>
            <Icon name="checkmark-circle" size={24} color="#000" />
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CelerePayIndividualForm;
