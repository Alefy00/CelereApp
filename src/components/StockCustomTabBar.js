import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
// import { UserContext } from '../contexts/UserContext';

// Selecoes
import IconGraph1 from '../assets/images/svg/tabbar/stock/iconGraph1.svg';
import IconDownload1 from '../assets/images/svg/tabbar/stock/iconDownload1.svg';
import IconMenu1 from '../assets/images/svg/tabbar/stock/iconMenu1.svg';

// Nao selecionado
import IconGraph0 from '../assets/images/svg/tabbar/stock/iconGraph0.svg';
import IconDownload0 from '../assets/images/svg/tabbar/stock/iconDownload0.svg';
import IconMenu0 from '../assets/images/svg/tabbar/stock/iconMenu0.svg';

import {useTranslation} from 'react-i18next';
import '../translation';

const TabArea = styled.View`
  height: 86px;
  background-color: ${COLORS.secondary};
  flex-direction: row;
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
  background-color: #f4f440;
  border-radius: 35px;
  border: 4px solid ${COLORS.secondary};
  margin-top: -30px;
`;
const AvatarIcon = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 12px;
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

export default ({state, navigation}) => {
  const {t} = useTranslation();

  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Graph')}>
        {state.index === 0 && (
          <>
            <IconGraph1 width="48" height="48" />
            <ItemTitle style={{marginTop: +3}}>{t('graph')}</ItemTitle>
          </>
        )}
        {state.index !== 0 && (
          <>
            <IconGraph0 width="26" height="26" style={{marginTop: +15}} />
            <ItemTitle style={{marginTop: +10}}>{t('graph')}</ItemTitle>
            <ItemMsg>1</ItemMsg>
          </>
        )}
      </TabItem>

      <TabItem onPress={() => goTo('Download')}>
        {state.index === 1 && (
          <>
            <IconDownload1 width="48" height="48" />
            <ItemTitle style={{marginTop: +3}}>{t('download')}</ItemTitle>
          </>
        )}
        {state.index !== 1 && (
          <>
            <IconDownload0 width="26" height="26" style={{marginTop: +15}} />
            <ItemTitle style={{marginTop: +10}}>{t('download')}</ItemTitle>
            <ItemMsg>1</ItemMsg>
          </>
        )}
      </TabItem>

      {/*
            <TabItemCenter onPress={()=>goTo('Microphone')}>
                <IconMicrophone width="32" height="32"/>
            </TabItemCenter>
            */}

      <TabItem onPress={() => goTo('MenuStock')}>
        {state.index === 2 && (
          <>
            <IconMenu1 width="48" height="48" />
            <ItemTitle style={{marginTop: +3}}>{t('menu')}</ItemTitle>
          </>
        )}
        {state.index !== 2 && (
          <>
            <IconMenu0 width="26" height="26" style={{marginTop: +15}} />
            <ItemTitle style={{marginTop: +10}}>{t('menu')}</ItemTitle>
            <ItemMsg>1</ItemMsg>
          </>
        )}
      </TabItem>
    </TabArea>
  );
};
