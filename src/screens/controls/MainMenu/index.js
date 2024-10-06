/* eslint-disable prettier/prettier */
import React from 'react';
import {Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, View, ScrollView} from 'react-native';
import {COLORS} from '../../../constants';
import {Container} from './styles';

import BarTop from '../../../components/BarTop';
import Title from '../../../components/Title';

import {useTranslation} from 'react-i18next';
import '../../../translation';

import SeuDinheiro from './components/SeuDinheiro';
import SuaOperacao from './components/SuaOperacao';
import SeusControles from './components/SeusControles';
import Outros from './components/Outros';

const MainMenu = props => {
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

            <ScrollView style={{paddingTop: 10}}>
              <Title title={t('your_cash')} />
              <SeuDinheiro />
              <View style={{height:1.5, backgroundColor: "#ccc", marginHorizontal:15,marginVertical:5}}></View>
              <Title title={t('your_operation')} />
              <SuaOperacao />
              <View style={{height:1.5, backgroundColor: "#ccc", marginHorizontal:15,marginVertical:5}}></View>
              <Title title={t('your_controls')} />
              <SeusControles />
              <View style={{height:1.5, backgroundColor: "#ccc", marginHorizontal:15, marginVertical:5}}></View>
              <Title title={t('Outros')} />
              <Outros/>
            </ScrollView>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default MainMenu;
