/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import { COLORS } from "../../../../../../../constants";
import ConfirmCancelModal from "./ConfirmCancelModal";
import LiquidationFlowModal from "./LiquidationFlowModal";
import PartialLiquidationModal from "./PartialLiquidationModal ";
import axios from "axios";

const API_SERVICOS = 'https://api.celereapp.com.br/cad/servicos/';

const AccountDetailModal = ({ visible, onClose,  account, onSaleCanceled }) => {
  const [isFirstModalVisible, setFirstModalVisible] = useState(visible);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isLiquidationModalVisible, setLiquidationModalVisible] = useState(false);
  const [isPartialModalVisible, setPartialModalVisible] = useState(false); 
  const [servicoNomes, setServicoNomes] = useState({});

    // Função para buscar o nome de um serviço pelo seu ID
    const fetchServicoById = async (id) => {
      try {
        const response = await axios.get(`${API_SERVICOS}${id}/`);
        return response.data.nome; // Supondo que o nome do serviço está na chave 'nome'
      } catch (error) {
        console.error(`Erro ao buscar o serviço com ID ${id}:`, error);
        return null;
      }
    };
  
    // Função para buscar todos os nomes dos serviços da lista de itens
    const fetchServicosNomes = useCallback(async () => {
      const novosServicos = {};
      try {
        // Percorrer todos os itens que tenham um serviço e buscar o nome
        for (const item of account.itens) {
          if (item.servico) {
            const nomeServico = await fetchServicoById(item.servico);
            novosServicos[item.servico] = nomeServico || 'Serviço não identificado';
          }
        }
        setServicoNomes(novosServicos);
      } catch (error) {
        console.error("Erro ao buscar os nomes dos serviços:", error);
      }
    }, [account]);
  
    useEffect(() => {
      if (visible) {
        setFirstModalVisible(true);
        fetchServicosNomes(); // Buscar os nomes dos serviços quando o modal for exibido
      }
    }, [visible, fetchServicosNomes]);


  const handleCancelSale = () => {
    setConfirmModalVisible(true); // Abre o modal de confirmação de cancelamento
    
  };

    // Função para lidar com a confirmação da liquidação parcial
    const handleConfirmPartialLiquidation = (data) => {
      console.log(`Liquidação parcial confirmada com os dados:`, data);
      // Aqui você pode adicionar a lógica para lidar com a liquidação parcial,
      // como atualizar a lista de vendas ou enviar uma requisição para o servidor
      onSaleCanceled(); // Atualiza a lista de vendas no componente pai
      setPartialModalVisible(false); // Fecha o modal de liquidação parcial
      onClose(); // Fecha o modal principal
    };

      // Função para abrir o modal de liquidação
  const openLiquidationModal = () => {
    setFirstModalVisible(false); // Fecha o modal principal
    setLiquidationModalVisible(true); // Abre o modal de liquidação
  };

  // Função para abrir o modal de liquidação parcial
  const openPartialLiquidationModal = () => {
    setFirstModalVisible(false); // Fecha o modal principal
    setPartialModalVisible(true); // Abre o modal de liquidação parcial
  };

  const closePartialModal = () => {
    setPartialModalVisible(false); // Fecha o modal de liquidação parcial
    setFirstModalVisible(true); // Reabre o modal principal
  };


  // Função para fechar o modal de liquidação
  const closeLiquidationModal = () => {
    setLiquidationModalVisible(false);
    setFirstModalVisible(true); // Reabre o modal principal após a liquidação
  };

  // Fechar e reabrir o modal principal corretamente
  const closeFirstModal = () => {
    setFirstModalVisible(false);
    onClose(); // Fechar o modal principal
  };

  const closeConfirmModal = () => {
    setConfirmModalVisible(false); // Fecha o modal de confirmação sem fechar o principal
  };

  const handleSaleCanceled = () => {
    onSaleCanceled(); // Atualiza a lista de vendas no componente pai
    closeFirstModal(); // Fecha o modal automaticamente
  };


   // Função para format ara exibição do produto ou serviço
   const renderItem = ({ item }) => {
    const isProduct = item.produto !== null;
    const isService = item.servico !== null;
    // Verificar se o produto ou serviço tem uma imagem
    const imagem = isProduct ? item.produto.imagem : isService ? item.servico?.imagem : null;

    return (
      <View style={styles.productItem}>

        {imagem ? (
          <Image source={{ uri: imagem }} style={styles.productImage} /> // Imagem do produto/serviço
        ) : (
          <Icon name="pricetag-outline" size={24} color="gray" /> // Ícone de fallback
        )}
        <View style={styles.productInfo}>

          <Text style={styles.productNome}>
            {isProduct ? item.produto.nome : isService ? servicoNomes[item.servico] || 'Serviço não identificado' : 'Item não identificado'}
          </Text>

          <Text style={{ color: COLORS.black }}>R${item.valor_total_venda}</Text>

          <Text style={styles.productQuantidade}>
            Qtd: {item.quantidade}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <>
        <Modal visible={isFirstModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.sectionTitle}>Detalhes da venda</Text>
              <TouchableOpacity onPress={closeFirstModal}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerTitle}>
              <Text style={styles.sectionTitle}>Situação:</Text>
              <Text style={styles.sectionTitleRed}> Contas a pagar</Text>
            </View>

            <Text style={styles.sectionTitle}>Lista de Compras</Text>
            <FlatList
              data={account?.itens}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.productList}
              style={{ maxHeight: 150 }}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Valor total:</Text>
              <Text style={styles.totalValue}>R${account?.valor_total_venda}</Text>
            </View>

            <TouchableOpacity style={styles.partialButton} onPress={openPartialLiquidationModal}>
              <Text style={styles.buttonText}>Liquidar Parcialmente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.totalButton} onPress={openLiquidationModal}>
              <Icon name="checkmark-circle" size={24} color="black" />
              <Text style={styles.buttonText}>Liquidar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reminderButton}  disabled={true}>
              <Icon name="share-social-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Lembrete de cobrança</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postponeButton} disabled={true}>
              <Icon name="calendar-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Adiar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleCancelSale}>
              <Icon name="close-circle-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Excluir conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        <ConfirmCancelModal
        visible={confirmModalVisible}
        onClose={closeConfirmModal}
        saleId={account.id}
        onSaleCanceled={handleSaleCanceled}
      />
        {/* Modal de liquidação */}
        <LiquidationFlowModal
        visible={isLiquidationModalVisible}
        onClose={closeLiquidationModal}
        onConfirmLiquidation={(newDueDate) => {
          console.log(`Conta liquidada na data: ${newDueDate}`);  // Confirme se a data está sendo passada
          onSaleCanceled(); // Atualiza a lista de vendas no componente pai
          closeLiquidationModal(); // Fecha o modal de liquidação
          closeFirstModal(); 
        }}
        saleId={account.id}
      />
      <PartialLiquidationModal
        visible={isPartialModalVisible}
        onClose={closePartialModal}
        onConfirmPartialLiquidation={handleConfirmPartialLiquidation} // Função de confirmação
        saleId={account.id}
        totalSaleAmount={account.valor_total_venda}
      />
    </>
  );
};

export default AccountDetailModal;
