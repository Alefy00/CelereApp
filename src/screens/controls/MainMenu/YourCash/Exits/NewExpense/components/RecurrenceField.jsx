/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';
import axios from 'axios';

const FREQUENCY_API = 'https://api.celereapp.com.br/api/frequenciarecorrencia/';

const RecurrenceField = ({
  setSelectedFrequencyId,
  setSelectedFrequencyName,
  setIsIndeterminate,
  setRepeatCount,
  setIsRecurring,
  isRecurring,
  selectedFrequencyId,
  selectedFrequencyName,
  repeatCount,
  isIndeterminate,
}) => {
  const [frequency, setFrequency] = useState(selectedFrequencyName || '');
  const [frequencies, setFrequencies] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [localRepeatCount, setLocalRepeatCount] = useState(repeatCount);
  const [localIsIndeterminate, setLocalIsIndeterminate] = useState(isIndeterminate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFrequency(selectedFrequencyName);
  }, [selectedFrequencyName]);

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
    if (!localIsIndeterminate) {
      const newRepeatCount = localRepeatCount + 1;
      setLocalRepeatCount(newRepeatCount);
      setRepeatCount(newRepeatCount); // Atualiza o repeatCount no componente pai
    }
  };

  const handleDecrease = () => {
    if (localRepeatCount > 0 && !localIsIndeterminate) {
      const newRepeatCount = localRepeatCount - 1;
      setLocalRepeatCount(newRepeatCount);
      setRepeatCount(newRepeatCount); // Atualiza o repeatCount no componente pai
    }
  };

  const handleSelectFrequency = (freqId, freqName) => {
    setFrequency(freqName); // Exibe o nome da frequência no dropdown
    setSelectedFrequencyId(freqId); // Passa o ID da frequência para o componente pai
    setSelectedFrequencyName(freqName); // Passa o nome da frequência para o componente pai
    setDropdownOpen(false);
  };

  const handleIndeterminateChange = (value) => {
    setLocalIsIndeterminate(value);
    setIsIndeterminate(value); // Atualiza o estado no componente pai
    if (value) {
      setLocalRepeatCount(0); // Reseta o contador local se for indeterminado
      setRepeatCount(0); // Reseta o repeatCount no componente pai
    }
  };

  const handleToggleRecurring = (value) => {
    setIsRecurring(value); // Atualiza o estado no componente pai
    if (!value) {
      // Se desmarcado, resetar os campos
      setFrequency('');
      setSelectedFrequencyId(null); // Atualiza no componente pai
      setSelectedFrequencyName(''); // Atualiza no componente pai
      setLocalRepeatCount(0);
      setRepeatCount(0); // Atualiza no componente pai
      setLocalIsIndeterminate(false);
      setIsIndeterminate(false); // Atualiza no componente pai
    }
  };

  return (
    <View style={styles.container}>
      {/* ... restante do componente ... */}
      {/* Checkbox para definir se é uma despesa recorrente */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isRecurring}
          onValueChange={handleToggleRecurring}
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
              value={localIsIndeterminate}
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
