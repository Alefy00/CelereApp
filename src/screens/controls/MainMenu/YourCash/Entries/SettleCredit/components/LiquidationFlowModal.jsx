/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants'; // Supondo que já temos o arquivo COLORS configurado
import { StyleSheet } from 'react-native';
import axios from 'axios';  // Para realizar a requisição
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../../../../../../services/apiConfig';
import CustomCalendar from '../../../../../../../components/CustomCalendar';
import moment from 'moment-timezone';

  const LiquidationFlowModal = ({ visible, onClose, onConfirmLiquidation, saleId }) => {
    const [newDueDate, setNewDueDate] = useState(moment().tz('America/Sao_Paulo'));
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showAlert = (title, message) => Alert.alert(title, message)

    const getEmpresaId = useCallback(async () => {
        try {
          const storedEmpresaId = await AsyncStorage.getItem('empresaId');
          if (storedEmpresaId) return Number(storedEmpresaId);
          showAlert('Erro', 'ID da empresa não encontrado.');
          return null;
        } catch (error) {
          console.error('Erro ao buscar o ID da empresa:', error);
          return null;
        }
      }, []);
  
      const showCalendar = () => {
        setCalendarVisible(true);
      };
    
      const handleConfirmDate = (date) => {
        setNewDueDate(moment(date).tz('America/Sao_Paulo')); // Ajusta a data selecionada com timezone
        setCalendarVisible(false);
      }; 

      const proceedToConfirmation = () => {
        if (newDueDate) {
          setIsConfirmVisible(true);
        } else {
          Alert.alert('Erro', 'Por favor, selecione uma data de liquidação.');
        }
      };

       // Função para formatar a data no formato brasileiro para exibir ao usuário
       const formatDateBrazilian = (date) => {
        return date.format('DD/MM/YYYY');
      };

      const handleFinalConfirmation = async () => {
        console.log(`Data a ser usada na liquidação: ${newDueDate}`);  // Verifique se `newDueDate` está acessível
        if (!newDueDate) {
          Alert.alert('Erro', 'A data de liquidação não foi selecionada.');
          return;
        }
      
        setLoading(true);
        try {
          const formattedDate = newDueDate.format('YYYY-MM-DD');
          const empresaId = await getEmpresaId(); // Obter o ID da empresa logada
      
          if (!empresaId) {
            setLoading(false);
            return;
          }
      
          // Enviando os dados para a API
          const response = await axios.post(
            `${API_BASE_URL}/cad/vendas/${saleId}/baixar_venda/`,
            { dt_pagamento: formattedDate }  // Data de pagamento
          );
      
          // Verificando a resposta da API
          if (response.data.status === 'success') {
            Alert.alert('Sucesso', 'Venda liquidada com sucesso.');
            onConfirmLiquidation(newDueDate); // Atualiza a lista de vendas no componente pai
            onClose(); // Fecha o modal após a liquidação
          } else {
            Alert.alert('Erro', response.data.message || 'Não foi possível liquidar a venda.');
          }
        } catch (error) {
          console.error('Erro ao liquidar a venda:', error.response ? error.response.data : error.message);
          Alert.alert('Erro', 'Ocorreu um erro ao tentar liquidar a venda.');
        } finally {
          // Certifica que o modal será fechado, mesmo se houver erro
          onClose(); 
          setLoading(false); // Remove o indicador de loading
        }
      };

    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          {!isConfirmVisible ? (
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Liquidação total</Text>
                <TouchableOpacity onPress={onClose}>
                  <Icon name="close-outline" size={30} color={COLORS.gray} />
                </TouchableOpacity>
              </View>
  
            {/* Seção para escolher a data */}
            <TouchableOpacity onPress={showCalendar} style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>
                Hoje, {newDueDate ? formatDateBrazilian(newDueDate) : 'Escolha a data'}
              </Text>
              <Icon name="calendar" size={24} color={COLORS.gray} />
            </TouchableOpacity>

            <CustomCalendar
              visible={isCalendarVisible}
              onClose={() => setCalendarVisible(false)}
              onDayPress={(day) => handleConfirmDate(day.dateString)}
            />
              {/* Botão para confirmar a liquidação */}
              <TouchableOpacity style={styles.confirmButton2} onPress={proceedToConfirmation}>
                <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                <Text style={styles.buttonText}>Pagar Conta</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.confirmationModalContainer}>
              <Text style={styles.modalTitle}>Tem certeza disso?</Text>
              <Text style={styles.modalSubtitle}>Pagar esta conta removerá ela da lista.</Text>
  
              <View style={styles.confirmationButtonsContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsConfirmVisible(false)}>
                  <Icon name="close-circle-outline" size={20} color={COLORS.black} />
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.confirmButton} onPress={handleFinalConfirmation}>
                  <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                  <Text style={styles.buttonText}>Pagar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContainer: {
    width: 360,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    color: COLORS.black,
  },
  modalSubtitle: {
    fontSize: 14,
    color: COLORS.black,
    marginVertical: 10,
  },
  datePickerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderColor: COLORS.black,
    marginVertical: 10,
    borderBottomWidth: 1,
  },
  dateLabel: {
    fontSize: 16,
    color: COLORS.black,
  },
  confirmButton: {
    backgroundColor: COLORS.primary, // Botão amarelo
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  confirmButton2: {
    backgroundColor: COLORS.primary, // Botão amarelo
    paddingVertical: 25,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%'
  },
  confirmationModalContainer: {
    width: 360,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  confirmationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
});

export default LiquidationFlowModal;
