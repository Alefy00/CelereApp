/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Base para criação de componentes
# Create by.: 2024/05/29
# References: https://withfra.me/components/stats
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React from 'react';
import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import {useTranslation} from 'react-i18next';
import '../translation';

export default ({state, navigation}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return <></>;
};
