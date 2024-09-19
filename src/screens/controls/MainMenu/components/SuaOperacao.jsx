/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import {COLORS, FONTS, SIZES} from '../../../../constants';
import {useTranslation} from 'react-i18next';
import '../../../../translation';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


import IconStock from '../../../../assets/images/svg/iconStock.svg';
import IconServices from '../../../../assets/images/svg/iconServices.svg';
import IconVirtualShop from '../../../../assets/images/svg/iconVirtualShop.svg';
import IconOrders from '../../../../assets/images/svg/iconOrders.svg';
import IconBudget from '../../../../assets/images/svg/iconBudget.svg';
import IconReceipts from '../../../../assets/images/svg/iconReceipts.svg';
import IconSuppliers from '../../../../assets/images/svg/iconSuppliers.svg';
import IconCustomers from '../../../../assets/images/svg/iconCustomers.svg';


export const ContainerGroupButtons = styled.View`
  flex: 1;
  align-items: flex-start;
  min-height: 204px;
  margin-left: 15px;
`;
export const GroupButton = styled.View`
  flex-direction: row;
  height: 204px;
  padding-top: 1px;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
`;
export const BtnItemMenu = styled.TouchableOpacity`
  height:96px;
  width: 90px;
  align-items: center;
  border-radius: 5px;
  padding-top: 15px;
  margin-bottom: 10px;
   background-color: #fff;
`;
export const TxtItemMenu = styled.Text`
  color: ${COLORS.secondary};
  font-size: ${SIZES.s14}px;
  font-family: ${FONTS.fregular};
  text-align: center;
  margin-top: 3px;
`;


export default () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

const handleServices = () => {
  navigation.navigate("ServicesMenu");
};
const togglePopup = () => {
  setIsPopupVisible(!isPopupVisible);
};

  return (
    <ContainerGroupButtons style={{flex: 1, width: '92%'}}>
      <GroupButton>

        <BtnItemMenu backColor={COLORS.lightYellow2} onPress={handleServices}>
          <IconServices width="38" height="38" />
          <TxtItemMenu>{t('Produtos e Serviços')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu
          backColor={COLORS.lightYellow2}
          onPress={() => navigateToScreen('StockInfo')}>
          <IconStock width="38" height="38" />
          <TxtItemMenu>{t('Estoque')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" onPress={togglePopup} >
          <IconBudget width="38" height="38" />
          <TxtItemMenu>{t('Recibos e Orçamento')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconReceipts width="38" height="38" />
          <TxtItemMenu>{t('Notas Fiscais Eletrônicas')}</TxtItemMenu>
        </BtnItemMenu>
        {/* Linha 2 */}
        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconVirtualShop width="38" height="38" />
          <TxtItemMenu>{t('virtual_shop')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconOrders width="38" height="38" />
          <TxtItemMenu>{t('orders')}</TxtItemMenu>
        </BtnItemMenu>

        <BtnItemMenu backColor="#F0E6E6"  onPress={() => navigateToScreen('CustomerSupplierScreen')}d>
          <IconSuppliers width="38" height="38" />
          <TxtItemMenu>{t('Cliente e       Fornecedor')}</TxtItemMenu>
        </BtnItemMenu>


        <BtnItemMenu backColor="#F0E6E6" disabled>
          <IconCustomers width="38" height="38" />
          <TxtItemMenu>{t('customers')}</TxtItemMenu>
        </BtnItemMenu>
      </GroupButton>

      {/* Modal para o Pop-up */}
      <Modal transparent={true} visible={isPopupVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.popupContainer}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Recibos e Orçamentos</Text>
              <TouchableOpacity onPress={togglePopup}>
                <Icon name="close" size={26} color={COLORS.gray} />
              </TouchableOpacity>
            </View>
            <Text style={styles.popupSubtitle}>Selecione uma das opções abaixo:</Text>

            {/* Botões do pop-up */}
            <TouchableOpacity style={styles.popupButtonYellow} onPress={() => {navigation.navigate('Receipts')}}>
              <Text style={styles.popupButtonText}>Recibos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.popupButtonWhite} onPress={() => {navigation.navigate('Budget')}}>
              <Text style={styles.popupButtonText}>Orçamentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ContainerGroupButtons>
  );
};

const styles = StyleSheet.create({
  grayscale: {
    filter: 'grayscale(100%)',
  },
  groupButton: {
    flexDirection: 'row',
    height: 204,
    paddingTop: 1,
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
  },
  btnItemMenu: {
    height: 96,
    width: 90,
    alignItems: 'center',
    borderRadius: 5,
    paddingTop: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  txtItemMenu: {
    color: COLORS.secondary,
    fontSize: SIZES.s14,
    fontFamily: FONTS.fregular,
    textAlign: 'center',
    marginTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popupContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  popupSubtitle: {
    color: COLORS.black,
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  popupButtonYellow: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical:20,
  },
  popupButtonWhite: {
    width: '100%',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    paddingVertical:20,
  },
  popupButtonText: {
    fontSize: SIZES.s16,
    fontFamily: FONTS.fregular,
    color: COLORS.black,
  },
});
