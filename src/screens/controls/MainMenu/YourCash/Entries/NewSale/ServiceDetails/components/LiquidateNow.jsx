/* eslint-disable prettier/prettier */
import React, { useCallback, useEffect, useState, } from 'react';
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
import { API_BASE_URL } from '../../../../../../../../services/apiConfig';
import mixpanel from '../../../../../../../../services/mixpanelClient';
import moment from 'moment-timezone';

const LiquidateNow = ({ navigation, route, clients }) => {
  const { services: receivedServices = [], products: receivedProducts = [], totalPrice: initialTotalPrice } = route.params;
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
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
  const [servicePrices, setServicePrices] = useState({});

  const handleServicePriceChange = (serviceId, text) => {
    let numericValue = text.replace(/\D/g, ''); // Remove caracteres não numéricos
    numericValue = (numericValue / 100).toFixed(2); // Formata para centavos
    setServicePrices(prevPrices => ({
      ...prevPrices,
      [serviceId]: numericValue,
    }));
  };
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
          case 'cartao de credito':
            return <CreditCardIcon width={20} height={20} />;
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
    const empresaId = await getEmpresaId();
    if (!empresaId) return;

    const currentDate = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');

    if (!selectedPaymentMethod) {
      Alert.alert("Erro", "Selecione uma forma de pagamento.");
      return;
    }

    // Garantir que o desconto seja um número válido
    const discountValue = parseFloat(discount) || 0;

    // Calcular o valor do desconto
    let discountAmount = 0;
    if (discountType === '%') {
      discountAmount = discountValue / 100; // Percentual
    } else if (discountType === 'R$') {
      discountAmount = discountValue; // Valor fixo
    }

    // Preparar os itens de serviço
    const serviceItems = services.map(service => {
      const servicePrice = service.preco_venda && parseFloat(service.preco_venda) !== 0
        ? parseFloat(service.preco_venda).toFixed(2)
        : parseFloat(servicePrices[service.id] || 0).toFixed(2);

      const serviceDiscount = discountType === '%'
        ? servicePrice * discountAmount
        : discountAmount / services.length; // Divide proporcionalmente

      return {
        empresa_id: empresaId,
        venda_id: null, // Será atualizado após criar a venda
        servico_id: service.id,
        quantidade: service.amount || 1,
        percentual_desconto: discountType === '%' ? discountValue : 0,
        valor_desconto: discountType === 'R$' ? serviceDiscount : 0,
        preco_unitario_venda: servicePrice,
      };
    });

    // Calcular o total dos serviços
    const totalServicePrice = serviceItems.reduce((sum, item) => {
      return sum + (parseFloat(item.preco_unitario_venda) * (item.quantidade || 1));
    }, 0);

    // Preparar os itens de produto
    const productItems = products.map(product => {
      const productPrice = parseFloat(product.preco_venda).toFixed(2);

      const productDiscount = discountType === '%'
        ? productPrice * discountAmount
        : discountAmount / products.length; // Divide proporcionalmente

      return {
        empresa_id: empresaId,
        venda_id: null, // Será atualizado após criar a venda
        produto_id: product.id,
        quantidade: product.amount || 1,
        percentual_desconto: discountType === '%' ? discountValue : 0,
        valor_desconto: discountType === 'R$' ? productDiscount : 0,
        valor_unitario: productPrice,
      };
    });

    // Calcular o total dos produtos
    const totalProductPrice = productItems.reduce((sum, item) => {
      return sum + (parseFloat(item.valor_unitario) * (item.quantidade || 1));
    }, 0);

    // Calcular o valor total da venda sem desconto aplicado
    const totalValueWithoutDiscount = totalProductPrice + totalServicePrice + parseFloat(additionalCosts || 0);

    // Calcular o valor total com desconto
    let totalValue = totalValueWithoutDiscount;
    if (discountType === '%') {
      totalValue -= totalValue * discountAmount;
    } else if (discountType === 'R$') {
      totalValue -= discountAmount;
    }

    totalValue = parseFloat(totalValue.toFixed(2));

    // Preparar os dados da venda
    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient ? selectedClient.id : null,
      dt_pagamento: currentDate,
      percentual_desconto: discountType === '%' ? discountValue : 0,
      tipo_pagamento_venda: selectedPaymentMethod,
      valor_total_venda: totalValue,
      gastos_envolvidos: parseFloat(additionalCosts || 0).toFixed(2),
    };

    console.log('Payload da venda a ser enviada:', vendaData);

    // Registrar a venda
    const vendaResponse = await axios.post(`${API_BASE_URL}/cad/vendas/`, vendaData);
    const vendaId = vendaResponse.data.data.id;
    console.log('Venda registrada com sucesso, ID da venda:', vendaId);
    setSaleId(vendaId);

    // Atualizar venda_id nos itens
    const updatedServiceItems = serviceItems.map(item => ({ ...item, venda_id: vendaId }));
    const updatedProductItems = productItems.map(item => ({ ...item, venda_id: vendaId }));

    // Registrar os itens de serviço
    const servicePromises = updatedServiceItems.map(item => axios.post(`${API_BASE_URL}/cad/itens_venda/`, item));
    // Registrar os itens de produto
    const productPromises = updatedProductItems.map(item => axios.post(`${API_BASE_URL}/cad/itens_venda/`, item));

    // Aguardar todas as requisições
    await Promise.all([...servicePromises, ...productPromises]);

    mixpanel.track('Venda Finalizada', {
      valorTotal: totalValue,
      metodoPagamento: selectedPaymentMethod,
      numeroParcelas: installments,
    });

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
  // Rastrear evento no Mixpanel
  mixpanel.track('Cliente Selecionado', {
    clienteId: client.id,
    clienteNome: client.nome,
  });
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
      // Evento Mixpanel - Captura a escolha de parcelas
  mixpanel.track('Pagamento Parcelado Selecionado', {
    numeroParcelas: option,
  });
  };

// Função para calcular o total dos produtos e serviços, com aplicação do desconto
const calculateTotal = useCallback(() => {
  // Calcular o total dos produtos
  const totalProductPrice = products.reduce((sum, product) => 
    sum + ((product.preco_venda || 0) * (product.amount || 1)), 0);

  // Calcular o total dos serviços, considerando o valor inserido manualmente, se aplicável
  const totalServicePrice = services.reduce((sum, service) => {
    const servicePrice = service.preco_venda && parseFloat(service.preco_venda) !== 0
      ? service.preco_venda
      : servicePrices[service.id] || 0; // Usa o preço inserido no input se o preço for zero
    return sum + ((parseFloat(servicePrice) || 0) * (service.amount || 1));
  }, 0);
  

  // Calcular o total geral (produtos + serviços + custos adicionais)
  let total = totalProductPrice + totalServicePrice + parseFloat(additionalCosts || 0);

  // Aplicar o desconto, se houver
  if (discountType === '%' && !isNaN(discount) && discount !== '') {
    total -= (total * (parseFloat(discount) / 100));
  } else if (discountType === 'R$' && !isNaN(discount) && discount !== '') {
    total -= parseFloat(discount || 0);
  }

  setLiquidValue(total);

  // Calcular o valor por parcela, se aplicável
  if (installments > 1) {
    setInstallmentValue((total / installments).toFixed(2));
  } else {
    setInstallmentValue(total.toFixed(2));  // Se for à vista, o valor total é o próprio valor
  }
}, [products, services, servicePrices, discount, discountType, additionalCosts, installments]);

useEffect(() => {
  calculateTotal();
}, [products, services, servicePrices, discount, calculateTotal]);

  const handleConfirm = () => {
    navigation.navigate('NewRegisteredSale', { clearCart: true });
  };

  const handleCloseModal= () => {
    setIsModalVisible(false);
    navigation.navigate('MainTab')
  };

  const handleAddProduct = () => {
      navigation.navigate('NewRegisteredSale');

      mixpanel.track('Adicionar Produtos');
  };

  const handleOpenInvoiceModal = () => {
    setIsInvoiceModalVisible(true);
};

const handleCloseInvoiceModal = () => {
    setIsInvoiceModalVisible(false);
};

const formatCurrency = (value) => {
  if (!value) return '';
  return parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};
useEffect(() => {
  // Separar produtos de serviços ao carregar
  const produtosFiltrados = [];
  const servicosFiltrados = [];
  receivedServices.forEach(item => {
    if (item.categoria === 'Serviços') {
      servicosFiltrados.push(item);
    } else {
      produtosFiltrados.push(item);
    }
  });

  setProducts(produtosFiltrados);
  setServices(servicosFiltrados);
}, [receivedServices]);
  // Função para remover produto
  const removeProduct = (productId) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  // Função para remover serviço
  const removeService = (serviceId) => {
    const updatedServices = services.filter(service => service.id !== serviceId);
    setServices(updatedServices);
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
        Preço unitário: {service.preco_venda ? formatCurrency(service.preco_venda) : 'Defina o preço'}
      </Text>
      <Text style={styles.cartItemSubtitleMedida}>
        Quantidade: {service.amount}
      </Text>
    </View>
    <View style={styles.containerRemove}>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeService(service.id)}>
        <Icon name="trash-outline" size={22} color={COLORS.red} />
      </TouchableOpacity>
      <Text style={styles.cartItemTotal}>
        {formatCurrency(service.preco_venda * service.amount)}
      </Text>
    </View>
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
                    Preço unitário: {product.preco_venda ? formatCurrency(product.preco_venda) : 'Defina o preço'}
                  </Text>
                  <Text style={styles.cartItemSubtitleMedida}>
                    Quantidade: {product.amount}
                  </Text>
                </View>
                <View style={styles.containerRemove}>
                <TouchableOpacity style={styles.removeButton} onPress={() => removeProduct(product.id)}>
                  <Icon name="trash-outline" size={22} color={COLORS.red} />
                </TouchableOpacity>
                <Text style={styles.cartItemTotalProduto}>
                  {formatCurrency(product.preco_venda * product.amount)}
                </Text>
                </View>
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

      {/* Botão de Adicionar Produtos */}
      <TouchableOpacity style={styles.addProductButton} onPress={handleAddProduct}>
        <Icon name="add" size={24} color="black" />
        <Text style={styles.addProductButtonText}>Adicionar produtos do estoque</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
      <View style={styles.ContainerFormaPagamento}>
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
                <Text style={styles.parcelamentoValue}>   {installments}x de  {formatCurrency(installmentValue)}
                </Text>
              </View>
            )}
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

      {/* Campos para mostrar Valor Bruto e Valor Líquido */}
      <View style={styles.valueSummaryContainer}>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Bruto</Text>
          <Text style={styles.valueAmount2}>
          {formatCurrency(
              products.reduce((sum, product) => sum + (product.preco_venda * product.amount), 0) +
              services.reduce((sum, service) => {
                const servicePrice = service.preco_venda && parseFloat(service.preco_venda) !== 0
                  ? service.preco_venda
                  : servicePrices[service.id] || 0;
                return sum + (parseFloat(servicePrice) * (service.amount || 1));
              }, 0) + parseFloat(additionalCosts || 0)
            )}
    </Text>
        </View>
        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Taxa do cartão </Text>
          <Text style={styles.valueAmountTaxa}>--</Text>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueLabel}>Valor Líquido a Receber</Text>
          <Text style={styles.valueAmount}>{formatCurrency(liquidValue)}</Text>
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
            <Modal
            transparent={true} 
            animationType="slide" 
            visible={isModalVisible} 
            onRequestClose={() => setIsModalVisible(false)}>
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
           {/* Modal para escolha entre Recibo e Nota Fiscal */}
                <Modal 
                transparent={true} 
                animationType="fade" 
                visible={isInvoiceModalVisible} 
                onRequestClose={handleCloseInvoiceModal}>
                <View style={styles.invoiceModalContainer}>
                    <View style={styles.invoiceModalContent}>
                        <Text style={styles.invoiceModalTitle}>Escolha uma opção:</Text>
                        <TouchableOpacity  style={styles.invoiceOptionButtonRecibo} 
                              onPress={() => {
                                handleCloseInvoiceModal(); // Fecha o modal de Invoice
                                navigation.navigate('ReceiptScreen', { saleId, fromLiquidateNowService: true }); // Passa o saleId e a flag fromLiquidateNow
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
