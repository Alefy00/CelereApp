import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../../constants';
import {Container, Scroller} from './styles';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import '../../../../../../translation';
import {useTranslation} from 'react-i18next';
import BarTop2 from '../../../../../../components/BarTop2';
import SearchInput from '../../../../../../components/SearchInput';
import styled from 'styled-components/native';
import IconCamera from '../../../../../../assets/images/svg/iconCamera3.svg';
import ItemList from './component/ItemList';
import BottomRightButton from './component/BottomRightButton';

export const ButtonArea = styled.TouchableOpacity`
  flex-direction: row;
  background-color: ${props => `${props.backColor}`};
  border-color: #c1c1c1;
  border-width: ${props => `${props.borderWidth}`}px;
  border-radius: 14px;
  align-items: center;
  width: 120px;
  height: 55px;
`;

const StockMenu = props => {
  const {t} = useTranslation();
  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop2
              titulo={t('stock')}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />

            <Scroller>
              <View style={styles.topArea}>
                <View style={styles.area}>
                  <View style={styles.grupo}>
                    <Text style={styles.itemTitulo}>Qtd Categorias</Text>
                    <Text style={styles.itemTitulo}>6</Text>
                  </View>
                  <View style={styles.grupo}>
                    <Text style={styles.itemTitulo}>Qtd Itens</Text>
                    <Text style={styles.itemTitulo}>30</Text>
                  </View>
                </View>

                <View style={styles.area}>
                  <View style={styles.grupo}>
                    <Text style={styles.itemTitulo}>Preço de compra</Text>
                    <Text style={styles.itemTitulo}>R$ 12.500,00</Text>
                  </View>
                  <View style={styles.grupo}>
                    <Text style={styles.itemTitulo}>Preço de venda</Text>
                    <Text style={styles.itemTitulo}>R$ 18.550,90</Text>
                  </View>
                </View>
              </View>

              <SearchInput />

              <View style={styles.buttonArea}>
                <ButtonArea backColor={COLORS.lightYellow} borderWidth={0}>
                  <Text style={styles.itemTitulo}>Geral</Text>
                </ButtonArea>

                <ButtonArea backColor={COLORS.white} borderWidth={1}>
                  <Text style={styles.itemRotulo}>Legumes</Text>
                </ButtonArea>

                <ButtonArea backColor={COLORS.white} borderWidth={1}>
                  <Text style={styles.itemRotulo}>Mercearia</Text>
                </ButtonArea>
              </View>

              <View style={styles.resultado}>
                <ItemList
                  title={'Batata Inglesa'}
                  qtd={'18 disponíveis'}
                  value={'Preço R$ 8'}
                  pageScreen={'Start'}
                />
                <ItemList
                  title={'Arroz 5 KG'}
                  qtd={'15 disponíveis'}
                  value={'Preço R$ 18'}
                  pageScreen={'Start'}
                />
              </View>
            </Scroller>
            <BottomRightButton
              pageScreen={'NProduct'}
              bottom={80}
              right={20}
              icon={'IconBarCode'}
            />
            <BottomRightButton
              pageScreen={'NProduct'}
              bottom={10}
              right={20}
              icon={'IconPlus'}
            />
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
    marginTop: 35,
    width: '100%',
  },
  grupo: {
    width: 160,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    maxHeight: 60,
    paddingTop: 5,
    paddingBottom: 5,
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
    justifyContent: 'space-between',
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

export default StockMenu;
