/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../constants';

const CarouselPage1 = ({ onNext }) => {
  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>
        Saldo Caixa <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
      </Text>
      <Text style={styles.amount}>R$1.500</Text>
      <TouchableOpacity 
        style={styles.arrowButton}
        accessible={true}
        accessibilityLabel="Avançar para a próxima página"
        onPress={onNext} // Função de navegação para avançar
      >
        <Icon name="arrow-forward" size={24} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
    pageContainer: {
        backgroundColor: COLORS.white,
        width: '100%',
        paddingVertical: 30,
        paddingHorizontal: 15,
        borderRadius: 15,
        shadowColor: '#000',  // Cor da sombra
        shadowOffset: { width: 0, height: 4 },  // Deslocamento da sombra, aumentando o valor de height para intensificar a sombra na parte de baixo
        shadowOpacity: 0.25,  // Opacidade da sombra, para uma sombra mais visível
        shadowRadius: 4,  // Raio da sombra
        elevation: 6,  // Elevação para Android, ajustando para criar uma sombra mais proeminente
        alignItems: 'center',
      },
  title: {
    fontSize: 14,
    color: COLORS.black,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.green,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    backgroundColor:COLORS.primary,
    padding:5,
    position: 'absolute',
    right:-15,
    top: '90%',
    transform: [{ translateY: -12 }],
    borderRadius:50,
  },
});

export default CarouselPage1;
