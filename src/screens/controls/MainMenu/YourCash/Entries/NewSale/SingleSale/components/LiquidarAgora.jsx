/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import CashIcon from "../../../../../../../../assets/images/svg/iconMoney.svg";
import CreditCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import DebitCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import { COLORS } from '../../../../../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../../../../services/apiConfig';
import mixpanel from '../../../../../../../../services/mixpanelClient';
import moment from 'moment-timezone';

// Função para mostrar alertas
const showAlert = (title, message) => {
  Alert.alert(title, message);
};

const LiquidarAgora = ({ navigation }) => {
  const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [installments, setInstallments] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [totalBruto, setTotalBruto] = useState(0);
  const [totalLiquido, setTotalLiquido] = useState(0);
  const [cartItems, setCartItems] = useState([{ id: 1, name: '', priceVenda: 0, priceCusto: 0, quantity: 1 }]);
  const [saleId, setSaleId] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const formattedDate = `Hoje, ${moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')}`;
    setCurrentDate(formattedDate);
  }, []);
  
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

 // Função para buscar os métodos de pagamento
 const fetchPaymentMethods = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cad/metodos_pagamentos/`);
    const jsonResponse = await response.json();

    if (jsonResponse.results.status === 'success') {
      const methodsWithIcons = jsonResponse.results.data.map((method) => {
        let icon = null;
        switch (method.nome) {
          case 'PIX':
            icon = <PixIcon width={20} height={20} />
            break;
          case 'Dinheiro':
            icon = <CashIcon width={20} height={20} />;
            break;
          case 'Cartao de Credito':
            icon = <CreditCardIcon width={20} height={20} />;
            break;
          case 'Debito':
            icon = <DebitCardIcon width={20} height={20} />;
            break;
          default:
            icon = <Icon name="card" size={20} color="black" />;
        }
        return { ...method, icon };
      });
      setPaymentMethods(methodsWithIcons);
    } else {
      showAlert('Erro', 'Falha ao buscar os métodos de pagamento.');
    }
  } catch (error) {
    console.error('Erro ao buscar os métodos de pagamento:', error);
    showAlert('Erro', 'Não foi possível buscar os métodos de pagamento.');
  }
};

// Chamada para buscar métodos de pagamento ao montar o componente
useEffect(() => {
  fetchPaymentMethods(); // Chama a função ao montar o componente
}, []);

// Função para buscar os clientes da empresa
const fetchClientes = async (empresaId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cad/cliente/?empresa=${empresaId}`);
    const jsonResponse = await response.json();

    if (jsonResponse.results.status === 'success') {
      setClientes(jsonResponse.results.data);
    } else {
      showAlert('Erro', 'Falha ao buscar os clientes.');
    }
  } catch (error) {
    console.error('Erro ao buscar os clientes:', error);
    showAlert('Erro', 'Não foi possível buscar os clientes.');
  }
};

useEffect(() => {
  const loadClientes = async () => {
    const empresaId = await getEmpresaId();
    if (empresaId) {
      fetchClientes(empresaId);
    }
  };
  loadClientes();
}, [getEmpresaId]);

// Atualizar item no carrinho
const updateCartItem = (index, field, value) => {
  const updatedItems = [...cartItems];
  updatedItems[index] = { ...updatedItems[index], [field]: value };
  setCartItems(updatedItems);
};

// Adicionar novo item ao carrinho
const addNewCartItem = () => {
  const newCartItem = { id: cartItems.length + 1, name: '', priceVenda: 0, quantity: 1 };
  setCartItems([...cartItems, newCartItem]);
  // Evento Mixpanel - Captura a adição de um item no carrinho
  mixpanel.track('Item Adicionado ao Carrinho', {
    itemId: newCartItem.id,
  });
};

// Função para remover um item do carrinho
const removeCartItem = (id) => {
  const updatedItems = cartItems.filter((item) => item.id !== id);
  setCartItems(updatedItems);
  // Evento Mixpanel - Captura a remoção de um item do carrinho
  mixpanel.track('Item Removido do Carrinho', {
    itemId: id,
  });
};

// Função para calcular o total bruto e líquido
const calculateTotals = useCallback(() => {
  const totalBruto = cartItems.reduce((sum, item) => sum + (item.priceVenda * item.quantity), 0);
  setTotalBruto(totalBruto);

  let discount = 0;
  if (discountType === '%') {
    discount = (totalBruto * parseFloat(discountValue)) / 100;
  } else if (discountType === 'R$') {
    discount = parseFloat(discountValue);
  }

  const totalLiquido = totalBruto - (isNaN(discount) ? 0 : discount);
  setTotalLiquido(totalLiquido);
}, [cartItems, discountType, discountValue]);

useEffect(() => {
  calculateTotals();
}, [cartItems, discountValue, discountType, calculateTotals]);

const registerSale = async () => {
  try {
    const empresaId = await getEmpresaId();
    const currentDate = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');

    if (!selectedPaymentMethod) {
      showAlert("Erro", "Selecione uma forma de pagamento.");
      return;
    }

    if (totalLiquido <= 0) {
      showAlert('Erro', 'O valor total da venda não pode ser zero ou negativo.');
      return;
    }

    // Determina o desconto como 0 se não informado
    const descontoCalculado = discountValue ? parseFloat(discountValue) : 0;

    // Montar os dados da venda
    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient ? selectedClient.id : null,
      dt_pagamento: currentDate,
      dt_previsao_pagamento: currentDate,
      valor_total_custo_venda: parseFloat(totalLiquido).toFixed(2),
      valor_total_venda: parseFloat(totalLiquido).toFixed(2),
      percentual_desconto: discountType === '%' ? descontoCalculado : 0,
      tipo_pagamento_venda: selectedPaymentMethod,
    };

    console.log('Dados da venda a serem enviados:', vendaData);

    const response = await axios.post(`${API_BASE_URL}/cad/vendas/`, vendaData);
    if (response.data && response.data.status === 'success') {
      const vendaId = response.data.data.id;
      console.log('Venda registrada, ID:', vendaId);

      // Registrar os itens da venda
      await registerSaleItems(vendaId);
      setSaleId(vendaId);
      setIsModalVisible(true);

      mixpanel.track('Venda avulsa - Pagar agora', {
        vendaId: vendaId,
        valorTotal: totalLiquido,
        metodoPagamento: selectedPaymentMethod,
      });
    } else {
      showAlert('Erro', 'Falha ao registrar a venda. Verifique os dados e tente novamente.');
      console.error('Erro ao registrar venda:', response.data);
    }
    resetFields();
  } catch (error) {
    console.error('Erro ao registrar venda:', error.response ? error.response.data : error.message);
    showAlert('Erro', 'Ocorreu um erro ao registrar a venda. Verifique sua conexão e tente novamente.');
  }
};


const registerSaleItems = async (vendaId) => {
  try {
    const empresaId = await getEmpresaId();

    if (!cartItems || cartItems.length === 0) {
      showAlert('Erro', 'Nenhum item encontrado no carrinho.');
      return;
    }

    // Calcular o total bruto dos itens
    const totalBruto = cartItems.reduce((sum, item) => sum + (item.priceVenda * item.quantity), 0);

    const productItems = cartItems.map((product) => {
      // Garantir que o desconto seja tratado corretamente
      const descontoGlobal = parseFloat(discountValue) || 0;

      // Calcular desconto proporcional (apenas se for em valor absoluto)
      const itemDiscountValue = discountType === 'R$'
        ? descontoGlobal * ((product.priceVenda * product.quantity) / totalBruto)
        : 0;

      return {
        empresa_id: empresaId,
        venda_id: vendaId,
        nome: product.name,
        quantidade: parseInt(product.quantity),
        preco_unitario_compra: parseFloat(product.priceCusto).toFixed(2),
        preco_unitario_venda: parseFloat(product.priceVenda).toFixed(2),
        percentual_desconto: discountType === '%' ? descontoGlobal : 0, // Tratar como 0 se não houver desconto percentual
        valor_desconto: parseFloat(itemDiscountValue).toFixed(2), // Garantir formato numérico válido
      };
    });

    console.log('Itens de venda a serem enviados:', productItems);

    // Enviar os itens de forma assíncrona
    const productPromises = productItems.map(item =>
      axios.post(`${API_BASE_URL}/cad/itens_venda/`, item)
    );

    await Promise.all(productPromises);

  } catch (error) {
    console.error('Erro ao registrar itens da venda:', error.response ? error.response.data : error.message);
    showAlert('Erro', 'Ocorreu um erro ao registrar os itens da venda.');
  }
};


// Funções auxiliares de UI
const toggleDropdown = () => {
  setDropdownVisible(!isDropdownVisible);
};

const selectClient = (client) => {
  setSelectedClient(client);
  setDropdownVisible(false);
    // Evento Mixpanel - Captura a seleção do cliente
  mixpanel.track('Cliente Selecionado', {
    clienteId: client.id,
    clienteNome: client.nome,
  });
};

const navigateToAddClient = () => {
  navigation.navigate('IncludeClient');
};

const selectPaymentMethod = (methodId) => {
  setSelectedPaymentMethod(methodId);
};

const paymentOptions = ['2x', '3x', '4x', '5x', '6x', '7x'];

const selectPaymentOption = (option) => {
  setInstallments(parseInt(option));
  setIsPaymentDropdownVisible(false);
};

const formatCurrency = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const handleNewRegistered = () => {
  setIsModalVisible(false);
  navigation.navigate('SingleSale');

  mixpanel.track('Registrar Outra Venda');
};

const handleOpenInvoiceModal = () => {
  setIsModalVisible(false);
  setIsInvoiceModalVisible(true);
};

const handleCloseInvoiceModal = () => {
  setIsInvoiceModalVisible(false);
};

const resetFields = () => {
  setCartItems([{ id: 1, quantity: 1, priceVenda: 0, priceCusto: 0 }]); // Reseta os valores numéricos
  setDiscountValue('');
  setTotalBruto(0);
  setTotalLiquido(0);
  setSelectedClient(null);
  setSelectedPaymentMethod(null); // Resetar método de pagamento selecionado
};
const handleCloseModal = () => {
  setIsModalVisible(false);
  navigation.navigate('MainTab')
};

const updatePrice = (index, value, field) => {
  const numericValue = parseFloat(value.replace(/[^\d]/g, '')) / 100; // Remove todos os caracteres não numéricos e divide por 100 para manter precisão
  const updatedItems = [...cartItems];
  updatedItems[index][field] = isNaN(numericValue) ? 0 : numericValue; // Atualiza o estado com o valor numérico
  setCartItems(updatedItems);
};

const updateQuantity = (id, increment) => {
  const updatedItems = cartItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: Math.max(0, item.quantity + increment),
      };
    }
    return item;
  });
  setCartItems(updatedItems);

    // Evento Mixpanel - Captura a atualização da quantidade do item
    mixpanel.track('Quantidade Atualizada', {
      itemId: id,
      novaQuantidade: updatedItems.find(item => item.id === id)?.quantity,
    });
};

const togglePaymentDropdown = () => {
  setIsPaymentDropdownVisible(!isPaymentDropdownVisible);
};
  // Função principal para registrar venda e itens
 const handleConfirm = async () => {
   await registerSale();
   
};

return (
  <ScrollView>
    {/* Campo para associar cliente */}
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
          {clientes.map((client) => (
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

    <Text style={styles.cartTitle}>Carrinho</Text>
    {cartItems.map((item, index) => (
      <View key={item.id} style={styles.cartItem}>
        <TouchableOpacity style={styles.removeButton} onPress={() => removeCartItem(item.id)}>
          <Icon name="close" size={20} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.itemLabel}>Produto/Serviço #{item.id}</Text>
        <TextInput
          placeholder="Nome do produto/serviço"
          style={styles.input}
          value={item.name}
          onChangeText={(text) => updateCartItem(index, 'name', text)}
          maxLength={30}
        />
        <TextInput
          placeholder="Preço de custo (R$)"
          style={styles.input}
          keyboardType="numeric"
          value={item.priceCusto ? formatCurrency(item.priceCusto) : ''} // Exibir o valor formatado
          onChangeText={(value) => updatePrice(index, value, 'priceCusto')} // Atualizar o estado com o valor numérico
        />
        <View style={styles.quantityRow}>
          <Text style={styles.quantityLabel}>Qtd.</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <Icon name="remove" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <Icon name="add" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TextInput
              placeholder="Preço de venda (R$)"
              style={styles.input}
              keyboardType="numeric"
              value={item.priceVenda ? formatCurrency(item.priceVenda) : ''} // Exibir o valor formatado
              onChangeText={(value) => updatePrice(index, value, 'priceVenda')} // Atualizar o estado com o valor numérico
            />
        </View>
      </View>
    ))}

    <TouchableOpacity style={styles.addButton} onPress={addNewCartItem}>
      <Icon name="add" size={28} color={COLORS.black} />
    </TouchableOpacity>

    {/* Seção de descontos */}
    <Text style={styles.DescontoTitle}>Descontos</Text>
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
        keyboardType="numeric"
      />
    </View>

    {/* Lista de métodos de pagamento */}
    <Text style={styles.DescontoTitle}>Forma de Pagamento</Text>
    <FlatList
      horizontal
      data={paymentMethods}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.paymentButton, selectedPaymentMethod === item.id && styles.selectedPaymentButton]}
          onPress={() => selectPaymentMethod(item.id)}
        >
          {item.icon}
          <Text style={styles.paymentButtonText}>{item.nome}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
    />

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
          {installments}x de R${(totalLiquido / installments).toFixed(2)}
        </Text>
      </View>
    )}

    {/* Seção de totais */}
    <View style={styles.totalSection}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Valor Bruto</Text>
        <Text style={styles.totalValue}>{formatCurrency(totalBruto)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Taxa do cartão</Text>
        <Text style={[styles.totalValue, { color: COLORS.red }]}>--</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Valor a receber</Text>
        <Text style={[styles.totalValue, { color: COLORS.green }]}>{formatCurrency(parseFloat(totalLiquido))}</Text>
      </View>
    </View>

    {/* Botão de concluir venda */}
    <TouchableOpacity style={styles.finishButton} onPress={handleConfirm}>
      <Icon name="checkmark-circle" size={20} color={COLORS.black} />
      <Text style={styles.finishButtonText}>Concluir esta venda</Text>
    </TouchableOpacity>

    {/* Modal de confirmação */}
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
          <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleNewRegistered}>
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

    {/* Modal para escolha entre Recibo e Nota Fiscal */}
    <Modal transparent={true} animationType="fade" visible={isInvoiceModalVisible} onRequestClose={handleCloseInvoiceModal}>
      <View style={styles.invoiceModalContainer}>
        <View style={styles.invoiceModalContent}>
          <Text style={styles.invoiceModalTitle}>Escolha uma opção:</Text>
          <TouchableOpacity style={styles.invoiceOptionButtonRecibo} onPress={() => {
                  handleCloseInvoiceModal(); // Fecha o modal de Invoice
                  navigation.navigate('ReceiptScreen', { saleId, fromLiquidateAgora: true }); // Passa o saleId e a flag fromLiquidateNow
                }}>
            <Text style={styles.invoiceOptionTextRecibo}>Recibo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.invoiceOptionButtonNotaFiscal} onPress={() => console.log("Emitir Nota Fiscal")} disabled={true}>
            <Text style={styles.invoiceOptionTextNotaFiscal}>Nota Fiscal</Text>
            <Text style={styles.invoiceOptionTextNotaFiscal}>(Em Breve)</Text>
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

export default LiquidarAgora;
