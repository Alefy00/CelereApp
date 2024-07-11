/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Componente InputText
# Create by.: 2024/06/08
# References: keyboardType -> default, numeric, email-address, phone-pad, ascii-capable,
#                             numbers-and-punctuation, url e visible-password
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
export const Input = styled.TextInput`
  flex: 1;
  margin-top: -2px;
  margin-right: 5px;
  margin-bottom: 3px;
  margin-left: -10px;
  height: 39px;
  font-size: 17px;
  width: 85%;
  padding-top: 10px;
  padding-right: 30px;
  color: #333;
  text-align: left;
`;
export const ItemArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  background-color: ${props => `${props.backColor}`};
`;
export const InputArea = styled.View`
  flex-direction: column;
  height: 63px;
  align-items: center;
  padding-left: 5px;
  padding-right: 10px;
  margin-bottom: 8px;
  border-radius: 5px;
  margin-top: 14px;
  border: 1px solid #888888;
  box-shadow: 1px 1px 1px #8888;
  width: ${props => `${props.width}`};
  margin-left: 20px;
  background-color: ${props => `${props.backColor}`};
  overflow: hidden;
`;
export const TextArea = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  left: 5px;
  margin-top: 2px;
  width: 100%;
`;
export const TextTitle = styled.Text`
  justify-content: flex-start;
  color: #333333;
  padding-right: 4px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  min-height: 16px;
  z-index: 999;
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
        {field !== '' && fieldValid && (
          <CheckIcon
            width="24"
            height="24"
            style={{
              marginTop: 4,
              marginLeft: -30,
              marginRight: 15,
              backgroundColor: `${props.backColor}`,
            }}
            fill="#00B300"
          />
        )}
        <Input
          required={true}
          maxLength={props.maxLength}
          textContentType="none"
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          autoCorrect={false}
          autofocus={false}
          returnKeyType={'next'}
          ref={fieldRef}
          onSubmitEditing={() => fieldRef.focus()}
          blurOnSubmit={false}
          value={field}
          onChangeText={text => setField(text)}
          onBlur={handleChange}
          style={{backgroundColor: `${props.backColor}`}}
        />
        {props.icon && (
          <Icon
            name={props.icon}
            size={20}
            color="#000000"
            style={{
              marginTop: +5,
              marginLeft: -10,
              backgroundColor: `${props.backColor}`,
            }}
          />
        )}
      </ItemArea>
    </InputArea>
  );
};
export default InputText;
