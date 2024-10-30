/* eslint-disable prettier/prettier */
// TourWrapper.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TourWrapper = ({ tourMessages, onTourComplete, children }) => {
  const [tourStep, setTourStep] = useState(0);
  const [isTourVisible, setIsTourVisible] = useState(false); 
  const scrollViewRef = useRef(null);

  const [tooltipPosition, setTooltipPosition] = useState({
    top: tourMessages[0].position.top,
    left: tourMessages[0].position.left,
    arrowPosition: tourMessages[0].arrowPosition,
  });

  useEffect(() => {
    const checkTourCompletion = async () => {
      const hasCompletedTour = await AsyncStorage.getItem('hasCompletedTour');
      if (hasCompletedTour !== 'true') {
        setIsTourVisible(true);
      }
    };
    checkTourCompletion();
  }, []);

  const handleNextStep = async () => {
    if (tourStep < tourMessages.length - 1) {
      setTourStep(tourStep + 1);
      const nextStep = tourMessages[tourStep + 1];
      setTooltipPosition({
        top: nextStep.position.top,
        left: nextStep.position.left,
        arrowPosition: nextStep.arrowPosition,
      });
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }

      if (tourStep + 1 === 4 && scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: nextStep.position.top - 100, animated: true });
      }
    } else {
      setTourStep(tourMessages.length);
      await AsyncStorage.setItem('hasCompletedTour', 'true');
      setIsTourVisible(false); 
      onTourComplete();
    }
  };

  if (!isTourVisible) return children; 
  return (
    <>
      {children}
      <View style={[styles.blockLayer, isTourVisible ? {} : { display: 'none' }]} />
      {tourStep < tourMessages.length && (
        <View style={[styles.tooltipContainer, { top: tooltipPosition.top, left: tooltipPosition.left }]}>
          <View
            style={[
              styles.tooltipTriangle,
              tooltipPosition.arrowPosition === 'top' ? styles.tooltipTriangleTop : styles.tooltipTriangleBottom,
            ]}
          />
          <Text style={styles.tooltipTitle}>Dica de uso [{tourStep + 1}/{tourMessages.length}]</Text>
          <Text style={styles.tooltipText}>{tourMessages[tourStep].text}</Text>
          <TouchableOpacity onPress={handleNextStep} style={styles.nextButton}>
            <Icon name="checkbox" size={22} color={COLORS.black} />
            <Text style={styles.buttonText}>Próximo ({tourStep + 1} de {tourMessages.length})</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
  
};


export default TourWrapper;
