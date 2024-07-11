import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../../../../translation';

export const ContainerResult = styled.View`
  align-items: flex-start;
  background-color: ${COLORS.lightGray2};
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #cecfd1;
`;

export const GroupResult = styled.View`
  flex-direction: row;
  min-height: 70px;
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const GroupInfo = styled.View`
  flex: 1;
  flex-direction: row;
  min-height: 70px;
  justify-content: space-between;
  width: 100%;
`;

export const GroupArea = styled.View`
  flex: 1;
  border-radius: 10px;
  border-color: ${COLORS.lightGray};
  border-width: 1px;
  background-color: ${COLORS.white};
  flex-direction: column;
  max-height: 70px;
  max-width: 174px;
`;

export const TitleInfo = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
  text-align: center;
  margin-top: 5px;
  width: 100%;
`;

export const ValueInfo = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s18}px;
  font-family: ${FONTS.fbold};
  text-align: center;
  width: 100%;
`;

export default ({valor_vendas, valor_despesas, saldo_dia}) => {
  const {t} = useTranslation();
  return (
    <ContainerResult>
      <GroupResult>
        <GroupInfo>
          <GroupArea>
            <TitleInfo>{t('qty_super_category')}</TitleInfo>
            <ValueInfo>522</ValueInfo>
          </GroupArea>
          <GroupArea>
            <TitleInfo>{t('qty_category')}</TitleInfo>
            <ValueInfo>522</ValueInfo>
          </GroupArea>
        </GroupInfo>
      </GroupResult>

      <GroupResult>
        <GroupInfo>
          <GroupArea>
            <TitleInfo>{t('purchase_price')}</TitleInfo>
            <ValueInfo>522</ValueInfo>
          </GroupArea>
          <GroupArea>
            <TitleInfo>{t('sale_price')}</TitleInfo>
            <ValueInfo>522</ValueInfo>
          </GroupArea>
        </GroupInfo>
      </GroupResult>

      <GroupResult>
        <GroupInfo style={{marginBottom: 10}}>
          <GroupArea>
            <TitleInfo>{t('qty_items')}</TitleInfo>
            <ValueInfo>522</ValueInfo>
          </GroupArea>
          <></>
        </GroupInfo>
      </GroupResult>
    </ContainerResult>
  );
};
