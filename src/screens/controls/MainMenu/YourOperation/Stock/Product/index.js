import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../../constants';
import {
  Container,
  Scroller,
  TextIco,
  InputArea,
  Input,
  TextArea,
  ItemArea,
} from './styles';
import {useTranslation} from 'react-i18next';
import '../../../../../../translation';
import styled from 'styled-components/native';

import BarTop2, {Btn, ItemMailer} from '../../../../../../components/BarTop2';
import TopItem from './components/TopItem';
import InputText from '../../../../../../components/InputText';
import InputTextArea from '../../../../../../components/InputTextArea';
import SelectedItems from '../../../../../../components/SelectedItems';
import RnIncrementDecrementBtn from '../../../../../../components/RnIncrementDecrementBtn';
import MailerIcon from '../../../../../../assets/images/svg/iconMailer.svg';

export const FieldRow = styled.View`
  flex: 1;
  flex-direction: row;
`;
export const ItemBtn = styled.TouchableOpacity`
  background-color: ${COLORS.primary};
  width: 90%;
  height: 60px;
  border-radius: 10px;
  margin-top: 5px;
  justify-content: center;
  margin-left: 20px;
`;
export const TextBtn = styled.Text`
  font-size: ${SIZES.s22}px;
  align-items: center;
  width: 100%;
  text-align: center;
`;

// Componente
const DadosProduto = props => {
  // Atributos essenciais
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
              uriAvatar={
                'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'
              }
              titulo={t('add_prod')}
              backColor={COLORS.primary}
              foreColor={'#000000'}
              routeMailer={''}
              routeCalculator={''}
              messages={false}
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
                    activeColor={'#FADC00'}
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

              <ItemBtn onPress={null}>
                <TextBtn>Adicionar</TextBtn>
              </ItemBtn>
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
export default DadosProduto;
