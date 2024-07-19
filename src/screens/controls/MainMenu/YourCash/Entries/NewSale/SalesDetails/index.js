/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from "./styles";

const SaleDetails = ({ navigation, route }) => {
  const { products, totalPrice } = route.params; // Recebe os produtos selecionados e o preço total
  const [currentDate, setCurrentDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');
  const paymentMethods = ['PIX', 'Money', 'Credit Card', 'Debit Card'];

  useEffect(() => {
    // Define a data atual do dispositivo
    const date = new Date();
    const formattedDate = date.toLocaleDateString('pt-BR');
    setCurrentDate(formattedDate);
  }, []);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirm = () => {
    // TODO: lógica para confirmar a venda
    console.log('Método de pagamento: ', paymentMethod);
    console.log('Produtos: ', products);
    navigation.navigate('ConfirmationScreen');
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
          <View style={styles.content}>
            <Text style={styles.label}>Sale details</Text>
            <View style={styles.dateContainer}>
              <Text>Due date: {currentDate}</Text>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button}>
                <Text>Immediately</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text>Sell on Credit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productContainer}>
              {products.map((product, index) => (
                <View key={index} style={styles.productDetail}>
                  <Text style={styles.productText}>{product.name}</Text>
                  <Text style={styles.productText}>Amount: {product.amount}</Text>
                  <Text style={styles.productText}>R$ {product.price}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.label}>Payment method</Text>
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
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total a Receber</Text>
              <Text style={styles.totalValue}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Finish this sale</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SaleDetails;
