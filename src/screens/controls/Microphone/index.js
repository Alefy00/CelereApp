import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Platform,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import {Container, Scroller} from './styles';

import BarTop from '../../../components/BarTop';
import Title from '../../../components/Title';

import {useTranslation} from 'react-i18next';
import '../../../translation';

const Expiring = props => {
  const {t} = useTranslation();
  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop
              uriAvatar={
                'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'
              }
              titulo={t('partner')}
              subtitulo={'Planeta Cell'}
              backColor={COLORS.primary}
              foreColor={'#000000'}
              routeMailer={''}
              routeCalculator={''}
            />

            <Scroller style={{paddingTop: 10}}>
              <Title title={t('microphone')} />
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Expiring;
