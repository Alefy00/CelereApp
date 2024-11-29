/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { COLORS } from '../../../../../constants';
import { API_BASE_URL } from '../../../../../services/apiConfig';
import styles from '../../styles';

const BalanceTab = ({ empresaId, selectedDate, onAdjustPress }) => {
  const [saldoCaixa, setSaldoCaixa] = useState(0);
  const [loading, setLoading] = useState(true);

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
        Saldo Caixa <Icon name="alert-circle" size={16} color={COLORS.lightGray} />
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
        <Text style={styles.updateButtonAttSaldo}>Ajustar caixa</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BalanceTab;
