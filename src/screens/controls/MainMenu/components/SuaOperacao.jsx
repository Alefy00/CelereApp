/* eslint-disable prettier/prettier */
import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Svg, {Image, Defs, Filter, FeColorMatrix} from 'react-native-svg';

import IconStock from '../../../../assets/images/svg/iconStock.svg';
import IconServices from '../../../../assets/images/svg/iconServices.svg';
import IconVirtualShop from '../../../../assets/images/svg/iconVirtualShop.svg';
import IconOrders from '../../../../assets/images/svg/iconOrders.svg';
import IconBudget from '../../../../assets/images/svg/iconBudget.svg';
import IconReceipts from '../../../../assets/images/svg/iconReceipts.svg';
import IconSuppliers from '../../../../assets/images/svg/iconSuppliers.svg';
import IconCustomers from '../../../../assets/images/svg/iconCustomers.svg';

// desabilitados
import IconStock0 from '../../../../assets/images/svg/disabled/iconStock0.svg';
import IconServices0 from '../../../../assets/images/svg/disabled/iconServices0.svg';
import IconVirtualShop0 from '../../../../assets/images/svg/disabled/iconVirtualShop0.svg';
import IconOrders0 from '../../../../assets/images/svg/disabled/iconOrders0.svg';
import IconBudget0 from '../../../../assets/images/svg/disabled/iconBudget0.svg';
import IconReceipts0 from '../../../../assets/images/svg/disabled/iconReceipts0.svg';
import IconSuppliers0 from '../../../../assets/images/svg/disabled/iconSuppliers0.svg';
import IconCustomers0 from '../../../../assets/images/svg/disabled/iconCustomers0.svg';

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
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

const handleServices = () => {
  navigation.navigate("ServicesMenu");
};
  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>
        <BtnItemMenu
          backColor={COLORS.lightYellow2}
          onPress={() => navigateToScreen('NStockTab')}>
          <IconStock width="38" height="38" />
          <TxtItemMenu>{t('stock')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleServices}>
          <IconServices width="38" height="38" />
          <TxtItemMenu>{t('services')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconVirtualShop0 width="38" height="38" />
          <TxtItemMenu>{t('virtual_shop')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconOrders0 width="38" height="38" />
          <TxtItemMenu>{t('orders')}</TxtItemMenu>
        </BtnItemMenu>

        {/* Linha 2 */}

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconBudget0 width="38" height="38" />
          <TxtItemMenu>{t('budget')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconReceipts0 width="38" height="38" />
          <TxtItemMenu>{t('receipts')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconSuppliers0 width="38" height="38" />
          <TxtItemMenu>{t('suppliers')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconCustomers0 width="38" height="38" />
          <TxtItemMenu>{t('customers')}</TxtItemMenu>
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
