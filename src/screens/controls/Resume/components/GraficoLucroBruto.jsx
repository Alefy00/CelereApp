import React from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {Platform, Text, View} from 'react-native';
import {PieChart} from 'react-native-svg-charts';
import InfoIcon from '../../../../assets/images/svg/iconInfo.svg';
import {useTranslation} from 'react-i18next';
import '../../../../translation';

export const ContainerGroupGraph = styled.View`
  background-color: ${COLORS.white};
  margin-left: 16px;
  margin-right: 16px;
  margin-top: -10px;
  min-height: 152px;
  height: 192px;
  border-radius: 10px;
  padding-bottom: 10px;
  border-width: 1px;
  border-color: #cecfd1;
`;
export const GroupGraph = styled.View`
  flex: 1;
  flex-direction: row;
  margin-top: 0px;
`;
export const Graph = styled.View`
  align-items: center;
  justify-content: center;
  width: 140px;
  margin-top: 5px;
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
  font-size: ${SIZES.s20}px;
  font-family: ${FONTS.fsmbold};
  color: ${COLORS.secondary};
`;

export default ({data, valor_lucro_bruto}) => {
  const {t} = useTranslation();
  return (
    <ContainerGroupGraph>
      <GroupGraph>
        <Graph>
          <View style={{justifyContent: 'center', flex: 1}}>
            <PieChart
              style={{width: 110, height: 110}}
              outerRadius={'80%'}
              innerRadius={'45%'}
              startAngle={0}
              data={data}
            />
          </View>
        </Graph>
        <GlobalGroupInfo style={{marginTop: 50, paddingRight: 50}}>
          <GroupInfo>
            <SubTitleInfo>{t('gross_profit')}</SubTitleInfo>
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
            style={{textAlign: 'center', fontSize: SIZES.s24, marginTop: -10}}>
            {valor_lucro_bruto}
          </ValueInfo>
        </GlobalGroupInfo>
      </GroupGraph>
      <View
        style={{
          flexDirection: 'col',
          alignItems: 'flex-start',
          marginLeft: 10,
          justifyContent: 'flex-start',
        }}>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <View
              style={{
                flex: 1,
                maxWidth: 24,
                height: 12,
                borderRadius: 8,
                backgroundColor: item.svg.fill,
                marginRight: 5,
              }}
            />
            <Text
              style={{
                flex: 1,
                maxWidth: 90,
                fontFamily: FONTS.fregular,
                fontSize: SIZES.s14,
                color: COLORS.black,
              }}>
              {item.key}
            </Text>
            <Text
              style={{
                flex: 1,
                textAlign: 'right',
                alignItems: 'flex-end',
                justifyContent: 'center',
                fontFamily: FONTS.fregular,
                fontSize: SIZES.s14,
                color: item.svg.fill,
              }}>
              {item.format_value}
            </Text>
          </View>
        ))}
      </View>
    </ContainerGroupGraph>
  );
};
