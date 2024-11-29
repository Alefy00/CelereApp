/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import { COLORS } from '../../../../../constants';
import { API_BASE_URL } from '../../../../../services/apiConfig';

const OverdueReceivablesTab  = ({ empresaId, selectedDate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      if (empresaId && selectedDate) {
        const { dt_ini, dt_end } = selectedDate;
        const response = await axios.get(
          `${API_BASE_URL}/api/ms_datainf/composite/?empresa_id=${empresaId}&dt_ini=${dt_ini}&dt_end=${dt_end}`
        );
        if (response.status === 200 && response.data.status === 'success') {
          const itemData = response.data.data.find((item) => item.item === 'Contas a Receber em Atraso');
          setData(itemData);
        } else {
          setData(null);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [empresaId, selectedDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Dados não disponíveis</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>{data.item}</Text>
      <Text style={styles.description}>{data.qtd || '0'}</Text>
      <Text style={styles.descriptionValor}>R$ {data.valor || '0,00'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: '90%',
    paddingVertical: 23,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',  // Cor da sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,  // Opacidade da sombra, para uma sombra mais visível
    shadowRadius: 4,  // Raio da sombra
    elevation: 4,  // Elevação para Android, ajustando para criar uma sombra mais proeminente
    alignItems: 'center',
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    color: COLORS.black,
  },
  description: {
    fontSize: 36,
    color: COLORS.red,
    fontWeight: '900',
  },
  descriptionValor: {
    fontSize: 18,
    color: COLORS.red,
  },
});

export default OverdueReceivablesTab;
