/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, Image, } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../../constants";
import ConfirmCancelModal from "./ConfirmCancelModal";

const LiquidatedDetailModal = ({ visible, onClose, account,  servicoNomes, onSaleCanceled, navigation }) => {
    const [isFirstModalVisible, setFirstModalVisible] = useState(visible);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    useEffect(() => {
        if (account) {
          console.log("Dados da conta no modal:", account);
        }
      }, [account]);

    // Sincronizar o estado local do modal com a prop 'visible'
    useEffect(() => {
        setFirstModalVisible(visible);
    }, [visible]);

    // Função para fechar o modal e resetar o estado
    const closeFirstModal = () => {
        setFirstModalVisible(false);
        onClose();
    };

    const renderItem = ({ item }) => {
      const isProduct = item.produto !== null;
      const isService = item.servico !== null;
      const imageUrl = isProduct ? item.produto.imagem : isService ? item.servico?.imagem : null;

      return (
          <View style={styles.productItem}>
                {imageUrl ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.productImage} // Defina o estilo da imagem no seu arquivo de estilos
                    />
                ) : (
                    <Icon name="pricetag-outline" size={24} color="gray" />
                )}
                <View style={styles.productInfo}>
                    {/* Nome do Produto ou Serviço */}
                    <Text style={styles.productNome}>
                        {isProduct ? item.produto.nome : isService ? servicoNomes[item.servico] || 'Nome do serviço indisponível' : 'Item não identificado'}
                    </Text>

                    {/* Valor do Produto ou Serviço */}
                    <Text style={{ color: COLORS.black }}>
                        R${item.valor_total_venda}
                    </Text>
                </View>
            </View>
        );
    };
    const formatCurrency = (value) => {
        if (!value) return 'R$ 0,00';
        return parseFloat(value).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      };

      // Função para obter os gastos envolvidos da venda
const calculateTotalGastosEnvolvidos = useCallback(() => {
    return parseFloat(account?.gastos_envolvidos || 0);
  }, [account]);

    // Função para calcular o valor total da venda incluindo os gastos envolvidos
const calculateTotalAmount = useCallback(() => {
    const valorTotalVenda = parseFloat(account?.valor_total_venda || 0);
    const gastosEnvolvidos = parseFloat(account?.gastos_envolvidos || 0);
    const totalPagamentos = parseFloat(account?.total_pagamentos || 0);
  
    // Calcular o total geral
    const totalGeral = valorTotalVenda + gastosEnvolvidos - totalPagamentos;
  
    return totalGeral;
  }, [account]);

  return (
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
                      <Text style={styles.sectionTitleGreen}>Pagas</Text>
                  </View>

                  {/* Lista de produtos e serviços */}
                  <Text style={styles.sectionTitle}>Lista de Compras/Serviços</Text>
                  <FlatList
                      data={account.itens}  // Itens da venda (produtos e serviços)
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={renderItem}
                      contentContainerStyle={styles.productList}
                      style={{ maxHeight: 150 }}  // Limitar a altura do FlatList
                  />

                        <View style={styles.totalContainer2}>
                          <Text style={styles.totalLabel}>Gastos envolvidos:</Text>
                          <Text style={styles.totalValue}>{formatCurrency(calculateTotalGastosEnvolvidos())}</Text>
                        </View>
                  <View style={styles.totalContainer}>
                      <Text style={styles.totalLabel}>Valor total:</Text>
                      <Text style={styles.totalValue}>
                      {formatCurrency(calculateTotalAmount())}
                      </Text>
                  </View>

                  {/* 
                  <TouchableOpacity style={styles.cancelButtonModal} onPress={openConfirmModal}>
                      <Icon name="close-circle-outline" size={24} color="black" />
                      <Text style={styles.buttonText}>Cancelar venda</Text>
                  </TouchableOpacity>
                  */}

                  <TouchableOpacity style={styles.reciboButton}  onPress={() => {
                            // Navegar para a tela ReceiptScreen com o saleId
                            closeFirstModal();
                            navigation.navigate('ReceiptScreen', { saleId: account.id });
                        }}>
                      <Icon name="share-social-outline" size={24} color="black" />
                      <Text style={styles.buttonText}>Gerar recibo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.backButton} onPress={closeFirstModal}>
                      <Icon name="return-down-back-sharp" size={24} color="black" />
                      <Text style={styles.buttonText}>Voltar</Text>
                  </TouchableOpacity>
              </View>
          </View>
                {/* Modal de confirmação */}
                <ConfirmCancelModal
                visible={confirmModalVisible}
                onClose={closeFirstModal}
                saleId={account.id} // Passar o ID da venda
                onSaleCanceled={onSaleCanceled} // Atualizar a lista de vendas no componente pai
                />
      </Modal>
  );
};

export default LiquidatedDetailModal;
