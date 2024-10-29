/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Popover from 'react-native-popover-view';
import { COLORS } from '../../../../constants';

const TourPopup = ({ isVisible, onNext, currentStep, totalSteps, description, targetRef }) => {
  return (
    <Popover
      isVisible={isVisible}
      from={targetRef}
      onRequestClose={onNext}
      arrowStyle={styles.arrow}
      backgroundStyle={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Dica de uso [{currentStep}/{totalSteps}]</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>Próximo ({currentStep} de {totalSteps})</Text>
        </TouchableOpacity>
      </View>
    </Popover>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    alignItems: 'center',
    width: 250,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.lightGray,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#FFD400',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  arrow: {
    backgroundColor: '#1C1C1C',
  },
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default TourPopup;
