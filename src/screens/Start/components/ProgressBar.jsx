/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.stepText}>{`Passo ${currentStep} de ${totalSteps}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingTop: 20,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      zIndex: 10,  // Garantir que a barra fique acima de outros elementos
    },
    progressBar: {
      height: 8,
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: 4,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      backgroundColor: COLORS.primary,
    },
    stepText: {
      marginTop: 5,
      textAlign: 'center',
      fontSize: 14,
      color: '#333',
    },
  });
  

export default ProgressBar;
