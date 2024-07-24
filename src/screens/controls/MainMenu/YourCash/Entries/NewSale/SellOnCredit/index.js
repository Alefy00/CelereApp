/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Image, ScrollView, Modal } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./styles";
import moment from 'moment';
import 'moment/locale/pt-br';

const SellOnCredit = ({ navigation, route }) => {
  const { products, totalPrice } = route.params; // Recebe os produtos selecionados e o preço total
  const [currentDate, setCurrentDate] = useState(''); // Estado para armazenar a data de pagamento
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Estado para controlar a visibilidade do seletor de data
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para os produtos filtrados
  const [search, setSearch] = useState(''); // Estado para a busca
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  // Função para mostrar o seletor de data
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Função para esconder o seletor de data
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Função para confirmar a data selecionada
  const handleConfirm = (date) => {
    setCurrentDate(moment(date).locale('pt-br').format('LL'));
    hideDatePicker();
  };

  // Função para atualizar o estado de busca
  const handleSearch = (text) => {
    setSearch(text);
  };

  // Função para confirmar a venda e exibir o modal
  const handleConfirmSale = () => {
    setIsModalVisible(true);
  };

  // Função para fechar o modal e navegar para a tela de Nova Venda Registrada
  const handleCloseModal = () => {
    setIsModalVisible(false);
    navigation.navigate('NewRegisteredSale'); // Altere para a tela apropriada após fechar o modal
  };

  // Função para navegar para a tela de Entradas
  const handleNewEntries = () => {
    setIsModalVisible(false);
    navigation.navigate('Entries');
  };

  // Função para navegar para a tela de Detalhes da Venda
  const handleImmediately = () => {
    navigation.navigate('SaleDetails', { products, totalPrice });
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
              <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
                <Text style={styles.labelData}>{currentDate || "Selecione a data de pagamento"}</Text>
                <Icon name="calendar" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
            {/* Botões para alternar entre venda imediata e venda a crédito */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={handleImmediately}>
                <Text style={styles.buttonText}>Immediately</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonSell, { flex: 1 }]}>
                <Text style={styles.buttonText}>Sell on Credit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search in cart..."
                value={search}
                onChangeText={handleSearch}
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
            <View>
              <TextInput
                placeholder="% of Discount"
                style={styles.discount}
              />
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total a Receber</Text>
              <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSale}>
              <Icon name="checkmark-circle" size={25} color={COLORS.black} />
              <Text style={styles.confirmButtonText}>Finalizar a venda</Text>
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
                <Icon name="checkmark-circle" size={50} color={COLORS.success} />
                <Text style={styles.modalText}>Sua venda foi registrada</Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
                  <Icon name="cart" size={20} color={COLORS.black} />
                  <Text style={styles.modalButtonText}>Registre outra venda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalBackButton} onPress={handleNewEntries}>
                  <Text style={styles.modalBackButtonText}>Menu Entradas</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            locale="pt_BR" 
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SellOnCredit;
