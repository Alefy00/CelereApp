/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Base para criação de componentes
# Create by.: 2024/07/05
# References:
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React from 'react';
import styled from 'styled-components/native';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
} from '../../../../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';
import IconCamera from '../../../../../../../assets/images/svg/iconCamera3.svg';
import StockMenu from '../index';

const ItemList = ({pageScreen, title, qtd, value}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <TouchableOpacity style={styles.registro} onPress={() => goTo(pageScreen)}>
      <View style={styles.dados}>
        <Text style={styles.txtDado1}>{title}</Text>
        <Text style={styles.txtDado2}>{qtd}</Text>
        <Text style={styles.txtDado3}>{value}</Text>
      </View>
      <View style={styles.foto}>
        <IconCamera height={62} width={62} fill="#7F7F7F" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  registro: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eeeded',
    borderRadius: 12,
    marginTop: 5,
    height: 115,
  },
  foto: {
    backgroundColor: '#dad8d8',
    height: 75,
    width: 75,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dados: {
    flex: 1,
    width: 300,
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  txtDado1: {
    fontSize: 24,
    width: '100%',
    textAlign: 'left',
    color: '#2F2F2F',
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#898989',
    fontFamily: FONTS.fsmbold,
  },
  txtDado2: {
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
    color: '#898989',
    fontFamily: FONTS.fregular,
  },
  txtDado3: {
    fontSize: 22,
    width: '100%',
    textAlign: 'left',
    color: '#898989',
    fontFamily: FONTS.fregular,
  },
});

export default ItemList;
