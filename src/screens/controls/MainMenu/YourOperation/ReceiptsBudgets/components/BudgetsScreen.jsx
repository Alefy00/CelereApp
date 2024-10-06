/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { COLORS } from '../../../../../../constants';
import styles from '../../../YourCash/Entries/SettleCredit/components/stylesReceip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../components/BarTop2';

const BudgetsScreen = ({ navigation, route }) => {
    const { saleId } = route.params;  // ID do orçamento passado para a tela
    const [pdfUrl, setPdfUrl] = useState(null); // URL do PDF retornada pela API
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const [error, setError] = useState(null); // Estado de erro

    const showAlert = (title, message) => Alert.alert(title, message);

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

// Função para obter a URL do recibo
const fetchReceipt = useCallback(async () => {
    try {
        console.log('Iniciando requisição para gerar recibo...');
        setLoading(true);
        const empresaId = await getEmpresaId();

        if (!empresaId) {
            setLoading(false);
            return;
        }

        // Requisição para obter a URL do PDF com orcamento_id em vez de venda_id
        const response = await axios.get(`https://api.celereapp.com.br/cad/orcamento/gerar_recibo_orcamento/`, {
            params: {
                empresa_id: empresaId,
                orcamento_id: saleId,  // Alterado para orcamento_id
                is_pdf_file: true  // Garantir que a resposta seja a URL do PDF
            }
        });

        console.log('Resposta da API:', response.data);  // Log da resposta da API

        // Verifique se a URL foi recebida corretamente
        if (response.data?.url) {
            setPdfUrl(response.data.url);  // Definir a URL do PDF
        } else {
            setError('Erro ao gerar o recibo: URL não encontrada.');
            console.error('Erro: URL do PDF não encontrada na resposta.');
        }
    } catch (error) {
        setError('Erro ao gerar o recibo.');
        console.error('Erro na requisição:', error.response ? error.response.data : error.message);
    } finally {
        setLoading(false);
    }
}, [saleId, getEmpresaId]);


    useEffect(() => {
        fetchReceipt();
    }, [fetchReceipt]);

    // Função para compartilhar a URL do PDF
    const handleShare = async () => {
        if (!pdfUrl) {
            showAlert('Erro', 'O recibo ainda não está pronto para compartilhar.');
            return;
        }

        try {
            const shareOptions = {
                title: 'Compartilhar Recibo',
                url: pdfUrl,  // Compartilhando o link da URL do PDF
            };

            await Share.open(shareOptions);
        } catch (error) {
            if (error.message !== 'User did not share') {
                console.error('Erro ao compartilhar o link:', error);
                showAlert('Erro', 'Não foi possível compartilhar o link.');
            } else {
                console.log('Usuário cancelou o compartilhamento.');
            }
        }
    };

    // Função para voltar para a tela anterior
    const handleBack = () => {
        navigation.navigate('NewBudgets', { clearCart: true });  // Limpa o carrinho ao voltar
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

            {/* Carregamento ou erro */}
            {loading ? (
                <ActivityIndicator size="large" color={COLORS.black} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : pdfUrl ? (
                <WebView
                    source={{ uri: `https://docs.google.com/viewer?url=${pdfUrl}&embedded=true` }}  // Usando Google Docs Viewer
                    style={styles.pdf}
                    onError={(err) => {
                        console.error('Erro no WebView:', err.nativeEvent);
                        showAlert('Erro', 'Não foi possível carregar o PDF.');
                    }}
                    onLoadEnd={() => console.log('PDF carregado com sucesso')}
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
