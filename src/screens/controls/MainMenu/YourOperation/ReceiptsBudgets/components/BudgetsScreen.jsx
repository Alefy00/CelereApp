/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Share from 'react-native-share';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { COLORS } from '../../../../../../constants';
import styles from '../../../YourCash/Entries/SettleCredit/components/stylesReceip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../components/BarTop2';
import { API_BASE_URL } from '../../../../../../services/apiConfig';
import { useFocusEffect } from '@react-navigation/native';

const BudgetsScreen = ({ navigation, route }) => {
    const { saleId } = route.params;  // ID do orçamento passado para a tela
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [pdfPath, setPdfPath] = useState(null); 

    const showAlert = (title, message) => Alert.alert(title, message);

    // Função auxiliar para converter ArrayBuffer para Base64
    const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return RNFetchBlob.base64.encode(binary);
};
    // Função para obter o ID da empresa logada
    const getEmpresaId = useCallback(async () => {
        try {
            const storedEmpresaId = await AsyncStorage.getItem('empresaId');
            if (storedEmpresaId) return Number(storedEmpresaId);
            showAlert('Erro', 'ID da empresa não encontrado.');
            return null;
        } catch (error) {
            console.error('Erro ao buscar o ID da empresa:', error);
            return null;
        }
    }, []);

    const fetchReceipt = useCallback(async () => {
        try {
            console.log('Iniciando requisição para gerar orçamento...');
            setLoading(true);
            const empresaId = await getEmpresaId();

            if (!empresaId) {
                setLoading(false);
                return;
            }

            // Requisição para obter o PDF do orçamento como arraybuffer
            const response = await axios.get(`${API_BASE_URL}/cad/orcamento/gerar_recibo_orcamento/`, {
                params: {
                    empresa_id: empresaId,
                    orcamento_id: saleId,
                    is_pdf_file: 'False'
                },
                responseType: 'arraybuffer'
            });

            const base64Data = arrayBufferToBase64(response.data);
            const path = `${RNFetchBlob.fs.dirs.CacheDir}/orcamento_${saleId}.pdf`;
            await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
            setPdfPath(path);
            console.log('PDF salvo em caminho temporário:', path);

            // Verifica o conteúdo do PDF para garantir que não está vazio
            const fileContent = await RNFetchBlob.fs.readFile(path, 'base64');
            if (!fileContent || fileContent.length < 100) {
                console.error('Arquivo PDF parece estar incompleto ou corrompido.');
                Alert.alert('Erro', 'O arquivo PDF parece estar incompleto ou corrompido.');
                setError('Erro ao gerar o orçamento: arquivo incompleto.');
            } else {
                console.log('PDF salvo com sucesso e encontrado no cache.');
            }
        } catch (error) {
            setError('Erro ao gerar o orçamento.');
            console.error('Erro na requisição ou manipulação dos dados:', error);
        } finally {
            setLoading(false);
        }
    }, [saleId, getEmpresaId]);


    useEffect(() => {
        fetchReceipt();
    }, [fetchReceipt]);

    useFocusEffect(
        useCallback(() => {
          // Quando entra na tela, não há necessidade de ações
      
          // Quando sai da tela
          return async () => {
            if (pdfPath) {
              const fileExists = await RNFetchBlob.fs.exists(pdfPath);
              if (fileExists) {
                try {
                  await RNFetchBlob.fs.unlink(pdfPath);
                  console.log('Arquivo PDF temporário excluído ao sair da tela');
                } catch (err) {
                  console.error('Erro ao excluir o arquivo PDF temporário:', err);
                }
              }
            }
          };
        }, [pdfPath])
      );
      
    const handleShare = async () => {
        if (!pdfPath) {
          showAlert('Erro', 'O orçamento ainda não está pronto para compartilhar.');
          return;
        }
      
        try {
          const fileExists = await RNFetchBlob.fs.exists(pdfPath);
          if (!fileExists) {
            showAlert('Erro', 'O arquivo PDF não foi encontrado.');
            return;
          }
      
          const shareOptions = {
            title: 'Compartilhar Orçamento',
            url: `file://${pdfPath}`,
            failOnCancel: false, // Ignora cancelamento como erro
            type: 'application/pdf',
          };
      
          await Share.open(shareOptions);
          console.log('PDF compartilhado com sucesso.');
        } catch (error) {
          if (error.message !== 'User did not share') {
            console.error('Erro ao compartilhar o PDF:', error);
            showAlert(
              'Erro',
              'Não foi possível compartilhar o PDF. Verifique se o aplicativo de destino permite o compartilhamento de arquivos PDF.'
            );
          }
        }
      };
      
      

    // Função para voltar para a tela anterior
    const handleBack = async () => {
      // Excluímos o arquivo temporário ao voltar, caso ele ainda exista
      if (pdfPath) {
        const fileExists = await RNFetchBlob.fs.exists(pdfPath);
        if (fileExists) {
          await RNFetchBlob.fs.unlink(pdfPath);
          console.log('Arquivo PDF temporário excluído ao voltar');
        }
      }
      // Verifica se a navegação veio de 'Budget' ou usa o comportamento padrão
      if (route.params?.from === 'Budget') {
        navigation.navigate('Budget'); // Voltar para a tela Budget
      } else {
        navigation.navigate('NewBudgets', { clearCart: true }); // Limpa o carrinho e volta para NewBudgets
      }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BarTop2 
                    titulo="Voltar"
                    backColor={COLORS.primary}
                    foreColor={COLORS.black}
                    onPress={() => navigation.goBack()}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={COLORS.black} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : pdfPath ? (
                <Pdf
                    source={{ uri: `file://${pdfPath}` }}
                    style={styles.pdf}
                    onError={(err) => {
                        console.error('Erro no Pdf:', err);
                        Alert.alert('Erro', 'Não foi possível carregar o PDF.');
                    }}
                    onLoadComplete={() => {
                        console.log('PDF carregado com sucesso');
                    }}
                />
            ) : null}

            {/* Botões */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                    <Icon name="share-social-outline" size={24} color="black" />
                    <Text style={styles.buttonText}>Compartilhar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
                    <Icon name="return-down-back-sharp" size={24} color="black" />
                    <Text style={styles.buttonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BudgetsScreen;
