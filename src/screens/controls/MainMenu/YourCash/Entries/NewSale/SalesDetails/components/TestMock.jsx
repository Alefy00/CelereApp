/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { initializeZoopSDK, realizarPagamento } from '../../../../../../../../services/zoopService';

const TestScreen = () => {
    const [sdkInitialized, setSdkInitialized] = useState(false);
    const [sellerId, setSellerId] = useState("77ccc8a6e43849679496dab43c5c2bc8");

    const handleInitialize = async () => {
        try {
           await initializeZoopSDK();
           setSdkInitialized(true);
            Alert.alert("Sucesso", "SDK inicializado com sucesso!");
        } catch (error) {
            Alert.alert("Erro", `Falha ao inicializar o SDK: ${error.message}`);
        }
    };

    const handlePayment = async () => {
        if (!sdkInitialized) {
            Alert.alert("Atenção", "Inicialize o SDK antes de tentar realizar um pagamento.");
            return;
        }
        try {
            await realizarPagamento(sellerId);
            Alert.alert("Pagamento Concluído", "O pagamento foi realizado com sucesso!");
        } catch (error) {
            Alert.alert("Erro no Pagamento", `Erro: ${error.message}`);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Button title="Inicializar SDK" onPress={handleInitialize} />
            <Button title="Realizar Pagamento" onPress={handlePayment} disabled={!sdkInitialized} />
        </View>
    );
};

export default TestScreen;
