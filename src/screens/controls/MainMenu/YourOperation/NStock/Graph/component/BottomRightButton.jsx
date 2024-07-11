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
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
} from '../../../../../../../constants';
import {useNavigation} from '@react-navigation/native';
import IconPlus from '../../../../../../../assets/images/svg/iconPlus.svg';
import IconBarCode from '../../../../../../../assets/images/svg/iconBarCode.svg';

const BottomRightButton = ({pageScreen, bottom, right, icon}) => {
  const navigation = useNavigation();
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };
  return (
    <View style={[styles.container, {bottom: bottom, right: right}]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateToScreen(pageScreen)}>
        {icon === 'IconPlus' && <IconPlus height={30} width={26} />}
        {icon === 'IconBarCode' && <IconBarCode height={30} width={26} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  button: {
    backgroundColor: '#FADC00',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BottomRightButton;
