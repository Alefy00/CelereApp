/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Componente SelectedItems
# Create by.: 2024/06/09
# References: https://withfra.me/components/stats
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import CheckIcon from '../assets/images/svg/icos/check.svg';

// Estilos
export const ItemArea = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${props => `${props.backColor}`};
  width: 100%;
`;
export const InputArea = styled.View`
  flex-direction: column;
  height: 64px;
  align-items: center;
  padding-left: 35px;
  padding-right: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  margin-top: 15px;
  border: 1px solid #888888;
  box-shadow: 1px 1px 1px #8888;
  width: ${props => `${props.width}`};
  margin-left: 20px;
  background-color: ${props => `${props.backColor}`};
`;
export const TextArea = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  margin-left: -40px;
  margin-top: 2px;
  width: 108%;
`;
export const TextTitle = styled.Text`
  justify-content: flex-start;
  color: ${COLORS.black};
  padding-left: 4px;
  padding-right: 4px;
  font-size: ${SIZES.s16}px;
  text-align: left;
  font-weight: bold;
  min-height: 16px;
  z-index: 999;
  margin-left: 10px;
`;

// Componente
const InputText = props => {
  // Dados Produto
  const [field, setField] = useState(props.field);

  // Situação Validação Dados Produto
  const [fieldValid, setFieldValid] = useState(props.fieldValid);

  // Link componentes
  const fieldRef = useRef(props.fieldRef);

  // Métodos
  const handleChange = event => {};

  return (
    <InputArea backColor={props.backColor} width={props.width}>
      <TextArea>
        <TextTitle>{props.label}</TextTitle>
      </TextArea>

      <ItemArea>
        {props.icon && (
          <Icon
            name={props.icon}
            size={20}
            color="#000000"
            style={{
              marginTop: +5,
              marginLeft: -28,
              backgroundColor: `${props.backColor}`,
            }}
          />
        )}
        <TextTitle style={{color: COLORS.gray, fontSize: SIZES.s20}}>
          Sem Categoria
        </TextTitle>
      </ItemArea>
    </InputArea>
  );
};
export default InputText;
