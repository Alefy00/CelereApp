/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import CashIcon from "../../../../../../../../assets/images/svg/iconMoney.svg";
import CreditCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import DebitCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import { COLORS } from '../../../../../../../../constants';

const LiquidarAgora = ({
  cartItems,
  setCartItems,
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
  paymentMethod,
  setPaymentMethod,
  paymentMethod2,
  setPaymentMethod2,
  totalBruto,
  setTotalBruto,
  totalLiquido,
  setTotalLiquido,
  taxaCartao,
  navigation
}) => {
  const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);
  const [paymentType, setPaymentType] = useState('À vista'); // Default para "À vista"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const paymentMethods = [
    { id: 'PIX', label: 'PIX', icon: <PixIcon width={20} height={20} /> },
    { id: 'Dinheiro', label: 'Dinheiro', icon: <CashIcon width={20} height={20} /> },
    { id: 'Cartão de Crédito', label: 'Cartão de Crédito', icon: <CreditCardIcon width={20} height={20} /> },
    { id: 'Cartão de Débito', label: 'Cartão de Débito', icon: <DebitCardIcon width={20} height={20} /> }
  ];

  const paymentOptions = ['À vista', '2x', '3x', '4x'];


  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      const itemTotal = item.priceVenda * item.quantity;
      return sum + itemTotal;
    }, 0);
    setTotalBruto(total);
  }, [cartItems, setTotalBruto]);

  useEffect(() => {
    let discount = 0;
    if (discountValue) {
      if (discountType === '%') {
        discount = (totalBruto * parseFloat(discountValue)) / 100;
      } else if (discountType === 'R$') {
        discount = parseFloat(discountValue);
      }
    }

    const totalAfterDiscount = totalBruto - (isNaN(discount) ? 0 : discount);
    const taxa = totalAfterDiscount * taxaCartao;
    const totalLiquido = totalAfterDiscount - taxa;

    setTotalLiquido(totalLiquido.toFixed(2));
  }, [totalBruto, discountValue, discountType, taxaCartao, setTotalLiquido]);

  const addNewCartItem = () => {
    const newCartItem = {
      id: cartItems.length + 1,
      quantity: 0,
      priceVenda: 0,
      priceCusto: 0,
    };
    setCartItems([...cartItems, newCartItem]);
  };

  const removeCartItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

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
  };

  const updatePrice = (id, price, type) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [type]: parseFloat(price) || 0,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const togglePaymentDropdown = () => {
    setIsPaymentDropdownVisible(!isPaymentDropdownVisible);
  };

  const selectPaymentOption = (option) => {
    setPaymentType(option);
    setIsPaymentDropdownVisible(false);
  };

  const formatCurrency = (value) => {
    return value > 0 ? `R$ ${value.toFixed(2)}` : 'R$ 0,00';
  };
  const handleNewRegistered = () => {
    resetFields();  // Limpa os campos
    setIsModalVisible(false);  // Fecha o modal
    navigation.navigate('SingleSale');  // Navega para a tela de venda
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
const handleConfirm = () => {
  setIsModalVisible(true);
};
const resetFields = () => {
  // Zera o carrinho para começar uma nova venda
  setCartItems([{ id: 1, quantity: 0, priceVenda: 0, priceCusto: 0 }]);
  setDiscountValue('');
  setTotalBruto(0);
  setTotalLiquido(0);
  setPaymentMethod('PIX');
  setPaymentMethod2('CelerePay');
  setPaymentType('À vista');  // Define o tipo de pagamento para "À vista"
  setSelectedClient(null);
};
const clients = [
  { id: 1, name: 'Cliente 1' },
  { id: 2, name: 'Cliente 2' },
  { id: 3, name: 'Cliente 3' },
  { id: 4, name: 'Cliente 4' },
  { id: 5, name: 'Cliente 5' },
  { id: 6, name: 'Cliente 6' },
];
const toggleDropdown = () => {
  setDropdownVisible(!isDropdownVisible);
};
const navigateToAddClient = () => {
  navigation.navigate('IncludeClient');
};
const selectClient = (client) => {
  setSelectedClient(client);
  setDropdownVisible(false);
};


  return (
    <ScrollView>
                         {/* Campo para associar cliente */}
                         <View style={styles.clientContainer}>
                <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
                    <Text style={styles.clientText}>
                        {selectedClient ? selectedClient.name : "Associar a um cliente..."}
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
                                <Text style={styles.dropdownItemText}>{client.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
      <Text style={styles.cartTitle}>Carrinho</Text>
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeCartItem(item.id)}>
            <Icon name="close" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.itemLabel}>Produto/Serviço #{item.id}</Text>
          <TextInput
            placeholder="Nome do produto/serviço"
            style={styles.input}
          />
          <TextInput
            placeholder="Preço de custo (R$)"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => updatePrice(item.id, value, 'priceCusto')}
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
              onChangeText={(value) => updatePrice(item.id, value, 'priceVenda')}
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
            style={[styles.paymentButton, paymentMethod === item.id && styles.selectedPaymentButton]}
            onPress={() => setPaymentMethod(item.id)}
          >
            {item.icon}
            <Text style={styles.paymentButtonText}>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* Botões de seleção: CélerePay e Maquininha */}
      <View style={styles.paymentSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            paymentMethod2 === 'CelerePay' && styles.selectedPaymentOptionButton,
          ]}
          onPress={() => setPaymentMethod2('CelerePay')}
        >
          <Text style={paymentMethod2 === 'CelerePay' ? styles.selectedPaymentOptionText : styles.paymentOptionText}>
            CélerePay
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            paymentMethod2 === 'Maquininha' && styles.selectedPaymentOptionButton,
          ]}
          onPress={() => setPaymentMethod2('Maquininha')}
        >
          <Text style={paymentMethod2 === 'Maquininha' ? styles.selectedPaymentOptionText : styles.paymentOptionText}>
            Maquininha
          </Text>
        </TouchableOpacity>
      </View>

      {/* Seleção de tipo de pagamento */}
      <TouchableOpacity style={styles.clientPicker} onPress={togglePaymentDropdown}>
        <Text style={styles.clientText}>{paymentType}</Text>
        <Icon name={isPaymentDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
      </TouchableOpacity>

      {/* Dropdown de opções de pagamento */}
      {isPaymentDropdownVisible && (
        <View style={[styles.dropdownContainerPag, { maxHeight: 150 }]}>
          <ScrollView nestedScrollEnabled={true}>
            {paymentOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => selectPaymentOption(option)}
              >
                <Text style={styles.dropdownItemText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Seção de totais */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Valor Bruto</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalBruto)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Taxa do cartão (1%)</Text>
          <Text style={[styles.totalValue, { color: COLORS.red }]}>{formatCurrency(totalBruto * 0.01)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Valor líquido a receber amanhã</Text>
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
