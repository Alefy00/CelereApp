/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../constants';

import ResumoIcon0 from '../assets/images/svg/iconMnuBottomBarResume.svg';
import VencendoIcon0 from '../assets/images/svg/iconMnuBottomBarExpired.svg';
import IconMicrophone from '../assets/images/svg/iconMicrophone.svg';
import FluxoCaixa0 from '../assets/images/svg/iconMnuBottomBarCashFlow.svg';
import MenuIcon0 from '../assets/images/svg/iconMnuBottomMenu.svg';

// Selecoes
import ResumoIcon1 from '../assets/images/svg/tabbar/iconSummary1.svg';
import VencendoIcon1 from '../assets/images/svg/tabbar/iconExpiring1.svg';
import FluxoCaixa1 from '../assets/images/svg/tabbar/iconCashFlow1.svg';
import MenuIcon1 from '../assets/images/svg/tabbar/iconMenu1.svg';

import { useTranslation } from 'react-i18next';
import '../translation';

const TabArea = styled.View`
  height: 70px;
  background-color: ${COLORS.black};
  flex-direction: row;
  position: absolute;  /* Adicionado */
  bottom: 0;           /* Adicionado */
  width: 100%;         /* Adicionado */
  z-index: 0;         /* Adicionado para garantir que o tab menu fique por cima */
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.primary};
  border-radius: 35px;
  margin-top: -30px;
`;
export const ItemTitle = styled.Text`
  font-size: 12px;
  color: #fffef1;
  height: 32px;
  font-family: Rubik;
  text-align: center;
`;

export const ItemMsg = styled.Text`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: #ff6b6b;
  color: #ffffff;
  font-size: 12px;
  font-family: Rubik-Bold;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  top: -5px;
  left: +52px;
`;

export default ({ state, navigation }) => {
  const { t } = useTranslation();

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Resumo')}>
        {state.index === 0 ? (
          <>
            <ResumoIcon1 width="48" height="48" />
            <ItemTitle style={{ marginTop: +3 }}>{t('summary')}</ItemTitle>
          </>
        ) : (
          <>
            <ResumoIcon0 width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 0 ? 0.6 : 1 }} />
            <ItemTitle style={{ marginTop: +10 }}>{t('summary')}</ItemTitle>
          </>
        )}
      </TabItem>

      <TabItem onPress={() => goTo('Vencendo')} disabled>
        {state.index === 1 ? (
          <>
            <VencendoIcon1 width="48" height="48" />
            <ItemTitle style={{ marginTop: +3 }}>{t('expiring')}</ItemTitle>
          </>
        ) : (
          <>
            <VencendoIcon0 width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 1 ? 0.6 : 1 }} />
            <ItemTitle style={{ marginTop: +10 }}>{t('expiring')}</ItemTitle>
          </>
        )}
      </TabItem>

      <TabItemCenter onPress={() => goTo('Microphone')} disabled>
        <IconMicrophone width="32" height="32" />
      </TabItemCenter>

      <TabItem onPress={() => goTo('FluxoCaixa')} disabled>
        {state.index === 3 ? (
          <>
            <FluxoCaixa1 width="48" height="48" />
            <ItemTitle style={{ marginTop: +3 }}>{t('cash_flow')}</ItemTitle>
          </>
        ) : (
          <>
            <FluxoCaixa0 width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 3 ? 0.6 : 1 }} />
            <ItemTitle style={{ marginTop: +10 }}>{t('cash_flow')}</ItemTitle>
          </>
        )}
      </TabItem>

      <TabItem onPress={() => goTo('Menu')} disabled>
        {state.index === 4 ? (
          <>
            <MenuIcon1 width="48" height="48" />
            <ItemTitle style={{ marginTop: +3 }}>{t('menu')}</ItemTitle>
          </>
        ) : (
          <>
            <MenuIcon0 width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 4 ? 0.6 : 1 }} />
            <ItemTitle style={{ marginTop: +10 }}>{t('menu')}</ItemTitle>
          </>
        )}
      </TabItem>
    </TabArea>
  );
};
