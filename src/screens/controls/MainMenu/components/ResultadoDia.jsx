import React, {useState} from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import InfoIcon from '../../../../assets/images/svg/iconInfo.svg';
import IconArrowUp from '../../../../assets/images/svg/iconArrowUp.svg';
import IconArrowDown from '../../../../assets/images/svg/iconArrowDown.svg';
import IconSearch from '../../../../assets/images/svg/iconSearch.svg';
import {useTranslation} from 'react-i18next';
import '../../../../translation';

import ListaVendaValor from './ListaVendaValor';

export const GlobalGroupInfo = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 30px;
  margin-left: 15px;
  margin-bottom: -10px;
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
  margin-top: 5px;
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
  align-items: flex-start;
  background-color: ${COLORS.white};
  margin-top: -3px;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 40px;
  border-radius: 10px;
  padding-bottom: 7px;
  border-width: 1px;
  border-color: #cecfd1;
`;
export const GroupResult = styled.View`
  flex-direction: row;
  height: 40px;
  border-radius: 10px;
`;
export const Divider = styled.View`
  borderbottomcolor: ${COLORS.lightGray4};
  borderbottomwidth: 1px;
  marginvertical: 10px;
  width: 100%;
  margin-right: 10px;
`;

export const LocationArea = styled.View`
  max-height: 60px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;
export const LocationFinder = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  padding-bottom: 7px;
`;

export default ({valor_vendas, valor_despesas, saldo_dia}) => {
  const {t} = useTranslation();
  const [locationText, setLocationText] = useState();
  return (
    <ContainerResult>
      <GroupResult
        style={{
          marginTop: 10,
          paddingTop: 10,
          paddingLeft: 16,
          paddingRight: 16,
          alignContent: 'space-between',
        }}>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            backgroundColor: `${COLORS.lightGray2}`,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            color: `${COLORS.black}`,
            textAlign: 'center',
            fontFamily: FONTS.fmedium,
            fontSize: SIZES.s14,
          }}>
          {t('sales')}
        </Text>
        <Text
          style={{
            flex: 1,
            maxWidth: '50%',
            color: `${COLORS.black}`,
            textAlign: 'center',
            fontFamily: FONTS.fmedium,
            fontSize: SIZES.s14,
          }}>
          {t('Expenses')}
        </Text>
      </GroupResult>

      <GroupResult
        style={{
          marginTop: 15,
          paddingLeft: 16,
          paddingRight: 16,
          alignContent: 'space-between',
        }}>
        <GroupInfo
          style={{
            elevation: 1,
            minHeight: 30,
            marginBottom: 15,
            backgroundColor: `${COLORS.lightGray2}`,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <Btn>
            <IconArrowUp
              width="18"
              height="18"
              fill={COLORS.green}
              style={{paddingLeft: 0, marginTop: -5}}
            />
          </Btn>
          <Text
            style={{
              flex: 1,
              marginTop: -5,
              maxWidth: '50%',
              color: `${COLORS.green}`,
              textAlign: 'center',
              fontFamily: FONTS.fbold,
              fontSize: SIZES.s14,
              marginLeft: -15,
            }}>
            {valor_vendas}
          </Text>
        </GroupInfo>

        <GroupInfo style={{minHeight: 30, marginBottom: 15}}>
          <Btn>
            <IconArrowDown
              width="18"
              height="18"
              fill={COLORS.red}
              style={{paddingLeft: 0, marginTop: -5}}
            />
          </Btn>
          <Text
            style={{
              flex: 1,
              marginTop: -5,
              maxWidth: '50%',
              color: `${COLORS.red}`,
              textAlign: 'center',
              fontFamily: FONTS.fbold,
              fontSize: SIZES.s14,
              marginLeft: -15,
            }}>
            {valor_vendas}
          </Text>
        </GroupInfo>
      </GroupResult>

      <Divider
        style={{marginTop: -15, marginBottom: 45, borderBottomColor: '#F2F2F2'}}
      />

      <GlobalGroupInfo style={{marginTop: -10, flexDirection: 'row'}}>
        <GroupInfo style={{marginBottom: 5, justifyContent: 'flex-start'}}>
          <SubTitleInfo>{t('balance_of_the_day')}</SubTitleInfo>
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
            textAlign: 'right',
            fontFamily: FONTS.fbold,
            fontSize: SIZES.s24,
            marginTop: -28,
            color: `${COLORS.green}`,
            marginRight: 15,
          }}>
          {saldo_dia}
        </ValueInfo>
      </GlobalGroupInfo>

      <LocationArea>
        <LocationInput
          placeholder={t('search_for_a_sale_or_value')}
          placeholderTextColor={COLORS.lightGray4}
          value={locationText}
          onChangeText={t => setLocationText(t)}
          onEndEditing={null}
        />
        <LocationFinder onPress={null}>
          <IconSearch width="24" height="24" fill="#FFFFFF" />
        </LocationFinder>
      </LocationArea>

      <Divider
        style={{
          marginTop: 5,
          marginBottom: 45,
          borderBottomWidth: 1,
          marginLeft: 15,
          borderBottomColor: '#212121',
          width: '94%',
        }}
      />

      <ListaVendaValor />
    </ContainerResult>
  );
};
