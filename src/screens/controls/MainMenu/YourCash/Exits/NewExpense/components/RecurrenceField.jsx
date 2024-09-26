/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';

const RecurrenceField = () => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [repeatCount, setRepeatCount] = useState(0);
  const [isIndeterminate, setIsIndeterminate] = useState(false);

  const frequencies = ['Semanal', 'Quinzenal', 'Mensal', 'Anual'];

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleIncrease = () => {
    if (!isIndeterminate) {
      setRepeatCount(repeatCount + 1);
    }
  };

  const handleDecrease = () => {
    if (repeatCount > 0 && !isIndeterminate) {
      setRepeatCount(repeatCount - 1);
    }
  };

  return (
    <View style={styles.container}>
     <View style={{flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.cardTitle}>Recorrência</Text>
        <Text style={styles.checkboxLabelSmall}>(repetição da despesa)</Text>
     </View>   
      {/* Campo de recorrência */}
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isRecurring}
          onValueChange={setIsRecurring}
          tintColors={{ true: COLORS.black, false: COLORS.black }}
        />
        <Text style={styles.checkboxLabel}>É uma despesa recorrente</Text>
      </View>

      {/* Exibição condicional */}
      {isRecurring && (
        <View style={styles.recurrenceContainer}>
          {/* Dropdown de frequência */}
          <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
            <Text style={styles.dropdownText}>{frequency || 'Frequência...'}</Text>
            <Icon name={dropdownOpen ? 'arrow-up' : 'arrow-down'} size={22} color={COLORS.gray} />
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownContainer}>
              {frequencies.map((freq, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFrequency(freq);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{freq}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Contador de quantidade de vezes que se repete */}
          <Text style={styles.label}>Quantidade de vezes que se repete</Text>
          <View style={styles.counterContainer}>
            <TouchableOpacity onPress={handleDecrease} style={styles.counterButton}>
                 <Icon name="remove" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.counterText}>{repeatCount}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.counterButton}>
                 <Icon name="add" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>

          {/* Checkbox para quantidade indeterminada */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isIndeterminate}
              onValueChange={(value) => {
                setIsIndeterminate(value);
                if (value) setRepeatCount(0); // Resetar contador se indeterminado
              }}
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
