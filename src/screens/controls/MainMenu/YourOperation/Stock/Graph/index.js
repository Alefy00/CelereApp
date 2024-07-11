import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../../../../constants';
import {Container, Scroller} from './styles';

import {FAB, Portal, PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import BarTop2 from '../../../../../../components/BarTop2';
import InLineStats from './components/InLineStats';
import CategoryFind from './components/CategoryFind';
import ProductList from './components/ProductList';
import FloatingButton from './components/FloatingButton';

import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import '../../../../../../translation';

const Stock = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const items = [
    {id: 1, text: t('qty_super_category'), value: '28'},
    {id: 2, text: t('qty_category'), value: '43'},
    {id: 3, text: t('purchase_price'), value: 'R$ 245,20'},
    {id: 4, text: t('sale_price'), value: 'R$ 350,00'},
    {id: 5, text: t('qty_items'), value: '538'},
  ];
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;
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
              titulo={t('stock')}
              backColor={COLORS.primary}
              foreColor={'#000000'}
              routeMailer={''}
              routeCalculator={''}
            />
            <Scroller>
              <InLineStats items={items} />
              {/*<StockResume />*/}
              <CategoryFind />
              <ProductList />
            </Scroller>
          </>
          <FloatingButton />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};
export default Stock;
