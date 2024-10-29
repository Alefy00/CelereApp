/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTooltip = ({ currentStep, handleNext }) => {
  return (
    <View style={styles.tooltipContainer}>
      <Text style={styles.tooltipTitle}>Dica de uso [{currentStep.order}/5]</Text>
      <Text style={styles.tooltipText}>{currentStep.text}</Text>

      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
        <Icon name="checkmark" size={16} color={COLORS.black} style={styles.icon} />
        <Text style={styles.buttonText}>Próximo ({currentStep.order} de 5)</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 8,
    width: '80%',
    position: 'absolute',
    bottom: 20,
  },
  tooltipTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tooltipText: {
    color: COLORS.white,
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: COLORS.yellow,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default CustomTooltip;
