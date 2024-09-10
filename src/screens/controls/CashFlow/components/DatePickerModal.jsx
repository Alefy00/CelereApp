/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import styles from '../styles'; // Assumindo que o estilo esteja no mesmo diretório, ajuste se necessário

const DatePickerModal = ({ modalVisible, setModalVisible, onMonthSelect }) => (
  <Modal
    visible={modalVisible}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setModalVisible(false)}
  >
    <View style={styles.modalContainer}>

      {Array.from({ length: 12 }).map((_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => onMonthSelect(i)}
          style={styles.monthOption}
        >
          <Text style={styles.monthText}>
            {new Date(0, i).toLocaleString('pt-BR', { month: 'long' }).toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  </Modal>
);

export default DatePickerModal;
