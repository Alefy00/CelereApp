import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  images,
} from '../../../../../../../constants';
import {Container, Scroller} from './styles';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import '../../../../../../../translation';
import {useTranslation} from 'react-i18next';
import BarTop2 from '../../../../../../../components/BarTop2';
import IconCamera from '../../../../../../../assets/images/svg/iconCamera2.svg';
import InputText from '../../../../../../../components/InputText';
import InputTextArea from '../../../../../../../components/InputTextArea';
import {useNavigation} from '@react-navigation/native';
import RnIncrementDecrementBtn from '../../../../../../../components/RnIncrementDecrementBtn/rnIncrementDecrementBtn';
import {FieldRow} from '../../../Stock/Product';
import SelectedItems from '../../../../../../../components/SelectedItems';
import TopItem from './component/TopItem';

export const ButtonArea = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${props => `${props.backColor}`};
  border-color: #c1c1c1;
  border-width: ${props => `${props.borderWidth}`}px;
  border-radius: 14px;
  align-items: center;
  width: 270px;
  height: 55px;
`;

const Product = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Formulario
  const [isFormValid, setIsFormValid] = useState(true);

  // Campos Formulario
  const [barCode, setBarCode] = useState('000123456789');
  const [qtdProduto, setQtdProduto] = React.useState(0);

  const [nome, setNome] = useState('');
  const [nomeValid, setNomeValid] = useState(false);
  const nomeRef = useRef(null);

  const [custoCompra, setCustoCompra] = useState('');
  const [custoCompraValid, setCustoCompraValid] = useState(false);
  const custoCompraRef = useRef(null);

  const [descricao, setDescricao] = useState('');
  const [descricaoValid, setDescricaoValid] = useState(false);
  const descricaoRef = useRef(null);

  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop2
              titulo={t('add_product')}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />

            <Scroller>
              <TopItem barcode={barCode} qtdProduto={qtdProduto} />

              <InputText
                field={nome}
                fieldValid={nomeValid}
                fieldRef={nomeRef}
                backColor={'#F0F0F0'}
                label={'Nome*'}
                width={'92%'}
                maxLength={80}
              />

              <InputText
                field={custoCompra}
                fieldValid={custoCompraValid}
                fieldRef={custoCompraRef}
                backColor={'#F0F0F0'}
                label={'Custo de compra*'}
                width={'200px'}
                maxLength={16}
              />

              <FieldRow>
                <View style={{maxWidth: '60%'}}>
                  <InputText
                    field={custoCompra}
                    fieldValid={custoCompraValid}
                    fieldRef={custoCompraRef}
                    backColor={'#F0F0F0'}
                    label={'Preço de venda*'}
                    width={'200px'}
                    maxLength={16}
                  />
                </View>
                <View style={{maxWidth: '40%', paddingTop: 18}}>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginBottom: 2,
                      fontSize: SIZES.s16,
                      color: COLORS.black,
                      fontWeight: 'bold',
                    }}>
                    {t('margin')}
                  </Text>
                  <RnIncrementDecrementBtn
                    minVal={0}
                    minreq={0}
                    max={100}
                    val={0}
                    disableControl={false}
                    disabledColor={'#eeeeee'}
                    activeColor={'#F0F0F0'}
                    handleClick={() => console.log('Pressed')}
                    styleBtn={{width: 35, height: 35}}
                    styleTextInput={{
                      width: 60,
                      height: 35,
                      backgroundColor: 'white',
                    }}
                    labelStyle={{fontSize: 22, color: 'black'}}
                    style={{marginLeft: 20}}
                  />
                </View>
              </FieldRow>

              <SelectedItems
                field={custoCompra}
                fieldValid={custoCompraValid}
                fieldRef={custoCompraRef}
                backColor={'#F0F0F0'}
                label={'Categoria'}
                width={'92%'}
                icon={'sort-amount-desc'}
              />

              <InputTextArea
                field={descricao}
                fieldValid={descricaoValid}
                fieldRef={descricaoRef}
                backColor={'#F0F0F0'}
                label={'Descrição'}
                width={'92%'}
                maxLength={400}
              />

              <View style={styles.buttonArea}>
                <ButtonArea backColor={COLORS.lightYellow} borderWidth={0}>
                  <Text style={styles.itemTitulo}>Adicionar</Text>
                </ButtonArea>
              </View>
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  topArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FEF445',
    padding: 16,
    marginBottom: 10,
    height: 198,
  },
  area: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  grupo: {
    width: 180,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    height: 155,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitulo: {
    fontSize: 18,
    width: '100%',
    maxHeight: 25,
    textAlign: 'center',
    color: '#2F2F2F',
    fontWeight: 'bold',
  },
  itemRotulo: {
    fontSize: 18,
    width: '100%',
    maxHeight: 25,
    textAlign: 'center',
    color: '#2F2F2F',
  },
  buttonArea: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultado: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  registro: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#eeeded',
    borderRadius: 12,
    marginTop: 5,
    height: 115,
  },
  foto: {
    backgroundColor: '#dad8d8',
    height: 75,
    width: 75,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dados: {
    flex: 1,
    width: 300,
    height: 90,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  txtDado1: {
    fontSize: 24,
    width: '100%',
    textAlign: 'left',
    color: '#2F2F2F',
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#898989',
    fontFamily: FONTS.fsmbold,
  },
  txtDado2: {
    fontSize: 16,
    width: '100%',
    textAlign: 'left',
    color: '#898989',
    fontFamily: FONTS.fregular,
  },
  txtDado3: {
    fontSize: 22,
    width: '100%',
    textAlign: 'left',
    color: '#898989',
    fontFamily: FONTS.fregular,
  },
});

export default Product;
