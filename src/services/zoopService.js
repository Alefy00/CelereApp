/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';
import { getZoopCredentials } from './zoopCredentials';

const { ZoopModule } = NativeModules;

// Inicializar o SDK com credenciais fixas para teste
const initializeZoopSDK = async () => {
  try {
    const credentials = await getZoopCredentials();
    await ZoopModule.initializeSDK(
      credentials.clientId,
      credentials.clientSecret,
      credentials.marketplace,
      credentials.seller, 
      credentials.accessKey
    );
    console.log("SDK inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o SDK:", error);
    alert(`Erro: ${error.message}`);
  }
};


const realizarPagamento = async (sellerId, amount, paymentType, installments) => {
  try {
    const response = await ZoopModule.pay(amount, paymentType, installments, sellerId);
    return response; // Retorna a resposta do pagamento
  } catch (error) {
    throw error; // Lança o erro para tratamento
  }
};

// Exportando as funções para uso no app
export { initializeZoopSDK, realizarPagamento };
