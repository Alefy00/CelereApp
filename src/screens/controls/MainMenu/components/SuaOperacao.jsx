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
  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

const handleServices = () => {
  navigation.navigate("ServicesMenu");
};
  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleServices}>
          <IconServices width="38" height="38" />
          <TxtItemMenu>{t('Produtos e Serviços')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu
          backColor={COLORS.lightYellow2}
          onPress={() => navigateToScreen('StockInfo')}>
          <IconStock width="38" height="38" />
          <TxtItemMenu>{t('Estoque')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconBudget width="38" height="38" />
          <TxtItemMenu>{t('Recibos e Orçamento')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconReceipts width="38" height="38" />
          <TxtItemMenu>{t('Notas Fiscais Eletrônicas')}</TxtItemMenu>
        </BtnItemMenu>
        {/* Linha 2 */}
        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconVirtualShop width="38" height="38" />
          <TxtItemMenu>{t('virtual_shop')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconOrders width="38" height="38" />
          <TxtItemMenu>{t('orders')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconSuppliers width="38" height="38" />
          <TxtItemMenu>{t('Cliente e       Fornecedor')}</TxtItemMenu>
        </BtnItemMenu>


        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconCustomers width="38" height="38" />
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
