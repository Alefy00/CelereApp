/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, View, Alert, TextInput, ActivityIndicator,StyleSheet} from 'react-native';
import {
    initializeZoopSDK,
    realizarPagamento,
} from '../../../../../../../../services/zoopService';
import { Picker } from '@react-native-picker/picker';

const TestScreen = () => {
    const [sdkInitialized, setSdkInitialized] = useState(false);
    const [sellerId, setSellerId] = useState(
        'f36b5fadbd414b188227f64553f1c521'
    );
    const [loading, setLoading] = useState(false);
    const [paymentType, setPaymentType] = useState('credit'); // "credit" ou "debit"
    const [installments, setInstallments] = useState(1); // Parcelas
    const [amount, setAmount] = useState(''); // Valor da transação em reais

    const handleInitialize = async () => {
        setLoading(true);
        try {
            await initializeZoopSDK();
            setSdkInitialized(true);
            Alert.alert('Sucesso', 'SDK inicializado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', `Falha ao inicializar o SDK: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!sdkInitialized) {
            Alert.alert(
                'Atenção',
                'Inicialize o SDK antes de tentar realizar um pagamento.'
            );
            return;
        }

        if (!sellerId.trim()) {
            Alert.alert('Erro', 'O Seller ID não pode estar vazio.');
            return;
        }

        const amountValue = parseFloat(amount);
        if (isNaN(amountValue) || amountValue <= 0) {
            Alert.alert('Erro', 'Insira um valor válido para o pagamento.');
            return;
        }

        if (paymentType === 'credit' && (isNaN(installments) || installments < 1)) {
            Alert.alert('Erro', 'Insira um número válido de parcelas.');
            return;
        }

        setLoading(true);
        try {
            await realizarPagamento(
                sellerId.trim(),
                amountValue,
                paymentType,
                paymentType === 'credit' ? installments : 1
            );
            Alert.alert('Pagamento Concluído', 'O pagamento foi realizado com sucesso!');
        } catch (error) {
            Alert.alert(
                'Erro no Pagamento',
                `Erro: ${error.message}\nCódigo: ${
                    error.code || 'N/A'
                }\nDetalhes: ${error.details || 'N/A'}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <TextInput
                style={styles.input}
                placeholder="Digite o Seller ID"
                value={sellerId}
                onChangeText={setSellerId}
                editable={!loading}
            />
            <TextInput
                style={styles.input}
                placeholder="Digite o valor (em reais)"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                editable={!loading}
            />
            <Picker
                selectedValue={paymentType}
                onValueChange={(itemValue) => setPaymentType(itemValue)}
                enabled={!loading}
            >
                <Picker.Item label="Crédito" value="credit" />
                <Picker.Item label="Débito" value="debit" />
            </Picker>
            {paymentType === 'credit' && (
                <TextInput
                    style={styles.input}
                    placeholder="Número de parcelas"
                    value={installments.toString()}
                    onChangeText={(text) => setInstallments(Number(text))}
                    keyboardType="numeric"
                    editable={!loading}
                />
            )}
            <Button
                title="Inicializar SDK"
                onPress={handleInitialize}
                disabled={sdkInitialized || loading}
            />
            <Button
                title="Realizar Pagamento"
                onPress={handlePayment}
                disabled={!sdkInitialized || loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default TestScreen;
