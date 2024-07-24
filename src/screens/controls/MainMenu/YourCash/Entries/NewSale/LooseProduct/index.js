/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { COLORS } from "../../../../../../../constants";
import BarTop2 from "../../../../../../../components/BarTop2";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import moment from "moment";
import 'moment/locale/pt-br';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const LooseProduct = ({ navigation }) => {
  // Estados para armazenar dados da tela
  const [currentDate, setCurrentDate] = useState(''); // Data de pagamento
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // Visibilidade do DatePicker
  const [name, setName] = useState(''); // Nome do produto
  const [price, setPrice] = useState(''); // Preço do produto
  const [quantity, setQuantity] = useState(0); // Quantidade do produto
  const [total, setTotal] = useState(0); // Total do produto
  const [paymentMethod, setPaymentMethod] = useState('PIX'); // Método de pagamento selecionado
  const paymentMethods = ['PIX', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito']; // Métodos de pagamento disponíveis

  // Função para exibir o DatePicker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Função para esconder o DatePicker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Função para confirmar a data selecionada no DatePicker
  const handleConfirmDate = (date) => {
    setCurrentDate(moment(date).locale('pt-br').format('LL'));
    hideDatePicker();
  };

  // Função para alterar a quantidade do produto
  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      setTotal((newQuantity * parseFloat(price || 0)).toFixed(2));
    }
  };

  // Função para adicionar um item (lógica futura)
  const handleAddItem = () => {
    console.log({ name, price, quantity, total });
  };

  // Função para confirmar a venda (lógica futura)
  const handleConfirmSale = () => {
    console.log('Venda confirmada');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Adicionar Produto'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
              onPress={() => navigation.goBack()}
            />
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.label}>Data de pagamento</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
              <Text style={styles.labelData}>{currentDate || 'Selecione data'}</Text>
              <Icon name="calendar" size={20} color={COLORS.black} />
            </TouchableOpacity>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Preço</Text>
              <TextInput
                style={styles.input}
                placeholder="Preço"
                keyboardType="numeric"
                value={price}
                onChangeText={text => {
                  setPrice(text);
                  setTotal((quantity * parseFloat(text)).toFixed(2));
                }}
              />
            </View>
            <View style={styles.quantityContainer}>
              <Text style={styles.label}>Quantidade</Text>
              <View style={styles.quantityControls}>
                <TouchableOpacity onPress={() => handleQuantityChange(-1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(1)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Total</Text>
              <TextInput
                style={styles.input}
                placeholder="Total"
                value={`R$ ${total}`}
                editable={false}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>+ Adicionar Item</Text>
            </TouchableOpacity>
            <Text style={styles.label}>Método de pagamento</Text>
            <FlatList
              horizontal
              data={paymentMethods}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.paymentButton, paymentMethod === item && styles.selectedPaymentButton]}
                  onPress={() => setPaymentMethod(item)}
                >
                  <Text style={styles.paymentButtonText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item}
              showsHorizontalScrollIndicator={false}
            />
            <TextInput
              placeholder="% of Discount"
              style={styles.discount}
            />
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Valor a receber</Text>
              <Text style={styles.totalValue}>R$ {total}</Text>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmSale}>
              <Icon name='checkmark-circle' size={25} color={COLORS.black} />
              <Text style={styles.confirmButtonText}>Finalizar a venda</Text>
            </TouchableOpacity>
          </ScrollView>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="pt-BR"
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default LooseProduct;
