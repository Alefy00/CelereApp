import React from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../constants';

import InfoIcon from '../../../../assets/images/svg/iconInfo.svg';
import IconPix from '../../../../assets/images/svg/iconPix.svg';

import {useTranslation} from 'react-i18next';
import '../../../../translation';

export const ContainerResult = styled.View`
  flex: 1;
  width: 100%;
  margin-top: -30px;
  height: 155px;
  padding-bottom: 10px;
`;
export const GroupColumn = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  max-height: 40px;
`;
export const ListRow = styled.View`
  flex: 1;
  flex-direction: column;
`;
export const GroupResult = styled.View`
  flex: 1;
  flex-direction: row;
  margin-right: 10px;
`;

export default ({vendas, despesas, saldo_previsto}) => {
  const {t} = useTranslation();
  return (
    <ContainerResult>
      <GroupColumn>
        <IconPix
          fill={COLORS.green}
          width={24}
          height={24}
          style={{
            flex: 1,
            border: 1,
            width: 20,
            marginLeft: 20,
            marginRight: 10,
          }}
        />
        <ListRow>
          <GroupResult>
            <Text
              style={{
                flex: 1,
                maxWidth: '70%',
                color: `${COLORS.secondary}`,
                textAlign: 'left',
                fontFamily: FONTS.fmedium,
                fontSize: SIZES.s14,
              }}>
              Carregador tipo C Xiaomi
            </Text>
            <Text
              style={{
                flex: 1,
                maxWidth: '30%',
                color: `${COLORS.green}`,
                textAlign: 'right',
                fontFamily: FONTS.fmedium,
                fontSize: SIZES.s14,
              }}>
              R$ 31,90
            </Text>
          </GroupResult>
          <GroupResult>
            <Text
              style={{
                flex: 1,
                maxWidth: '70%',
                color: `${COLORS.gray2}`,
                textAlign: 'left',
                fontFamily: FONTS.fmedium,
                fontSize: SIZES.s10,
              }}>
              Pix - 07/02/2024 15:23
            </Text>
            <Text
              style={{
                flex: 1,
                maxWidth: '30%',
                color: `${COLORS.green}`,
                textAlign: 'right',
                fontFamily: FONTS.fmedium,
                fontSize: SIZES.s10,
              }}>
              {t('liquidated')}
            </Text>
          </GroupResult>
        </ListRow>
      </GroupColumn>
    </ContainerResult>
  );
};
