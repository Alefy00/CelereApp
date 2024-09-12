/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,

  View,
  StyleSheet,

} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {Container} from './styles';
import {COLORS, FONTS} from '../../../constants';
import BarTop2 from '../../../components/BarTop2';
import '../../../translation';
import {useTranslation} from 'react-i18next';
import Card from './components/Card';
import styled from 'styled-components/native';

export const Title = styled.Text`
  margin-top: 10px;
  margin-left: 15px;
  font-size: 27px;
  font-weight: 900;
  color: #000000;
  font-family: ${FONTS.fregular};
`;
export const SubTitle = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 15px;
  margin-bottom: 15px;
  font-family: ${FONTS.fregular};
  font-weight: normal;
  color: #000000;
  text-align: justify;
`;

const Start = ({navigation}) => {
  const {t} = useTranslation();
  const [hasInitialBalance, setHasInitialBalance] = useState(false);

  useEffect(() => {
    // Carrega o estado do AsyncStorage para verificar se o saldo inicial foi adicionado
    const loadInitialBalanceState = async () => {
      const saved = await AsyncStorage.getItem('initialBalanceAdded');
      if (saved === 'true') {
        setHasInitialBalance(true); // Atualiza o estado se o saldo inicial já foi adicionado
      }
    };
    loadInitialBalanceState();
  }, []);

  const handleInitialBalance = async () => {
    // Quando o usuário clicar para adicionar o saldo, vamos salvar a informação no AsyncStorage
    await AsyncStorage.setItem('initialBalanceAdded', 'true');
    setHasInitialBalance(true); // Atualiza o estado para refletir a mudança
    navigation.navigate('OpeningBalance'); // Navega para a página de saldo inicial
  };

  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop2
              titulo={t('Voltar')}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />

            <View>
              <Title>{t('Primeiros Passos')}</Title>
              <SubTitle>{t('São passos essenciais para te ajudarmos a gerir seu fluxo de caixa com eficácia.')}</SubTitle>

              <Card
                number="1"
                title={t('item1')}
                buttontitle={hasInitialBalance ? t('Alterar saldo') : t('Começar')}
                pageScreen="OpeningBalance"
                onPress={handleInitialBalance} // Função para salvar o saldo inicial
                buttonStyle={hasInitialBalance ? styles.updateButton : styles.startButton} // Estilo condicional baseado no estado
              />


              <Card
                number="2"
                title={t('Vamos juntos projetar suas vendas')}
                buttontitle={t('Começar')}
                pageScreen="MonthlySalesForecast"
              />

              <Card
                number="3"
                title={t('Adicione seu regime tributário')}
                buttontitle={t('Começar')}
                pageScreen="TaxRegime"
              />

              <Card
                number="4"
                title={t('CélerePay - Seu celular vira maquininha e você tem mais controle')}
                buttontitle={t('Começar')}
                pageScreen=""
              />
            </View>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
const styles = StyleSheet.create({

  // Novo estilo para o botão de "Alterar saldo"
  updateButton: {
    backgroundColor: COLORS.secondary, // Cor diferente para indicar a alteração
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButtonText: {
    color: COLORS.white, // Cor do texto diferente
    fontWeight: 'bold',
    fontSize: 16, // Texto um pouco maior
    marginRight: 10,
  },

  // Estilo para o botão de "Começar"
  startButton: {
    backgroundColor: COLORS.secondary, // Cor principal para o botão de começar
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF', // Texto branco para "Começar"
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 10,
  },
});


export default Start;
