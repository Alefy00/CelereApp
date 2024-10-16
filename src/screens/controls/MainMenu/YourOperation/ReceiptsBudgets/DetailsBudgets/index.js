/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://api.celereapp.com.br/cad/cliente/'; 
const API_ORCAMENTO_URL = 'https://api.celereapp.com.br/cad/orcamento/';
const API_ITENS_VENDA_ORCAMENTO_URL = 'https://api.celereapp.com.br/cad/itens_venda_orcamento/';


const DetailsBudgets = ({ navigation, route }) => {
  const [date, setDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountType, setDiscountType] = useState('%'); // Define '%' como padrão
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedItems, setSelectedItems] = useState(route.params?.products || []); // Produtos ou serviços selecionados
  const [total, setTotal] = useState(route?.params?.totalPrice || 0); // Total recebido da tela NewBudgets
  const [selectedClient, setSelectedClient] = useState(null); // Cliente selecionado
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Visibilidade do dropdown
  const [discountedTotal, setDiscountedTotal] = useState(total); // Total com desconto aplicado
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orcamentoId, setOrcamentoId] = useState(null);
  const services = selectedItems.filter(item => item.categoria === 'Serviços');
  const products = selectedItems.filter(item => item.categoria !== 'Serviços');


   // Função para buscar o ID da empresa logada
   const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  };

  // Função para gerar o orçamento e registrar itens
  const handleGenerateBudget = async () => {
    const empresaId = await getEmpresaId();
    if (!empresaId) return;

    if (!selectedClient) {
      Alert.alert('Erro', 'Selecione um cliente antes de gerar o orçamento.');
      return;
    }

    // Criar o orçamento
    console.log('Iniciando criação do orçamento com os dados: ', {
      empresa_id: empresaId,
      cliente_id: selectedClient ? selectedClient.id : null,
      informacoes_adicionais: additionalInfo,
    });
    const orcamentoId = await createOrcamento(empresaId);
    if (!orcamentoId) return;

    // Registrar itens de venda (produtos) no orçamento
    console.log('Iniciando registro de itens de venda: ', products);
    await registerItemsVendaOrcamento(empresaId, orcamentoId, products);

    // Registrar serviços no orçamento
    console.log('Iniciando registro de serviços: ', services);
    await registerServicesOrcamento(empresaId, orcamentoId, services);

    // Exibir modal de confirmação
    setOrcamentoId(orcamentoId);
    setIsModalVisible(true);
  };

  // Função para registrar o orçamento
  const createOrcamento = async (empresaId) => {
    try {
      const data = {
        empresa_id: empresaId,
        cliente_id: selectedClient ? selectedClient.id : null,
        informacoes_adicionais: additionalInfo,
      };
      console.log('Dados enviados para criar orçamento: ', data);

      const response = await axios.post(API_ORCAMENTO_URL, data);

      const id = response.data.data.id;
      setOrcamentoId(id);
      console.log('Orçamento criado com sucesso, ID: ', id);
      return id;
    } catch (error) {
      console.error('Erro ao criar orçamento:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Falha ao criar o orçamento.');
      return null;
    }
  };

// Função para registrar itens de venda (produtos)
const registerItemsVendaOrcamento = async (empresaId, orcamentoId, items) => {
  try {
    const requests = items.map(async (item) => {
      const valorTotalVenda = (item.preco_venda * item.amount).toFixed(2);

      // Garantindo que o desconto seja um número válido
      const percentualDesconto = discountType === '%' ? parseFloat(discount) || 0 : 0;
      const valorDesconto = discountType === 'R$' ? parseFloat(discount) || 0 : 0;

      const data = {
        empresa_id: empresaId,
        orcamento_id: orcamentoId,
        produto_id: item.id,
        quantidade: item.amount,
        percentual_desconto: percentualDesconto,
        valor_desconto: valorDesconto,
        valor_total_venda: valorTotalVenda,
      };
      console.log('Dados enviados para registrar item de venda: ', data);

      return axios.post(API_ITENS_VENDA_ORCAMENTO_URL, data);
    });

    await Promise.allSettled(requests);
    console.log('Itens de venda registrados com sucesso.');
  } catch (error) {
    console.error('Erro ao registrar os itens:', error.response ? error.response.data : error.message);
    Alert.alert('Erro', 'Falha ao registrar os itens do orçamento.');
  }
};

// Função para registrar serviços no orçamento
const registerServicesOrcamento = async (empresaId, orcamentoId, services) => {
  try {
    const requests = services.map(async (service) => {
      const valorTotalVenda = (service.preco_venda * service.amount).toFixed(2);

      // Garantindo que o desconto seja um número válido
      const percentualDesconto = discountType === '%' ? parseFloat(discount) || 0 : 0;
      const valorDesconto = discountType === 'R$' ? parseFloat(discount) || 0 : 0;

      const data = {
        empresa_id: empresaId,
        orcamento_id: orcamentoId,
        servico_id: service.id,
        quantidade: service.amount,
        percentual_desconto: percentualDesconto,
        valor_desconto: valorDesconto,
        valor_total_venda: valorTotalVenda,
      };
      console.log('Dados enviados para registrar serviço: ', data);

      return axios.post(API_ITENS_VENDA_ORCAMENTO_URL, data);
    });

    await Promise.allSettled(requests);
    console.log('Serviços registrados com sucesso.');
  } catch (error) {
    console.error('Erro ao registrar os serviços:', error.response ? error.response.data : error.message);
    Alert.alert('Erro', 'Falha ao registrar os serviços do orçamento.');
  }
};


  // Função para compartilhar o orçamento
  const shareOrcamento = () => {
    setIsModalVisible(false);
    navigation.navigate('BudgetsScreen', { saleId: orcamentoId });
  };

  // Função para voltar para a tela anterior
  const handleBack = () => {
    setIsModalVisible(false);
    navigation.navigate('Budget');
  };

  // Função para alternar a visibilidade do dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Função para selecionar um cliente e fechar o dropdown
  const selectClient = (client) => {
    setSelectedClient(client);
    setIsDropdownVisible(false);
  };

  // Função para pegar a data atual
  useEffect(() => {
    const date = new Date();
    const currentDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setDate(currentDate);
  }, []);

  // Função para alternar entre % e R$
  const toggleDiscountType = (type) => {
    setDiscountType(type);
    setDiscount(''); // Limpa o valor do desconto ao alternar o tipo
  };

  // Calcular o total com desconto
  useEffect(() => {
    let discountValue = parseFloat(discount) || 0;

    if (discountType === '%') {
      discountValue = (discountValue / 100) * total;
    }

    const newTotal = total - discountValue;
    setDiscountedTotal(newTotal > 0 ? newTotal : 0);
  }, [discount, discountType, total]);

  // Buscar lista de clientes da API
  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(`${API_URL}?empresa=${empresaId}`);
        if (response.data && response.data.results && response.data.results.data) {
          setClients(response.data.results.data);
        } else {
          Alert.alert("Erro", "Erro ao recuperar clientes. Tente novamente.");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar clientes: ", error);
      Alert.alert("Erro", "Erro ao conectar à API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchClients();
    }, [fetchClients])
  );

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return parseFloat(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ScrollView style={styles.container}>
        {/* Data do Orçamento */}
        <Text style={styles.sectionTitle3}>Detalhes do orçamento</Text>
        <Text style={styles.dateText}>Data: {date}</Text>

        {/* Campo para associar cliente */}
        <View style={styles.clientContainer}>
          <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
            <Text style={styles.clientText}>
              {selectedClient ? selectedClient.nome : "Associar a um cliente..."}
            </Text>
            <Icon name={isDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addClientButton} onPress={() => navigation.navigate('IncludeClient')}>
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
                  <Text style={styles.cartItemTotal}>
                  {formatCurrency(service.preco_venda * service.amount)}
                  </Text>

                  {/* Caso o preço não esteja definido, permitir a entrada do valor */}
                  {!service.preco_venda || parseFloat(service.preco_venda) === 0 ? (
                    <TextInput
                      style={styles.priceInput}
                      keyboardType="numeric"
                      value={service.preco_venda ? formatCurrency(service.preco_venda) : ''}
                      onChangeText={text => {
                        // Atualiza o preço na lista de serviços
                        const updatedServices = services.map(s => s.id === service.id ? { ...s, preco_venda: parseFloat(text) } : s);
                        setSelectedItems([...products, ...updatedServices]); // Atualiza a lista de itens
                      }}
                      placeholder="Preço de venda (R$)"
                    />
                  ) : null}
                </View>
              ))}
            </View>
          </>
        )}

        {/* Exibe os produtos separadamente */}
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
                  <Text style={styles.cartItemTotalProduct}>
                  {formatCurrency(product.preco_venda * product.amount)}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Descontos */}
        <View style={styles.discountContainer}>
          <Text style={styles.sectionTitle}>Descontos</Text>
          <View style={styles.discountButtons}>
            <TouchableOpacity
              style={[
                styles.discountButton,
                discountType === '%' && styles.discountButtonActive, // Ativo se for porcentagem
              ]}
              onPress={() => toggleDiscountType('%')}
            >
              <Text
                style={[
                  styles.discountButtonText,
                  discountType === '%' && styles.discountButtonTextActive, // Texto ativo
                ]}
              >
                %
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.discountButton,
                discountType === 'R$' && styles.discountButtonActive, // Ativo se for valor
              ]}
              onPress={() => toggleDiscountType('R$')}
            >
              <Text
                style={[
                  styles.discountButtonText,
                  discountType === 'R$' && styles.discountButtonTextActive, // Texto ativo
                ]}
              >
                R$
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.discountInput}
              placeholder={`Incluir desconto em ${discountType}`}
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric" // Definir o teclado numérico
            />
          </View>
        </View>

        {/* Informações adicionais */}
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.sectionTitle2}>Informações adicionais (Opcional)</Text>
          <TextInput
            style={styles.additionalInfoInput}
            placeholder="Ex: Condições, prazo de execução, etc"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </View>

        {/* Total com desconto */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            Total <Icon name="alert-circle" size={18} color={COLORS.lightGray} />
          </Text>
          <Text style={styles.totalPrice}>R$ {formatCurrency(discountedTotal)}</Text>
        </View>
      <TouchableOpacity style={styles.generateButton} onPress={handleGenerateBudget}>
        <Icon name="checkmark-circle" size={25} color={COLORS.black} />
        <Text style={styles.generateButtonText}>Gerar orçamento</Text>
      </TouchableOpacity>
              {/* Modal de confirmação do orçamento */}
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon name="checkmark-circle" size={90} color={COLORS.green} />
              <Text style={styles.modalText}>Orçamento gerado com sucesso.</Text>

              {/* Botão Compartilhar Orçamento */}
              <TouchableOpacity style={styles.shareButton} onPress={shareOrcamento}>
                <Text style={styles.shareButtonText}>Compartilhar orçamento</Text>
              </TouchableOpacity>

              {/* Botão Visualizar Orçamento */}
              <TouchableOpacity style={styles.viewButton} onPress={handleBack}>
                <Text style={styles.viewButtonText}>Retornar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default DetailsBudgets;
