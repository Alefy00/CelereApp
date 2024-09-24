/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Use esta linha se você estiver usando Ionicons
import { COLORS } from '../../../../constants';
import styles from './styles';
import ArrowIcon from '../../../../assets/images/svg/MainMenu/ArrowIcon.svg';
import CellphoneIcon from '../../../../assets/images/svg/MainMenu/cellphoneIcon.svg';
import SalesIcon from '../../../../assets/images/svg/MainMenu/SaleIcon.svg';
import RemoveIcon from '../../../../assets/images/svg/MainMenu/removeIcon.svg';

const ActionButtons = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [thirdModalVisible, setThirdModalVisible] = useState(false);  // Terceiro modal
  const [fourthModalVisible, setFourthModalVisible] = useState(false);  // Quarto modal
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  // Função para abrir e fechar o primeiro modal com animação
  const toggleModal = () => {
    if (!modalVisible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setModalVisible(false));
    }
  };

  // Função para abrir o segundo modal de consulta
  const toggleSecondModal = () => {
    setSecondModalVisible(!secondModalVisible);
  };

  // Função para abrir o terceiro modal de "Nova Venda"
  const toggleThirdModal = () => {
    setThirdModalVisible(!thirdModalVisible);
  };

  // Função para abrir o quarto modal de "Cadastrar Produtos ou Serviços"
  const toggleFourthModal = () => {
    setFourthModalVisible(!fourthModalVisible);
  };

  const handleNewExpense = () => {
    setModalVisible(false);  // Fechar modal antes de navegar
    navigation.navigate('NewExpense');
  };
  
  const handleNewRegisteredSale = () => {
    setThirdModalVisible(false);  // Fechar o terceiro modal antes de navegar
    navigation.navigate('NewRegisteredSale');
  };
  
  const handleAddProductScreen = () => {
    setFourthModalVisible(false);
    navigation.navigate('AddProductScreen');
  };

  const handleAddService = () => {
    setFourthModalVisible(false);
    navigation.navigate('AddService');
  };

  const handleStockInfo = () => {
    setSecondModalVisible(false);
    navigation.navigate('StockInfo');
  };

  const handleRegisteredServices = () => {
    setSecondModalVisible(false);
    navigation.navigate('RegisteredServices');
  };

  const handleSettleCredit = () => {
    setSecondModalVisible(false);
    navigation.navigate('SettleCredit');
  };

  const handleConsultExpense = () => {
    setSecondModalVisible(false);
    navigation.navigate('ConsultExpense');
  };

  const handleBudget = () => {
    setModalVisible(false);
    navigation.navigate('Budget');
  };


  return (
    <View style={styles.container}>
      {/* Botão de código de barras */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="barcode-outline" size={30} color={COLORS.black} />
      </TouchableOpacity>

      {/* Botão de adicionar que abre o modal */}
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Ionicons name="add-outline" size={30} color={COLORS.black} />
      </TouchableOpacity>

      {/* Primeiro Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={toggleModal}>
          <Animated.View style={[styles.modalContent, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity style={styles.modalButton} onPress={toggleThirdModal}>
              <Ionicons name="arrow-up" size={25} color={COLORS.green} />
              <Text style={[styles.modalText, { color: COLORS.green }]}> Nova venda</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleNewExpense}>
              <Ionicons name="arrow-down" size={25} color={COLORS.red} />
              <Text style={[styles.modalText, { color: COLORS.red }]}> Nova Despesa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.yellowButton]} onPress={toggleFourthModal}>
              <ArrowIcon size={25} />
              <Text style={[styles.modalText, styles.blackText]}>Cadastrar Produtos ou Serviços</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.yellowButton]} onPress={handleBudget}>
              <CellphoneIcon size={25} />
              <Text style={[styles.modalText, styles.blackText]}>Incluir orçamento</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton2} onPress={toggleSecondModal}>
              <Ionicons name="search" size={25} color={COLORS.black} />
              <Text style={[styles.modalText, styles.blackText]}>Consultas</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      {/* Segundo Modal - Consultas */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={secondModalVisible}
        onRequestClose={toggleSecondModal}
      >
        <View style={styles.secondModalOverlay}>
          <View style={styles.secondModalContent}>
            <View style={styles.secondModalHeader}>
              <Text style={styles.secondModalTitle}>Selecione uma opção:</Text>
              <TouchableOpacity onPress={toggleSecondModal}>
                <Ionicons name="close" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.secondModalButton} onPress={handleStockInfo}>
              <Ionicons name="bookmark" size={20} color={COLORS.black} />
              <Text style={styles.secondModalText}>Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondModalButton} onPress={handleRegisteredServices}>
              <Text style={styles.secondModalText}>Serviços cadastrados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondModalButton} onPress={handleSettleCredit}>
            <SalesIcon size={25} />
              <Text style={styles.secondModalText}>Vendas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondModalButton} onPress={handleConsultExpense}>
            <RemoveIcon size={25} />
              <Text style={styles.secondModalText}>Despesas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Terceiro Modal - Nova Venda */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={thirdModalVisible}
        onRequestClose={toggleThirdModal}
      >
        <View style={styles.thirdModalOverlay}>
          <View style={styles.thirdModalContent}>
            <View style={styles.thirdModalHeader}>
              <TouchableOpacity onPress={toggleThirdModal}>
                <Ionicons name="arrow-back" size={25} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.thirdModalTitle}>Nova Venda</Text>
              <TouchableOpacity onPress={toggleThirdModal}>
                <Ionicons name="close" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <Text style={styles.thirdModalSubtitle2}>Selecione :</Text>

            <TouchableOpacity style={[styles.thirdModalButton2, styles.yellowButton]} onPress={handleNewRegisteredSale}>
              <Ionicons name="cart" size={25} color={COLORS.black} />
              <Text style={styles.thirdModalText}>Produto ou serviço cadastrado</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.thirdModalButton}>
              <View style={styles.containerAvulsa}>
                <Ionicons name="alert" size={25} color={COLORS.black} />
                <Text style={styles.thirdModalText}>Venda Avulsa</Text>
              </View>
                <Text style={styles.thirdModalSubtitle}>(Não cadastrados)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
            {/* Quarto Modal - Cadastrar Produtos ou Serviços */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={fourthModalVisible}
        onRequestClose={toggleFourthModal}
        >
        <View style={styles.fourthModalOverlay}>
          <View style={styles.fourthModalContent}>
            <View style={styles.fourthModalHeader}>
              <Text style={styles.fourthModalTitle}>Selecione uma opção:</Text>
              <TouchableOpacity onPress={toggleFourthModal}>
                <Ionicons name="close" size={25} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.fourthModalButton, styles.yellowButton]} onPress={handleAddProductScreen}>
              <Text style={styles.fourthModalText}>Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fourthModalButton} onPress={handleAddService}>
              <Text style={styles.fourthModalText}>Serviços</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default ActionButtons;
