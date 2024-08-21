/* eslint-disable prettier/prettier */
import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import styles from './styles'; // Estilo específico para o botão de alternância

const ToggleButton = ({ viewMode, toggleViewMode }) => {
  const position = useRef(new Animated.Value(0)).current; // Inicializar Animated.Value

  useEffect(() => {
    const toValue = viewMode === 'Immediately' ? 0 : 1;
    
    // Animação para mover a posição do background
    Animated.timing(position, {
      toValue,
      duration: 300, // Duração da animação
      useNativeDriver: true, // Usar Native Driver para melhor performance
    }).start();
  }, [viewMode,  position]);

  const translateX = position.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], // Ajuste conforme necessário
  });

  return (
    <View style={styles.toggleContainer}>
      <Animated.View 
        style={[
          styles.toggleBackground, 
          { transform: [{ translateX }] }
        ]}
      />
      <TouchableOpacity
        style={[styles.toggleButton, viewMode === 'Immediately' && styles.selectedToggleButton]}
        onPress={() => toggleViewMode('Immediately')}
      >
        <Text style={[styles.toggleButtonText, viewMode === 'Immediately' && styles.selectedToggleButtonText]}>
          Imediato
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleButton, viewMode === 'Sell on Credit' && styles.selectedToggleButton]}
        onPress={() => toggleViewMode('Sell on Credit')}
      >
        <Text style={[styles.toggleButtonText, viewMode === 'Sell on Credit' && styles.selectedToggleButtonText]}>
          Venda no crédito
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleButton;
