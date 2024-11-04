/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Image, Modal, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import { COLORS } from "../../../../../../../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CustomCalendar from "../../../../../../../../components/CustomCalendar";
import { API_BASE_URL } from "../../../../../../../../services/apiConfig";

const ReceivableDetails = ({ products, totalPrice, clients, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('Boleto');
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [liquidValue, setLiquidValue] = useState(totalPrice);  // Estado para armazenar o valor líquido após desconto
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  // Função para mostrar alertas
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  // Função para buscar o ID da empresa logada
  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId); // Converte para número se estiver como string
      } else {
        showAlert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const date = new Date();
    const formattedDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setCurrentDate(formattedDate);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    setDropdownVisible(false);
  };

  const navigateToAddClient = () => {
    navigation.navigate("IncludeClient");
  };

  const handleConfirm = () => {
        // Navega ou limpa o carrinho após o registro
    navigation.navigate('NewRegisteredSale', { clearCart: true });
  };

  const handleShowCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleDayPress = (day) => {
    setPaymentDate(new Date(`${day.dateString}`)); // Atualiza a data selecionada
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('MainTab');
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
// Função de registrar venda e itens
const handleRegisterSale = async () => {
  try {
    const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
    if (!empresaId) return;

    const paymentMethodId = paymentMethod === 'Boleto' ? 1 : null; // 1 para Boleto, null para Fiado
    const formattedDueDate = paymentDate.toISOString().split('T')[0]; // Data de vencimento selecionada pelo usuário (prevista)
    const totalValue = liquidValue; // Valor bruto a receber após desconto
    const totalCostValue = totalPrice; // Valor total do custo, que pode ser ajustado conforme necessário

    // Monta o objeto de venda com os dados preenchidos pelo usuário
    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient ? selectedClient.id : null, // Cliente selecionado
      dt_pagamento: null, // Pagamento futuro (conta a receber)
      dt_prevista_pagamento: formattedDueDate, // Data de vencimento inserida pelo usuário
      valor_total_custo_venda: totalCostValue, // Valor de custo da venda
      valor_total_venda: totalValue, // Valor total a receber
      percentual_desconto: parseFloat(discountValue) || 0, // Percentual de desconto inserido
      tipo_pagamento_venda: paymentMethodId, // Tipo de pagamento (Boleto ou Fiado)
    };

    // Envia os dados da venda para a API
    const vendaResponse = await axios.post(`${API_BASE_URL}/cad/vendas/`, vendaData);
    const vendaId = vendaResponse.data.data.id; // Pega o ID da venda registrada
    console.log('Venda registrada:', vendaResponse.data);

    // Registra os itens da venda
    const saleItems = products.map(product => ({
      empresa_id: empresaId,
      venda_id: vendaId, // ID da venda
      produto_id: product.id,
      quantidade: product.amount,
      percentual_desconto: parseFloat(discountValue) || 0,
      valor_desconto: discountType === 'R$' ? parseFloat(discountValue) : 0,
    }));

    // Faz a requisição para registrar os itens da venda
    const responsePromises = saleItems.map(item =>
      axios.post(`${API_BASE_URL}/cad/itens_venda/`, item)
    );
    await Promise.all(responsePromises);
    setIsModalVisible(true);

  } catch (error) {
    console.error('Erro ao registrar venda:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao registrar a venda.');
  }
};

  const calculateLiquidValue = useCallback(() => {
    let discount = 0;

    if (discountType === '%') {
      // Calcula o desconto em porcentagem
      discount = (totalPrice * (parseFloat(discountValue) / 100)) || 0;
    } else if (discountType === 'R$') {
      // Calcula o desconto em valor fixo
      discount = parseFloat(discountValue) || 0;
    }

    const totalWithDiscount = totalPrice - discount; // Aplica o desconto
    const finalLiquidValue = totalWithDiscount > 0 ? totalWithDiscount : 0; // Evita valores negativos
    setLiquidValue(finalLiquidValue); // Atualiza o valor líquido
  }, [totalPrice, discountValue, discountType]);

  useEffect(() => {
    calculateLiquidValue();
  }, [totalPrice, discountValue, discountType, calculateLiquidValue]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.saleDetailsContainer}>
          <Text style={styles.saleDetailsTitle}>Detalhes da venda</Text>
        </View>

        {/* Data do pagamento */}
        <View style={styles.dateContainer}>
      <TouchableOpacity onPress={handleShowCalendar} style={styles.datePicker}>
        <Text style={styles.dateText}>
          {`Data do Vencimento: ${paymentDate.toLocaleDateString('pt-BR')}`}
        </Text>
        <Icon name="calendar" size={24} color={COLORS.lightGray} />
      </TouchableOpacity>

      <CustomCalendar
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onDayPress={handleDayPress}
      />
        </View>

        {/* Campo de associar cliente */}
        <View style={styles.clientContainer}>
          <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
            <Text style={styles.clientText}>
              {selectedClient ? selectedClient.nome : "Associar a um cliente..."}  
            </Text>
            <Icon name={isDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addClientButton} onPress={navigateToAddClient}>
            <Icon name="add" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>

        {/* Dropdown para exibir a lista de clientes */}
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

        {/* Carrinho de produtos */}
        <View style={styles.cartContainer}>
          <Text style={styles.sectionTitle}>Carrinho</Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productDetail}>
              <Image source={{ uri: product.imagem }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productText}>{product.nome}</Text>
                <Text style={styles.productPrice}>
                Preço unitário: {product.preco_venda ? formatCurrency(product.preco_venda) : 'N/A'}
              </Text>
                <Text style={styles.productAmount}>Quantidade: {product.amount}</Text>
              </View>
              <Text style={styles.productTotal}>{formatCurrency(product.preco_venda * product.amount)}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.addMoreButton} onPress={() => navigation.navigate('NewRegisteredSale')}>
        <Icon name="add" size={25} color={COLORS.black} />
        <Text style={styles.addMoreButtonText}>Adicionar mais produtos ou serviços</Text>
      </TouchableOpacity>

        {/* Seção de descontos */}
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

        {/* Alternância de métodos de pagamento */}
        <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
        <View style={styles.paymentToggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, paymentMethod === 'Fiado' && styles.activeButton]}
            onPress={() => handlePaymentMethodChange('Fiado')}
          >
            <Text style={paymentMethod === 'Fiado' ? styles.activeButtonText : styles.inactiveButtonText}>
              Fiado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, paymentMethod === 'Boleto' && styles.activeButton]}
            onPress={() => handlePaymentMethodChange('Boleto')}
          >
            <Text style={paymentMethod === 'Boleto' ? styles.activeButtonText : styles.inactiveButtonText}>
              Boleto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total e valor líquido a receber */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Valor a receber <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
          <Text style={styles.totalValue}>{formatCurrency(liquidValue)}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleRegisterSale}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.confirmButtonText}>Concluir esta venda</Text>
        </TouchableOpacity>
      </ScrollView>

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
            <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
              <Icon name="arrow-back" size={20} color={COLORS.black} />
              <Text style={styles.modalBackButtonText}>Voltar ao resumo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceivableDetails;
