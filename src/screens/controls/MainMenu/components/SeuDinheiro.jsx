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
import IconSalesForecast from '../../../../assets/images/svg/iconSalesForecast.svg';
import IconCashFlow from '../../../../assets/images/svg/iconCashFlow.svg';
import IconBank from '../../../../assets/images/svg/iconBank.svg';
import IconControlPanel from '../../../../assets/images/svg/iconControlPanel.svg';

import IconStart0 from '../../../../assets/images/svg/disabled/iconStart0.svg';
import IconEntries0 from '../../../../assets/images/svg/disabled/iconEntries0.svg';
import IconExpenses0 from '../../../../assets/images/svg/disabled/iconExpenses0.svg';
import IconCashBalance0 from '../../../../assets/images/svg/disabled/iconCashBalance0.svg';
import IconSalesForecast0 from '../../../../assets/images/svg/disabled/iconSalesForecast0.svg';
import IconCashFlow0 from '../../../../assets/images/svg/disabled/iconCashFlow0.svg';
import IconBank0 from '../../../../assets/images/svg/disabled/iconBank0.svg';
import IconControlPanel0 from '../../../../assets/images/svg/disabled/iconControlPanel0.svg';

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
  margin-bottom: 12px;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;
export const BtnItemMenu = styled.TouchableOpacity`
  height: 96px;
  width: 90px;
  align-items: center;
  border-radius: 15px;
  padding-top: 15px;
  margin-bottom: 10px;
  background-color: ${props => `${props.backColor}`};
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
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
  const handleSalesForecast = () => {
    navigation.navigate("MonthlySalesForecast");
  };

  const handleExits = () => {
    navigation.navigate("Exits")
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

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleSalesForecast}>
          <IconSalesForecast
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('sales_forecast')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={'#F0E6E6'} disabled>
          <IconCashFlow0
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('cash_flow')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={'#F0E6E6'} disabled>
          <IconBank0
            width="38"
            height="38"
            fill={COLORS.green}
            style={{paddingLeft: 0, marginTop: -5}}
          />
          <TxtItemMenu>{t('bank')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={'#F0E6E6'} disabled>
          <IconControlPanel0
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
