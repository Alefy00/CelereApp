/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../../constants";

const LiquidatedDetailModal = ({ visible, onClose, account }) => {
    const [isFirstModalVisible, setFirstModalVisible] = useState(visible);

    // Dados fictícios da lista de compras
    const products = [
      { id: '1', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
      { id: '2', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
      { id: '3', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
      { id: '4', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
      { id: '5', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    ];

    const totalValue = 'R$84,00';  // Valor fictício

    const closeFirstModal = () => {
      // Fecha apenas o primeiro modal
      setFirstModalVisible(false);
      onClose(); // Opcional: fechar o fluxo todo se o primeiro modal fechar tudo
    };

    return (
      <>
        {/* Primeiro Modal */}
        <Modal visible={isFirstModalVisible} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContentLiquidate}>
              <View style={styles.modalHeader}>
              <Text style={styles.sectionTitle}>Detalhes da venda</Text>
                <TouchableOpacity onPress={closeFirstModal}>
                  <Text style={styles.modalClose}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.containerTitle}>
                <Text style={styles.sectionTitle}>Situação:</Text>
                <Text style={styles.sectionTitleGreen}> Liquidada</Text>
              </View>
              {/* Lista de compras com scroll */}
              <Text style={styles.sectionTitle}>Lista de Compras</Text>
              <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.productItem}>
                    <Icon name="pricetag-outline" size={24} color="gray" />
                    <View style={styles.productInfo}>
                      <Text style={styles.productNome}>{item.nome}</Text>
                      <Text style={{color: COLORS.black}}>{item.valor}</Text>
                    </View>
                  </View>
                )}
                contentContainerStyle={styles.productList}
                style={{ maxHeight: 150 }} // Limitar a altura do FlatList para não ocupar a tela toda
              />
  
              {/* Valor total */}
              <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Valor total:</Text>
                <Text style={styles.totalValue}>{totalValue}</Text>
              </View>

              {/* Botões */}

              <TouchableOpacity style={styles.cancelButtonModal} >
                <Icon name="close-circle-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Cancelar venda</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.reciboButton}>
                <Icon name="share-social-outline" size={24} color="black" />
                <Text style={styles.buttonText}>Enviar recibo</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.backButton}>
                <Icon name="return-down-back-sharp" size={24} color="black" />
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </>
    );
  };

export default LiquidatedDetailModal;
