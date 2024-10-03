/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import styles from './stylesPartial';
import { COLORS } from "../../../../../../../constants"; // Supondo que já temos o arquivo COLORS configurado

const PartialLiquidationModal = ({ visible, onClose, onConfirmPartialLiquidation, saleId, totalSaleAmount }) => {
    const [liquidationDate, setLiquidationDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [partialAmount, setPartialAmount] = useState('');
    const [remainingAmount, setRemainingAmount] = useState(0);
  
    useEffect(() => {
        if (totalSaleAmount) {
          const amount = parseFloat(totalSaleAmount);
          console.log('Total Sale Amount:', amount); // Verifique se o valor total está correto
          setRemainingAmount(amount); // Atualize o estado com o valor correto
        }
      }, [totalSaleAmount]);
      
  
    // Exibe o DatePicker
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    // Fecha o DatePicker
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    // Confirma a data selecionada no DatePicker
    const handleConfirmDate = (date) => {
      setLiquidationDate(date);
      hideDatePicker();
    };
  
    const formatCurrency = (value) => {
        return value.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
      };
      
  
      const handlePartialLiquidation = async () => {
        const formattedDate = liquidationDate.toISOString().split('T')[0]; // Formato da data para YYYY-MM-DD
        const amountToLiquidate = parseFloat(partialAmount);
      
        console.log('Total Sale Amount:', formatCurrency(totalSaleAmount));
        console.log('Amount to liquidate:', formatCurrency(amountToLiquidate));
        console.log('Remaining amount (before update):', formatCurrency(remainingAmount));
      
        // Garantir que o valor inserido seja um número válido
        if (isNaN(amountToLiquidate) || amountToLiquidate <= 0) {
          Alert.alert('Erro', 'Por favor, insira um valor válido.');
          return;
        }
      
        // Comparação entre o valor inserido e o restante da venda
        if (amountToLiquidate > remainingAmount) {
          console.log('Valor a liquidar maior que o restante da venda');
          Alert.alert('Erro', 'O valor a liquidar não pode ser maior que o valor restante da venda.');
          return;
        }
      
        try {
          // Realiza a requisição para a API
          const response = await axios.patch(
            `https://api.celereapp.com.br/cad/vendas/${saleId}/baixar_venda_parcialmente/`,
            {
              dt_pagamento: formattedDate,
              vlr_pagamento: amountToLiquidate,
            }
          );
      
          if (response.data.status === 'success') {
            console.log('Liquidação parcial realizada com sucesso:', response.data);
      
            // Atualiza o valor restante corretamente subtraindo o valor liquidado
            const updatedRemainingAmount = remainingAmount - amountToLiquidate;
            console.log('Remaining amount (after update):', formatCurrency(updatedRemainingAmount));
      
            onConfirmPartialLiquidation({
              amount: amountToLiquidate,
              date: formattedDate,
              remainingAmount: updatedRemainingAmount, // Atualiza o valor restante
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
  
            {/* Campo de valor parcial */}
            <TextInput
              style={styles.input}
              placeholder={`Valor a liquidar parcialmente (máx: ${formatCurrency(remainingAmount)})`}
              keyboardType="numeric"
              value={partialAmount}
              onChangeText={(value) => {
                // Formata o valor inserido para moeda
                const numericValue = value.replace(',', '.'); // Substitui vírgula por ponto
                setPartialAmount(numericValue);
              }}
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