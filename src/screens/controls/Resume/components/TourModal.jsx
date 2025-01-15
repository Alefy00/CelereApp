/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const TourModal = ({ step, totalSteps, message, onNext, onPrevious, onClose, position, offsetTop = 10, }) => {
  const hasPosition = position && !isNaN(position.x) && !isNaN(position.y);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  
  const modalStyle = hasPosition
    ? {
        position: 'absolute',
        top: Math.min(position.y + offsetTop, screenHeight - 150), // Evitar que ultrapasse a tela
        left: Math.min(Math.max(position.x + position.width / 2 - 175, 10), screenWidth - 350), // Centralizado e sem ultrapassar a tela
      }
    : {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -150 }, { translateY: -75 }],
      };

    const arrowStyle = hasPosition
    ? {
        position: 'absolute',
        top: step === totalSteps ? screenHeight * 0.219 : -screenHeight * 0.013, // Dinâmico para último passo
        left: step === 3
        ? Math.min(position.x + position.width - 188, screenWidth - 50) // Ajuste exclusivo para o terceiro passo
        : Math.min(175, screenWidth - 50),
        transform: step === totalSteps ? [{ rotate: '180deg' }] : [], // Gira a seta para baixo no último passo
      }
    : {
        display: 'none', // Esconde a seta se não houver posição
      };
  

  return (
    <View style={styles.overlay}>
      <View style={[styles.modal, modalStyle]}>
        {hasPosition && <View style={[styles.arrow, arrowStyle]} />}
        <Text style={styles.title}>Dica de uso [{step}/{totalSteps}]</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.actions}>
          {step < totalSteps ? (
            <TouchableOpacity style={styles.button} onPress={onNext}>
                <Icon name="arrow-forward" size={20} color="#000" />
              <Text style={styles.buttonText}>Próximo  ({step} de {totalSteps})</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onClose}>
                <Icon name="checkbox" size={20} color="#000" />
              <Text style={styles.buttonText}>Finalizar dicas</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    maxWidth: 350,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#FFF',
    marginBottom: 16,
    textAlign: 'left',
    width: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFD700',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 4,
    flexDirection: 'row',
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    height: 48,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 8,
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',
  },
});

export default TourModal;
