/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { COLORS } from '../../../../../../../../constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomCalendar from '../../../../../../../../components/CustomCalendar';

// Definindo as constantes de URLs das APIs
const API_BASE_URL = 'https://api.celereapp.com.br';
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


    const [currentDate, setCurrentDate] = useState('');

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
        const date = new Date();
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        setCurrentDate(formattedDate);
    }, []);



    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const selectClient = (client) => {
        setSelectedClient(client);
        setDropdownVisible(false); // Fecha o dropdown após a seleção
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
      setPaymentDate(new Date(day.dateString)); // Atualiza a data selecionada
    };

// Função para registrar venda e itens (produtos e serviços)
const handleRegisterSale = async () => {
    try {
      const empresaId = await getEmpresaId(); // Obtém o ID da empresa logada
      if (!empresaId) return;
  
      const formattedPaymentDate = paymentDate.toISOString().split('T')[0]; // Data prevista de pagamento
      const totalValue = totalWithDiscount; // Valor total com desconto
      const totalCost = totalWithoutDiscount; // Valor total sem desconto
  
      if (!selectedClient || !selectedClient.id) {
        Alert.alert("Erro", "Selecione um cliente para registrar a venda.");
        return;
      }
  
      // Define o tipo de pagamento como null
      const paymentMethodId = null; // Ajustando para null conforme solicitado
  
      // Dados da venda
      const vendaData = {
        empresa: empresaId,
        cliente_id: selectedClient.id, // Cliente selecionado
        dt_pagamento: null, // Pagamento não imediato
        dt_prevista_pagamento: formattedPaymentDate, // Data prevista de pagamento
        valor_total_custo_venda: totalCost, // Valor total sem desconto
        valor_total_venda: totalValue, // Valor total com desconto
        percentual_desconto: parseFloat(discount) || 0, // Percentual de desconto (0 se não houver)
        tipo_pagamento_venda: paymentMethodId, // Null para tipo de pagamento
      };
  
      console.log('Dados de venda enviados:', vendaData);
  
      // Envia a venda para a API
      const vendaResponse = await axios.post(API_VENDAS, vendaData);
      const vendaId = vendaResponse.data.data.id;
      console.log('Venda registrada com sucesso, ID da venda:', vendaId);
  
      // Agora registra os serviços da venda
      const serviceItems = services.map(service => ({
        empresa_id: empresaId,
        venda_id: vendaId, // ID da venda registrada
        servico_id: service.id, // ID do serviço
        quantidade: service.amount || 1, // Quantidade do serviço
        percentual_desconto: parseFloat(discount) || 0, // Percentual de desconto sempre como número válido
        valor_desconto: discountType === 'R$' ? parseFloat(discount) || 0 : 0, // Valor de desconto sempre como número válido
        gastos_envolvidos: parseFloat(additionalCosts || 0), // Gastos adicionais (se houver)
      }));
  
      // Registra os produtos da venda, se houver
      const productItems = products.map(product => ({
        empresa_id: empresaId,
        venda_id: vendaId, // ID da venda registrada
        produto_id: product.id, // ID do produto
        quantidade: product.amount || 1, // Quantidade do produto
        percentual_desconto: parseFloat(discount) || 0, // Percentual de desconto sempre como número válido
        valor_desconto: discountType === 'R$' ? parseFloat(discount) || 0 : 0, // Valor de desconto sempre como número válido
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
    const handleOpenInvoiceModal = () => {
        setIsInvoiceModalVisible(true);
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
        const totalServicePrice = services.reduce((sum, service) => sum + ((service.preco_venda || 0) * (service.amount || 1)), 0);
        const total = totalProductPrice + totalServicePrice + parseFloat(additionalCosts || 0);
        setTotalWithoutDiscount(total);
    }, [products, services, additionalCosts]);

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
    }, [products, services, discount, discountType, additionalCosts, calculateTotalWithoutDiscount, calculateTotalWithDiscount]);

    

    return (
        <ScrollView style={styles.containerBase}>
            <Text style={styles.title}>Detalhes da venda</Text>

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
                {/* Total e valor líquido a receber */}
        <View style={styles.totalContainer2}>
          <Text style={styles.totalLabel}>Valor total <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
          <Text style={styles.totalValue}>R$ {totalWithoutDiscount.toFixed(2)}</Text>
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
          <Text style={styles.totalValue}>R$ {totalWithDiscount.toFixed(2)} </Text>
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
