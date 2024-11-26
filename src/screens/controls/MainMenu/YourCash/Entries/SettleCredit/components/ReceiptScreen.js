/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { COLORS } from '../../../../../../../constants';
import styles from './stylesReceip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../../components/BarTop2';
import { API_BASE_URL } from '../../../../../../../services/apiConfig';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const ReceiptScreen = ({ navigation, route }) => {
    const { saleId, fromLiquidateNow, fromLiquidateAgora, fromLiquidateNowService } = route.params; 
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro
    const [pdfPath, setPdfPath] = useState(null); 

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
    const fetchReceipt = useCallback(async () => {
        try {
            console.log('Iniciando requisição para gerar recibo...');
            setLoading(true);
            const empresaId = await AsyncStorage.getItem('empresaId');

            if (!empresaId) {
                Alert.alert('Erro', 'ID da empresa não encontrado.');
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/cad/vendas/gerar_recibo_venda/`, {
                params: {
                    empresa_id: empresaId,
                    venda_id: saleId,
                    is_pdf_file: 'False'
                },
                responseType: 'arraybuffer'
            });

            const base64Data = arrayBufferToBase64(response.data);

            const path = `${RNFetchBlob.fs.dirs.CacheDir}/recibo_${saleId}.pdf`;
            await RNFetchBlob.fs.writeFile(path, base64Data, 'base64');
            setPdfPath(path);
            console.log('PDF salvo em caminho temporário:', path);

            // Verifica o conteúdo do PDF para garantir que não está vazio
            const fileContent = await RNFetchBlob.fs.readFile(path, 'base64');
            if (!fileContent || fileContent.length < 100) { // Um arquivo PDF muito pequeno pode indicar erro
                console.error('Arquivo PDF parece estar incompleto ou corrompido.');
                Alert.alert('Erro', 'O arquivo PDF parece estar incompleto ou corrompido.');
                setError('Erro ao gerar o recibo: arquivo incompleto.');
            } else {
                console.log('PDF salvo com sucesso e encontrado no cache.');
            }
        } catch (error) {
            setError('Erro ao gerar o recibo.');
            console.error('Erro na requisição ou manipulação dos dados:', error);
        } finally {
            setLoading(false);
        }
    }, [saleId]);


    useEffect(() => {
        fetchReceipt();
    }, [fetchReceipt]);

    const handleShare = async () => {
        if (!pdfPath) {
            Alert.alert('Erro', 'O recibo ainda não está pronto para compartilhar.');
            return;
        }

        try {
            const shareOptions = {
                title: 'Compartilhar Recibo',
                url: `file://${pdfPath}`,
            };

            await Share.open(shareOptions);
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Erro ao compartilhar o PDF:', error);
                Alert.alert('Erro', 'Não foi possível compartilhar o PDF.');
            }
        }
    };
    const handleBack = async () => {
        if (pdfPath) {
            const fileExists = await RNFetchBlob.fs.exists(pdfPath);
            if (fileExists) {
                try {
                    await RNFetchBlob.fs.unlink(pdfPath);
                    console.log('Arquivo PDF temporário excluído ao voltar');
                } catch (err) {
                    console.error('Erro ao excluir o arquivo PDF temporário:', err);
                }
            }
        }
    
        // Comportamento baseado no parâmetro de navegação
        if (fromLiquidateNow) {
            navigation.navigate('NewRegisteredSale', { clearCart: true });
        } else if (fromLiquidateAgora) {
            navigation.navigate('SingleSale');
        } else if (fromLiquidateNowService) {
            navigation.navigate('NewRegisteredSale', { clearCart: true });
        } else {
            navigation.goBack();
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

export default ReceiptScreen;
