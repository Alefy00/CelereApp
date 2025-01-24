/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';
import { getZoopCredentials } from './zoopCredentials';

const { ZoopModule } = NativeModules;

// Inicializar o SDK com credenciais fixas para teste
const initializeZoopSDK = async () => {
  try {
    const credentials = await getZoopCredentials(); // Agora inclui o seller
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


const realizarPagamento = async (sellerId) => {
  try {
    const amount = 1.00; // Valor em reais
    const paymentType = "credit"; // Tipo de pagamento
    const installments = 2; // Número de parcelas

    const response = await ZoopModule.pay(amount, paymentType, installments, sellerId);
    alert(`Pagamento realizado com sucesso! Detalhes: ${response}`);
    console.log("Pagamento aprovado:", response);

  } catch (error) {
    console.error("Erro ao realizar o pagamento:", error);
    alert(`Erro no pagamento: ${error.message}`);
  }
};

// Exportando as funções para uso no app
export { initializeZoopSDK, realizarPagamento }; // Nome corrigido aqui
