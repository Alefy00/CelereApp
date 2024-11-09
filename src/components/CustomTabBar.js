/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import ResumoIcon0 from '../assets/images/svg/iconMnuBottomBarResume.svg';
import VencendoIcon0 from '../assets/images/svg/iconMnuBottomBarExpired.svg';
import IconMicrophone from '../assets/images/svg/iconMicrophone.svg';
import FluxoCaixa0 from '../assets/images/svg/iconMnuBottomBarCashFlow.svg';
import MenuIcon0 from '../assets/images/svg/iconMnuBottomMenu.svg';
import NF from '../assets/images/svg/MainMenu/NF.svg';
import card0 from '../assets/images/svg/MainMenu/card.svg'

// Selecoes
import ResumoIcon1 from '../assets/images/svg/tabbar/iconSummary1.svg';
import VencendoIcon1 from '../assets/images/svg/tabbar/iconExpiring1.svg';
import FluxoCaixa1 from '../assets/images/svg/tabbar/iconCashFlow1.svg';
import MenuIcon1 from '../assets/images/svg/tabbar/iconMenu1.svg';
import ActionButtons from '../screens/controls/Resume/components/ActionButtons';

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

export default  ({ state, navigation }) => {
  const { t } = useTranslation();

  const goTo = (screenName) => {
    navigation.navigate(screenName);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');
  const [notify, setNotify] = useState(false);

  const openModal = (featureName) => {
    setSelectedFeature(featureName);
    setModalVisible(true);
  };

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

      <TabItemCenter>
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

      <TabItem onPress={() => openModal('Nota Fiscal')}>
        {state.index === 4 ? (
          <>
            <NF width="48" height="48" />
            <ItemTitle style={{ marginTop: +3 }}>{t('menu')}</ItemTitle>
          </>
        ) : (
          <>
            <NF width="26" height="26" style={{ marginTop: +15, opacity: state.index !== 4 ? 0.6 : 1 }} />
            <ItemTitle style={{ marginTop: +10 }}>NF-e</ItemTitle>
          </>
        )}
      </TabItem>
    </TabArea>
      <Modal transparent={true} visible={modalVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{selectedFeature} estará disponível em breve!</Text>
          <Text style={styles.modalText}>Gostaria de ser notificado?</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox value={notify} onValueChange={setNotify} />
            <Text style={styles.checkboxLabel}>Sim, me notifique</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </>
);
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});