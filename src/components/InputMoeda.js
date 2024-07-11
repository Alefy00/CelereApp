import React from 'react';
import styled from 'styled-components/native';
import {connect} from 'react-redux';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${props => `${props.corFundo}`};
  flex-direction: row;
  border-radius: 3px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${props => `${props.cor}`};
  margin-left: 10px;
`;

const InputMoeda = props => {
  //const data = props.data;
  // export default ({cor, corHandle, corFundo, corIco, IconSvg, placeholder, value, onChangeText, password,
  //   required, maxLength, textContentType, autoCorrect, autofocus}) => {
  return (
    <InputArea corFundo={props.corFundo}>
      <IconSvg width="24" height="24" fill={props.corIco} />
      <Input
        placeholder={props.placeholder}
        placeholderTextColor={props.corHandle}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.password}
        required={props.required}
        maxLength={props.maxLength}
        textContentType={props.textContentType}
        autoCorrect={props.autoCorrect}
        autofocus={props.autofocus}
        cor={props.cor}
      />
    </InputArea>
  );
};

const mapStateToProps = state => {
  return {
    theme: state.theme,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // setName:(name) => dispatch({type:'SET_NAME', payload: { name }}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InputMoeda);
