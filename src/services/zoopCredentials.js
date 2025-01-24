/* eslint-disable prettier/prettier */
import axios from 'axios';
import { API_BASE_URL } from './apiConfig';

// Função para obter o token JWT
const getZoopToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/public_zoop_token/`, {
      headers: {
        'X-APP-SECRET': '5af2e31ad6db4da7beac3f298fc63a73ccb7b0a2b4914b58ad7f15424b44389a',
      },
    });
    if (response.data.success) {
      return response.data.token;
    }
    throw new Error('Erro ao obter o token');
  } catch (error) {
    console.error('Erro ao recuperar o token Zoop:', error);
    throw error;
  }
};

export const getZoopCredentials = async () => {
  try {
    const token = await getZoopToken(); // Recupera o token de autenticação
    const response = await axios.get(`${API_BASE_URL}/api/zoop_credentials/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.data);

    if (response.data.success) {
      const { clientId, clientSecret, marketplace, seller, accessKey } = response.data.data;

      // Retorna todas as credenciais incluindo o sellerId
      return {
        clientId,
        clientSecret,
        marketplace,
        seller, 
        accessKey,
      };
    }

    throw new Error('Erro ao obter as credenciais Zoop');
  } catch (error) {
    console.error('Erro ao recuperar as credenciais Zoop:', error);
    throw error;
  }
};
