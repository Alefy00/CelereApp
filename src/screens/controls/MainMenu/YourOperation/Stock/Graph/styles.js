import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => `${props.backColor}`};
  justify-content: flex-start;
`;
export const Scroller = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
