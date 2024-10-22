/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import styles from './stylesPartial';
import { COLORS } from "../../../../../../../constants";
import { API_BASE_URL } from "../../../../../../../services/apiConfig";

const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation, saleId, totalSaleAmount, totalPayments }) => {
    const [liquidationDate, setLiquidationDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [partialAmount, setPartialAmount] = useState('');
    const [remainingAmount, setRemainingAmount] = useState(0);

    useEffect(() => {
        // Calcula o valor restante com base no total da venda e o total de pagamentos
        if (totalSaleAmount && totalPayments !== undefined) {
            const remaining = parseFloat(totalSaleAmount) - parseFloat(totalPayments);
            setRemainingAmount(remaining);
        }
    }, [totalSaleAmount, totalPayments]);

    // Funções para controle do DatePicker
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirmDate = (date) => {
        setLiquidationDate(date);
        hideDatePicker();
    };

    // Função para formatar o valor como moeda
    const formatCurrency = (value) => {
        if (value === '') return '';
        return Number(value).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    // Função para remover caracteres não numéricos e preparar o valor para cálculo
    const cleanValue = (value) => {
        return value.replace(/\D/g, '') / 100;
    };

    // Função para manipular o valor inserido no campo
    const handleAmountChange = (value) => {
        const cleanedValue = cleanValue(value); // Remove caracteres não numéricos e ajusta centavos
        if (cleanedValue > remainingAmount) {
            Alert.alert('Erro', 'O valor a liquidar não pode ser maior que o valor restante.');
            return;
        }
        setPartialAmount(formatCurrency(cleanedValue.toFixed(2))); // Atualiza o valor formatado como moeda
    };

    const handlePartialLiquidation = async () => {
        const formattedDate = liquidationDate.toISOString().split('T')[0];
        const amountToLiquidate = cleanValue(partialAmount); // Limpa o valor antes de usar na requisição

        // Validação para garantir que o valor inserido é válido
        if (isNaN(amountToLiquidate) || amountToLiquidate <= 0) {
            Alert.alert('Erro', 'Por favor, insira um valor válido.');
            return;
        }

        // Validação para garantir que o valor inserido não é maior que o valor restante
        if (amountToLiquidate > remainingAmount) {
            Alert.alert('Erro', `O valor a liquidar não pode ser maior que o valor restante de ${formatCurrency(remainingAmount)}.`);
            return;
        }

        try {
            // Requisição à API para liquidar parcialmente a venda
            const response = await axios.patch(
                `${API_BASE_URL}/cad/vendas/${saleId}/baixar_venda_parcialmente/`,
                {
                    dt_pagamento: formattedDate,
                    vlr_pagamento: amountToLiquidate,
                }
            );

            if (response.data.status === 'success') {
                const updatedRemainingAmount = remainingAmount - amountToLiquidate;
                onConfirmPartialLiquidation({
                    amount: amountToLiquidate,
                    date: formattedDate,
                    remainingAmount: updatedRemainingAmount,
                });

                Alert.alert('Sucesso', 'Liquidação parcial realizada com sucesso.');
                onClose(); // Fecha o modal
            } else {
                Alert.alert('Erro', 'Não foi possível realizar a liquidação parcial.');
            }
        } catch (error) {
            console.error('Erro ao realizar a liquidação parcial:', error.response ? error.response.data : error.message);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar liquidar a venda.');
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Quando esta despesa foi liquidada?</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close-outline" size={30} color={COLORS.gray} />
                        </TouchableOpacity>
                    </View>

                    {/* Campo de data */}
                    <TouchableOpacity onPress={showDatePicker} style={styles.datePickerContainer}>
                        <Text style={styles.dateLabel}>
                            Hoje, {liquidationDate.toLocaleDateString('pt-BR')}
                        </Text>
                        <Icon name="calendar" size={24} color={COLORS.gray} />
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />

                    {/* Campo de valor parcial com formatação de moeda */}
                    <TextInput
                        style={styles.input}
                        placeholder={`Valor a liquidar parcialmente (máx: ${formatCurrency(remainingAmount)})`}
                        keyboardType="numeric"
                        value={partialAmount}
                        onChangeText={handleAmountChange}
                    />

                    {/* Botão de confirmação */}
                    <TouchableOpacity style={styles.confirmButton} onPress={handlePartialLiquidation}>
                        <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                        <Text style={styles.buttonText}>Liquidar despesa parcialmente</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default PartialLiquidationModal;
