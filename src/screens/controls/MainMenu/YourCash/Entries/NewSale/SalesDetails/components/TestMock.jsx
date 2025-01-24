/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, View, Alert, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { initializeZoopSDK, realizarPagamento } from '../../../../../../../../services/zoopService';

const TestScreen = () => {
    const [sdkInitialized, setSdkInitialized] = useState(false);
    const [sellerId, setSellerId] = useState("f36b5fadbd414b188227f64553f1c521");
    const [loading, setLoading] = useState(false); // Indica carregamento

    const handleInitialize = async () => {
        setLoading(true); // Ativa o loader
        try {
            await initializeZoopSDK();
            setSdkInitialized(true);
            Alert.alert("Sucesso", "SDK inicializado com sucesso!");
        } catch (error) {
            Alert.alert("Erro", `Falha ao inicializar o SDK: ${error.message}`);
        } finally {
            setLoading(false); // Desativa o loader
        }
    };

    const handlePayment = async () => {
        if (!sdkInitialized) {
            Alert.alert("Atenção", "Inicialize o SDK antes de tentar realizar um pagamento.");
            return;
        }
        setLoading(true); // Ativa o loader
        try {
            await realizarPagamento(sellerId);
            Alert.alert("Pagamento Concluído", "O pagamento foi realizado com sucesso!");
        } catch (error) {
            Alert.alert(
                "Erro no Pagamento",
                `Erro: ${error.message}\nCódigo: ${error.code || 'N/A'}`
            );
        } finally {
            setLoading(false); // Desativa o loader
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
            />
            <Button title="Inicializar SDK" onPress={handleInitialize} />
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
