/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCalendar from '../../../../../../../../components/CustomCalendar';
import { API_BASE_URL } from '../../../../../../../../services/apiConfig';
import mixpanel from '../../../../../../../../services/mixpanelClient';
import moment from 'moment-timezone';

const API_VENDAS = `${API_BASE_URL}/cad/vendas/`;
const API_ITENS_VENDA = `${API_BASE_URL}/cad/itens_venda/`;

const AccountsReceivable = ({ route, navigation, clients, totalPrice  }) => {
    // Recebendo produtos e serviços
    const { services: receivedServices = [], products: receivedProducts = [] } = route.params;

    // Estado para controlar produtos e serviços
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [price, setPrice] = useState(0);
    const [discountType, setDiscountType] = useState('%');
    const [discount, setDiscount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('Fiado');
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [paymentDate, setPaymentDate] = useState(new Date());
    const [additionalCosts, setAdditionalCosts] = useState('');
    const [liquidValue, setLiquidValue] = useState(totalPrice);
    const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0);
    const [totalWithDiscount, setTotalWithDiscount] = useState(0);
    const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [servicePrices, setServicePrices] = useState({});
    const [currentDate, setCurrentDate] = useState('');

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

    // Filtrar e separar produtos de serviços
    useEffect(() => {
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

    useEffect(() => {
      const formattedDate = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY');
      setCurrentDate(formattedDate);
    }, []);    

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const selectClient = (client) => {
        setSelectedClient(client);
        setDropdownVisible(false); // Fecha o dropdown após a seleção
          // Rastrear evento no Mixpanel
  mixpanel.track('Cliente Selecionado', {
    clienteId: client.id,
    clienteNome: client.nome,
  });
    };

    const navigateToAddClient = () => {
        navigation.navigate('IncludeClient');
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleShowCalendar = () => {
      setIsCalendarVisible(true);
    };
  
    const handleDayPress = (day) => {
      const selectedDate = moment(day.dateString).tz('America/Sao_Paulo').toDate();
      setPaymentDate(selectedDate);
      setIsCalendarVisible(false);
    };

    const handleCloseModalMain= () => {
      setIsModalVisible(false);
      navigation.navigate('MainTab')
    };

// Função para registrar venda e itens (produtos e serviços)
const handleRegisterSale = async () => {
  try {
    const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
    if (!empresaId) return;

    const formattedPaymentDate = moment(paymentDate).tz('America/Sao_Paulo').format('YYYY-MM-DD');

    if (!selectedClient || !selectedClient.id) {
      Alert.alert("Erro", "Selecione um cliente para registrar a venda.");
      return;
    }

    // Calcular o desconto
    let discountValue = 0;
    if (discountType === '%') {
      discountValue = parseFloat(discount) ? (totalWithoutDiscount * (parseFloat(discount) / 100)) : 0;
    } else if (discountType === 'R$') {
      discountValue = parseFloat(discount) || 0;
    }

    // Calcular os valores finais
    const totalValue = totalWithoutDiscount - discountValue; // Valor total com desconto aplicado

    // Preparar os dados da venda
    const vendaData = {
      empresa: empresaId,
      cliente_id: selectedClient.id, // Cliente selecionado
      dt_pagamento: null, // Pagamento não imediato
      dt_prevista_pagamento: formattedPaymentDate, // Data prevista de pagamento
      valor_total_custo_venda: parseFloat(totalWithoutDiscount).toFixed(2), // Valor total sem desconto
      valor_total_venda: parseFloat(totalValue).toFixed(2), // Valor total com desconto aplicado
      percentual_desconto: discountType === '%' ? parseFloat(discount) : 0, // Percentual de desconto
      tipo_pagamento_venda: null, // Tipo de pagamento como null
      gastos_envolvidos: parseFloat(additionalCosts || 0).toFixed(2), // Gastos adicionais (se houver)
    };

    console.log('Dados de venda enviados:', vendaData);

    // Envia a venda para a API
    const vendaResponse = await axios.post(API_VENDAS, vendaData);
    const vendaId = vendaResponse.data.data.id;
    console.log('Venda registrada com sucesso, ID da venda:', vendaId);

    // Preparar os itens de serviço
    const serviceItems = services.map(service => {
      const servicePrice = service.preco_venda && parseFloat(service.preco_venda) !== 0
        ? parseFloat(service.preco_venda).toFixed(2)
        : parseFloat(servicePrices[service.id] || 0).toFixed(2);

      return {
        empresa_id: empresaId,
        venda_id: vendaId, // ID da venda registrada
        servico_id: service.id, // ID do serviço
        quantidade: service.amount || 1, // Quantidade do serviço
        preco_unitario_venda: servicePrice, // Define o preço correto
        percentual_desconto: discountType === '%' ? parseFloat(discount) : 0, // Percentual de desconto
        valor_desconto: discountType === 'R$' ? (discountValue / services.length) : 0, // Divide proporcionalmente
      };
    });

    // Preparar os itens de produto
    const productItems = products.map(product => ({
      empresa_id: empresaId,
      venda_id: vendaId, // ID da venda registrada
      produto_id: product.id, // ID do produto
      quantidade: product.amount || 1, // Quantidade do produto
      percentual_desconto: discountType === '%' ? parseFloat(discount) : 0, // Percentual de desconto
      valor_desconto: discountType === 'R$' ? (discountValue / products.length) : 0, // Divide proporcionalmente
    }));

    // Cria as promessas de registro para serviços e produtos
    const servicePromises = serviceItems.map(item =>
      axios.post(API_ITENS_VENDA, item)
        .then(response => console.log('Item de serviço registrado:', response.data))
        .catch(error => console.error('Erro ao registrar item de serviço:', error.response ? error.response.data : error))
    );

    const productPromises = productItems.map(item =>
      axios.post(API_ITENS_VENDA, item)
        .then(response => console.log('Item de produto registrado:', response.data))
        .catch(error => console.error('Erro ao registrar item de produto:', error.response ? error.response.data : error))
    );

    // Executa todas as promessas de registro de serviços e produtos
    await Promise.all([...servicePromises, ...productPromises]);

    // Rastrear a conclusão da venda no Mixpanel
    mixpanel.track('Venda Concluída', {
      vendaId,
      totalPreco: totalValue,
      descontoAplicado: discount,
      formaPagamento: selectedPayment,
    });

    resetCart(); // Limpa o carrinho após registrar a venda

    // Navega para a tela de nova venda ou resumo
    setIsModalVisible(true);
  } catch (error) {
    console.error('Erro ao registrar venda:', error.response ? error.response.data : error);
    Alert.alert('Erro', 'Ocorreu um erro ao registrar a venda e os itens.');
  }
};

    // Adiciona uma função que reseta o carrinho
const resetCart = () => {
  setProducts([]);
  setServices([]);
};
    
    const handleConfirm = () => {
        navigation.navigate('NewRegisteredSale', { clearCart: true });
    };

    const handleCloseInvoiceModal = () => {
        setIsInvoiceModalVisible(false);
    };

    const handleAddProduct = () => {
      navigation.navigate('NewRegisteredSale'); // Substitua com a navegação ou função que desejar.
    };

// Função para calcular o total sem desconto
const calculateTotalWithoutDiscount = useCallback(() => {
  const totalProductPrice = products.reduce((sum, product) => sum + ((product.preco_venda || 0) * (product.amount || 1)), 0);

  const totalServicePrice = services.reduce((sum, service) => {
    // Verifica se o serviço tem preço 0 e usa o valor do input se houver
    const servicePrice = parseFloat(servicePrices[service.id]) || service.preco_venda || 0;
    return sum + (servicePrice * (service.amount || 1));
  }, 0);

  const total = totalProductPrice + totalServicePrice + parseFloat(additionalCosts || 0);
  setTotalWithoutDiscount(total);
}, [products, services, servicePrices, additionalCosts]);

// Função para calcular o total com desconto
const calculateTotalWithDiscount = useCallback(() => {
  let total = totalWithoutDiscount;

  if (discountType === '%' && !isNaN(discount) && discount !== '') {
    total -= (total * (parseFloat(discount) / 100));
  } else if (discountType === 'R$' && !isNaN(discount) && discount !== '') {
    total -= parseFloat(discount || 0);
  }

  setTotalWithDiscount(total);
  setLiquidValue(total); // Atualiza o valor líquido a ser recebido
}, [discount, discountType, totalWithoutDiscount]);

// Calcular totais sempre que os valores de produtos, serviços, custos ou descontos mudarem
useEffect(() => {
  calculateTotalWithoutDiscount();
  calculateTotalWithDiscount();
}, [products, services, discount, discountType, additionalCosts, servicePrices, calculateTotalWithoutDiscount, calculateTotalWithDiscount]);

// Função para atualizar o valor do serviço manualmente inserido pelo usuário
const handleServicePriceChange = (serviceId, value) => {
  // Aqui formatamos o valor para moeda brasileira e garantimos que ele está armazenado corretamente
  const numericValue = value.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
  const formattedValue = (parseFloat(numericValue) / 100).toFixed(2); // Formata como centavos

  setServicePrices(prevPrices => ({
    ...prevPrices,
    [serviceId]: formattedValue,
  }));
};

    // Função para formatar valor para moeda Real Brasileiro
const formatCurrency = (value) => {
  if (!value) return '';
  return parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

    return (
        <ScrollView style={styles.containerBase}>
            <Text style={styles.title}>Detalhes da venda</Text>

            {/* Data do pagamento */}
            <View style={styles.dateContainer}>
            <TouchableOpacity onPress={handleShowCalendar} style={styles.datePicker}>
            <Text style={styles.dateText}>
              {`Data do Vencimento: ${paymentDate ? paymentDate.toLocaleDateString('pt-BR') : ''}`}
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
            {/* Input de preço para serviços com valor 0 */}
            {!service.preco_venda || parseFloat(service.preco_venda) === 0 ? (
              <TextInput
                style={styles.priceInput}
                keyboardType="numeric"
                value={servicePrices[service.id] ? formatCurrency(servicePrices[service.id]) : ''} // Exibe o valor 
                onChangeText={text => handleServicePriceChange(service.id, text)} // Atualiza o valor do serviço
                placeholder="Preço (R$)"
              />
            ) : (
              <Text style={styles.cartItemTotal}>
                {formatCurrency(service.preco_venda * service.amount)}
              </Text>
            )}
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
                    Preço unitário: R$ {product.preco_venda ? formatCurrency(product.preco_venda) : 'Defina o preço'}
                  </Text>
                  <Text style={styles.cartItemSubtitleMedida}>
                    Quantidade: {product.amount}
                  </Text>
                </View>
                <Text style={styles.cartItemTotalProduct}>
                {formatCurrency(product.preco_venda * product.amount)}
                </Text>
              </View>
            ))}
          </View>
        </>
      )}
      {/* 
         <TextInput
        style={styles.additionalCostsInput}
        placeholder="Adicionar gastos envolvidos se houver (R$) - Opcional"
        keyboardType="numeric"
        value={formatCurrency(additionalCosts)}
        onChangeText={setAdditionalCosts}
        />*/}
        {/* Total e valor líquido a receber */}
        <View style={styles.totalContainer2}>
          <Text style={styles.totalLabel}>Valor total <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
          <Text style={styles.totalValue}>R$ {formatCurrency(totalWithoutDiscount)}</Text>
        </View>

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
<View style={styles.paymentSection2}>
    <TouchableOpacity
        style={[styles.paymentButton2, selectedPayment === 'Fiado' && styles.paymentButtonSelected]}
        onPress={() => setSelectedPayment('Fiado')}
    >
        <Text style={styles.paymentButtonText2}>Fiado</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={[styles.paymentButton2, selectedPayment === 'Boleto' && styles.paymentButtonSelected]}
        onPress={() => setSelectedPayment('Boleto')}
    >
        <Text style={styles.paymentButtonText2}>Boleto</Text>
    </TouchableOpacity>
</View>

        {/* Total e valor líquido a receber */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Valor a receber <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
          <Text style={styles.totalValue}>R$ {formatCurrency(totalWithDiscount)} </Text>
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
                        <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModalMain}>
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

export default AccountsReceivable;
