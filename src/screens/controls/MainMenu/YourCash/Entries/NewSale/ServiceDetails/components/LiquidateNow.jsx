/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import { COLORS } from '../../../../../../../../constants';

const LiquidateNow = ({ navigation, route }) => {
  const { services: receivedServices = [], products: receivedProducts = [], totalPrice: initialTotalPrice } = route.params;

  // Adicionando useState para controlar produtos e serviços
  const [services, setServices] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [price, setPrice] = useState(0);
  const [discountType, setDiscountType] = useState('%');
  const [discount, setDiscount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('PIX');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentMethod2, setPaymentMethod2] = useState('CelerePay');
  const [paymentType, setPaymentType] = useState('À vista');
  const [installments, setInstallments] = useState(1);
  const [taxRate, setTaxRate] = useState(0.01);
  const [liquidValue, setLiquidValue] = useState(initialTotalPrice || 0);
  const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);
  const [additionalCosts, setAdditionalCosts] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentDate, setCurrentDate] = useState('');
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);

  const clients = [
      { id: 1, name: 'Cliente 1' },
      { id: 2, name: 'Cliente 2' },
      { id: 3, name: 'Cliente 3' },
      { id: 4, name: 'Cliente 4' },
      { id: 5, name: 'Cliente 5' },
      { id: 6, name: 'Cliente 6' },
  ];


  useEffect(() => {
    const date = new Date();
    const formattedDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setCurrentDate(formattedDate);
  }, []);
  const paymentOptions = ['À vista', '2x', '3x', '4x'];

  useEffect(() => {
      // Separar produtos de serviços
      const produtosFiltrados = [];
      const servicosFiltrados = [];

      receivedServices.forEach(item => {
          if (item.categoria && item.categoria === 'Serviços') {
              servicosFiltrados.push(item);
          } else {
              produtosFiltrados.push(item);
          }
      });

      setProducts(produtosFiltrados);
      setServices(servicosFiltrados);
  }, [receivedServices]);

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

  const togglePaymentDropdown = () => {
      setIsPaymentDropdownVisible(!isPaymentDropdownVisible);
  };

  const selectPaymentOption = (option) => {
      setPaymentType(option);
      setInstallments(option === 'À vista' ? 1 : parseInt(option));
      setIsPaymentDropdownVisible(false);
  };

  const calculateTotal = useCallback(() => {
      const totalProductPrice = products.reduce((sum, product) => sum + product.total, 0);
      const totalServicePrice = services.reduce((sum, service) => sum + service.total, 0);
      const total = totalProductPrice + totalServicePrice - parseFloat(discount || 0);
      setLiquidValue(total);
  }, [products, services, discount]);

  useEffect(() => {
      calculateTotal();
  }, [products, services, discount, calculateTotal]);

  const handleConfirm = () => {
      setIsModalVisible(true);
  };

  const handleCloseModal = () => {
      setIsModalVisible(false);
  };

  const handleNewRegistered = () => {
    // Reseta o carrinho, produtos, serviços, etc.
    resetCart();  // Método que limpa o estado do carrinho
  
    // Fecha o modal e navega para a tela de nova venda
    setIsModalVisible(false);
    navigation.navigate('NewRegisteredSale');
  };
  
  // Adiciona uma função que reseta o carrinho
const resetCart = () => {
setProducts([]);
setServices([]);
};

  const handleAddProduct = () => {
      navigation.navigate('NewRegisteredSale');
  };

  const handleOpenInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
};

const handleCloseInvoiceModal = () => {
    setIsInvoiceModalVisible(false);
};
  
    return (
        <ScrollView style={styles.containerBase}>
            <Text style={styles.title}>Detalhes da venda</Text>
            <Text style={styles.dateText2}>
                Data da Venda: <Text style={styles.boldText}><Text style={styles.saleDate}><Text style={styles.saleDateValue}>{currentDate}</Text></Text></Text>
            </Text>

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

{/* Exibe os serviços separadamente */}
{services.length > 0 && (
  <>
    <Text style={styles.sectionTitle}>Serviços</Text>
    <View style={styles.cartSection}>
      {services.map((service, index) => (
        <View key={index} style={styles.cartItem}>
          <Image source={{ uri: service.imagem }} style={styles.productImage} />
          <View style={styles.containerServiço}>
            <Text style={styles.cartItemTitle}>{service.nome}</Text>
            <Text style={styles.cartItemSubtitle}>
              Unid. de medida:{'\n'} {service.unidade_medida || 'Por manutenção'}
            </Text>

          </View>
        </View>
      ))}

      {/* Campos de Quantidade, Preço de venda, Adicionar gastos */}
      <View style={styles.quantitySection}>
        <Text style={styles.quantityLabel}>Qtd.</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => setQuantity(prev => Math.max(prev - 1, 1))} style={styles.quantBottom}>
            <Icon name="remove" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={() => setQuantity(prev => prev + 1)} style={styles.quantBottom}>
            <Icon name="add" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.priceInput}
          keyboardType="numeric"
          value={(price ? price.toFixed(2) : '')}
          onChangeText={text => setPrice(parseFloat(text) || 0)}
          placeholder="Preço de venda (R$)"
        />
      </View>

      <TextInput
        style={styles.additionalCostsInput}
        placeholder="Adicionar gastos envolvidos se houver (R$) - Opcional"
        keyboardType="numeric"
        value={additionalCosts}
        onChangeText={setAdditionalCosts}
        />
        {/* Exibe os produtos separadamente */}
        {products.length > 0 && (
            <>
                <View style={styles.cartContainer}>
                <Text style={styles.sectionTitle}>Produtos</Text>
                    {products.map((product, index) => (
                        <View key={index} style={styles.productDetail}>
                            <Image source={{ uri: product.imagem }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productText}>{product.nome}</Text>
                                <Text style={styles.productAmount}>Quantidade: {product.amount}</Text>
                            </View>
                            <Text style={styles.productTotal}>
                                R$ {product.total.toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>
            </>
        )}

      {/* Descontos */}
      <Text style={styles.Desconto}>Descontos</Text>
      <View style={styles.discountSection}>
        <TouchableOpacity
          style={[styles.discountButton, discountType === '%' && styles.activeDiscountButton]}
          onPress={() => setDiscountType('%')}
        >
          <Text style={styles.discountButtonText}>%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.discountButton, discountType === 'R$' && styles.activeDiscountButton]}
          onPress={() => setDiscountType('R$')}
        >
          <Text style={styles.discountButtonText}>R$</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.discountInput}
          placeholder={`Inserir Desconto em ${discountType}`}
          keyboardType="numeric"
          value={discount}
          onChangeText={setDiscount}
        />
      </View>
    </View>
  </>
)}




            {/* Botão de Adicionar Produtos */}
            <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
                <Icon name="add" size={24} color="black" />
                <Text style={styles.addProductButtonText}>Adicionar produtos do estoque</Text>
            </TouchableOpacity>

            {/* Descontos */}
            <Text style={styles.Desconto}>Descontos</Text>
            <View style={styles.discountSection}>
                <TouchableOpacity
                    style={[styles.discountButton, discountType === '%' && styles.activeDiscountButton]}
                    onPress={() => setDiscountType('%')}
                >
                    <Text style={styles.discountButtonText}>%</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.discountButton, discountType === 'R$' && styles.activeDiscountButton]}
                    onPress={() => setDiscountType('R$')}
                >
                    <Text style={styles.discountButtonText}>R$</Text>
                </TouchableOpacity>
                <TextInput
                    style={styles.discountInput}
                    placeholder={`Inserir Desconto em ${discountType}`}
                    keyboardType="numeric"
                    value={discount}
                    onChangeText={setDiscount}
                />
            </View>

            {/* Forma de Pagamento */}
            <Text style={styles.paymentTitle}>Forma de Pagamento</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.paymentSection}>
                    <TouchableOpacity
                        style={[styles.paymentButton, selectedPayment === 'PIX' && styles.paymentButtonSelected]}
                        onPress={() => setSelectedPayment('PIX')}
                    >
                        <PixIcon name="cash-outline" size={20} color={selectedPayment === 'PIX' ? 'black' : 'grey'} />
                        <Text style={styles.paymentButtonText}>PIX</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentButton, selectedPayment === 'Dinheiro' && styles.paymentButtonSelected]}
                        onPress={() => setSelectedPayment('Dinheiro')}
                    >
                        <Icon name="cash" size={20} color={selectedPayment === 'Dinheiro' ? 'black' : 'grey'} />
                        <Text style={styles.paymentButtonText}>Dinheiro</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentButton, selectedPayment === 'Cartão de Crédito' && styles.paymentButtonSelected]}
                        onPress={() => setSelectedPayment('Cartão de Crédito')}
                    >
                        <Icon name="card-outline" size={20} color={selectedPayment === 'Cartão de Crédito' ? 'black' : 'grey'} />
                        <Text style={styles.paymentButtonText}>Cartão de Crédito</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.paymentButton, selectedPayment === 'Cartão de Débito' && styles.paymentButtonSelected]}
                        onPress={() => setSelectedPayment('Cartão de Débito')}
                    >
                        <Icon name="card" size={20} color={selectedPayment === 'Cartão de Débito' ? 'black' : 'grey'} />
                        <Text style={styles.paymentButtonText}>Cartão de Débito</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
                  {/* Botões de seleção: CélerePay e Maquininha */}
      <View style={styles.paymentSelectionContainer}>
        <TouchableOpacity
          style={[
            styles.paymentOptionButton,
            paymentMethod2 === 'CelerePay' && styles.selectedPaymentOptionButton
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
            paymentMethod2 === 'Maquininha' && styles.selectedPaymentOptionButton
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

      {/* Lista de opções para tipo de pagamento com scroll interno */}
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


            {/* Campos para mostrar Valor Bruto, Taxa, e Valor Líquido */}
            <View style={styles.valueSummaryContainer}>
                <View style={styles.valueItem}>
                    <Text style={styles.valueLabel}>Valor Bruto</Text>
                    <Text style={styles.valueAmount2}>
                        R$ {(products.reduce((sum, product) => sum + product.total, 0) + services.reduce((sum, service) => sum + service.total, 0)).toFixed(2)}
                    </Text>
                </View>

                <View style={styles.valueItem}>
                    <Text style={styles.valueLabel}>Taxa do cartão ({(taxRate * 100).toFixed(0)}%)</Text>
                    <Text style={styles.valueAmountTaxa}>R$ {(liquidValue * taxRate).toFixed(2)}</Text>
                </View>

                <View style={styles.valueItem}>
                    <Text style={styles.valueLabel}>Valor Líquido a Receber Amanhã</Text>
                    <Text style={styles.valueAmount}>R$ {liquidValue.toFixed(2)}</Text>
                </View>
            </View>

            {/* Botão de Concluir Venda */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.concludeButton} onPress={handleConfirm}>
                    <Icon name="checkmark-circle" size={24} color="black" />
                    <Text style={styles.concludeButtonText}>Concluir esta venda</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de confirmação */}
            <Modal transparent={true} animationType="slide" visible={isModalVisible} onRequestClose={handleCloseModal}>
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

export default LiquidateNow;
