/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../../../../../../../constants';
import { API_BASE_URL } from '../../../../../../../services/apiConfig';

// Função para obter a data atual no formato AAAA-MM-DD
const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
};

const ConfirmCancelModal = ({ visible, onClose, saleId, onSaleCanceled }) => {
    const [loading, setLoading] = useState(false);

    // Função para cancelar a venda
    const handleCancelSale = async () => {
        try {
            setLoading(true); // Exibir o indicador de carregamento enquanto a requisição está sendo processada
            const empresaId = await AsyncStorage.getItem('empresaId'); // Obter o ID da empresa logada
            const currentDate = getCurrentDate(); // Obter a data atual do dispositivo

            // Requisição para cancelar a venda
            const response = await axios.patch(`${API_BASE_URL}/cad/vendas/${saleId}/cancelar_venda/`, {
                dt_cancelamento: currentDate,
                motivo_cancelamento: "Venda cancelada"
            });

            if (response.status === 200) {
                alert("Venda cancelada com sucesso!");
                onSaleCanceled(); // Atualiza a lista de vendas no componente pai
                onClose(); // Fechar o modal de confirmação após o cancelamento
            } else {
                alert("Erro ao cancelar a venda. Tente novamente.");
            }
        } catch (error) {
            console.error("Erro ao cancelar a venda:", error);
            alert("Erro ao cancelar a venda.");
        } finally {
            setLoading(false); // Parar o indicador de carregamento
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Tem certeza disso?</Text>
                    <Text style={styles.modalMessage}>Cancelar esta venda a removerá da lista.</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Icon name="close-circle-outline" size={24} color="black" />
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.confirmButton} onPress={handleCancelSale}>
                            {loading ? (
                                <ActivityIndicator size="small" color={COLORS.black} />
                            ) : (
                                <>
                                    <Icon name="checkmark-circle" size={24} color="black" />
                                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro transparente
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
      
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.black,
    },
    modalMessage: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        marginRight: 90,
        marginLeft: -20,
    },
    confirmButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary, // Cor amarela conforme design
        padding: 10,
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
    },
    buttonText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.black,
    },
    confirmButtonText: {
        marginLeft: 5,
        fontSize: 16,
        color: COLORS.black,
    },
});

export default ConfirmCancelModal;
