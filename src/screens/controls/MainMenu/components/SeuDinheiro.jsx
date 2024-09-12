/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {useNavigation} from '@react-navigation/native';

import IconStart from '../../../../assets/images/svg/iconStart.svg';
import IconEntries from '../../../../assets/images/svg/iconEntries.svg';
import IconExpenses from '../../../../assets/images/svg/iconExpenses.svg';
import IconCashBalance from '../../../../assets/images/svg/iconCashBalance.svg';
import IconCashFlow from '../../../../assets/images/svg/iconCashFlow.svg';
import IconBank from '../../../../assets/images/svg/iconBank.svg';
import IconControlPanel from '../../../../assets/images/svg/iconControlPanel.svg';
import IconCelerePay from '../../../../assets/images/svg/MainMenu/IconCelerePay.svg';


export const ContainerGroupButtons = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 204px;
  margin-left: 15px;
  margin-bottom: 5px;
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

  const handlePageStart = () => {
    navigation.navigate('Start');
  };

  const handlePageEntrie = () => {
    navigation.navigate('Entries');
  };

  const handleCashBalance = () => {
    navigation.navigate('CashBalance');
  };


  const handleExits = () => {
    navigation.navigate('Exits');
  };

  const handleCashFlow = () => {
    navigation.navigate('Winning');
  };

  const handleCelerePay = () => {
    navigation.navigate('CelerePay');
  };

  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>
        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handlePageStart}>
          <IconStart
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('start')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handlePageEntrie}>
          <IconEntries
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('entries')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleExits}>
          <IconExpenses
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('Saídas')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleCashBalance}>
          <IconCashBalance
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('cash_balance')}</TxtItemMenu>
        </BtnItemMenu>

        {/* Linha 2 */}

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleCelerePay}>
          <IconCelerePay
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('CélerePay')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={'#F0E6E6'} disabled>
          <IconBank
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('Conta Digital Banco')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleCashFlow}>
          <IconCashFlow
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('cash_flow')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={'#F0E6E6'} disabled>
          <IconControlPanel
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('control_panel')}</TxtItemMenu>
        </BtnItemMenu>
      </GroupButton>
    </ContainerGroupButtons>
  );
};
