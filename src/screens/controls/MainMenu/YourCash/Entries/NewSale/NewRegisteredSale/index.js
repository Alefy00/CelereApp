/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Modal } from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import RenderProduct from './components/RenderProduct.jsx'; // Importa o componente RenderProduct
import styles from "./styles";

const API_URL = 'https://api.celereapp.com.br/cad/produtos/listaprodutovenda/?page_size=100&empresa_id=1&search=';

// Adicionar serviços fictícios ao estado
const fakeServices = [
  { id: 's1', nome: 'Consultoria', categoria: 'Serviços', preco_venda: 1500, imagem: 'https://via.placeholder.com/150' },
  { id: 's2', nome: 'Manutenção de Software', categoria: 'Serviços', preco_venda: 800, imagem: 'https://via.placeholder.com/150' },
  { id: 's3', nome: 'Design de Logo', categoria: 'Serviços', preco_venda: 1200, imagem: 'https://via.placeholder.com/150' }
];

const showAlert = (title, message) => {
  Alert.alert(title, message);
};

const NewRegisteredSale = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories] = useState(['Todos', 'Serviços', 'Diversos', 'Celulares']);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fourthModalVisible, setFourthModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.selectedProducts) {
      const prevProducts = route.params.selectedProducts;
      const newQuantities = {};
      prevProducts.forEach((product) => {
        newQuantities[product.id.toString()] = product.amount;
      });
      setQuantities(newQuantities);
    }
    if (route.params?.resetCart) {
      resetCart();
    }
  }, [route.params?.selectedProducts, route.params?.resetCart]);

  const resetCart = () => {
    setQuantities({});
    setTotalPrice(0);
  };

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}${search.toLowerCase()}`);
      if (response.status === 200 && response.data.status === 200) {
        const produtos = response.data.data;
        setProducts([...produtos, ...fakeServices]);
        setFilteredProducts([...produtos, ...fakeServices]);
      } else {
        showAlert("Erro", "Não foi possível carregar os produtos.");
      }
    } catch (error) {
      showAlert("Erro", "Erro ao conectar à API.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const total = Object.keys(quantities).reduce((sum, key) => {
      const product = products.find(p => p.id.toString() === key);
      return sum + (product.preco_venda * quantities[key]);
    }, 0);
    setTotalPrice(total);
  }, [quantities, products]);

  const handleSearch = (text) => {
    setSearch(text);
    filterProducts(text, selectedCategory);
  };

  const filterProducts = (text, category) => {
    const filtered = products.filter(product => 
      product.nome.toLowerCase().includes(text.toLowerCase()) && 
      (category === 'Todos' || product.categoria === category)
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(search, category);
  };

  const handleNext = () => {
    const selectedItems = Object.keys(quantities).map(key => {
      const product = products.find(p => p.id.toString() === key);
      return {
        ...product,
        amount: quantities[key],
        total: quantities[key] * (parseFloat(product.preco_venda) || 0),
        imagem: product.imagem ? `https://api.celereapp.com.br${product.imagem}` : null,
      };
    }).filter(item => item !== null);

    const previousItems = route.params?.selectedProducts || [];
    const allSelectedItems = [...previousItems];

    selectedItems.forEach((newItem) => {
      const existingItemIndex = allSelectedItems.findIndex(item => item.id === newItem.id);
      if (existingItemIndex >= 0) {
        allSelectedItems[existingItemIndex].amount += newItem.amount;
        allSelectedItems[existingItemIndex].total += newItem.total;
      } else {
        allSelectedItems.push(newItem);
      }
    });

    const totalPrice = allSelectedItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);

    const services = allSelectedItems.filter(item => item.categoria === 'Serviços');
    const nonServices = allSelectedItems.filter(item => item.categoria !== 'Serviços');

    navigateToNextScreen(services, nonServices, allSelectedItems, totalPrice);
  };

  const navigateToNextScreen = (services, nonServices, allSelectedItems, totalPrice) => {
    if (services.length > 0 && nonServices.length > 0) {
      navigation.navigate('ServiceDetails', { services: allSelectedItems, totalPrice });
    } else if (services.length > 0) {
      navigation.navigate('ServiceDetails', { services, totalPrice });
    } else if (nonServices.length > 0) {
      navigation.navigate('SaleDetails', { products: nonServices, totalPrice });
    } else {
      showAlert('Erro', 'Nenhum produto ou serviço foi selecionado.');
    }
  };

  const handleQuantityChange = (id, delta) => {
    const product = products.find(p => p.id.toString() === id);
    const isService = product && product.categoria === 'Serviços';

    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [id]: isService ? (delta > 0 ? 1 : 0) : (prevQuantities[id] || 0) + delta };
      if (newQuantities[id] === 0) delete newQuantities[id];
      return newQuantities;
    });
  };

  const renderFooter = () => (
    <>
      {totalPrice > 0 && (
        <View style={styles.confirmationCard}>
          <Text style={styles.totalPrice}>Total: R${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={handleNext}>
            <Icon name="checkmark-circle" size={25} color={COLORS.black} />
            <Text style={styles.confirmButtonText}>Confirmar essa venda</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.barcodeButton}>
        <Icon name="barcode" size={30} color={COLORS.black} />
      </TouchableOpacity>
    </>
  );

  const toggleFourthModal = () => setFourthModalVisible(!fourthModalVisible);
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <BarTop2 titulo="Voltar" backColor={COLORS.primary} foreColor={COLORS.black} />
          <View style={styles.header}>
            <TouchableOpacity style={styles.registerButton} onPress={toggleFourthModal}>
              <Icon name="add" size={20} color={COLORS.black} />
              <Text style={styles.registerButtonText}>Cadastrar produto ou serviço</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Nova Venda</Text>
            <View style={styles.searchContainer}>
              <TextInput style={styles.searchInput} placeholder="Pesquise por um produto..." value={search} onChangeText={handleSearch} />
              <Icon name="search" size={20} color={COLORS.grey} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[styles.categoryButton, selectedCategory === category && styles.categoryButtonActive]}
                  onPress={() => handleCategoryChange(category)}
                >
                  <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => <RenderProduct item={item} handleQuantityChange={handleQuantityChange} quantities={quantities} />}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.productsList}
              numColumns={2}
              ListFooterComponent={renderFooter}
            />
          )}

          <Modal visible={fourthModalVisible} animationType="slide" transparent onRequestClose={toggleFourthModal}>
            <View style={styles.fourthModalOverlay}>
              <View style={styles.fourthModalContent}>
                <View style={styles.fourthModalHeader}>
                  <Text style={styles.fourthModalTitle}>Selecione uma opção:</Text>
                  <TouchableOpacity onPress={toggleFourthModal}>
                    <Icon name="close" size={25} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.fourthModalButton} onPress={() => navigation.navigate('AddProductScreen')}>
                  <Text style={styles.fourthModalText}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourthModalButton} onPress={() => navigation.navigate('AddService')}>
                  <Text style={styles.fourthModalText}>Serviços</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewRegisteredSale;
