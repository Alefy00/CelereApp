/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../constants';

const UpdateStockModal = ({ isVisible, onClose, product, empresaId }) => {
  const [newQuantity, setNewQuantity] = useState(product.qtd_estoque);

  // Função para adicionar mais quantidade
  const handleIncrease = () => {
    setNewQuantity(prevQuantity => prevQuantity + 1);
  };

  // Função para diminuir a quantidade
  const handleDecrease = () => {
    if (newQuantity > 0) {
      setNewQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Função para salvar a nova quantidade de estoque
  const handleSave = async () => {
    try {
      const response = await axios.patch(`https://api.celereapp.com.br/cad/produtos/${product.id}/?empresa=${empresaId}&produto=${product.id}`, {
        qtd_estoque: newQuantity,
      });

      if (response.data.status === "success") {
        alert("Quantidade do estoque atualizada com sucesso!");
        onClose(); // Fecha o modal após salvar
      } else {
        alert("Erro ao atualizar a quantidade do estoque.");
      }
    } catch (error) {
      console.error('Erro ao atualizar o estoque:', error);
      alert("Erro ao atualizar o estoque.");
    }
  };


  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Cabeçalho do Modal */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Atualizar Estoque</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" style={styles.closeButtonIcon} />
            </TouchableOpacity>
          </View>

          {/* Imagem do Produto */}
          <View style={styles.productImageContainer}>
            <Image
              source={product.image_url ? { uri: product.image_url } : require('../../../../../../assets/images/png/placeholder.png')}
              style={styles.productImage}
            />
          </View>

          {/* Informações do Produto */}
            <Text style={styles.productInfoName}>{product.nome}</Text>

          <View style={styles.productInfoContainer}>
            <Text style={styles.productLabel}>Quantidade atual: </Text>
            <Text style={styles.productInfo}>{product.qtd_estoque}</Text>
          </View>

          {/* Controle de quantidade */}
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={handleDecrease} style={styles.controlButton}>
              <Icon name="remove" size={26} color={COLORS.black}/>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{newQuantity}</Text>
            <TouchableOpacity onPress={handleIncrease} style={styles.controlButton}>
                <Icon name="add" size={26} color={COLORS.black}/>
            </TouchableOpacity>
          </View>

          {/* Botão de confirmação */}
          <TouchableOpacity onPress={handleSave} style={styles.confirmButton}>
            <Icon name="checkmark-circle" size={26} color={COLORS.black}/>
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    modalContent: {
      width: '90%',
      padding: 20,
      backgroundColor: '#fff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    closeButton: {
      padding: 10,
    },
    closeButtonIcon: {
      fontSize: 30,
      color: COLORS.gray,
    },
    productImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
    },
    productImage: {
      width: 150, // Tamanho da imagem
      height: 150,
      borderRadius: 10,
      resizeMode: 'cover',
    },
    productInfoContainer: {
      marginVertical: 10,
      flexDirection: 'row'
    },
    productLabel: {
      fontWeight: 'bold',
      color: COLORS.black,
      fontSize: 16,
      marginBottom: 5,
    },
    productInfo: {
      fontSize: 16,
      color: COLORS.black,
      marginBottom: 10,
    },
    productInfoName: {
        fontSize: 22,
        color: COLORS.black,
      },
    quantityControl: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    controlButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      borderRadius: 10,
    },
    controlButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLORS.black,
    },
    quantityText: {
      fontSize: 18,
      marginHorizontal: 20,
      color: COLORS.black,
    },
    confirmButton: {
      backgroundColor: COLORS.primary, // Amarelo como no exemplo
      paddingVertical: 25,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginTop: 20,
      flexDirection: 'row',
    },
    confirmButtonText: {
      color: COLORS.black,
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 10,
    },
  });

export default UpdateStockModal;
