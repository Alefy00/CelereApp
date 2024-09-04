/* eslint-disable prettier/prettier */
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Use esta linha se você estiver usando Ionicons
import { COLORS } from '../../../../constants';

const ActionButtons = () => {
  return (
    <View style={styles.container}>
      {/* Botão de código de barras */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="barcode-outline" size={30} color={COLORS.black} />
      </TouchableOpacity>

      {/* Botão de adicionar */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="add-outline" size={30} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute', // Se você deseja que fique fixo em uma posição específica
    right: 20,            // Ajuste conforme necessário
    bottom: 100,          // Ajuste conforme necessário
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Espaço entre os botões
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ActionButtons;
