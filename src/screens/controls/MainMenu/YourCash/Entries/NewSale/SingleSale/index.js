/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import BarTop3 from '../../../../../../../components/BarTop3';
import LiquidarAgora from './components/LiquidarAgora'; // Importando o novo componente
import AccountsPayable from './components/AccountsPayable';
import styles from './styles';
import { COLORS } from '../../../../../../../constants';

const SingleSale = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('Liquidar agora');
    const [cartItems, setCartItems] = useState([{ id: 1, quantity: 0, priceVenda: 0, priceCusto: 0 }]);
    const [discountValue, setDiscountValue] = useState('');
    const [discountType, setDiscountType] = useState('%');
    const [paymentMethod, setPaymentMethod] = useState('PIX');
    const [paymentMethod2, setPaymentMethod2] = useState('CelerePay');
    const [totalBruto, setTotalBruto] = useState(0);
    const [totalLiquido, setTotalLiquido] = useState(0);
    const [taxaCartao] = useState(0.01); // Taxa de 1%
  
    // Para a data atual
    const [currentDate, setCurrentDate] = useState(() => {
      const date = new Date();
      return `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    });
  
    return (
      <ScrollView style={styles.containerBase}>
        <View style={styles.containerBartop}>
          <BarTop3 titulo={'Voltar'} backColor={COLORS.primary} foreColor={COLORS.black} />
        </View>
        <View style={styles.container}>
          <Text style={styles.saleTitle}>Venda de produto/serviço avulso</Text>
  
          {/* Exibir a data apenas na aba "Liquidar agora" */}
          {activeTab === 'Liquidar agora' && (
            <Text style={styles.saleDate}>Data da venda: {currentDate}</Text>
          )}
  
          {/* Alternância entre abas */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'Liquidar agora' && styles.activeToggleButton]}
              onPress={() => setActiveTab('Liquidar agora')}
            >
              <Text style={styles.toggleButtonText}>Liquidar agora</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, activeTab === 'Contas a Pagar' && styles.activeToggleButton]}
              onPress={() => setActiveTab('Contas a Pagar')}
            >
              <Text style={styles.toggleButtonText}>Contas a Pagar</Text>
            </TouchableOpacity>
          </View>
  
          {activeTab === 'Liquidar agora' ? (
            <LiquidarAgora
              navigation={navigation}
            />
          ) : (
                <AccountsPayable
                navigation={navigation}
                />
          )}
        </View>
      </ScrollView>
    );
  };
  
  export default SingleSale;
