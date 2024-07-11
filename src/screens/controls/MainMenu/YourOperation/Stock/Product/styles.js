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

export const InputArea = styled.View`
  flex: 1;
  flex-direction: column;
  max-height: 50px;
  align-items: center;
  background-color: #ffffff;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 8px;
  border-radius: 3px;
  margin-top: 15px;
  border: 1px solid #888888;
  box-shadow: 1px 1px 1px #8888;
  width: 92%;
`;
export const TextArea = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
  margin-top: -10px;
  width: 108%;
`;
