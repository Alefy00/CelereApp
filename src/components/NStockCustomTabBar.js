import React, {useContext} from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
// import { UserContext } from '../contexts/UserContext';

// Selecoes
import IconGraph1 from '../assets/images/svg/ntabbar/stock/iconGraph1.svg';
import IconDownload1 from '../assets/images/svg/ntabbar/stock/iconDownload1.svg';
import IconMenu1 from '../assets/images/svg/ntabbar/stock/iconMenu1.svg';

// Nao selecionado
import IconGraph0 from '../assets/images/svg/ntabbar/stock/iconGraph0.svg';
import IconDownload0 from '../assets/images/svg/ntabbar/stock/iconDownload0.svg';
import IconMenu0 from '../assets/images/svg/ntabbar/stock/iconMenu0.svg';

import {useTranslation} from 'react-i18next';
import '../translation';

const TabArea = styled.View`
  height: 56px;
  background-color: #7c7a7b;
  flex-direction: row;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 2px;
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
        {state.index === 0 && <IconGraph1 width="42" height="42" />}
        {state.index !== 0 && (
          <IconGraph0 width="42" height="42" opacity={0.6} />
        )}
      </TabItem>

      <TabItem onPress={() => goTo('Download')}>
        {state.index === 1 && <IconDownload1 width="42" height="42" />}
        {state.index !== 1 && (
          <IconDownload0 width="42" height="42" opacity={0.6} />
        )}
      </TabItem>

      <TabItem onPress={() => goTo('MenuStock')}>
        {state.index === 2 && <IconMenu1 width="42" height="42" />}
        {state.index !== 2 && (
          <IconMenu0 width="42" height="42" opacity={0.6} />
        )}
      </TabItem>
    </TabArea>
  );
};
