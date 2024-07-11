import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Platform} from 'react-native';

import CalculatorIcon from '../assets/images/svg/iconCalculator.svg';
import MailerIcon from '../assets/images/svg/iconMailer.svg';

export const HeaderArea = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => `${props.backColor}`};
  min-height: ${Platform.OS === 'android' ? '55px' : '105px'};
  padding-left: 8px;
  padding-right: 8px;
  box-shadow: 2px 2px 2px #888888;
  padding-top: ${Platform.OS === 'android' ? '0px' : '50px'};
  margin-top: ${Platform.OS === 'android' ? '0px' : '-50px'};
`;

export const ToggleRight = styled.View`
  flex-basis: 25px;
  justify-content: center;
  margin-right: 20px;
`;

export const ToggleText = styled.View`
  flex: 1;
  flex-direction: column;
  height: 55px;
`;

export const HeaderTitle = styled.Text`
  flex: 1;
  font-size: 10px;
  font-family: Rubik-Regular;
  color: ${props => `${props.foreColor}`};
  background-color: ${props => `${props.backColor}`};
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 13px;
  margin-top: 8px;
`;

export const HeaderSubTitle = styled.Text`
  flex: 1;
  font-size: 14px;
  font-family: Rubik-Medium;
  color: ${props => `${props.foreColor}`};
  background-color: ${props => `${props.backColor}`};
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 13px;
  margin-top: -20px;
  font-weight: bold;
`;

export const ToggleLeft = styled.View`
  flex-basis: 20px;
  align-items: center;
  justify-content: center;
  flex-basis: 25px;
`;

export const ItemMailer = styled.Text`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #ff6b6b;
  color: #ffffff;
  font-size: 12px;
  font-family: Rubik-Bold;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: -5px;
  left: +12px;
`;

export const UserAvatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-left: 22px;
  margin-right: 8px;
`;

export const Btn = styled.TouchableOpacity``;

export default ({
  uriAvatar,
  titulo,
  subtitulo,
  backColor,
  foreColor,
  routeMailer,
  routeCalculator,
}) => {
  const navigation = useNavigation();
  return (
    <HeaderArea backColor={backColor}>
      <ToggleLeft>
        <UserAvatar source={{uri: uriAvatar}} />
      </ToggleLeft>

      <ToggleText>
        <HeaderTitle backColor={backColor} foreColor={foreColor}>
          {titulo}
        </HeaderTitle>
        <HeaderSubTitle>{subtitulo}</HeaderSubTitle>
      </ToggleText>

      <ToggleRight>
        <Btn onPress={null}>
          <MailerIcon width="26" height="26" fill={foreColor} />
          <ItemMailer>2</ItemMailer>
        </Btn>
      </ToggleRight>

      <ToggleRight style={{marginLeft: 10}}>
        <Btn onPress={null}>
          <CalculatorIcon width="26" height="26" fill={foreColor} />
        </Btn>
      </ToggleRight>
    </HeaderArea>
  );
};
