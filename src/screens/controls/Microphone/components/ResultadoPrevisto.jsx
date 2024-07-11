import React from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import InfoIcon from '../../../../assets/images/svg/iconInfo.svg';
import {useTranslation} from 'react-i18next';
import '../../../../translation';

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
  margin-top: -15px;
  align-items: center;
  font-size: ${SIZES.s18}px;
  font-family: ${FONTS.fsmbold};
  color: ${COLORS.secondary};
`;
export const ContainerResult = styled.View`
  background-color: ${COLORS.white};
  margin-top: 0px;
  margin-left: 16px;
  margin-right: 16px;
  height: 155px;
  border-radius: 10px;
  padding-bottom: 10px;
  border-width: 1px;
  border-color: #cecfd1;
`;
export const GroupResult = styled.View`
  flex-direction: row;
  height: 40px;
  border-radius: 10px;
`;

export default ({vendas, despesas, saldo_previsto}) => {
  const {t} = useTranslation();
  return (
    <ContainerResult>
      <GroupResult>
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginLeft: 16,
            maxWidth: '50%',
            height: 8,
            backgroundColor: `${COLORS.green}`,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
          }}
        />
        <View
          style={{
            flex: 1,
            marginTop: 20,
            marginLeft: 2,
            maxWidth: '50%',
            height: 8,
            backgroundColor: `${COLORS.red}`,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            marginRight: 16,
          }}
        />
      </GroupResult>

      <GroupResult
        style={{
          marginTop: -10,
          paddingLeft: 16,
          paddingRight: 16,
          alignContent: 'space-between',
        }}>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            color: `${COLORS.green}`,
            textAlign: 'left',
            fontFamily: FONTS.fmedium,
            fontSize: SIZES.s14,
          }}>
          {t('sales')}
        </Text>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            color: `${COLORS.red}`,
            textAlign: 'right',
            fontFamily: FONTS.fmedium,
            fontSize: SIZES.s14,
          }}>
          {t('expenses')}
        </Text>
      </GroupResult>

      <GroupResult
        style={{
          marginTop: -20,
          paddingLeft: 16,
          paddingRight: 16,
          alignContent: 'space-between',
        }}>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            color: `${COLORS.green}`,
            textAlign: 'left',
            fontFamily: FONTS.fbold,
            fontSize: SIZES.s14,
          }}>
          {vendas}
        </Text>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            color: `${COLORS.red}`,
            textAlign: 'right',
            fontFamily: FONTS.fbold,
            fontSize: SIZES.s14,
          }}>
          {despesas}
        </Text>
      </GroupResult>

      <GlobalGroupInfo style={{marginTop: 5}}>
        <GroupInfo style={{marginBottom: 5}}>
          <SubTitleInfo>{t('expected_balance')}</SubTitleInfo>
          <Btn>
            <InfoIcon
              width="18"
              height="18"
              fill={COLORS.lightGray}
              style={{marginLeft: 5}}
            />
          </Btn>
        </GroupInfo>
        <ValueInfo
          style={{
            textAlign: 'center',
            fontSize: SIZES.s24,
            marginTop: -10,
            color: `${COLORS.green}`,
          }}>
          {saldo_previsto}
        </ValueInfo>
      </GlobalGroupInfo>
    </ContainerResult>
  );
};
