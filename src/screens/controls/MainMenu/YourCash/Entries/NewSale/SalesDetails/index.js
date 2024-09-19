/* eslint-disable prettier/prettier */
import React, { useState, useCallback, useEffect } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import { KeyboardAvoidingView, Platform, View, TouchableOpacity, Text } from "react-native";
import LiquidateNow from './components/LiquidateNow'; // Importando o novo componente
import styles from "./styles";
import ReceivableDetails from "./components/ReceivableDetails";


const SaleDetails = ({ navigation, route }) => {
  const { products, totalPrice } = route.params;
  const [viewMode, setViewMode] = useState('Liquidar agora');
  // Dados fictícios de clientes
  const clients = [
    { id: 1, name: "João Silva" },
    { id: 2, name: "Maria Oliveira" },
    { id: 3, name: "Pedro Souza" },
    { id: 4, name: "Ana Santos" },
    { id: 5, name: "Lucas Martins" },
    { id: 6, name: "Carla Figueiredo" },
    { id: 7, name: "Gabriel Alves" },
    { id: 8, name: "Luiza Ferreira" },
    { id: 9, name: "Ricardo Lima" },
  ];


  const toggleViewMode = useCallback((mode) => {
    setViewMode(mode);
  }, []);



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{ flex: 1 }}>
        {/* Barra superior */}
        <View style={{ height: 55 }}>
          <BarTop2
            titulo={'Voltar'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
        </View>

        {/* Botões de alternância */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'Liquidar agora' && styles.activeButton]}
            onPress={() => toggleViewMode('Liquidar agora')}
          >
            <Text style={viewMode === 'Liquidar agora' ? styles.activeButtonText : styles.inactiveButtonText}>
              Liquidar agora
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewMode === 'Contas a receber' && styles.activeButton]}
            onPress={() => toggleViewMode('Contas a receber')}
          >
            <Text style={viewMode === 'Contas a receber' ? styles.activeButtonText : styles.inactiveButtonText}>
              Contas a receber
            </Text>
          </TouchableOpacity>
        </View>

        {/* Renderizando o conteúdo da aba selecionada */}
        {viewMode === 'Liquidar agora' && (
          <LiquidateNow
            products={products}
            totalPrice={totalPrice}
            clients={clients}
            navigation={navigation}
          />
        )}

        {viewMode === 'Contas a receber' && (
          <ReceivableDetails
            products={products}
            totalPrice={totalPrice}
            clients={clients}
            navigation={navigation}
          />
        )}

      </View>
    </KeyboardAvoidingView>
  );
};

export default SaleDetails;
