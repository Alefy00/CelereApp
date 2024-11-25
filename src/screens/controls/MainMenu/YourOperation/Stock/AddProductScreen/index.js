/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Alert, Image, Dimensions  } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductValues from './componentes/ProductValues';  // Importando o componente
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;
const IMAGE_UPLOAD_API = `${API_BASE_URL}/mnt/imagensproduto/`;

const AddProductScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [productName, setProductName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [custo, setCusto] = useState('');  // Atualizado pelo ProductValues
  const [precoVenda, setPrecoVenda] = useState('');  // Atualizado pelo ProductValues
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);  // Lista de categorias
  const [loading, setLoading] = useState(false); // Atualizado
  const [photo, setPhoto] = useState(null);  // Estado para armazenar a foto tirada
  const productValuesRef = useRef(); // Usamos uma referência para o componente ProductValues
  const { width } = Dimensions.get('window');

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);  // Converte para número se estiver como string
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  };

// Função para selecionar imagem da galeria
const handleSelectImage = async () => {
  launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
    if (response.didCancel) {
      console.log('Usuário cancelou a seleção da imagem');
    } else if (response.errorCode) {
      console.error('Erro ao selecionar imagem:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const selectedPhoto = response.assets[0];
      console.log('Imagem capturada:', selectedPhoto);  // Log da imagem capturada

      setPhoto({
        uri: selectedPhoto.uri,
        type: selectedPhoto.type || 'image/jpeg',  // Define o tipo como 'image/jpeg' por padrão, caso não esteja presente
        name: selectedPhoto.fileName || `photo_${Date.now()}.jpg`,  // Define um nome padrão se 'fileName' estiver ausente
      });
    }
  });
};

  // Função para buscar categorias, agora memoizada com useCallback
  const fetchCategories = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(
          `${CATEGORIES_API}?page_size=100&max_page_size=100&empresa=${empresaId}`
        );
        setCategories(response.data.data);  // Atualiza a lista de categorias
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);  // Sempre encerra o loading
    }
  }, []);

  // Atualiza as categorias sempre que a tela é focada
  useFocusEffect(
    useCallback(() => {
      fetchCategories();  // Atualiza as categorias sempre que a tela é focada
    }, [fetchCategories])
  );

  const handleMinStockChange = (value) => {
    const newValue = parseInt(value, 10);  // Convertendo o valor para inteiro
    setMinStock(isNaN(newValue) ? 0 : newValue);  // Atualizando o estado de 'minStock'
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value, 10);  // Convertendo o valor para inteiro
    setQuantity(isNaN(newValue) ? 0 : newValue);  // Atualizando o estado de 'quantity'
  };

  // Função genérica para validação de campos
  const validateFields = () => {
    if (!productName) return 'O nome do produto é obrigatório!';
    if (quantity === 0) return 'A quantidade do produto deve ser maior que zero!';
    if (!selectedCategory) return 'Selecione uma categoria para o produto!';
    if (!custo) return 'O preço de custo é obrigatório!';
    if (!precoVenda) return 'O preço de venda é obrigatório!';
    return null;
  };

  // Função para confirmar e enviar o cadastro
  const handleConfirm = async () => {
    const error = validateFields();
    if (error) {
      Alert.alert('Erro', error);
      return;
    }

    const empresaId = await getEmpresaId();
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não encontrado!');
      return;
    }

    // Preparando os dados para o envio à API
    const productData = {
      status: true,
      nome: productName,
      descricao: serviceDescription || '',
      ean: barcode || '',
      custo: parseFloat(custo.replace(',', '.')),
      preco_venda: parseFloat(precoVenda.replace(',', '.')),
      qtd_estoque: quantity,
      super_categoria: 1,
      categoria: selectedCategory,
      unidade: 1,
      empresa: empresaId,
      usuario: 1,
    };

    try {
      setLoading(true);
      const response = await axios.post(PRODUCTS_API, productData);
      if (response.data.status === 'success') {
        const productId = response.data.data.id;
        if (photo) {
          await uploadProductImage(productId, empresaId);
        }
        setIsModalVisible(true);
        clearFields();
      } else {
        Alert.alert('Erro', 'Falha ao cadastrar o produto.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.response?.data || error.message);
      Alert.alert('Erro', 'Erro ao cadastrar o produto.');
    } finally {
      setLoading(false);
    }
  };

// Função para enviar a imagem do produto
const uploadProductImage = async (productId, empresaId) => {
  if (!photo) return;  // Certifique-se de que a imagem existe

  const formData = new FormData();
  formData.append('produto', productId);  // ID do produto
  formData.append('empresa', empresaId);  // ID da empresa
  formData.append('arquivo', {
    uri: photo.uri,  // Use o 'uri' da imagem
    type: photo.type,  // Tipo da imagem, como 'image/jpeg'
    name: photo.name,  // Nome do arquivo
  });
  formData.append('usuario', 1);  // ID do usuário (se aplicável)

  try {
    const response = await axios.post(IMAGE_UPLOAD_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Define o tipo como multipart
      },
    });

    if (response.data.status === 'success') {
      console.log('Imagem do produto registrada com sucesso:', response.data);
    } else {
      Alert.alert('Erro', 'Falha ao enviar a imagem.');
    }
  } catch (error) {
    console.error('Erro ao enviar imagem:', error.response?.data || error.message);
    Alert.alert('Erro', 'Erro ao enviar a imagem.');
  }
};

// Função para limpar os campos após cadastro
  const clearFields = () => {
    setBarcode('');
    setQuantity(0);
    setMinStock(0);
    setProductName('');
    setServiceDescription('');
    setSelectedCategory('');
    setCusto('');
    setPrecoVenda('');
    setPhoto(null);  // Limpa a imagem também
    if (productValuesRef.current) {
      productValuesRef.current.clearValues();  // Chama a função clearValues no componente ProductValues
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.goBack();  // Navegar após fechar o modal
  };

  const handleNewProduct = () => {
    setIsModalVisible(false);
  };

  // Função para adicionar uma nova categoria
  const handleAddCategory = () => {
    navigation.navigate('IncludeCategoryProducts');  // Navega para a tela de categorias
  };

  return (
    <View style={styles.mainContainer}>
      {/* Barra Superior */}
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Adicionar um produto no estoque</Text>

        {/* Primeira Parte */}
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
          <View style={styles.imageContainer}>
              {photo ? (
                <Image
                    source={{ uri: photo.uri }}
                   style={{
                    width: width * 0.3,
                    height: width * 0.3,
                    resizeMode: 'contain',
                    borderRadius: 10,
                  }}
                    onError={(error) => console.error('Erro ao carregar a imagem:', error.nativeEvent.error)}
                  />
              ) : (
                <TouchableOpacity style={styles.imageButton} onPress={handleSelectImage}>
                  <Icon name="camera" size={30} color={COLORS.black} />
                </TouchableOpacity>
              )}
              <Text style={styles.imageLabel}>Imagem{"\n"}do produto</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>
            {/* Campo de Código de Barras */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Código de barras(opcional)"
                value={barcode}
                onChangeText={setBarcode}
                keyboardType="numeric"
              />
              <Icon name="barcode-outline" size={25} color={COLORS.black} />
            </View>

            {/* Controle de Quantidade */}
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Quantidade:</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity onPress={() => setQuantity(quantity > 0 ? quantity - 1 : 0)} style={styles.controlButton}>
                  <Icon name="remove-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <TextInput
                  style={styles.controlInput}
                  value={quantity.toString()}
                  onChangeText={handleQuantityChange}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.controlButton}>
                  <Icon name="add-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Controle de Mínimo em Estoque */}
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Mínimo estoque:</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity onPress={() => setMinStock(minStock > 0 ? minStock - 1 : 0)} style={styles.controlButton}>
                  <Icon name="remove-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <TextInput
                  style={styles.controlInput}
                  value={minStock.toString()}
                  onChangeText={handleMinStockChange}
                  keyboardType="numeric"
                />
                <TouchableOpacity onPress={() => setMinStock(minStock + 1)} style={styles.controlButton}>
                  <Icon name="add-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Detalhes do Produto */}
        <View style={styles.productDetailsContainer}>
          <Text style={styles.sectionTitle}>Detalhes do Produto</Text>
          <TextInput
            style={styles.productNameInput}
            placeholder="Nome do produto"
            placeholderTextColor={COLORS.lightGray}
            value={productName}
            onChangeText={setProductName}
            maxLength={30}
          />
          <TextInput
            style={styles.serviceDescriptionInput}
            placeholder="Descrição do Produto(opcional)"
            placeholderTextColor={COLORS.lightGray}
            value={serviceDescription}
            onChangeText={setServiceDescription}
            multiline={true}
          />
        </View>

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categoria do produto</Text>
          <View style={styles.categoryInputContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.categoryPicker}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Escolha uma categoria" value="" />
              {categories.length > 0 && categories.map((category) => (
                <Picker.Item key={category.id} label={category.nome} value={category.id} />
              ))}
            </Picker>

            <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
              <Icon name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Valores do Produto */}
        <View style={styles.containerProductValues}>
          <ProductValues 
            ref={productValuesRef} // Passando a referência para o ProductValues
            onCustoChange={setCusto}  // Passando a função para capturar o valor de custo
            onPrecoVendaChange={setPrecoVenda}  // Passando a função para capturar o valor de preço de venda
          />
        </View>

        {/* Botão de Cadastrar Produto */}
        <TouchableOpacity style={styles.registerButton} onPress={handleConfirm}>
          <Icon name="checkmark-circle" size={20} color={COLORS.black} />
          <Text style={styles.buttonText}>Cadastrar produto</Text>
        </TouchableOpacity>

        {/* Modal de confirmação */}
        <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={90} color={COLORS.green} />
              <Text style={styles.modalText}>Produto cadastrado{'\n'}com sucesso!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleNewProduct}>
                <Text style={styles.modalButtonText}>Cadastrar novo produto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonRetorno} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Retornar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddProductScreen;
