import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: ${props => `${props.fundo}`};
  flex: 1;
  justify-content: center;
  align-items: center;
  align-content: space-between;
`;

export const LoadingIcon = styled.ActivityIndicator`
  margin-top: 50px;
  margin-bottom: 100px;
  color: #ffffff;
`;

export const Text = styled.Text`
  margin-top: 45px;
  color: ${props => `${props.cor}`};
`;

export const Copyright = styled.Text`
  margin-top: 5px;
  color: ${props => `${props.cor}`};
  font-size: 12px;
`;
