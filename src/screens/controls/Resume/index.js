import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../../../constants';
import {Container, Scroller} from './styles';
import DayScroll from '../../../components/DayScroll';

import BarTop from '../../../components/BarTop';
import Title from '../../../components/Title';

import CaixaPrevistoMeta from './components/CaixaPrevistoMeta';
import GraficoLucroBruto from './components/GraficoLucroBruto';
import ResultadoPrevisto from './components/ResultadoPrevisto';
import ResultadoDia from './components/ResultadoDia';

import {useTranslation} from 'react-i18next';
import '../../../translation';

const MainMenu = props => {
  const {t} = useTranslation();

  let today = new Date();
  const [selectedDay, setSelectedDay] = useState();

  const [locationText, setLocationText] = useState();
  const labelWidth = 5;
  const selectedSlice = useState();
  const [label, value] = [selectedSlice.label, selectedSlice.value];
  const keys = ['google', 'facebook', 'linkedin'];
  const values = [45, 15, 40];
  const colors = ['#5ED070', '#FA9600', '#F5F5F5'];
  const data = keys.map((key, index) => {
    return {
      key,
      value: values[index],
      svg: {fill: colors[index]},
      /* arc: { outerRadius: (70 + values[index]) + '%', padAngle: label === key ? 0.1 : 0 }, */
      format_value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(values[index]),
      onPress: () => {
        selectedSlice({label: key, value: values[index]});
      },
    };
  });
  return (
    <Container
      backColor={COLORS.background}
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <>
            <BarTop
              uriAvatar={
                'https://www.apptek.com.br/comercial/2024/manut/images/user/foto1.png'
              }
              titulo={t('partner')}
              subtitulo={'Planeta Cell'}
              backColor={COLORS.primary}
              foreColor={'#000000'}
              routeMailer={''}
              routeCalculator={''}
            />

            <DayScroll
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />

            <Scroller>
              <Title title={t('goal')} />
              <CaixaPrevistoMeta
                valorCaixa={'R$ 1540'}
                valorPrevisto={'R$ 1530'}
                PercentualMeta={'R$ 100.6'}
              />
              <GraficoLucroBruto data={data} valor_lucro_bruto={'R$ 130'} />

              <Title title={t('predicted_result')} />
              <ResultadoPrevisto
                vendas={'R$ 200'}
                despesas={'R$ 100'}
                saldo_previsto={'R$ 100'}
              />

              <Title title={t('result_of_the_day')} />
              <ResultadoDia
                valor_vendas={'R$ 210'}
                valor_despesas={'R$ 100'}
                saldo_dia={'R$ 110'}
              />
            </Scroller>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default MainMenu;
