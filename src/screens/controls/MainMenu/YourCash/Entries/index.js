/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  ScrollView
} from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import styles from './styles';
import NewSaleIcon from '../../../../../assets/images/svg/Entries/NewSale.svg'; // SVG importado
import CancelSaleIcon from '../../../../../assets/images/svg/Entries/CancelSale.svg';
import ContasReceberIcon from '../../../../../assets/images/svg/Entries/ContasReceber.svg';
import AporteIcon from '../../../../../assets/images/svg/Entries/Aporte.svg';
import EmprestimoIcon from '../../../../../assets/images/svg/Entries/Emprestimo.svg';
import OutrasIcon from '../../../../../assets/images/svg/Entries/Outras.svg';
import RelatorioIcon from '../../../../../assets/images/svg/Entries/Relatorio.svg';
import Icon from 'react-native-vector-icons/Ionicons';

const Entries = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNewSalePress = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleOptionPress = (screenName) => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate(screenName);
    }
  };

  const NewRegisteredSale = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate('NewRegisteredSale');
      closeModal();
    }
  };

  const LooseProduct = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate('LooseProduct');
      closeModal();
    }
  };

  const options = [
    { id: 1, label: 'Nova venda', icon: NewSaleIcon, description: 'Registre uma nova venda', action: handleNewSalePress },
    { id: 2, label: 'Cancelar venda', icon: CancelSaleIcon, description: 'Estorne uma venda efetuada', screen: 'CancelSale' },
    { id: 3, label: 'Contas a Receber', icon: ContasReceberIcon, description: 'Liquidar total ou parcial, adiar, cancelar ou excluir contas.', screen: 'SettleCredit' },
    { id: 4, label: 'Aporte', icon: AporteIcon, description: 'Registre um aporte financeiro', screen: 'Contribution' },
    { id: 5, label: 'Empréstimo', icon: EmprestimoIcon, description: 'Cadastre um empréstimo', screen: 'Loan' },
    { id: 6, label: 'Outras Entradas', icon: OutrasIcon, description: 'Cadastre uma entrada manualmente', screen: 'Others' },
    { id: 7, label: 'Relatórios', icon: RelatorioIcon, description: 'Veja os relatórios de suas entradas', screen: 'Report' },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsNavigating(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleBackPress = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Menu'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
              onPress={handleBackPress}
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Suas entradas</Text>
            <Text style={styles.subtitle}>Gerencie as entradas financeiras do seu negócio.</Text>
          </View>

          <View style={styles.grid}>
            {options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={styles.option}
                onPress={option.action ? option.action : () => handleOptionPress(option.screen)}
              >
                <option.icon width={40} height={40} />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Modal
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalBackground}>
              <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity onPress={closeModal}>
                    <Icon name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.modalTitle}>Nova Venda</Text>
                <Text style={styles.modalSubtitle}>Selecione o tipo de venda:</Text>

                <TouchableOpacity style={styles.modalOption} onPress={NewRegisteredSale}>
                  <Text style={styles.modalOptionText}>📦 Produto ou Serviço Registrado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalOption2} onPress={LooseProduct}>
                  <Text style={styles.modalOptionText}>⚠️ Produto ou Serviço Avulso</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Entries;
