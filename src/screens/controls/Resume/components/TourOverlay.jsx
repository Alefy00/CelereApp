/* eslint-disable prettier/prettier */
// TourOverlay.js
import React, { useState, useEffect } from 'react';
import { View, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TourWrapper from './TourWrapper';

const TourOverlay = ({ tourMessages, onTourComplete }) => {
  const [isTourVisible, setIsTourVisible] = useState(false);

  useEffect(() => {
    const checkTourCompletion = async () => {
      const hasCompletedTour = await AsyncStorage.getItem('hasCompletedTour');
      if (hasCompletedTour !== 'true') {
        setIsTourVisible(true);
      }
    };
    checkTourCompletion();
  }, []);

  const handleTourComplete = async () => {
    await AsyncStorage.setItem('hasCompletedTour', 'true');
    setIsTourVisible(false); // Oculta o tour após a conclusão
    onTourComplete();
  };

  if (!isTourVisible) return null; // Retorna null quando o tour é concluído

  return (
    <Modal visible={isTourVisible} animationType="fade" transparent={true}>
      <View>
        <TourWrapper tourMessages={tourMessages} onTourComplete={handleTourComplete} />
      </View>
    </Modal>
  );
};

export default TourOverlay;
