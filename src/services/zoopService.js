/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';
import { getZoopCredentials } from './zoopCredentials';

const { ZoopModule } = NativeModules;

// Inicializar o SDK corretamente com nome ajustado
const initializeZoopSDK = async () => {  // Nome corrigido aqui
  try {
    const sellerIdManual = "f36b5fadbd414b188227f64553f1c521"; // Seller ID manual para o teste
    const credentials = await getZoopCredentials(sellerIdManual);

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

// Realizar pagamento após a inicialização
const realizarPagamento = async () => {
  try {
    const amount = 1.00; 
    const paymentType = "credit"; 
    const installments = 1; 

    const response = await ZoopModule.pay(amount, paymentType, installments);
    alert(`Pagamento realizado com sucesso! Detalhes: ${response}`);
    console.log("Pagamento aprovado:", response);
  } catch (error) {
    console.error("Erro ao realizar o pagamento:", error);
    alert(`Erro no pagamento: ${error.message}`);
  }
};

// Exportando as funções para uso no app
export { initializeZoopSDK, realizarPagamento }; // Nome corrigido aqui
