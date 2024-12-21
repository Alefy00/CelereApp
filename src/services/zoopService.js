/* eslint-disable prettier/prettier */
import { NativeModules } from 'react-native';
import { getZoopCredentials } from './zoopCredentials'; // Importa a função de API criada

const { ZoopModule } = NativeModules;

export const initializeZoopSDK = async () => {
  try {
    // Recupera as credenciais da Zoop
    const credentials = await getZoopCredentials();
    console.log('Credentials:', credentials);

    // Inicializa o SDK usando o módulo nativo
    const result = await ZoopModule.initializeSDK(
      credentials.clientId,
      credentials.clientSecret,
      credentials.marketplace,
      credentials.seller,
      credentials.accessKey
    );

    console.log('SDK initialized successfully:', result);
  } catch (error) {
    console.error('Erro ao inicializar o SDK Zoop:', error);
  }
};
