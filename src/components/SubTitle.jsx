import React from 'react';
import styled from 'styled-components/native';
import {Platform, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

export const SubTitle = styled.Text`
  min-height: 40px;
  background-color: ${COLORS.background};
  width: 92%;
  font-size: ${props => `${props.fontsize}`};
  font-family: ${FONTS.fregular};
  color: ${props => `${props.fontcolor}`};
  align-items: flex-start;
  justify-content: center;
  margin-left: 16px;
  padding-top: 5px;
  margin-bottom: 5px;
  text-align: justify;
`;

export default ({subtitle, fontsize, fontcolor}) => {
  return (
    <View>
      <SubTitle>{subtitle}</SubTitle>
    </View>
  );
};
