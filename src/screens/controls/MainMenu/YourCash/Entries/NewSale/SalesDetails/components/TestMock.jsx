/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { initializeZoopSDK, realizarPagamento } from '../../../../../../../../services/zoopService';

const TestScreen = () => {
    const [sdkInitialized, setSdkInitialized] = useState(false);

    const handleInitialize = async () => {
        try {
            await initializeZoopSDK(); // Correção aqui no nome da função
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
            await realizarPagamento();
            Alert.alert("Pagamento Concluído", "O pagamento foi realizado com sucesso!");
        } catch (error) {
            Alert.alert("Erro no Pagamento", error.message);
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
