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
  const [cartItems, setCartItems] = useState([{ id: 1, name: '', priceVenda: '', priceCusto: '', quantity: 1 }]);
  
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
    const response = await fetch('https://api.celereapp.com.br/cad/metodos_pagamentos/');
    const jsonResponse = await response.json();

    if (jsonResponse.results.status === 'success') {
      const methodsWithIcons = jsonResponse.results.data.map((method) => {
        let icon = null;
        switch (method.nome) {
          case 'PIX':
            icon = <PixIcon width={20} height={20} />;
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
    const response = await fetch(`https://api.celereapp.com.br/cad/cliente/?empresa=${empresaId}`);
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
};

// Função para remover um item do carrinho
const removeCartItem = (id) => {
  const updatedItems = cartItems.filter((item) => item.id !== id);
  setCartItems(updatedItems);
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


  // Função para registrar a venda
  const registerSale = async () => {
    try {
      const empresaId = await getEmpresaId();
      const currentDate = new Date().toISOString().split('T')[0];

      if (!selectedClient || !selectedClient.id) {
        showAlert("Erro", "Selecione um cliente para registrar a venda.");
        return;
      }

      if (!selectedPaymentMethod) {
        showAlert("Erro", "Selecione uma forma de pagamento.");
        return;
      }

      if (totalLiquido <= 0) {
        showAlert('Erro', 'O valor total da venda não pode ser zero ou negativo.');
        return;
      }

      const vendaData = {
        empresa: empresaId,
        cliente_id: selectedClient.id,
        dt_pagamento: currentDate,
        dt_previsao_pagamento: currentDate,
        valor_total_custo_venda: parseFloat(totalLiquido).toFixed(2),
        valor_total_venda: parseFloat(totalLiquido).toFixed(2),
        percentual_desconto: parseFloat(discountValue) || 0,
        tipo_pagamento_venda: selectedPaymentMethod,
      };

      console.log('Dados da venda a serem enviados:', vendaData);

      const response = await axios.post('https://api.celereapp.com.br/cad/vendas/', vendaData);
      if (response.data && response.data.status === 'success') {
        const vendaId = response.data.data.id;
        console.log('Venda registrada, ID:', vendaId);

        // Agora, registrar os itens da venda
        await registerSaleItems(vendaId);

        setIsModalVisible(true);
      } else {
        showAlert('Erro', 'Falha ao registrar a venda. Verifique os dados e tente novamente.');
        console.error('Erro ao registrar venda:', response.data);
      }

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
  
      const productItems = cartItems.map((product, index) => {
        if (!product.name || !product.quantity || !product.priceVenda || !product.priceCusto) {
          console.error(`Erro no item ${index + 1}: Dados incompletos ou inválidos`, product);
          showAlert('Erro', `Dados incompletos no item ${index + 1}`);
          return null;
        }
  
        // Log do produto que está sendo mapeado para envio
        console.log('Produto mapeado para envio:', product);
  
        return {
          empresa_id: empresaId,
          venda_id: vendaId,
          nome: product.name,
          quantidade: parseInt(product.quantity),
          preco_unitario_compra: parseFloat(product.priceCusto).toFixed(2),
          preco_unitario_venda: parseFloat(product.priceVenda).toFixed(2),
          valor_desconto: discountType === 'R$' ? parseFloat(discountValue) || 0 : 0,
          percentual_desconto: discountType === '%' ? parseFloat(discountValue) || 0 : 0,
        };
      }).filter(item => item !== null);
  
      if (productItems.length === 0) {
        showAlert('Erro', 'Nenhum item válido para registrar.');
        return;
      }
  
      // Log dos itens de venda que serão enviados
      console.log('Itens de venda a serem enviados:', productItems);
  
      const productPromises = productItems.map(item => 
        axios.post('https://api.celereapp.com.br/cad/itens_venda/', item)
      );
  
      const responses = await Promise.all(productPromises);
  
      // Log das respostas da API
      responses.forEach(response => {
        console.log('Resposta da API para item de venda:', response.data);
      });
  
      showAlert('Sucesso', 'Itens da venda registrados com sucesso!');
  
    } catch (error) {
      // Log detalhado do erro
      if (error.response) {
        console.error('Erro ao registrar itens da venda:', error.response.data);
      } else {
        console.error('Erro ao registrar itens da venda:', error.message);
      }
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
  return value > 0 ? `R$ ${value.toFixed(2)}` : 'R$ 0,00';
};


const handleNewRegistered = () => {
  resetFields();
  setIsModalVisible(false);
  navigation.navigate('SingleSale');
};

const handleOpenInvoiceModal = () => {
  setIsInvoiceModalVisible(true);
};

const handleCloseModal = () => {
  setIsModalVisible(false);
};

const handleCloseInvoiceModal = () => {
  setIsInvoiceModalVisible(false);
};

const resetFields = () => {
  setCartItems([{ id: 1, quantity: 0, priceVenda: 0, priceCusto: 0 }]);
  setDiscountValue('');
  setTotalBruto(0);
  setTotalLiquido(0);
  setSelectedClient(null);
};

const updatePrice = (index, value, field) => {
  if (cartItems[index]) {
    const updatedItems = [...cartItems];
    updatedItems[index][field] = parseFloat(value) || 0;
    setCartItems(updatedItems);
  } else {
    console.error('Erro: Item não encontrado no índice', index);
  }
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
        />
        <TextInput
          placeholder="Preço de custo (R$)"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => updatePrice(index, value, 'priceCusto')}
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
            value={item.priceVenda.toString()}
            onChangeText={(value) => updatePrice(index, value, 'priceVenda')}
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
          <TouchableOpacity style={styles.invoiceOptionButtonRecibo} onPress={() => console.log("Emitir Recibo")}>
            <Text style={styles.invoiceOptionTextRecibo}>Recibo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.invoiceOptionButtonNotaFiscal} onPress={() => console.log("Emitir Nota Fiscal")}>
            <Text style={styles.invoiceOptionTextNotaFiscal}>Nota Fiscal</Text>
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
