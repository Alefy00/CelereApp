import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';

import InfoIcon from '../../../../assets/images/svg/iconInfo.svg';

import {useTranslation} from 'react-i18next';
import '../../../../translation';

export const ContainerGroupInfo = styled.View`
  flex: 1;
  width: 100%;
  max-height: 85px;
  flex-direction: row;
  margin-left: 5px;
  margin-right: 20px;
  margin-top: 15px;
  margin-bottom: 20px;
`;
export const GlobalGroupInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 30px;
  margin-left: 15px;
`;
export const GroupInfo = styled.View`
  flex: 1;
  width: 100%;
  max-height: 35px;
  margin-top: -25px;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
export const SubTitleInfo = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
`;
export const Btn = styled.TouchableOpacity`
  max-height: 25px;
  align-items: center;
  justify-content: space-between;
`;
export const ValueInfo = styled.Text`
  flex: 1;
  width: 100%;
  text-align: center;
  padding-top: 3px;
  align-items: center;
  font-size: ${SIZES.s18}px;
  font-family: ${FONTS.fsmbold};
  color: ${COLORS.secondary};
`;

export default ({
  valorCaixa,
  valorPrevisto,
  PercentualMeta,
  EvtCaixaInfo,
  EvtPrevistoInfo,
  EvtMetaInfo,
}) => {
  const {t} = useTranslation();

  return (
    <ContainerGroupInfo style={{flex: 1, width: '92%'}}>
      <GlobalGroupInfo>
        <GroupInfo>
          <SubTitleInfo>{t('box')}</SubTitleInfo>
          <Btn>
            <InfoIcon
              width="18"
              height="18"
              fill={COLORS.lightGray}
              style={{marginLeft: 5}}
            />
          </Btn>
        </GroupInfo>
        <ValueInfo>{valorCaixa}</ValueInfo>
      </GlobalGroupInfo>

      <GlobalGroupInfo>
        <GroupInfo>
          <SubTitleInfo>{t('foreseen')}</SubTitleInfo>
          <Btn>
            <InfoIcon
              width="18"
              height="18"
              fill={COLORS.lightGray}
              style={{marginLeft: 5}}
            />
          </Btn>
        </GroupInfo>
        <ValueInfo>{valorPrevisto}</ValueInfo>
      </GlobalGroupInfo>

      <GlobalGroupInfo>
        <GroupInfo>
          <SubTitleInfo>{t('goal')}</SubTitleInfo>
          <Btn>
            <InfoIcon
              width="18"
              height="18"
              fill={COLORS.lightGray}
              style={{marginLeft: 5}}
            />
          </Btn>
        </GroupInfo>
        <ValueInfo style={{color: COLORS.green}}>{PercentualMeta}%</ValueInfo>
      </GlobalGroupInfo>
    </ContainerGroupInfo>
  );
};
