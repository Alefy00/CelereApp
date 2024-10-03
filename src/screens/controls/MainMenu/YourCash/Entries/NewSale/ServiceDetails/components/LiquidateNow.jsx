/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import CashIcon from "../../../../../../../../assets/images/svg/iconMoney.svg";
import CreditCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import DebitCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from '../../../../../../../../constants';
import axios from 'axios';

const PAYMENT_METHODS_API = 'https://api.celereapp.com.br/cad/metodos_pagamentos/';
const REGISTER_SALE_API = 'https://api.celereapp.com.br/cad/vendas/';
const REGISTER_ITEM_SALE_API = 'https://api.celereapp.com.br/cad/itens_venda/';

const LiquidateNow = ({ navigation, route, clients }) => {
  const { services: receivedServices = [], products: receivedProducts = [], totalPrice: initialTotalPrice } = route.params;

  // Adicionando useState para controlar produtos e serviços
  const [services, setServices] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [price, setPrice] = useState(0);
  const [discountType, setDiscountType] = useState('%');
  const [discount, setDiscount] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentType, setPaymentType] = useState('À vista');
  const [installments, setInstallments] = useState(1);
  const [liquidValue, setLiquidValue] = useState(initialTotalPrice || 0);
  const [isPaymentDropdownVisible, setIsPaymentDropdownVisible] = useState(false);
  const [additionalCosts, setAdditionalCosts] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [installmentValue, setInstallmentValue] = useState(0);
  const [saleId, setSaleId] = useState(null);

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
  
      const fetchPaymentMethods = useCallback(async () => {
        try {
          const response = await axios.get(`${PAYMENT_METHODS_API}?empresa=1`);
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
          case 'cartao de credito':
            return <CreditCardIcon width={20} height={20} />;
          case 'debito':
            return <DebitCardIcon width={20} height={20} />;
          default:
            return <Icon name="card" size={20} color="black" />;
        }
      };
      


  useEffect(() => {
    const date = new Date();
    const formattedDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setCurrentDate(formattedDate);
  }, []);
  const paymentOptions = ['2x', '3x', '4x', '5x', '6x', '7x'];

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

// Função para registrar venda e itens (produtos e serviços)
const handleRegisterSale = async () => {
  try {
    const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
    if (!empresaId) return;

    const currentDate = new Date().toISOString().split('T')[0]; // Data atual do dispositivo
    const totalValue = liquidValue; // Valor bruto a receber após desconto

    if (!selectedClient || !selectedClient.id) {
      Alert.alert("Erro", "Selecione um cliente para registrar a venda.");
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert("Erro", "Selecione uma forma de pagamento.");
      return;
    }

    // Registra a venda primeiro
    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient.id, // Cliente selecionado
      dt_pagamento: currentDate, // Data de pagamento (data atual)
      percentual_desconto: parseFloat(discount) || 0, // Percentual de desconto sempre como número válido
      tipo_pagamento_venda: selectedPaymentMethod, // ID da forma de pagamento selecionada
      valor_total_venda: totalValue // Valor bruto a receber
    };

    const vendaResponse = await axios.post(REGISTER_SALE_API, vendaData);
    const vendaId = vendaResponse.data.data.id;

      // Armazene o ID da venda
      setSaleId(vendaId);

    // Agora registra os serviços da venda
    const serviceItems = services.map(service => ({
      empresa_id: empresaId,
      venda_id: vendaId, // ID da venda registrada
      servico_id: service.id, // ID do serviço
      quantidade: service.amount || 1, // Quantidade sempre deve ser válida
      percentual_desconto: !isNaN(parseFloat(discount)) ? (discountType === '%' ? parseFloat(discount) : 0) : 0, // Percentual de desconto sempre como número válido
      valor_desconto: !isNaN(parseFloat(discount)) ? (discountType === 'R$' ? parseFloat(discount) : 0) : 0, // Valor de desconto sempre como número válido
      gastos_envolvidos: parseFloat(additionalCosts || 0) // Gastos adicionais
    }));

    // Registra os produtos da venda (se houver)
    const productItems = products.map(product => ({
      empresa_id: empresaId,
      venda_id: vendaId, // ID da venda registrada
      produto_id: product.id, // ID do produto
      quantidade: product.amount || 1, // Quantidade sempre deve ser válida
      percentual_desconto: !isNaN(parseFloat(discount)) ? (discountType === '%' ? parseFloat(discount) : 0) : 0, // Percentual de desconto sempre como número válido
      valor_desconto: !isNaN(parseFloat(discount)) ? (discountType === 'R$' ? parseFloat(discount) : 0) : 0 // Valor de desconto sempre como número válido
    }));

    // Cria as promessas de registro para serviços e produtos
    const servicePromises = serviceItems.map(item =>
      axios.post(REGISTER_ITEM_SALE_API, item)
    );

    const productPromises = productItems.map(item =>
      axios.post(REGISTER_ITEM_SALE_API, item)
    );

    // Executa todas as promessas de registro (serviços e produtos)
    await Promise.all([...servicePromises, ...productPromises]);

    // Exibe mensagem de sucesso e navega
    setIsModalVisible(true);

 

  } catch (error) {
    console.error('Erro ao registrar venda:', error.response ? error.response.data : error);
    Alert.alert('Erro', 'Ocorreu um erro ao registrar a venda e os itens.');
  }
};


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
    setInstallments(parseInt(option));  // Define o número de parcelas com base na escolha
    setIsPaymentDropdownVisible(false);
  };

// Função para calcular o total dos produtos e serviços, com aplicação do desconto
const calculateTotal = useCallback(() => {
  const totalProductPrice = products.reduce((sum, product) => sum + ((product.preco_venda || 0) * (product.amount || 1)), 0);
  const totalServicePrice = services.reduce((sum, service) => sum + ((service.preco_venda || 0) * (service.amount || 1)), 0);
  let total = totalProductPrice + totalServicePrice + parseFloat(additionalCosts || 0);

  if (discountType === '%' && !isNaN(discount) && discount !== '') {
    total -= (total * (parseFloat(discount) / 100));
  } else if (discountType === 'R$' && !isNaN(discount) && discount !== '') {
    total -= parseFloat(discount || 0);
  }

  setLiquidValue(total);

  // Calcular o valor por parcela
  if (installments > 1) {
    setInstallmentValue((total / installments).toFixed(2));
  } else {
    setInstallmentValue(total.toFixed(2));  // Se for à vista, valor total é o próprio valor
  }
}, [products, services, discount, discountType, additionalCosts, installments]);

useEffect(() => {
  calculateTotal();
}, [products, services, discount, calculateTotal]);



  const handleConfirm = () => {
    navigation.navigate('NewRegisteredSale', { clearCart: true });
  };

  const handleCloseModal = () => {
      setIsModalVisible(false);
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
        Data da Venda: <Text style={styles.boldText}>{currentDate}</Text>
      </Text>

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
                    Unid. de medida: {service.unidade_medida || 'Por manutenção'}
                  </Text>
                  <Text style={styles.cartItemPrice}>
                    Preço unitário: R$ {service.preco_venda ? parseFloat(service.preco_venda).toFixed(2) : 'Defina o preço'}
                  </Text>
                  <Text style={styles.cartItemSubtitleMedida}>
                    Quantidade: {service.amount}
                  </Text>
                </View>
                  <Text style={styles.cartItemTotal}>
                    R$ {(service.preco_venda * service.amount).toFixed(2)}
                  </Text>

                  {!service.preco_venda || parseFloat(service.preco_venda) === 0 ? (
                    <TextInput
                      style={styles.priceInput}
                      keyboardType="numeric"
                      value={price ? price.toFixed(2) : ''}
                      onChangeText={text => setPrice(parseFloat(text) || 0)}
                      placeholder="Preço de venda (R$)"
                    />
                  ) : null}
              </View>
            ))}
          </View>
        </>
      )}

{products.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Produtos</Text>
          <View style={styles.cartSection}>
            {products.map((product, index) => (
              <View key={index} style={styles.cartItem}>
                <Image source={{ uri: product.imagem }} style={styles.productImage} />
                <View style={styles.containerServiço}>
                  <Text style={styles.cartItemTitle}>{product.nome}</Text>
                  <Text style={styles.cartItemPrice}>
                    Preço unitário: R$ {product.preco_venda ? parseFloat(product.preco_venda).toFixed(2) : 'Defina o preço'}
                  </Text>
                  <Text style={styles.cartItemSubtitleMedida}>
                    Quantidade: {product.amount}
                  </Text>
                </View>
                <Text style={styles.cartItemTotal}>
                  R$ {(product.preco_venda * product.amount).toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
      <TextInput
        style={styles.additionalCostsInput}
        placeholder="Adicionar gastos envolvidos se houver (R$) - Opcional"
        keyboardType="numeric"
        value={additionalCosts}
        onChangeText={setAdditionalCosts}
      />
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

      {/* Botão de Adicionar Produtos */}
      <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addProductButtonText}>Adicionar produtos do estoque</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
      <FlatList
        horizontal
        data={paymentMethods}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.paymentButtonforma, selectedPaymentMethod === item.id && styles.selectedPaymentButton]}
            onPress={() => setSelectedPaymentMethod(item.id)}
          >
            {getPaymentIcon(item.nome)}
            <Text style={styles.paymentButtonText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
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
                  {installments}x de R${installmentValue}
                </Text>
              </View>
            )}


      {/* Desabilitar CelerePay e Maquininha */}
      <View style={styles.paymentSelectionContainer}>
        <TouchableOpacity
          style={[styles.paymentOptionButtonDisabled]}
          disabled={true}
        >
          <Text style={styles.paymentOptionTextDisabled}>CélerePay (Indisponível)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.paymentOptionButtonDisabled]}
          disabled={true}
        >
          <Text style={styles.paymentOptionTextDisabled}>Maquininha (Indisponível)</Text>
        </TouchableOpacity>
      </View>


      {/* Campos para mostrar Valor Bruto e Valor Líquido */}
      <View style={styles.valueSummaryContainer}>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Bruto</Text>
          <Text style={styles.valueAmount2}>
            R$ {(products.reduce((sum, product) => sum + (product.preco_venda * product.amount), 0) + services.reduce((sum, service) => sum + (service.preco_venda * service.amount), 0) + parseFloat(additionalCosts || 0)).toFixed(2)}
          </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Taxa do cartão </Text>
          <Text style={styles.valueAmountTaxa}>--</Text>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Líquido a Receber</Text>
          <Text style={styles.valueAmount}>R$ {liquidValue.toFixed(2)}</Text>
        </View>
      </View>

      {/* Botão de Concluir Venda */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.concludeButton} onPress={handleRegisterSale}>
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
                        <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleConfirm}>
                            <Icon name="cart" size={20} color={COLORS.black} />
                            <Text style={styles.modalPrimaryButtonText}>Registrar outra venda</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalPrimaryButton2} onPress={handleOpenInvoiceModal}>
                            <Icon name="cart" size={20} color={COLORS.black} />
                            <Text style={styles.modalPrimaryButtonText}>Emitir NF-e ou Recibo</Text>
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
                            navigation.navigate('ReceiptScreen', { saleId: saleId });
                        }}>
                            <Text style={styles.invoiceOptionTextRecibo}>Recibo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.invoiceOptionButtonNotaFiscal} onPress={() => console.log("Emitir Nota Fiscal")} disabled={true}>
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
