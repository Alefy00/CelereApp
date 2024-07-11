/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Componente Container
# Create by.: 2024/05/29
# References:
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${props => `${props.backColor}`};
  flex-direction: column;
  align-items: flex-start;
  align-content: center;
  justify-content: center;
`;

export default ({backColor}) => {
  return <Container backColor={backColor}></Container>;
};
