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
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: COLORS.primary,
    width: '100%',  // Barra de progresso ocupa toda a largura da tela
  },
  progressBar: {
    height: 16,
    width: '100%',
    backgroundColor: '#e8cd07',
    borderRadius: 15,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: COLORS.black,
    borderRadius: 15,
  },
  stepText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.black,
  },
});

export default ProgressBar;
