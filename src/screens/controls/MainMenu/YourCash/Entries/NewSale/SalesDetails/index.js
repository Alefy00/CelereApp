/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image, ScrollView, Modal } from "react-native";
import styles from "./styles";

const SaleDetails = ({ navigation, route }) => {
  const { products, totalPrice } = route.params; // Recebe os produtos selecionados e o preço total
  const [currentDate, setCurrentDate] = useState(''); // Estado para armazenar a data atual
  const [paymentMethod, setPaymentMethod] = useState('PIX'); // Estado para armazenar o método de pagamento
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para os produtos filtrados
  const [search, setSearch] = useState(''); // Estado para a busca
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal
  const paymentMethods = ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito']; // Métodos de pagamento disponíveis

  useEffect(() => {
    // Define a data atual do dispositivo
    const date = new Date();
    const formattedDate = date.toLocaleDateString('pt-BR');
    setCurrentDate(formattedDate);
  }, []);

  // Filtra os produtos com base na busca do usuário
  useEffect(() => {
    if (search) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  // Função para mudar o método de pagamento
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Função para confirmar a venda e exibir o modal
  const handleConfirm = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal e navegar para a tela de Entries
  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('Entries'); 
  };

  // Função para registrar uma nova venda
  const handleNewRegistered = () => {
    setIsModalVisible(false);
    navigation.navigate('NewRegisteredSale')
  }

  // Função para navegar para a tela SellOnCredit
  const handleSellOnCredit = () => {
    navigation.navigate('SellOnCredit', { products, totalPrice });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>

          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Retorno'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.label}>Detalhes da venda</Text>
            <View style={styles.dateContainer}>
              <Text style={styles.labelData}>Hoje, {currentDate}</Text>
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, { flex: 1 }]}>
                <Text style={styles.buttonText}>Immediately</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonSell, { flex: 1 }]} onPress={handleSellOnCredit}>
                <Text style={styles.buttonText}>Sell on Credit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search in cart..."
                value={search}
                onChangeText={setSearch}
              />
              <Icon name="search" size={20} color={COLORS.grey} style={styles.searchIcon} />
            </View>
            {/* Lista de produtos filtrados */}
            <View style={styles.productContainer}>
              {filteredProducts.map((product, index) => (
                <View key={index} style={styles.productDetail}>
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productText}>{product.name}</Text>
                    <Text style={styles.productAmount}>Amount: {product.amount}</Text>
                  </View>
                  <Text style={styles.productTotal}>R${product.total.toFixed(2)}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.label}>Método de pagamento</Text>

            <FlatList
              horizontal
              data={paymentMethods}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.paymentButton, paymentMethod === item && styles.selectedPaymentButton]}
                  onPress={() => handlePaymentMethodChange(item)}
                >
                  <Text style={styles.paymentButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
            />
            <View>
              <TextInput
                placeholder="% of Discount"
                style={styles.discount}
              />
            </View>
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total a Receber:</Text>
              <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
            </View>


            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Icon name="checkmark-circle" size={25} color={COLORS.black} />
              <Text style={styles.confirmButtonText}>Finalizar venda</Text>
            </TouchableOpacity>
          </ScrollView>

          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Icon name="checkmark-circle" size={80} color={COLORS.green} />
                <Text style={styles.modalText}>Sua venda foi registrada</Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleNewRegistered}>
                  <Icon name="cart" size={20} color={COLORS.black} />
                  <Text style={styles.modalButtonText}>Registrar outra venda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBackButton} onPress={handleCloseModal}>
                  <Icon name="arrow-back" size={20} color={COLORS.black} />
                  <Text style={styles.modalBackButtonText}>Menu Entradas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SaleDetails;
