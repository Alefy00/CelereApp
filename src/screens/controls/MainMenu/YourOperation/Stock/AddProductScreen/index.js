/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Alert, Image, PermissionsAndroid  } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductValues from './componentes/ProductValues';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera } from 'react-native-image-picker';

const API_BASE_URL = 'https://api.celereapp.com.br';
const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;
const UPLOAD_IMAGE_API = `${API_BASE_URL}/mnt/imagensproduto/`;

// Função para solicitar permissão de câmera
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permissão de Câmera",
        message: "Este aplicativo precisa acessar sua câmera para tirar fotos.",
        buttonNeutral: "Pergunte-me depois",
        buttonNegative: "Cancelar",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const AddProductScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [productName, setProductName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [custo, setCusto] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productImage, setProductImage] = useState(null);  // Para armazenar a URI da imagem
  const productValuesRef = useRef();


  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(
          `${CATEGORIES_API}?page_size=100&max_page_size=100&empresa=${empresaId}`
        );
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [fetchCategories])
  );

  const handleMinStockChange = (value) => {
    const newValue = parseInt(value, 10);
    setMinStock(isNaN(newValue) ? 0 : newValue);
  };

  const handleQuantityChange = (value) => {
    const newValue = parseInt(value, 10);
    setQuantity(isNaN(newValue) ? 0 : newValue);
  };

  const handleConfirm = async () => {
    const empresaId = await getEmpresaId();
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não encontrado.');
      return;
    }

    if (!productName) {
      Alert.alert('Erro', 'O nome do produto é obrigatório.');
      return;
    }

    if (quantity === 0) {
      Alert.alert('Erro', 'A quantidade do produto deve ser maior que zero.');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Erro', 'Selecione uma categoria para o produto.');
      return;
    }

    if (!custo) {
      Alert.alert('Erro', 'O preço de custo é obrigatório.');
      return;
    }

    if (!precoVenda) {
      Alert.alert('Erro', 'O preço de venda é obrigatório.');
      return;
    }

    const numericCusto = parseFloat(custo.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const numericPrecoVenda = parseFloat(precoVenda.replace(/[^\d,.-]/g, '').replace(',', '.'));

    const productData = {
      status: true,
      nome: productName,
      descricao: serviceDescription ? serviceDescription : '',
      ean: barcode ? barcode : '',
      custo: numericCusto,
      preco_venda: numericPrecoVenda,
      qtd_estoque: quantity,
      super_categoria: 1,
      categoria: selectedCategory,
      unidade: 1,
      empresa: empresaId,
      usuario: 1,
    };

    try {
      const response = await axios.post(PRODUCTS_API, productData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.status === 'success') {
        await uploadImage(response.data.data.id); // Chama a função para fazer o upload da imagem
        setIsModalVisible(true);
        clearFields();
      } else {
        Alert.alert('Erro', 'Falha ao cadastrar o produto. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.response?.data || error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o produto.');
    }
  };
  // Função para enviar a imagem capturada para a API
  const uploadImage = async (produtoId) => {
    const empresaId = await getEmpresaId();
    if (!empresaId || !productImage) {
      return;
    }

    const formData = new FormData();
    formData.append('empresa', empresaId.toString());
    formData.append('produto', produtoId.toString());
    formData.append('usuario', '1'); // Ajuste o ID do usuário conforme necessário
    formData.append('arquivo', {
      uri: productImage.uri,
      type: productImage.type,
      name: productImage.fileName,
    });

    try {
      const response = await axios.post(UPLOAD_IMAGE_API, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 'success') {
        Alert.alert('Sucesso', 'Imagem do produto enviada com sucesso!');
        setProductImage(response.data.data.imagem); // Atualiza o estado da imagem com a URL retornada
      } else {
        Alert.alert('Erro', 'Falha ao enviar a imagem do produto.');
      }
    } catch (error) {
      console.error('Erro ao enviar a imagem do produto:', error.response?.data || error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a imagem.');
    }
  };
  // Função para abrir a câmera e tirar uma foto
  const handleTakePicture = async () => {
    const hasPermission = await requestCameraPermission();
    
    if (!hasPermission) {
      Alert.alert('Permissão negada', 'Você precisa conceder a permissão de câmera para usar essa funcionalidade.');
      return;
    }

    const options = {
      mediaType: 'photo',
      cameraType: 'back',
      quality: 1,
      includeBase64: false,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('Usuário cancelou a captura de imagem.');
      } else if (response.errorCode) {
        console.log('Erro ao abrir a câmera: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setProductImage(selectedImage); // Salva a imagem selecionada
        Alert.alert('Imagem capturada com sucesso!');
      }
    });
  };
  

  const clearFields = () => {
    setBarcode('');
    setQuantity(0);
    setMinStock(0);
    setProductName('');
    setServiceDescription('');
    setSelectedCategory('');
    setCusto('');
    setPrecoVenda('');
    setProductImage(null);
    if (productValuesRef.current) {
      productValuesRef.current.clearValues();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('StockInfo');
  };

  const handleAddCategory = () => {
    navigation.navigate('IncludeCategoryProducts');
  };




  return (
    <View style={styles.mainContainer}>
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

        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <View style={styles.imageContainer}>
              <TouchableOpacity style={styles.imageButton} onPress={handleTakePicture}>
                {productImage ? (
                  <Image source={{ uri: productImage.uri }} style={styles.productImage} />
                ) : (
                  <Icon name="camera" size={30} color={COLORS.black} />
                )}
              </TouchableOpacity>
              <Text style={styles.imageLabel}>Imagem{"\n"}do produto</Text>
            </View>
          </View>

          <View style={styles.rightContainer}>
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

            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Mínimo em estoque:</Text>
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

        <View style={styles.productDetailsContainer}>
          <Text style={styles.sectionTitle}>Detalhes do Produto</Text>
          <TextInput
            style={styles.productNameInput}
            placeholder="Nome do produto"
            placeholderTextColor={COLORS.lightGray}
            value={productName}
            onChangeText={setProductName}
          />
          <TextInput
            style={styles.serviceDescriptionInput}
            placeholder="Descrição do Produto"
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

        <View style={styles.containerProductValues}>
          <ProductValues 
            ref={productValuesRef}
            onCustoChange={setCusto}
            onPrecoVendaChange={setPrecoVenda}
          />
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleConfirm}>
          <Icon name="checkmark-circle" size={20} color="black" />
          <Text style={styles.buttonText}>Cadastrar produto</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent={true} animationType="slide" onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={90} color={COLORS.green} />
              <Text style={styles.modalText}>Produto cadastrado{'\n'}com sucesso!</Text>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddProductScreen;
