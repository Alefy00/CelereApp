/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  View
} from 'react-native';
import {Container} from './styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../../../constants';

import BarTop2 from '../../../components/BarTop2';
// import SubTitle from '../../../components/SubTitle';

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
;
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
                buttontitle={t('Começar')}
                pageScreen="OpeningBalance"
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
                pageScreen=""
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

export default Start;
