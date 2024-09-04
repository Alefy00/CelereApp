/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import IconSalesOnCredit from '../../../../assets/images/svg/iconSalesOnCredit.svg';
import IconExpenses2 from '../../../../assets/images/svg/iconExpenses2.svg';
import IconWithDraws from '../../../../assets/images/svg/iconWithDraws.svg';
import IconEFT_POS from '../../../../assets/images/svg/iconEFT_POS.svg';
import IconUsers from '../../../../assets/images/svg/iconUsers.svg';
import IconDAS_MEI from '../../../../assets/images/svg/iconDAS_MEI.svg';
import IconIndicators from '../../../../assets/images/svg/iconIndicators.svg';
import IconReports from '../../../../assets/images/svg/iconReports.svg';
import IconImpostos from '../../../../assets/images/svg/MainMenu/IconImpostos.svg'


export const ContainerGroupButtons = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 204px;
  margin-left: 15px;
`;
export const GroupButton = styled.View`
  flex-direction: row;
  height: 204px;
  padding-top: 1px;
  justify-content: space-between;
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

  const NavTeamScreen = () => {
    navigation.navigate('TeamScreen');
  };

  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>
        <BtnItemMenu disabled>
          <IconSalesOnCredit width="38" height="38" />
          <TxtItemMenu>{t('Contas a Receber')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconExpenses2 width="38" height="38" style={styles.grayscale} />
          <TxtItemMenu>{t('Contas a Pagar')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconWithDraws width="38" height="38" style={styles.grayscale} />
          <TxtItemMenu>{t('Retiradas e Pró-Labore')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconEFT_POS width="38" height="38" />
          <TxtItemMenu>{t('Recebimento Cartões')}</TxtItemMenu>
        </BtnItemMenu>

        {/* Linha 2 */}

        <BtnItemMenu style={{backgroundColor: COLORS.lightYellow2}} onPress={NavTeamScreen}>
          <IconUsers width="38" height="38" />
          <TxtItemMenu>{t('Equipe')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconImpostos width="38" height="38" />
          <TxtItemMenu>{t('Impostos')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconIndicators width="38" height="38" />
          <TxtItemMenu>{t('indicators')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconReports width="38" height="38" />
          <TxtItemMenu>{t('reports')}</TxtItemMenu>
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
