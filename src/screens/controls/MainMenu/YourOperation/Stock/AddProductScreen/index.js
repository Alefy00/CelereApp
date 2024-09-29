/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, Alert, ActivityIndicator } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductValues from './componentes/ProductValues';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const AddProductScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [productName, setProductName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [custo, setCusto] = useState(''); // Novo campo: custo
  const [precoVenda, setPrecoVenda] = useState(''); // Novo campo: preço de venda
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar categorias
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://api.celereapp.com.br/mnt/categoriasprodutos/?page_size=100&max_page_size=100&empresa=1'
      );
      setCategories(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      setLoading(false);
    }
  };

  // Atualizar lista de categorias quando a tela for focada
  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [])
  );

  // Função para navegar para a tela de adicionar categoria
  const handleAddCategory = () => {
    navigation.navigate('IncludeCategoryProducts');
  };

  // Função para registrar produto
  const handleConfirm = async () => {
    if (!productName || !serviceDescription || !barcode || !quantity || !selectedCategory || !custo || !precoVenda) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    const productData = {
      status: true,
      nome: productName,
      descricao: serviceDescription,
      ean: barcode,
      custo: parseFloat(custo), // Convertendo custo para número
      preco_venda: parseFloat(precoVenda), // Convertendo preço de venda para número
      qtd_estoque: quantity,
      super_categoria: 1, // Ajuste conforme necessário
      categoria: selectedCategory,
      unidade: 1, // Ajuste conforme necessário
      empresa: 1, // Ajuste conforme necessário
      usuario: 1, // Ajuste conforme necessário
    };

    try {
      const response = await axios.post(
        'https://api.celereapp.com.br/cad/produtos/',
        productData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.data.status === 'success') {
        setIsModalVisible(true); // Exibir modal de sucesso
      } else {
        Alert.alert("Erro", "Falha ao cadastrar o produto. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o produto.");
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    navigation.navigate('StockInfo'); // Navegar após fechar o modal
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
                placeholder="Código de barras"
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
                <TouchableOpacity onPress={() => setQuantity(quantity - 1)} style={styles.controlButton}>
                  <Icon name="remove-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.controlValue}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.controlButton}>
                  <Icon name="add-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Controle de Mínimo em Estoque */}
            <View style={styles.controlRow}>
              <Text style={styles.controlLabel}>Mínimo em estoque:</Text>
              <View style={styles.controlButtons}>
                <TouchableOpacity onPress={() => setMinStock(minStock - 1)} style={styles.controlButton}>
                  <Icon name="remove-outline" size={20} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.controlValue}>{minStock}</Text>
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
            placeholder="Descrição do Serviço"
            placeholderTextColor={COLORS.lightGray}
            value={serviceDescription}
            onChangeText={setServiceDescription}
            multiline={true}
          />
        </View>

        {/* Categoria do Produto */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categoria do produto</Text>

          {/* Exibir indicador de carregamento enquanto busca categorias */}
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View style={styles.categoryInputContainer}>
              <Picker
                selectedValue={selectedCategory}
                style={styles.categoryPicker}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Escolha uma categoria" value="" />
                {categories.map((category) => (
                  <Picker.Item key={category.id} label={category.nome} value={category.id} />
                ))}
              </Picker>

              {/* Botão para adicionar categoria */}
              <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                <Icon name="add" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Campo de Custo */}
        <View style={styles.productDetailsContainer}>
          <Text style={styles.sectionTitle}>Custo do Produto</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o custo"
            placeholderTextColor={COLORS.lightGray}
            value={custo}
            onChangeText={setCusto}
            keyboardType="numeric" // Definir como numérico
          />
        </View>

        {/* Campo de Preço de Venda */}
        <View style={styles.productDetailsContainer}>
          <Text style={styles.sectionTitle}>Preço de Venda</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira o preço de venda"
            placeholderTextColor={COLORS.lightGray}
            value={precoVenda}
            onChangeText={setPrecoVenda}
            keyboardType="numeric" // Definir como numérico
          />
        </View>

        {/* Valores do Produto */}
        <View style={styles.containerProductValues}>
          <ProductValues />
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
