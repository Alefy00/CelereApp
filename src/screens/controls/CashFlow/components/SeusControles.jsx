import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {StyleSheet} from 'react-native';

import Svg, {Image, Defs, Filter, FeColorMatrix} from 'react-native-svg';

import IconSalesOnCredit from '../../../../assets/images/svg/iconSalesOnCredit.svg';
import IconExpenses2 from '../../../../assets/images/svg/iconExpenses2.svg';
import IconWithDraws from '../../../../assets/images/svg/iconWithDraws.svg';
import IconEFT_POS from '../../../../assets/images/svg/iconEFT_POS.svg';
import IconUsers from '../../../../assets/images/svg/iconUsers.svg';
import IconDAS_MEI from '../../../../assets/images/svg/iconDAS_MEI.svg';
import IconIndicators from '../../../../assets/images/svg/iconIndicators.svg';
import IconReports from '../../../../assets/images/svg/iconReports.svg';

import IconSalesOnCredit0 from '../../../../assets/images/svg/disabled/iconSalesOnCredit0.svg';
import IconExpenses2_0 from '../../../../assets/images/svg/disabled/iconExpenses2_0.svg';
import IconWithDraws0 from '../../../../assets/images/svg/disabled/iconWithDraws0.svg';
import IconEFT_POS0 from '../../../../assets/images/svg/disabled/iconEFT_POS0.svg';
import IconUsers0 from '../../../../assets/images/svg/disabled/iconUsers0.svg';
import IconDAS_MEI0 from '../../../../assets/images/svg/disabled/iconDAS_MEI0.svg';
import IconIndicators0 from '../../../../assets/images/svg/disabled/iconIndicators0.svg';
import IconReports0 from '../../../../assets/images/svg/disabled/iconReports0.svg';

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
  background-color: #f0e6e6;
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
  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>
        <BtnItemMenu disabled>
          <IconSalesOnCredit0 width="38" height="38" />
          <TxtItemMenu>{t('sales_on_credit')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconExpenses2_0 width="38" height="38" style={styles.grayscale} />
          <TxtItemMenu>{t('expenses')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconWithDraws0 width="38" height="38" style={styles.grayscale} />
          <TxtItemMenu>{t('withdraws')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconEFT_POS0 width="38" height="38" />
          <TxtItemMenu>{t('eft_pos')}</TxtItemMenu>
        </BtnItemMenu>

        {/* Linha 2 */}

        <BtnItemMenu disabled>
          <IconUsers0 width="38" height="38" />
          <TxtItemMenu>{t('users')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconDAS_MEI0 width="38" height="38" />
          <TxtItemMenu>{t('das_mei')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconIndicators0 width="38" height="38" />
          <TxtItemMenu>{t('indicators')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu disabled>
          <IconReports0 width="38" height="38" />
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
