/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, Modal, FlatList, TouchableOpacity, ActivityIndicator, Dimensions, Alert, PermissionsAndroid, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PDFView from 'react-native-pdf';  // Biblioteca para renderizar PDF
import RNFS from 'react-native-fs';  // Para salvar arquivos localmente
import BlobUtil from 'react-native-blob-util';  // Para manipulação de arquivos binários
import styles from './styles';
import { COLORS } from "../../../../../../../constants";

const LiquidatedDetailModal = ({ visible, onClose, account }) => {
    const [isFirstModalVisible, setFirstModalVisible] = useState(visible);
    const [loading, setLoading] = useState(false);
    const [pdfPath, setPdfPath] = useState(null);  // Estado para armazenar o caminho do PDF gerado

    

    // Dados fictícios da lista de compras (como exemplo, substitua com dados reais)
    const products = [
        { id: '1', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
        { id: '2', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
        { id: '3', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    ];

    const totalValue = 'R$84,00';  // Valor fictício (pode ser substituído por valor real)

  // Sincronizar o estado local do modal com a prop 'visible'
  useEffect(() => {
    setFirstModalVisible(visible);
  }, [visible]);

  // Função para fechar o modal e resetar o estado
  const closeFirstModal = () => {
    setFirstModalVisible(false);
    setPdfPath(null); // Resetar o caminho do PDF ao fechar o modal
    onClose();
  };

  // Função para solicitar permissões de armazenamento no Android
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão de Armazenamento',
            message: 'O app precisa de acesso ao armazenamento para exibir o PDF.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // No iOS não é necessário solicitar permissões de armazenamento
  };

  // Função para gerar o recibo de venda e baixar o PDF usando BlobUtil
  const generateReceipt = async () => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Alert.alert('Permissão negada', 'O app precisa de permissão para acessar o armazenamento.');
      return;
    }

    try {
      setLoading(true);

      const pdfUrl = 'https://api.celereapp.com.br/cad/vendas/gerar_recibo_venda/?id=1&empresa_id=3&venda_id=1';
      const pdfPath = `${RNFS.DocumentDirectoryPath}/recibo_venda.pdf`;  // Caminho local para salvar o PDF

      // Usando BlobUtil para baixar e salvar o arquivo PDF diretamente no caminho especificado
      const res = await BlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
        path: pdfPath,  // Caminho onde o PDF será salvo
      }).fetch('GET', pdfUrl);

      // Verificar o status da resposta
      if (res.info().status === 200) {
        console.log('PDF baixado e salvo com sucesso:', pdfPath);
        const fileExists = await RNFS.exists(pdfPath);
        if (fileExists) {
          setPdfPath(pdfPath);  // Armazenar o caminho do arquivo PDF
          Alert.alert('Sucesso', 'Recibo gerado com sucesso!');
        } else {
          throw new Error('O PDF não foi salvo corretamente.');
        }
      } else {
        throw new Error('Erro ao baixar o PDF');
      }
    } catch (error) {
      console.error('Erro ao gerar o recibo:', error);  // Logar o erro no console
      Alert.alert('Erro', 'Não foi possível gerar o recibo.');
    } finally {
      setLoading(false);
    }
  };

    return (
        <>
            <Modal visible={isFirstModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentLiquidate}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.sectionTitle}>Detalhes da venda</Text>
                            <TouchableOpacity onPress={closeFirstModal}>
                                <Text style={styles.modalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerTitle}>
                            <Text style={styles.sectionTitle}>Situação:</Text>
                            <Text style={styles.sectionTitleGreen}>Liquidada</Text>
                        </View>

                        {/* Lista de compras */}
                        <Text style={styles.sectionTitle}>Lista de Compras</Text>
                        <FlatList
                            data={products}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.productItem}>
                                    <Icon name="pricetag-outline" size={24} color="gray" />
                                    <View style={styles.productInfo}>
                                        <Text style={styles.productNome}>{item.nome}</Text>
                                        <Text style={{ color: COLORS.black }}>{item.valor}</Text>
                                    </View>
                                </View>
                            )}
                            contentContainerStyle={styles.productList}
                            style={{ maxHeight: 150 }}  // Limitar a altura do FlatList
                        />

                        {/* Exibir valor total */}
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Valor total:</Text>
                            <Text style={styles.totalValue}>{totalValue}</Text>
                        </View>

                                    {/* Exibir PDF se disponível */}
                                     {pdfPath ? (
                                    <PDFView
                                    source={{ uri: `file://${pdfPath}` }}  // Exibe o PDF salvo localmente
                                    style={{ flex: 1, width: Dimensions.get('window').width, height: 400 }}  // Definir altura adequada para o PDFView
                                    onError={(error) => console.log('Erro ao carregar o PDF:', error)}  // Log de erros do PDFView
                                    onLoadComplete={(numberOfPages, filePath) => {
                                        console.log(`PDF carregado com sucesso: ${numberOfPages} páginas em ${filePath}`);
                                    }}
                                    />
                                ) : (
                                    <Text>Gere o recibo para visualizar o PDF.</Text>
                                )}

                        {/* Botão para gerar recibo */}
                        <TouchableOpacity style={styles.reciboButton} onPress={generateReceipt}>
                            {loading ? (
                                <ActivityIndicator size="small" color={COLORS.black} />
                            ) : (
                                <>
                                    <Icon name="share-social-outline" size={24} color="black" />
                                    <Text style={styles.buttonText}>Gerar recibo</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* Manter outros botões conforme solicitado */}
                        <TouchableOpacity style={styles.cancelButtonModal}>
                            <Icon name="close-circle-outline" size={24} color="black" />
                            <Text style={styles.buttonText}>Cancelar venda</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={closeFirstModal}>
                            <Icon name="return-down-back-sharp" size={24} color="black" />
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LiquidatedDetailModal;
