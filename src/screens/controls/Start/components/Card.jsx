/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconSeta from '../../../../assets/images/svg/iconArrowRight.svg';
import {useNavigation} from '@react-navigation/native';
import { COLORS } from '../../../../constants';

const Card = ({ number, title, buttontitle, pageScreen, buttonStyle }) => {
  const navigation = useNavigation();
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
            style={[styles.button, buttonStyle]} // Combina o estilo padrão com o estilo condicional recebido
            onPress={() => navigateToScreen(pageScreen)}
          >
            <IconSeta style={styles.arrowImg} />
            <Text style={buttonStyle === styles.updateButton ? styles.updateButtonText : styles.startButtonText}>
              {buttontitle}
            </Text>
          </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  leftColumn: {
    backgroundColor: '#F4F2D9',
    width: 70,
    height: 90,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  numberText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#212121',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#212121',
    width: '100%',
    height: '100%',
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#212121',
    borderRadius: 4,
    width: 135,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  buttonText: {
    fontSize: 15,
    marginRight: 10,
    color: '#FFFFFF',
  },
  arrowImg: {
    marginRight: 10,
  },

  // Novo estilo para o botão de "Alterar saldo"
  updateButton: {
    backgroundColor: COLORS.secondary, // Cor diferente para indicar a alteração
    borderColor: '#FFC107', // Borda amarela para destaque
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: '#000', // Cor do texto diferente
    fontWeight: 'bold',
    fontSize: 16, // Texto um pouco maior
    marginRight: 10,
  },

  // Estilo para o botão de "Começar"
  startButton: {
    backgroundColor: COLORS.secondary, // Cor principal para o botão de começar
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF', // Texto branco para "Começar"
    fontWeight: '500',
    fontSize: 16,
    marginRight: 10,
  },
});


export default Card;