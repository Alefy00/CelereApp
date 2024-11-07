/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../../MainMenu/YourCash/Entries/SettleCredit/components/styles';
import { COLORS } from "../../../../constants";
import { API_BASE_URL } from "../../../../services/apiConfig";
import ConfirmCancelModal from "../../MainMenu/YourCash/Entries/SettleCredit/components/ConfirmCancelModal";
import axios from "axios";

const SalesDetailModal = ({ visible, onClose, accountId, onSaleCanceled, navigation }) => {
    const [accountDetails, setAccountDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [itemsWithServiceNames, setItemsWithServiceNames] = useState([]);

    useEffect(() => {
        const fetchAccountDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_BASE_URL}/cad/vendas/${accountId}/`);
                const accountData = response.data;
                await loadItemsWithServiceNames(accountData.itens); // Carrega nomes dos serviços
                setAccountDetails(accountData);
            } catch (error) {
                console.error("Erro ao buscar detalhes da venda:", error);
                Alert.alert("Erro", "Não foi possível carregar os detalhes da venda.");
            } finally {
                setLoading(false);
            }
        };

        if (visible && accountId) {
            fetchAccountDetails();
        }
    }, [visible, accountId]);

    const loadItemsWithServiceNames = async (itens) => {
        const updatedItems = await Promise.all(
            itens.map(async (item) => {
                if (item.servico && !item.servico.nome) {
                    try {
                        const response = await axios.get(`${API_BASE_URL}/cad/servicos/${item.servico}/`);
                        return { ...item, servico: { nome: response.data.nome } };
                    } catch (error) {
                        console.error(`Erro ao buscar o nome do serviço ${item.servico}:`, error);
                        return { ...item, servico: { nome: 'Serviço não identificado' } };
                    }
                }
                return item;
            })
        );
        setItemsWithServiceNames(updatedItems);
    };

    const closeFirstModal = () => {
        setConfirmModalVisible(false);
        onClose();
    };

    const handleCancelSale = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/cad/vendas/${accountId}/`);
            onSaleCanceled && onSaleCanceled();
            closeFirstModal();
        } catch (error) {
            console.error("Erro ao cancelar a venda:", error);
            Alert.alert("Erro", "Não foi possível cancelar a venda.");
        }
    };

    const renderItem = ({ item }) => {
        const isProduct = item.produto !== null;
        const isService = item.servico !== null;
        const imageUrl = isProduct ? item.produto.imagem : isService ? item.servico?.imagem : null;

        const itemName = isProduct ? item.produto.nome : isService ? item.servico.nome : 'Item não identificado';

        return (
            <View style={styles.productItem}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                ) : (
                    <Icon name="pricetag-outline" size={24} color="gray" />
                )}
                <View style={styles.productInfo}>
                    <Text style={styles.productNome}>{itemName}</Text>
                    <Text style={{ color: COLORS.black }}>R$ {item.valor_total_venda}</Text>
                </View>
            </View>
        );
    };

    const calculateTotalGastosEnvolvidos = useCallback(() => {
        return parseFloat(accountDetails?.gastos_envolvidos || 0);
    }, [accountDetails]);

    const calculateTotalAmount = useCallback(() => {
        const valorTotalVenda = parseFloat(accountDetails?.valor_total_venda || 0);
        const gastosEnvolvidos = parseFloat(accountDetails?.gastos_envolvidos || 0);
        const totalPagamentos = parseFloat(accountDetails?.total_pagamentos || 0);

        return valorTotalVenda + gastosEnvolvidos - totalPagamentos;
    }, [accountDetails]);

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContentLiquidate}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.sectionTitle}>Detalhes da venda</Text>
                        <TouchableOpacity onPress={closeFirstModal}>
                            <Text style={styles.modalClose}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : accountDetails ? (
                        <>
                            <View style={styles.containerTitle}>
                                <Text style={styles.sectionTitle}>Situação:</Text>
                                <Text style={styles.sectionTitleGreen}>Pagas</Text>
                            </View>

                            <Text style={styles.sectionTitle}>Lista de Compras/Serviços</Text>
                            <FlatList
                                data={itemsWithServiceNames}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={renderItem}
                                contentContainerStyle={styles.productList}
                                style={{ maxHeight: 150 }}
                            />

                            <View style={styles.totalContainer2}>
                                <Text style={styles.totalLabel}>Gastos envolvidos:</Text>
                                <Text style={styles.totalValue}>
                                    R$ {calculateTotalGastosEnvolvidos().toFixed(2)}
                                </Text>
                            </View>
                            <View style={styles.totalContainer}>
                                <Text style={styles.totalLabel}>Valor total:</Text>
                                <Text style={styles.totalValue}>
                                    R$ {calculateTotalAmount().toFixed(2)}
                                </Text>
                            </View>

                          {/*   <TouchableOpacity style={styles.cancelButtonModal} onPress={openConfirmModal}>
                                <Icon name="close-circle-outline" size={24} color="black" />
                                <Text style={styles.buttonText}>Cancelar venda</Text>
                            </TouchableOpacity>
                            */}
                            <TouchableOpacity
                                style={styles.reciboButton}
                                onPress={() => {
                                    if (accountDetails?.id) {
                                        closeFirstModal();
                                        navigation.navigate('ReceiptScreen', { saleId: accountDetails.id });
                                    } else {
                                        Alert.alert("Erro", "Detalhes da venda ainda não foram carregados.");
                                    }
                                }}
                            >
                                <Icon name="share-social-outline" size={24} color="black" />
                                <Text style={styles.buttonText}>Gerar recibo</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.backButton} onPress={closeFirstModal}>
                                <Icon name="return-down-back-sharp" size={24} color="black" />
                                <Text style={styles.buttonText}>Voltar</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <Text style={styles.emptyMessage}>Detalhes do item não disponíveis.</Text>
                    )}
                </View>

                <ConfirmCancelModal
                    visible={confirmModalVisible}
                    onClose={closeFirstModal}
                    saleId={accountDetails?.id}
                    onSaleCanceled={handleCancelSale}
                />
            </View>
        </Modal>
    );
};

export default SalesDetailModal;
