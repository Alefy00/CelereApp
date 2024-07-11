import React from 'react';
import styled from 'styled-components/native';
import {Platform, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

export const Title = styled.Text`
  height: 40px;
  background-color: ${COLORS.background};
  width: 92%;
  font-size: ${SIZES.s18}px;
  font-family: ${FONTS.fsmbold};
  color: ${COLORS.black};
  align-items: flex-start;
  justify-content: center;
  margin-left: 16px;
  padding-top: 5px;
  margin-bottom: 5px;
`;

export default ({title}) => {
  return (
    <View>
      <Title>{title}</Title>
    </View>
  );
};
