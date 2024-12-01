/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useRef  } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ResumoIcon0 from '../assets/images/svg/iconMnuBottomBarResume.svg';
import VencendoIcon0 from '../assets/images/svg/iconMnuBottomBarExpired.svg';
import IconMicrophone from '../assets/images/svg/iconMicrophone.svg';
import FluxoCaixa0 from '../assets/images/svg/iconMnuBottomBarCashFlow.svg';
import MenuIcon0 from '../assets/images/svg/iconMnuBottomMenu.svg';
import NF from '../assets/images/svg/MainMenu/NF.svg';
import card0 from '../assets/images/svg/MainMenu/card.svg';

// Selecoes
import ResumoIcon1 from '../assets/images/svg/tabbar/iconSummary1.svg';
import VencendoIcon1 from '../assets/images/svg/tabbar/iconExpiring1.svg';
import FluxoCaixa1 from '../assets/images/svg/tabbar/iconCashFlow1.svg';
import MenuIcon1 from '../assets/images/svg/tabbar/iconMenu1.svg';
import ActionButtons from '../screens/controls/Resume/components/ActionButtons';
import NotificationModal from './NotificationModal'; // Importando o NotificationModal
import TourModal from '../screens/controls/Resume/components/TourModal';
import { useScroll } from '../screens/controls/Resume/components/ScrollContext';

import { useTranslation } from 'react-i18next';
import '../translation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTour } from '../screens/controls/Resume/components/TourContext';

const TabArea = styled.View`
  height: 70px;
  background-color: ${COLORS.black};
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 0;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const TabItemCenter = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
  margin-top: -20px;
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
  const openModal = (featureName) => {
    setSelectedFeature(featureName);
    setModalVisible(true);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [notify, setNotify] = useState(false);
  const { elementPositions, isTourVisible, currentStep, setCurrentStep, setIsTourVisible } = useTour();
  const [isCheckingTour, setIsCheckingTour] = useState(true);
  const { scrollToElement } = useScroll();
  const { setElementPositions } = useTour();
  const ActionButtonsRef = useRef(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const scaleFactor = PixelRatio.get();

  
  const handleLayout = (key, event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
  
    setElementPositions((prev) => ({
      ...prev,
      [key]: { x, y, width, height },
    }));
  };
  
  const stepsContent = [
    {
      key: 'dateCarousel',
      message: 'Aqui você pode escolher o período de visualização.',
      position: elementPositions['dateCarousel'],
      offsetTop: screenHeight * 0.25 / scaleFactor ,
    },
    {
      key: 'baseCarousel',
      message: 'Aqui é o total de dinheiro que seu negócio tem em bancos e em espécie. A cada entrada ou saída esse valor é atualizado automaticamente.',
      position: elementPositions['baseCarousel'],
      offsetTop: screenHeight * 0.33 / scaleFactor ,
    },
    {
      key: 'SalesChartCard',
      message: 'Sempre que você tocar neste ícone, uma explicação ira aparecer.',
      position: elementPositions['SalesChartCard'],
      offsetTop: -screenHeight * 0.23 / scaleFactor ,
    },
    {
      key: 'FilteredListCard',
      message: 'Aqui serão listadas as entrada e saídas uma a uma.',
      position: elementPositions['FilteredListCard'],
      offsetTop: -screenHeight * 0.25 / scaleFactor ,
    },
    {
      key: 'ActionButtonsRef',
      message: 'Por aqui você insere vendas e despesas, realiza consultas, cadastra produtos, e muito mais.',
      position: elementPositions['ActionButtonsRef'],
      offsetTop: screenHeight * 1.6 / scaleFactor,
    },
  ];


  useEffect(() => {
    const checkTourStatus = async () => {
      const tourCompleted = await AsyncStorage.getItem('tourCompleted');
      if (!tourCompleted) {
        setIsTourVisible(true);
      }
      setIsCheckingTour(false);
    };
    checkTourStatus();
  }, [setIsTourVisible]);

  const handleNextStep = () => {
    const currentKey = stepsContent[currentStep - 1]?.key;
    if (currentKey) {
      scrollToElement(currentKey, elementPositions); // Aciona o scroll
    }
    setCurrentStep((prev) => Math.min(prev + 1, stepsContent.length));
  };

  const handleCloseTour = async () => {
    setIsTourVisible(false);
    await AsyncStorage.setItem('tourCompleted', 'true');
  };

  if (isCheckingTour) {
    return null; // Ou carregando...
  }

  const currentStepData = stepsContent[currentStep - 1];

  return (
    <>
    
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

        <TabItem onPress={() => openModal('CélerePay')}>
          {state.index === 1 ? (
            <>
              <Ionicons name="card" size={20} color={COLORS.secondary} />
              <ItemTitle style={{ marginTop: +3 }}>{t('expiring')}</ItemTitle>
            </>
          ) : (
            <>
              <Ionicons name="card" size={40} color={COLORS.lightGray4} />
              <ItemTitle style={{ marginTop: +10 }}>CélerePay</ItemTitle>
            </>
          )}
        </TabItem>

        <TabItemCenter ref={ActionButtonsRef} onLayout={(event) => handleLayout('ActionButtonsRef', event)}>
          <ActionButtons navigation={navigation} />
        </TabItemCenter>

        <TabItem onPress={() => openModal('Fluxo de Caixa')}>
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

        <TabItem onPress={() => openModal('NF-e')}>
          {state.index === 4 ? (
            <>
              <NF width="48" height="48" />
              <ItemTitle style={{ marginTop: +3 }}>{t('NF-e')}</ItemTitle>
            </>
          ) : (
            <>
              <NF width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 4 ? 0.6 : 1 }} />
              <ItemTitle style={{ marginTop: +10 }}>NF-e</ItemTitle>
            </>
          )}
        </TabItem>
      </TabArea>

      {/* NotificationModal substituindo o modal antigo */}
      <NotificationModal
        visible={modalVisible}
        featureName={selectedFeature}
        notify={notify}
        setNotify={setNotify}
        onClose={() => setModalVisible(false)}
      />
      {isTourVisible && (
        <TourModal
        step={currentStep}
        totalSteps={stepsContent.length}
        message={currentStepData?.message}
        position={currentStepData?.position || { x: 0, y: 0, width: 300, height: 100 }}
        offsetTop={currentStepData?.offsetTop || 10} // Passa o ajuste específico
        onNext={handleNextStep}
        onClose={handleCloseTour}
      />
      )}
    </>
  );
};
