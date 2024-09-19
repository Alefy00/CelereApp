/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView, Modal, FlatList, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "../styles";

// Importando os ícones SVG diretamente do projeto
import PixIcon from "../../../../../../../../assets/images/svg/iconPix.svg";
import CashIcon from "../../../../../../../../assets/images/svg/iconMoney.svg";
import CreditCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import DebitCardIcon from "../../../../../../../../assets/images/svg/iconCard.svg";
import { COLORS } from "../../../../../../../../constants";


const LiquidateNow = ({ products, totalPrice, clients, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  
  const paymentMethods = [
    { id: 'PIX', label: 'PIX', icon: <PixIcon width={20} height={20} /> },
    { id: 'Dinheiro', label: 'Dinheiro', icon: <CashIcon width={20} height={20} /> },
    { id: 'Cartão de Crédito', label: 'Cartão de Crédito', icon: <CreditCardIcon width={20} height={20} /> },
    { id: 'Cartão de Débito', label: 'Cartão de Débito', icon: <DebitCardIcon width={20} height={20} /> }
  ];

  useEffect(() => {
    const date = new Date();
    const formattedDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setCurrentDate(formattedDate);
  }, []);

  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleNewRegistered = () => {
    setIsModalVisible(false);
    navigation.navigate('NewRegisteredSale');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectClient = (client) => {
    setSelectedClient(client);
    setDropdownVisible(false);
  };

  const navigateToAddClient = () => {
    navigation.navigate("IncludeClient");
  };

  const handleEmitReceipt = () => {
    console.log('Emitir NF-e ou Recibo');
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      {/* Detalhes da venda */}
      <View style={styles.saleDetailsContainer}>
        <Text style={styles.saleDetailsTitle}>Detalhes da venda</Text>
        <Text style={styles.saleDate}>Data da Venda: <Text style={styles.saleDateValue}>{currentDate}</Text></Text>
      </View>

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

      {/* Carrinho de produtos */}
      <View style={styles.cartContainer}>
        <Text style={styles.sectionTitle}>Carrinho</Text>
        {products.map((product, index) => (
          <View key={index} style={styles.productDetail}>
            <Image source={{ uri: product.imagem }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productText}>{product.nome}</Text>
              <Text style={styles.productAmount}>Quantidade: {product.amount}</Text>
            </View>
            <Text style={styles.productTotal}>R${product.total.toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Seção de descontos */}
      <Text style={styles.sectionTitle}>Descontos</Text>
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
          keyboardType='numeric'
        />
      </View>

      {/* Lista de métodos de pagamento */}
      <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
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
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* Total e botão de finalizar */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Valor a receber <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
        <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Icon name="checkmark-circle" size={25} color={COLORS.black} />
        <Text style={styles.confirmButtonText}>Concluir esta venda</Text>
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

export default LiquidateNow;
