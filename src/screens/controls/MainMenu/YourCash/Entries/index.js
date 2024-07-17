/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
} from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import {COLORS} from '../../../../../constants';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';


const Entries = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(-100)); // Valor inicial fora da tela
  
    const handleOptionPress = (screenName) => {
      if (screenName) {
        navigation.navigate(screenName);
      }
    };
  
    const handleNewSalePress = () => {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // Move o pop-up para a posição final
        duration: 300, // Duração da animação
        useNativeDriver: true,
      }).start();
    };
  
    const closeModal = () => {
      Animated.timing(slideAnim, {
        toValue: -100, // Move o pop-up para fora da tela
        duration: 300, // Duração da animação
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    };
  
    const options = [
      { id: 1, label: 'Nova Venda', action: handleNewSalePress },
      { id: 2, label: 'Cancelar venda', screen: 'CancelSaleScreen' },
      { id: 3, label: 'Liquidar Fiado', screen: 'SettleCreditScreen' },
      { id: 4, label: 'Aporte', screen: 'ContributionScreen' },
      { id: 5, label: 'Empréstimo', screen: 'LoanScreen' },
      { id: 6, label: 'Aplicações', screen: 'ApplicationsScreen' },
      { id: 7, label: 'Outros', screen: 'OthersScreen' },
      { id: 8, label: 'Relatórios', screen: 'ReportsScreen' },
    ];

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={{ height: 50 }}>
                <BarTop2
                  titulo={'Menu'}
                  backColor={COLORS.primary}
                  foreColor={COLORS.black}
                  routeMailer={''}
                  routeCalculator={''}
                />
              </View>
              <View style={styles.content}>
                {options.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.option}
                    onPress={option.action ? option.action : () => handleOptionPress(option.screen)}
                  >
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    <Text style={styles.arrow}>›</Text>
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
                <TouchableOpacity style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>📦 Produto ou Serviço Registrado</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalOption2}>
                  <Text style={styles.modalOptionText}>⚠️ Produto ou Serviço Avulso</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
};
export default Entries;
