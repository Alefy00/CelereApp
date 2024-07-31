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
} from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const Entries = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));
  const [isNavigating, setIsNavigating] = useState(false); // Estado para prevenir múltiplos cliques

  // Função para abrir o modal de Nova Venda com animação
  const handleNewSalePress = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Move o pop-up para a posição final (dentro da tela)
      duration: 300, // Duração da animação
      useNativeDriver: true, // Usa o driver nativo para melhor desempenho
    }).start();
  };

  // Função para fechar o modal com animação
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: -100, // Move o pop-up para fora da tela
      duration: 300, // Duração da animação
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false); // Depois da animação, fecha o modal
    });
  };

  // Função para navegar para uma tela específica
  const handleOptionPress = (screenName) => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate(screenName);
    }
  };

  // Função para navegar para a tela de Nova Venda Registrada
  const NewRegisteredSale = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate('NewRegisteredSale');
      closeModal();
    }
  };

  // Função para navegar para a tela de Produto ou Serviço Avulso
  const LooseProduct = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate('LooseProduct');
      closeModal();
    }
  };

  // Opções do menu com suas respectivas ações
  const options = [
    { id: 1, label: 'Nova Venda', action: handleNewSalePress },
    { id: 2, label: 'Cancelar venda', screen: 'CancelSale' },
    { id: 3, label: 'Liquidar Fiado', screen: 'SettleCredit' },
    { id: 4, label: 'Aporte', screen: 'Contribution' },
    { id: 5, label: 'Empréstimo', screen: 'Loan' },
    { id: 7, label: 'Outros', screen: 'OthersScreen' },
    { id: 8, label: 'Relatórios', screen: 'ReportsScreen' },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsNavigating(false); // Reseta o estado de navegação ao retornar para a tela
    });

    return unsubscribe;
  }, [navigation]);

  // Função para lidar com o botão de voltar no BarTop2
  const handleBackPress = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.goBack();
    }
  };

  // Retorna o layout principal do componente
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
              onPress={handleBackPress} // Adiciona a função de voltar
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

                <TouchableOpacity style={styles.modalOption} onPress={NewRegisteredSale}>
                  <Text style={styles.modalOptionText}>📦 Produto ou Serviço Registrado</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalOption2} onPress={LooseProduct}>
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
