/* #############################################################################################
#                                        C E L E R E A P P
#
# Author....: Alexandre Soares de Almeida
# Object....: Seção de foto do produto, qtd e número do código de barras
# Create by.: 2024/06/08
# References: https://withfra.me/components/stats
#
# #############################################################################################
#             (C) Copyright 2024. Allright reserved solutions to CelereApp.
# #############################################################################################*/
import React, {useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {styled, Text} from 'styled-components/native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
} from '../../../../../../../../constants';
import RnIncrementDecrementBtn from '../../../../../../../../components/RnIncrementDecrementBtn';
import IconCamera from '../../../../../../../../assets/images/svg/iconCamera.svg';
import {useTranslation} from 'react-i18next';
import InputText from '../../../../../../../../components/InputText';

// Estilos
export const TopItem = styled.View`
  flex: 1;
  background-color: ${COLORS.lightYellow};
  flex-direction: row;
  height: 190px;
  max-width: 100%;
`;
export const BodyPhoto = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 190px;
  max-width: 40%;
`;
export const PhotoItem = styled.View`
  flex: 1;
  background-color: ${COLORS.white};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 144px;
  min-width: 152px;
  border-radius: 16px;
  margin-left: 22px;
`;
export const BodyItem = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 190px;
  width: 60%;
`;
export const TextTitle = styled.Text`
  justify-content: flex-start;
  color: #333333;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  min-height: 16px;
  z-index: 999;
`;

// Componente
const TopItemProduto = props => {
  // Atributos essenciais
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Dados Produto
  const [barcode, setBarcode] = useState(props.barcode);
  const [qtdProduto, setQtdProduto] = useState(props.qtdProduto);

  // Situação Validação Dados Produto
  const [barcodeValid, setBarcodeValid] = useState(true);

  // Link componentes
  const barcodeRef = useRef(null);

  // Métodos
  const handleChange = event => {};

  return (
    <TopItem>
      <BodyPhoto>
        <PhotoItem>
          <IconCamera width="82" height="82" />
        </PhotoItem>
      </BodyPhoto>
      <BodyItem>
        <InputText
          field={barcode}
          fieldValid={barcodeValid}
          fieldRef={barcodeRef}
          backColor={'#FFFFFF'}
          label={'Código'}
          icon={'barcode'}
          width={'215px'}
          maxLength={15}
        />

        <TextTitle style={{marginLeft: 18}}>Quantidade</TextTitle>

        <RnIncrementDecrementBtn
          minVal={0}
          minreq={0}
          max={1000}
          val={qtdProduto}
          disableControl={false}
          disabledColor={'#eeeeee'}
          activeColor={'#FFFFFF'}
          handleClick={() => console.log('Pressed')}
          styleBtn={{width: 35, height: 35}}
          styleTextInput={{width: 100, height: 35, backgroundColor: 'white'}}
          labelStyle={{fontSize: 22, color: 'black'}}
          style={{marginLeft: 20}}
        />
      </BodyItem>
    </TopItem>
  );
};
export default TopItemProduto;
