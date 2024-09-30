/* eslint-disable prettier/prettier */
import React, { useState, useRef, useCallback } from 'react';  // Adicionando useCallback
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Alert } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductValues from './componentes/ProductValues';  // Importando o componente
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ** Constantes para URLs e Headers **
const API_BASE_URL = 'https://api.celereapp.com.br';
const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;

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
  const [loading, setLoading] = useState(true);
  const productValuesRef = useRef(); // Usamos uma referência para o componente ProductValues

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

  const handleConfirm = async () => {
    const empresaId = await getEmpresaId();  // Busca o ID da empresa logada
    
    if (!empresaId) {
      Alert.alert("Erro", "ID da empresa não encontrado!");
      return;
    }
  
    if (!productName) {
      Alert.alert("Erro", "O nome do produto é obrigatório!");
      return;
    }
  
    if (quantity === 0) {
      Alert.alert("Erro", "A quantidade do produto deve ser maior que zero!");
      return;
    }
  
    if (!selectedCategory) {
      Alert.alert("Erro", "Selecione uma categoria para o produto!");
      return;
    }
  
    if (!custo) {
      Alert.alert("Erro", "O preço de custo é obrigatório!");
      return;
    }
  
    if (!precoVenda) {
      Alert.alert("Erro", "O preço de venda é obrigatório!");
      return;
    }
  
    // Converter os valores de custo e preço de venda para números
    const numericCusto = parseFloat(custo.replace(/[^\d,.-]/g, '').replace(',', '.'));
    const numericPrecoVenda = parseFloat(precoVenda.replace(/[^\d,.-]/g, '').replace(',', '.'));
  
    // Preparando os dados para o envio à API
    const productData = {
      status: true,  // Este campo é obrigatório
      nome: productName,
      descricao: serviceDescription ? serviceDescription : "",  // Descrição opcional (string vazia se não houver descrição)
      ean: barcode ? barcode : "",  // Código de barras opcional (string vazia se não houver código de barras)
      custo: numericCusto,  // Enviando valor numérico
      preco_venda: numericPrecoVenda,  // Enviando valor numérico
      qtd_estoque: quantity,
      super_categoria: 1,  // Super categoria (fornecer valor default se necessário)
      categoria: selectedCategory,
      unidade: 1,  // Unidade (fornecer valor default se necessário)
      empresa: empresaId,  // ID da empresa (não pode ser nulo)
      usuario: 1,  // ID do usuário (defina o ID correto do usuário)
    };
  
    try {
      const response = await axios.post(PRODUCTS_API, productData, {
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.data.status === 'success') {
        setIsModalVisible(true);  // Exibe modal de sucesso
        // Limpar os campos após o sucesso
        clearFields();
      } else {
        Alert.alert("Erro", "Falha ao cadastrar o produto. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error.response?.data || error.message);  // Mostra detalhes do erro
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o produto.");
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
    if (productValuesRef.current) {
      productValuesRef.current.clearValues();  // Chama a função clearValues no componente ProductValues
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('StockInfo');  // Navegar após fechar o modal
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
              <TouchableOpacity style={styles.imageButton}>
                <Icon name="camera" size={30} color={COLORS.black} />
              </TouchableOpacity>
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

        {/* Detalhes do Produto */}
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
          <Icon name="checkmark-circle" size={20} color="black" />
          <Text style={styles.buttonText}>Cadastrar produto</Text>
        </TouchableOpacity>

        {/* Modal de confirmação */}
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
