/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NativeModules } from 'react-native';

const { ZoopModule } = NativeModules;

const PaymentScreen = () => {
  const [amount, setAmount] = useState('');
  const [paymentType, setPaymentType] = useState('credit'); // 'credit' ou 'debit'
  const [installments, setInstallments] = useState('');

  const handlePay = async () => {
    try {
      const result = await ZoopModule.pay(
        parseFloat(amount),
        paymentType,
        installments ? parseInt(installments) : null
      );
      Alert.alert('Pagamento', result);
    } catch (error) {
      Alert.alert('Erro', error.message || error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Valor da Transação (R$)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Digite o valor (ex.: 10.00)"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Tipo de Pagamento</Text>
      <Button
        title={`Alterar para ${paymentType === 'credit' ? 'Débito' : 'Crédito'}`}
        onPress={() => setPaymentType(paymentType === 'credit' ? 'debit' : 'credit')}
      />

      {paymentType === 'credit' && (
        <View style={styles.installmentsContainer}>
          <Text style={styles.label}>Parcelas</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Digite o número de parcelas (mín. 2)"
            value={installments}
            onChangeText={setInstallments}
          />
        </View>
      )}

      <Button title="Realizar Pagamento" onPress={handlePay} />
    </View>
  );
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  installmentsContainer: {
    marginTop: 10,
  },
});
