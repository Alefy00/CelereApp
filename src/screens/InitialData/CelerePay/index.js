/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../components/BarTop3';
import styles from './styles';
import { COLORS } from '../../../constants';
import CelerePayIcon from '../../../assets/images/svg/CelerePay/CelerePayIcon.svg'; // Importe o SVG como componente

const CelerePay = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleContinue = () => {
    navigation.navigate('MaxTransparency');
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.containerBase}>
      {/* Barra superior */}
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
        />
      </View>

      {/* Conteúdo principal */}
      <View style={styles.container}>
        <Text style={styles.title}>Célere Pay</Text>
        <Text style={styles.subTitle}>Melhores taxas</Text>
        <Text style={styles.taxInfo}>
          Débito: <Text style={styles.boldText}>1.49%</Text> Crédito: <Text style={styles.boldText}>3.99%</Text>{'\n'}
          Dinheiro na conta em <Text style={styles.boldText}>até 1 dia útil.</Text>
        </Text>

        <View style={styles.containerIcon}>
            <CelerePayIcon width={245} height={245} style={styles.icon} />
            <Text style={styles.installmentText}>Em até 12x</Text>
        </View>

        <Text style={styles.descriptionTitle}>Aproximação</Text>
        <Text style={styles.description}>
          Basta pedir para o seu cliente aproximar{'\n'}
          o cartão à parte de trás do seu celular.
        </Text>
      </View>
      
      {/* Link para abrir o modal */}
      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.link}> (Confira todas as taxas aqui) </Text>
      </TouchableOpacity>

      {/* Botão de continuar no final */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleContinue}>
          <Icon name="arrow-forward" size={22} color={COLORS.black} />
          <Text style={styles.confirmButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de taxas */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Taxas Cartão</Text>
            </View>
              <TouchableOpacity style={styles.close} onPress={toggleModal}>
                <Icon name="close" size={24} color={COLORS.black} />
              </TouchableOpacity>
            <Text style={styles.modalText}>Você recebe em 1 dia útil o valor da venda descontada a taxa respectiva abaixo.</Text>
            <Text style={styles.modalTax}>
              Débito: <Text style={styles.boldText}>1.49%</Text>{'\n'}
              Crédito à vista: <Text style={styles.boldText}>3.99%</Text>{'\n'}
              Parcelado 2x: 5.37%{'\n'}
              Parcelado 3x: 6.07%{'\n'}
              Parcelado 4x: 7.28%{'\n'}
              Parcelado 5x: 7.99%{'\n'}
              Parcelado 6x: 8.71%{'\n'}
              Parcelado 7x: 10.13%{'\n'}
              Parcelado 8x: 10.86%{'\n'}
              Parcelado 9x: 11.60%{'\n'}
              Parcelado 10x: 12.35%{'\n'}
              Parcelado 11x: 13.10%{'\n'}
              Parcelado 12x: 13.86%
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CelerePay;
