/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, FlatList, TextInput, Platform, Image, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from "./styles";
import { COLORS } from "../../../../../../../../constants";

const ReceivableDetails = ({ products, totalPrice, clients, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState('Boleto');
  const [discountType, setDiscountType] = useState('%');
  const [discountValue, setDiscountValue] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const formattedDate = `Hoje, ${date.toLocaleDateString('pt-BR')}`;
    setCurrentDate(formattedDate);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
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

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDate;
    setShowDatePicker(Platform.OS === 'ios');
    setPaymentDate(currentDate);
  };
  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleNewRegistered = () => {
    setIsModalVisible(false);
    // Lógica para registrar nova venda
  };

  const handleEmitReceipt = () => {
    // Lógica para emissão de NF-e ou recibo
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.saleDetailsContainer}>
          <Text style={styles.saleDetailsTitle}>Detalhes da venda</Text>
        </View>

        {/* Data do pagamento */}
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showDatePickerModal} style={styles.datePicker}>
            <Text style={styles.dateText}>
              {`Data do pagamento: ${paymentDate.toLocaleDateString('pt-BR')}`}
            </Text>
            <Icon name="calendar" size={24} color={COLORS.lightGray} />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={paymentDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        {/* Campo de associar cliente */}
        <View style={styles.clientContainer}>
          <TouchableOpacity style={styles.clientPicker} onPress={toggleDropdown}>
            <Text style={styles.clientText}>
              {selectedClient ? selectedClient.name : "Associar a um cliente..."}
            </Text>
            <Icon name={isDropdownVisible ? "arrow-up" : "arrow-down"} size={24} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addClientButton} onPress={navigateToAddClient}>
            <Icon name="add" size={30} color={COLORS.black} />
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

        {/* Alternância de métodos de pagamento */}
        <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
        <View style={styles.paymentToggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, paymentMethod === 'Fiado' && styles.activeButton]}
            onPress={() => handlePaymentMethodChange('Fiado')}
          >
            <Text style={paymentMethod === 'Fiado' ? styles.activeButtonText : styles.inactiveButtonText}>
              Fiado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, paymentMethod === 'Boleto' && styles.activeButton]}
            onPress={() => handlePaymentMethodChange('Boleto')}
          >
            <Text style={paymentMethod === 'Boleto' ? styles.activeButtonText : styles.inactiveButtonText}>
              Boleto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total e botão de finalizar */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Valor a receber <Icon name="alert-circle" size={20} color={COLORS.lightGray} /></Text>
          <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.confirmButtonText}>Concluir esta venda</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de confirmação */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Ícone de sucesso */}
            <Icon name="checkmark-circle" size={100} color={COLORS.green} />
            <Text style={styles.modalText}>Sua venda foi concluída</Text>

            {/* Botão Registrar outra venda */}
            <TouchableOpacity style={styles.modalPrimaryButton} onPress={handleNewRegistered}>
              <Icon name="cart" size={20} color="black" />
              <Text style={styles.modalPrimaryButtonText}>Registrar outra venda</Text>
            </TouchableOpacity>

            {/* Botão Emitir NF-e ou Recibo */}
            <TouchableOpacity style={styles.modalSecondaryButton} onPress={handleEmitReceipt}>
              <Icon name="document" size={20} color="black" />
              <Text style={styles.modalSecondaryButtonText}>Emitir NF-e ou Recibo</Text>
            </TouchableOpacity>

            {/* Botão Voltar ao resumo */}
            <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
              <Icon name="arrow-back" size={20} color="black" />
              <Text style={styles.modalBackButtonText}>Voltar ao resumo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceivableDetails;
