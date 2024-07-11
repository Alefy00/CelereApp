/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Componente Scrooler
# Create by.: 2024/05/29
# References:
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React from 'react';
import styled from 'styled-components/native';

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 0 0 10px;
  width: 100%;
`;

export default () => {
  return <Scroller></Scroller>;
};
