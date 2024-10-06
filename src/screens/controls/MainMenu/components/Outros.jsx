/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconCelereAcademy from '../../../../assets/images/svg/MainMenu/CelereAcademy.svg';
import IconIndicaCelere from '../../../../assets/images/svg/MainMenu/IndicarCelere.svg';


export const ContainerGroupButtons = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 204px;
  margin-left: 15px;
  margin-bottom: 25px;
`;
export const GroupButton = styled.View`
  flex-direction: row;
  height: 204px;
  padding-top: 1px;
  width: 100%;
  flex-wrap: wrap;
`;
export const BtnItemMenu = styled.TouchableOpacity`
  height:96px;
  width: 90px;
  align-items: center;
  border-radius: 5px;
  padding-top: 15px;
  margin-bottom: 10px;
   background-color: #fff;
   margin-right: 8px;
`;
export const TxtItemMenu = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
  text-align: center;
  margin-top: 3px;
`;

export default () => {
  const {t} = useTranslation();
  const navigation = useNavigation();


  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>
        <BtnItemMenu disabled>
          <IconCelereAcademy width="38" height="38" />
          <TxtItemMenu>{t('Célere Academy')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconIndicaCelere width="38" height="38" style={styles.grayscale} />
          <TxtItemMenu>{t('Indicar a Célere')}</TxtItemMenu>
        </BtnItemMenu>


      </GroupButton>
    </ContainerGroupButtons>
  );
};

const styles = StyleSheet.create({
  grayscale: {
    filter: 'grayscale(100%)',
  },
});
