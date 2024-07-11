import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Container, Scroller} from './styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';

import BarTop2 from '../../../components/BarTop2';
// import SubTitle from '../../../components/SubTitle';

import '../../../translation';
import {useTranslation} from 'react-i18next';

import Card from './components/Card';
import styled from 'styled-components/native';

export const Title = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  font-size: 27px;
  font-weight: bold;
  color: #000000;
  font-family: ${FONTS.fregular};
`;
export const SubTitle = styled.Text`
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  font-size: 15px;
  font-family: ${FONTS.fregular};
  font-weight: normal;
  color: #000000;
  text-align: justify;
`;

const Start = props => {
  const {t} = useTranslation();
  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop2
              titulo={t('return')}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />

            <Scroller>
              <Title>{t('start')}</Title>
              <SubTitle>{t('desc_start')}</SubTitle>

              <Card
                number="1"
                title={t('item1')}
                buttontitle={t('start')}
                pageScreen="StockTab"
              />

              <Card
                number="2"
                title={t('item2')}
                buttontitle={t('start')}
                pageScreen="MainMenu"
              />

              <Card
                number="3"
                title={t('item3')}
                buttontitle={t('start')}
                pageScreen="MainMenu"
              />

              <Card
                number="4"
                title={t('item4')}
                buttontitle={t('start')}
                pageScreen="MainMenu"
              />

              <Card
                number="5"
                title={t('item5')}
                buttontitle={t('start')}
                pageScreen="MainMenu"
              />
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Start;
