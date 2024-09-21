/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';

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

  // Lista fictícia de clientes
    const clients = [
        { id: '1', name: 'Cliente 1' },
        { id: '2', name: 'Cliente 2' },
        { id: '3', name: 'Cliente 3' },
        { id: '4', name: 'Cliente 4' },
    ];
    

  // Função para pegar a data atual
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
  }, []);

  // Função para alternar entre % e R$
  const toggleDiscountType = (type) => {
    setDiscountType(type);
    setDiscount(''); // Limpa o valor do desconto quando o tipo é alterado
  };
    // Alterna a visibilidade do dropdown
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
      };
    
      // Seleciona um cliente e fecha o dropdown
      const selectClient = (client) => {
        setSelectedClient(client);
        setIsDropdownVisible(false);
      };
    
      // Navegar para a tela de adicionar cliente (comportamento futuro)
      const navigateToAddClient = () => {
        navigation.navigate('IncludeClient');
      };
    
      // Calcula o desconto e o total atualizado
  useEffect(() => {
    let discountValue = parseFloat(discount) || 0;

    if (discountType === '%') {
      // Se o desconto for em porcentagem
      discountValue = (discountValue / 100) * total;
    }

    // Se o desconto for em valor, apenas subtrai do total
    const newTotal = total - discountValue;

    // Não permitir que o valor total fique negativo
    setDiscountedTotal(newTotal > 0 ? newTotal : 0);
  }, [discount, discountType, total]);

  const handleGenerateBudget = () => {
    setIsModalVisible(true);
  };

  // Fechar o modal
  const closeModal = () => {
    setIsModalVisible(false);
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
        <Text style={styles.sectionTitle}>Detalhes do orçamento</Text>
        <Text style={styles.dateText}>Data: Hoje, {date}</Text>

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

        {/* Lista de opções que aparece logo abaixo do campo com scroll interno */}
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

        {/* Carrinho - Exibindo produtos ou serviços selecionados */}
        <View style={styles.cartContainer}>
        <Text style={styles.Carrinho}>Carrinho</Text>
          {selectedItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              {/* Exibição da imagem do produto */}
              {item.imagem ? (
                <Image
                  source={{ uri: item.imagem }} // Verifica se há imagem, se sim, exibe
                  style={styles.productImage}
                  resizeMode="contain"
                />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imagePlaceholderText}>Sem imagem</Text>
                </View>
              )}
              <View style={styles.productDetails}>
                <Text style={styles.cartItem}>{item.nome}</Text>
                <Text style={styles.cartQuantity}>Quantidade: {item.amount}</Text>
              </View>
                <Text style={styles.cartPrice}>R$ {item.total.toFixed(2)}</Text>
            </View>
          ))}
        </View>

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
            placeholder="ex: Cabo Tipo C"
            value={additionalInfo}
            onChangeText={setAdditionalInfo}
          />
        </View>

        {/* Total com desconto */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            Total <Icon name="alert-circle" size={18} color={COLORS.lightGray} />
          </Text>
          <Text style={styles.totalPrice}>R$ {discountedTotal.toFixed(2)}</Text>
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
              <TouchableOpacity style={styles.shareButton} onPress={closeModal}>
                <Text style={styles.shareButtonText}>Compartilhar orçamento</Text>
              </TouchableOpacity>

              {/* Botão Visualizar Orçamento */}
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>Visualizar orçamento</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default DetailsBudgets;
