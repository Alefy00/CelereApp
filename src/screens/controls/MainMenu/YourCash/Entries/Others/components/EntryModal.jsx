/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const EntryModal = ({ visible, onClose, onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState('');
  const [source, setSource] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Abrir o calendário
  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  // Quando a data for selecionada
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="close-outline" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Detalhes do aporte</Text>

          {/* Campo Data do Aporte */}
          <TouchableOpacity onPress={showDatepicker} style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Data do aporte"
              placeholderTextColor="#B0B0B0"
              value={date.toLocaleDateString()}
              editable={false} // Desabilitar o teclado
            />
            <Icon name="calendar-outline" size={24} color="#B0B0B0" style={styles.icon} />
          </TouchableOpacity>

          {/* Campo Valor */}
          <TextInput
            style={styles.input}
            placeholder="Valor do aporte"
            placeholderTextColor="#B0B0B0"
            value={value}
            onChangeText={setValue}
            keyboardType="numeric"
          />

          {/* Campo Origem */}
          <TextInput
            style={styles.input}
            placeholder="Origem"
            placeholderTextColor="#B0B0B0"
            value={source}
            onChangeText={setSource}
          />

          {/* Botão de cadastro */}
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Icon name="checkmark-circle-outline" size={24} color="black" />
            <Text style={styles.submitButtonText}>Cadastrar novo aporte</Text>
          </TouchableOpacity>

          {/* DateTimePicker para selecionar a data */}
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      width: '85%',
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      marginBottom: 20,
      width: '100%',
    },
    input: {
      flex: 1,
      height: 40,
      color: '#000',
    },
    icon: {
      marginLeft: 10,
    },
    submitButton: {
      backgroundColor: '#FFD700', // Cor amarela
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
      width: '100%',
      justifyContent: 'center',
    },
    submitButtonText: {
      marginLeft: 10,
      color: 'black',
      fontWeight: 'bold',
    },
  });
  
  

export default EntryModal;
