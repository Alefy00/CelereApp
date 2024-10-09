/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';
import axios from 'axios';

const FREQUENCY_API = 'https://api.celereapp.com.br/api/frequenciarecorrencia/';

const RecurrenceField = ({ setSelectedFrequencyId, setIsIndeterminate, setRepeatCount }) => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [frequencies, setFrequencies] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localRepeatCount, setLocalRepeatCount] = useState(0); // Local repeatCount para manuseio dentro do componente
  const [isIndeterminate, setLocalIsIndeterminate] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para buscar as frequências da API
  useEffect(() => {
    fetchFrequencies();
  }, []);

  const fetchFrequencies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(FREQUENCY_API);
      const data = response.data.data;
      setFrequencies(data);
    } catch (error) {
      console.error('Erro ao buscar frequências:', error);
      Alert.alert('Erro', 'Não foi possível carregar as frequências de recorrência. Tente novamente.');
    }
    setLoading(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleIncrease = () => {
    if (!isIndeterminate) {
      const newRepeatCount = localRepeatCount + 1;
      setLocalRepeatCount(newRepeatCount);
      setRepeatCount(newRepeatCount); // Atualiza o repeatCount no NewExpense
    }
  };

  const handleDecrease = () => {
    if (localRepeatCount > 0 && !isIndeterminate) {
      const newRepeatCount = localRepeatCount - 1;
      setLocalRepeatCount(newRepeatCount);
      setRepeatCount(newRepeatCount); // Atualiza o repeatCount no NewExpense
    }
  };

  const handleSelectFrequency = (freqId, freqName) => {
    setFrequency(freqName); // Exibe o nome da frequência no dropdown
    setSelectedFrequencyId(freqId); // Envia o ID da frequência para o NewExpense
    setDropdownOpen(false);
  };

  const handleIndeterminateChange = (value) => {
    setLocalIsIndeterminate(value);
    setIsIndeterminate(value); // Atualiza o estado de indeterminado no NewExpense
    if (value) {
      setLocalRepeatCount(0); // Reseta o contador local se for indeterminado
      setRepeatCount(0); // Reseta o repeatCount no NewExpense
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.cardTitle}>Recorrência</Text>
        <Text style={styles.checkboxLabelSmall}>(repetição da despesa)</Text>
      </View>

      {/* Checkbox para definir se é uma despesa recorrente */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isRecurring}
          onValueChange={setIsRecurring}
          tintColors={{ true: COLORS.black, false: COLORS.black }}
        />
        <Text style={styles.checkboxLabel}>É uma despesa recorrente</Text>
      </View>

      {/* Exibição condicional se a despesa for recorrente */}
      {isRecurring && (
        <View style={styles.recurrenceContainer}>
          {/* Dropdown de frequência */}
          <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
            <Text style={styles.dropdownText}>{frequency || 'Selecione a frequência...'}</Text>
            <Icon name={dropdownOpen ? 'arrow-up' : 'arrow-down'} size={22} color={COLORS.gray} />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownContainer}>
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.primary} />
              ) : (
                frequencies.map((freq) => (
                  <TouchableOpacity
                    key={freq.id}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectFrequency(freq.id, freq.nome)}
                  >
                    <Text style={styles.dropdownItemText}>{freq.nome}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          {/* Contador de quantidade de repetições */}
          <Text style={styles.label}>Quantidade de vezes que se repete</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={handleDecrease} style={styles.counterButton}>
              <Icon name="remove" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.counterText}>{localRepeatCount}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.counterButton}>
              <Icon name="add" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          {/* Checkbox para recorrência por tempo indeterminado */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isIndeterminate}
              onValueChange={handleIndeterminateChange}
              tintColors={{ true: COLORS.black, false: COLORS.black }}
            />
            <Text style={styles.checkboxLabel}>Quantidade indeterminada</Text>
          </View>
        </View>
      )}
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle:{
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '700',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  recurrenceContainer: {
    marginTop: 10,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.black,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  dropdownContainer: {
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    marginTop: -9.5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: COLORS.black,
    fontWeight:'600',
  },
  checkboxLabelSmall:{
    marginLeft: 5,
    color: COLORS.black,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  counterButton: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonText: {
    fontSize: 24,
    color: COLORS.black,
  },
  counterText: {
    fontSize: 18,
    color: COLORS.black,
    marginHorizontal: 30
  },
});

export default RecurrenceField;
