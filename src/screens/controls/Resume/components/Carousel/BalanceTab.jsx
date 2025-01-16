/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { COLORS } from '../../../../../constants';
import { API_BASE_URL } from '../../../../../services/apiConfig';
import styles from '../../styles';

const BalanceTab = ({ empresaId, selectedDate, onAdjustPress }) => {
  const [saldoCaixa, setSaldoCaixa] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const fetchSaldoCaixa = useCallback(async () => {
    try {
      if (empresaId && selectedDate) {
        const { dt_ini, dt_end } = selectedDate;
        const response = await axios.get(
          `${API_BASE_URL}/api/ms_datainf/composite/?empresa_id=${empresaId}&dt_ini=${dt_ini}&dt_end=${dt_end}`
        );

        if (response.status === 200 && response.data.status === 'success') {
          const saldoData = response.data.data.find((item) => item.item === 'Saldo Caixa');
          const saldoTotal = saldoData ? parseFloat(saldoData.valor.replace(/\./g, '').replace(',', '.')) : 0;
          setSaldoCaixa(saldoTotal);
        } else {
          setSaldoCaixa(0);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
      setSaldoCaixa(0);
    } finally {
      setLoading(false);
    }
  }, [empresaId, selectedDate]);

  useEffect(() => {
    fetchSaldoCaixa();
  }, [fetchSaldoCaixa]);

  const formatCurrency = (value) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return '0,00';
    const formattedValue = Math.abs(numericValue).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return numericValue < 0 ? `-R$ ${formattedValue}` : `R$ ${formattedValue}`;
  };

  return (
    <View style={styles.pageContainer}>
      <Text style={styles.title}>
        Saldo Caixa 
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
        </TouchableOpacity>
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <Text
          style={[
            styles.amount,
            { color: saldoCaixa < 0 ? COLORS.red : COLORS.green },
          ]}
        >
          {formatCurrency(saldoCaixa)}
        </Text>
      )}
      <TouchableOpacity onPress={onAdjustPress}>
        <Text style={styles.updateButtonAttSaldo}>Ajustar manualmente</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Icon name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={modalStyles.modalText}>
              Saldo em caixa é formado pelo que você tem de dinheiro em espécie, em bancos e em recebíveis de cartão.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 20,
  },
});

export default BalanceTab;
