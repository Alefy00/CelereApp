/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Modal, FlatList, TextInput, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles";
import { COLORS } from "../../../../../../../../constants";
import axios from "axios";
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import CashIcon from "../../../../../../../../assets/images/svg/iconMoney.svg";
import CreditCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import DebitCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../../../../../../services/apiConfig";
import mixpanel from "../../../../../../../../services/mixpanelClient";
import moment from 'moment-timezone';

const LiquidateNow = ({ products, totalPrice, clients, navigation, route, setProducts }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [paymentType, setPaymentType] = useState('À vista');
  const [installments, setInstallments] = useState(1);  // Default to 1 (À vista)
  const [liquidValue, setLiquidValue] = useState(totalPrice); // Default as total price
  const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [installmentValue, setInstallmentValue] = useState(0);
  const [saleId, setSaleId] = useState(null); // Estado para armazenar o ID da venda

    // Função para buscar o ID da empresa logada
    const getEmpresaId = useCallback(async () => {
      try {
        const storedEmpresaId = await AsyncStorage.getItem('empresaId');
        if (storedEmpresaId) {
          return Number(storedEmpresaId); // Converte para número se estiver como string
        } else {
          Alert('Erro', 'ID da empresa não encontrado.');
          return null;
        }
      } catch (error) {
        console.error('Erro ao buscar o ID da empresa:', error);
        return null;
      }
    }, []);

  const fetchPaymentMethods = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cad/metodos_pagamentos/?empresa=1`);
      if (response.data && response.data.results && response.data.results.data) {
        setPaymentMethods(response.data.results.data);
      } else {
        Alert.alert('Erro', 'Falha ao recuperar métodos de pagamento.');
      }
    } catch (error) {
      console.error('Erro ao buscar métodos de pagamento:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os métodos de pagamento.');
    }
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const getPaymentIcon = (methodName) => {
    switch (methodName.toLowerCase()) {
      case 'pix':
        return <PixIcon width={20} height={20} />;
      case 'dinheiro':
        return <CashIcon width={20} height={20} />;
      case 'cartão de crédito': // Corrigido para lidar com nomes diferentes
      case 'cartao de credito':
        return <CreditCardIcon width={20} height={20} />;
      case 'débito':
      case 'debito':
        return <DebitCardIcon width={20} height={20} />;
      default:
        return <Icon name="card" size={20} color="black" />;
    }
  };

  useEffect(() => {
    const formattedDate = `Hoje, ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleConfirm = () => {
        navigation.navigate('NewRegisteredSale', { clearCart: true });
  };

  const paymentOptions = ['2x', '3x', '4x', '5x', '6x', '7x'];

  const togglePaymentDropdown = () => {
    setIsPaymentDropdownVisible(!isPaymentDropdownVisible);
  };

  const selectPaymentOption = (option) => {
    setPaymentType(option);
    setInstallments(parseInt(option));  // Define o número de parcelas com base na escolha
    setIsPaymentDropdownVisible(false);
  };

  const handleRegisterSale = async () => {
    try {
      const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
      if (!empresaId) return;
  
      const currentDate = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');
      const totalValue = liquidValue; // Valor bruto a receber após desconto
  
      if (!selectedPaymentMethod) {
        console.error('Nenhum método de pagamento selecionado!');
        Alert.alert('Erro', 'Selecione um método de pagamento.');
        return;
      }
  
      // Calcular o desconto
      let discount = 0;
      if (discountType === '%') {
        discount = totalPrice * ((parseFloat(discountValue) || 0) / 100); // Garante 0 se discountValue for vazio
      } else if (discountType === 'R$') {
        discount = parseFloat(discountValue) || 0; // Garante 0 se discountValue for vazio
      }
  
      // Registra a venda primeiro
      const vendaData = {
        empresa: empresaId,
        cliente_id: selectedClient ? selectedClient.id : null, // Cliente selecionado
        dt_pagamento: currentDate, // Data de pagamento (data atual)
        percentual_desconto: discountType === '%' ? parseFloat(discountValue) || 0 : 0, // Garante 0 para percentual
        tipo_pagamento_venda: selectedPaymentMethod, // ID da forma de pagamento selecionada
        valor_total_venda: totalValue, // Valor bruto a receber
      };
    
      const vendaResponse = await axios.post(`${API_BASE_URL}/cad/vendas/`, vendaData);
  
      const vendaId = vendaResponse.data.data.id;
  
      // Agora registra os itens da venda
      const saleItems = products.map(product => ({
        empresa_id: empresaId,
        venda_id: vendaId, // ID da venda registrada
        produto_id: product.id,
        quantidade: product.amount,
        percentual_desconto: discountType === '%' ? parseFloat(discountValue) || 0 : 0, // Garante 0 para percentual
        valor_desconto: discountType === 'R$' ? discount / products.length : 0,
      }));
    
      const responsePromises = saleItems.map(item =>
        axios.post(`${API_BASE_URL}/cad/itens_venda/`, item)
      );
  
      await Promise.all(responsePromises);
      setSaleId(vendaId);
      setIsModalVisible(true);
  
      // Rastrear a venda concluída no Mixpanel
      mixpanel.track('Venda Produto Pagar agora', {
        vendaId: vendaId,
        totalPreco: totalValue,
        desconto: discountValue || 0, // Garante 0 para rastreamento
        parcelas: installments,
        metodoPagamento: selectedPaymentMethod,
      });
    } catch (error) {
      console.error('Erro ao registrar venda:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao registrar a venda.');
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const selectClient = (client) => {
    setSelectedClient(client);
    setDropdownVisible(false);

      // Rastrear no Mixpanel a seleção de cliente
  mixpanel.track('Cliente Selecionado', {
    clienteId: client.id,
    clienteNome: client.nome,
  });

  };

  const navigateToAddClient = () => {
    navigation.navigate("IncludeClient");
  };

  const handleOpenInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
  };

  const handleCloseInvoiceModal = () => {
    setIsInvoiceModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('MainTab');
  };

// Função para calcular o valor líquido considerando o desconto e calcular o valor das parcelas
const calculateValues = useCallback(() => {
  let discount = 0;

  // Calcula o desconto baseado na escolha do usuário
  if (discountType === '%') {
    discount = (totalPrice * (parseFloat(discountValue) / 100)) || 0;
  } else if (discountType === 'R$') {
    discount = parseFloat(discountValue) || 0;
  }

  // Valor total com desconto aplicado
  const totalWithDiscount = totalPrice - discount;

  // Evita valores negativos e define o valor líquido
  const finalLiquidValue = totalWithDiscount > 0 ? totalWithDiscount : 0;
  setLiquidValue(finalLiquidValue); // Exibe o valor líquido após desconto

  // Verifica o parcelamento, se aplicável
  if (installments > 1) {
    // Calcula o valor das parcelas baseado no valor com desconto
    const installmentValue = (finalLiquidValue / installments).toFixed(2);
    setInstallmentValue(installmentValue); // Atualiza o valor da parcela
  } else {
    setInstallmentValue(finalLiquidValue.toFixed(2)); // Se não houver parcelamento, mostra o valor total
  }
}, [totalPrice, discountValue, discountType, installments]);

useEffect(() => {
  calculateValues(); // Recalcula os valores sempre que o desconto ou o parcelamento mudar
}, [totalPrice, discountValue, discountType, installments, calculateValues]);

const formatCurrency = (value) => {
  if (!value) return '';
  return parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
const removeProduct = (productId) => {
  const updatedProducts = products.filter(product => product.id !== productId);
  setProducts(updatedProducts); // Atualiza o estado no componente pai
};

useEffect(() => {
  // Recalcula o total sempre que a lista de produtos mudar
  const newTotal = products.reduce((total, product) => total + (product.preco_venda * product.amount), 0);
  setLiquidValue(newTotal);
}, [products]); // Observa mudanças em products

useEffect(() => {
  const startTime = Date.now();

  return () => {
    const endTime = Date.now();
    const durationInSeconds = (endTime - startTime) / 1000;

    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;

    mixpanel.track('Tempo na Tela Venda Produtos Pagar agora', {
      formattedDuration,
    });
  };
}, []);


  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.saleDetailsContainer}>
        <Text style={styles.saleDetailsTitle}>Detalhes da venda</Text>
        <Text style={styles.saleDate}>Data da Venda: <Text style={styles.saleDateValue}>{currentDate}</Text></Text>
      </View>

      <View style={styles.clientContainer}>
        <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
          <Text style={styles.clientText}>
            {selectedClient ? selectedClient.nome : "Associar a um cliente..."}
          </Text>
          <Icon name={isDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addClientButton} onPress={navigateToAddClient}>
          <Icon name="add" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {isDropdownVisible && (
        <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
          <ScrollView nestedScrollEnabled={true}>
            {clients.map((client) => (
              <TouchableOpacity
                key={client.id}
                style={styles.dropdownItem}
                onPress={() => selectClient(client)}
              >
                <Text style={styles.dropdownItemText}>{client.nome}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.cartContainer}>
        <Text style={styles.sectionTitle}>Carrinho</Text>
        {products.map((product, index) => (
          <View key={index} style={styles.productDetail}>
            <Image source={{ uri: product.imagem ? product.imagem : 'link-da-placeholder' }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productText}>{product.nome}</Text>
              <Text style={styles.productPrice}>
                Preço unitário: {product.preco_venda ? formatCurrency(product.preco_venda) : 'N/A'}
              </Text>
              <Text style={styles.productAmount}>
                Quantidade: {product.amount}
              </Text>
            </View>
            <View style={styles.containerRemove}>
              <TouchableOpacity style={styles.removerIcon} onPress={() => removeProduct(product.id)}>
                  <Icon name="trash-outline" size={22} color={COLORS.red} />
              </TouchableOpacity>
              <Text style={styles.productTotal}>
              {formatCurrency(product.preco_venda * product.amount)}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addMoreButton} onPress={() => navigation.navigate('NewRegisteredSale')}>
        <Icon name="add" size={25} color={COLORS.black} />
        <Text style={styles.addMoreButtonText}>Adicionar mais produtos ou serviços</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Descontos</Text>
      <View style={styles.discountContainer}>
        <TouchableOpacity
          style={[styles.discountButton, discountType === '%' && styles.activeDiscountButton]}
          onPress={() => setDiscountType('%')}
        >
          <Text style={discountType === '%' ? styles.activeDiscountButtonText : styles.inactiveDiscountButtonText}>
            %
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.discountButton, discountType === 'R$' && styles.activeDiscountButton]}
          onPress={() => setDiscountType('R$')}
        >
          <Text style={discountType === 'R$' ? styles.activeDiscountButtonText : styles.inactiveDiscountButtonText}>
            R$
          </Text>
        </TouchableOpacity>
        <TextInput
          placeholder="Incluir desconto"
          value={discountValue}
          onChangeText={setDiscountValue}
          style={styles.discountInput}
          keyboardType='numeric'
        />
      </View>

      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
      <FlatList
        horizontal
        data={paymentMethods}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.paymentButton, selectedPaymentMethod === item.id && styles.selectedPaymentButton]}
            onPress={() => setSelectedPaymentMethod(item.id)}
          >
            {getPaymentIcon(item.nome)}
            <Text style={styles.paymentButtonText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Desabilitar CelerePay e Maquininha */}
      <View style={styles.paymentSelectionContainer}>
        <TouchableOpacity
          style={[styles.paymentOptionButtonDisabled]}
          disabled={true}
        >
          <Text style={styles.paymentOptionTextDisabled}>CélerePay (Em Breve)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOptionButtonDisabled]}
          disabled={true}
        >
          <Text style={styles.paymentOptionTextDisabled}>Maquininha (Em Breve)</Text>
        </TouchableOpacity>
      </View>

{/* Se o método selecionado for cartão de crédito, exibir a opção de parcelamento */}
{selectedPaymentMethod && paymentMethods.find(method => method.id === selectedPaymentMethod)?.nome?.toLowerCase() === 'cartao de credito' && (
  <View style={styles.parcelamentoSection}>
    <TouchableOpacity style={styles.clientPicker} onPress={togglePaymentDropdown}>
      <Text style={styles.clientText}>Pagamento parcelado</Text>
      <Icon name={isPaymentDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
    </TouchableOpacity>

    {/* Exibir as opções de parcelas horizontalmente */}
    {isPaymentDropdownVisible && (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.parcelamentoContainer}>
        {paymentOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.parcelamentoButton, installments === parseInt(option) && styles.activeParcelamentoButton]}
            onPress={() => selectPaymentOption(option)}
          >
            <Text style={installments === parseInt(option) ? styles.activeParcelamentoText : styles.parcelamentoText}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    )}

    {/* Exibir o valor parcelado baseado no valor líquido */}
    <Text style={styles.parcelamentoValue}>
      {installments}x de {formatCurrency(installmentValue)}
    </Text>
  </View>
)}
      <View style={styles.valueSummaryContainer}>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Bruto <Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmount2}>{formatCurrency(totalPrice)}</Text>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Taxa do cartão <Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmountTaxa}>--</Text>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor bruto a Receber<Icon name="alert-circle" size={18} color={COLORS.lightGray} /></Text>
          <Text style={styles.valueAmount}>{formatCurrency(liquidValue)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleRegisterSale}>
        <Icon name="checkmark-circle" size={25} color={COLORS.black} />
        <Text style={styles.confirmButtonText}>Concluir esta venda</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={100} color={COLORS.green} />
            <Text style={styles.modalText}>Sua venda foi concluída</Text>
            <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleConfirm}>
              <Icon name="cart" size={20} color={COLORS.black} />
              <Text style={styles.modalPrimaryButtonText}>Registrar outra venda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalPrimaryButton2} onPress={handleOpenInvoiceModal}>
              <Icon name="cart" size={20} color={COLORS.black} />
              <Text style={styles.modalPrimaryButtonText}>Emitir NF-e ou Recibo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
              <Icon name="arrow-back" size={20} color={COLORS.black} />
              <Text style={styles.modalBackButtonText}>Voltar ao resumo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isInvoiceModalVisible}
        onRequestClose={handleCloseInvoiceModal}
      >
        <View style={styles.invoiceModalContainer}>
          <View style={styles.invoiceModalContent}>
            <Text style={styles.invoiceModalTitle}>Escolha uma opção:</Text>
            <TouchableOpacity 
                style={styles.invoiceOptionButtonRecibo}
                onPress={() => {
                  handleCloseInvoiceModal(); // Fecha o modal de Invoice
                  navigation.navigate('ReceiptScreen', { saleId, fromLiquidateNow: true }); // Passa o saleId e a flag fromLiquidateNow
                }}
              >
                <Text style={styles.invoiceOptionTextRecibo}>Recibo</Text>
              </TouchableOpacity>

            <TouchableOpacity style={styles.invoiceOptionButtonNotaFiscal} onPress={() => console.log("Emitir Nota Fiscal")} disabled={true}>
              <Text style={styles.invoiceOptionTextNotaFiscal}>Nota Fiscal</Text>
              <Text style={styles.invoiceOptionTextNotaFiscal}>(Em breve)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseInvoiceModal}>
              <Icon name="close" size={25} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default LiquidateNow;
