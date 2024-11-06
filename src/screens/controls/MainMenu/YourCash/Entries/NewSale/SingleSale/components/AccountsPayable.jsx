/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomCalendar from '../../../../../../../../components/CustomCalendar';
import { API_BASE_URL } from '../../../../../../../../services/apiConfig';
import mixpanel from '../../../../../../../../services/mixpanelClient';

// Função para mostrar alertas
const showAlert = (title, message) => {
  Alert.alert(title, message);
};

const AccountsPayable = ({  navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [paymentOption, setPaymentOption] = useState('Fiado'); // Default
  const [clientes, setClientes] = useState([]);
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [totalBruto, setTotalBruto] = useState(0);
  const [totalLiquido, setTotalLiquido] = useState(0);
  const [cartItems, setCartItems] = useState([{ id: 1, name: '', priceVenda: 0, priceCusto: 0, quantity: 1 }]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

   
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

const calculateTotals = useCallback(() => {
  const totalBruto = cartItems.reduce((sum, item) => sum + (item.priceVenda * item.quantity), 0);

  let discount = 0;
  
  if (discountType === '%') {
    discount = (totalBruto * parseFloat(discountValue)) / 100;
  } else if (discountType === 'R$') {
    discount = parseFloat(discountValue);
  }

  if (isNaN(discount) || discount > totalBruto) {
    discount = 0;
  }

  const totalLiquido = totalBruto - discount;

  setTotalLiquido(totalLiquido);
}, [cartItems, discountType, discountValue]);

useEffect(() => {
  calculateTotals();
}, [cartItems, discountValue, discountType, calculateTotals]);

const updateQuantity = (id, increment) => {
  const updatedItems = cartItems.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        quantity: item.quantity + increment >= 0 ? item.quantity + increment : 0,
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

const updatePrice = (index, value, field) => {
  const numericValue = parseFloat(value.replace(/[^\d]/g, '')) / 100; // Remove todos os caracteres não numéricos e divide por 100 para manter precisão
  const updatedItems = [...cartItems];
  updatedItems[index][field] = isNaN(numericValue) ? 0 : numericValue; // Atualiza o estado com o valor numérico
  setCartItems(updatedItems);
};

const registerSale = async () => {
  try {
    const empresaId = await getEmpresaId();

    if (!selectedClient || !selectedClient.id) {
      showAlert("Erro", "Selecione um cliente para registrar a venda.");
      return;
    }

    if (totalLiquido <= 0) {
      showAlert('Erro', 'O valor total da venda não pode ser zero ou negativo.');
      return;
    }

    // Formatação da data de vencimento inserida pelo usuário
    const formattedPaymentDate = paymentDate.toISOString().split('T')[0];

    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient.id,
      dt_pagamento: null,  // O pagamento pode não ocorrer imediatamente
      dt_prevista_pagamento: formattedPaymentDate,  // Usa a data de vencimento inserida pelo usuário
      valor_total_custo_venda: parseFloat(totalLiquido).toFixed(2),
      valor_total_venda: parseFloat(totalLiquido).toFixed(2),
      percentual_desconto: parseFloat(discountValue) || 0,
    };

    console.log('Dados da venda a serem enviados:', vendaData);

    const response = await axios.post(`${API_BASE_URL}/cad/vendas/`, vendaData);
    if (response.data && response.data.status === 'success') {
      const vendaId = response.data.data.id;
      console.log('Venda registrada, ID:', vendaId);

      // Agora, registrar os itens da venda
      await registerSaleItems(vendaId);

      setIsModalVisible(true);
      // Evento Mixpanel - Captura a conclusão da venda
      mixpanel.track('Venda Concluída', {
        vendaId: vendaId,
        valorTotal: totalLiquido,
        cliente: selectedClient.nome,
      });
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
        axios.post(`${API_BASE_URL}/cad/itens_venda/`, item)
      );
  
      const responses = await Promise.all(productPromises);
  
      // Log das respostas da API
      responses.forEach(response => {
        console.log('Resposta da API para item de venda:', response.data);
      });
  
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

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const handleNewRegistered = () => {
    resetFields();  // Limpa os campos
    setIsModalVisible(false);  // Fecha o modal
    navigation.navigate('SingleSale');  // Navega para a tela de venda

      // Evento Mixpanel - Captura quando o usuário escolhe registrar outra venda
  mixpanel.track('Registrar Outra Venda');
  };

const handleConfirm = () => {
  registerSale();
};
const resetFields = () => {
  setCartItems([{ id: 1, quantity: 1, priceVenda: 0, priceCusto: 0 }]);
  setDiscountValue('');
  setTotalBruto(0);
  setTotalLiquido(0);
  setSelectedClient(null);
};

const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
};
const navigateToAddClient = () => {
    navigation.navigate('IncludeClient');
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

  const handleDayPress = (day) => {
    setPaymentDate(new Date(`${day.dateString}`)); // Atualiza a data selecionada

      // Evento Mixpanel - Captura a alteração da data de vencimento
  mixpanel.track('Data de Vencimento Alterada', {
    novaData: day.dateString,
  });
  };

  const handleShowCalendar = () => {
    setIsCalendarVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('MainTab')
  };

  return (
    <ScrollView>
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
          maxLength={18}
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
        onChangeText={setDiscountValue} // Atualiza o valor do desconto
        style={styles.discountInput}
        keyboardType="numeric"
      />
    </View>

            {/* Toggle de Forma de Pagamento */}
            <Text style={styles.paymentTitle}>Forma de Pagamento</Text>
      <View style={styles.paymentToggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButtonfiado, paymentOption === 'Fiado' && styles.activeToggleButton]}
          onPress={() => setPaymentOption('Fiado')}
        >
          <Text style={paymentOption === 'Fiado' ? styles.activeToggleText : styles.inactiveToggleText}>
            Fiado
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, paymentOption === 'Boleto' && styles.activeToggleButton]}
          onPress={() => setPaymentOption('Boleto')}
        >
          <Text style={paymentOption === 'Boleto' ? styles.activeToggleText : styles.inactiveToggleText}>
            Boleto
          </Text>
        </TouchableOpacity>
      </View>

  {/* Exibir o valor líquido após desconto */}
  <View style={styles.totalRow}>
    <Text style={styles.totalLabel}>Valor Líquido</Text>
    <Text style={styles.totalValue}>{formatCurrency(totalLiquido)}</Text>
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
            <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
              <Icon name="arrow-back" size={20} color={COLORS.black} />
              <Text style={styles.modalBackButtonText}>Voltar ao resumo</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AccountsPayable;

