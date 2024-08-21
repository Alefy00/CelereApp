/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import RenderProduct from './components/RenderProduct.jsx'; // Importa o componente RenderProduct
import styles from "./styles";

const API_URL = 'https://api.celereapp.com.br/cad/produtos/listaprodutovenda/?page_size=100&empresa_id=1&search=';

const NewRegisteredSale = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nextScreen, setNextScreen] = useState("SaleDetails");

  const ITEM_HEIGHT = 150;

  useEffect(() => {
    fetchProducts();
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}${search.toLowerCase()}`); // Padroniza o termo de busca para minúsculas
      console.log('Resposta da API:', response.data);

      if (response.status === 200 && response.data.status === 200) {
        const produtos = response.data.data.map(product => ({
          ...product,

        }));
        setProducts(produtos);
        setFilteredProducts(produtos);
      } else {
        Alert.alert("Erro", "Não foi possível carregar os produtos. Tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao conectar à API:', error.message);
      Alert.alert("Erro", "Erro ao conectar à API. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const total = Object.keys(quantities).reduce((sum, key) => {
      const product = products.find(p => p.id.toString() === key);
      return sum + (product.preco_venda * quantities[key]);
    }, 0);
    setTotalPrice(total);
  }, [quantities]);

  const handleSearch = (text) => {
    setSearch(text);

    // Filtra os produtos com base na pesquisa, ignorando maiúsculas/minúsculas
    const filtered = products.filter(product => 
      product.nome.includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleNext = () => {
    const selectedProducts = Object.keys(quantities).map(key => {
      const product = products.find(p => p.id.toString() === key);
      return {
        ...product,
        amount: quantities[key],
        total: quantities[key] * product.preco_venda,
        imagem: product.imagem ? `https://api.celereapp.com.br${product.imagem}` : null,
      };
    });
    const filteredProducts = selectedProducts.map(product => ({
      ...product,
      imagem: product.imagem || 'https://via.placeholder.com/150', // Define uma imagem padrão caso esteja null
    }));
  
    navigation.navigate(nextScreen, { products: selectedProducts, totalPrice });
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [id]: (prevQuantities[id] || 0) + delta };
      if (newQuantities[id] < 0) newQuantities[id] = 0;
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Retorno'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>+ Registrar novo produto</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Nova Venda</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise por um produto..."
                value={search}
                onChangeText={handleSearch}
              />
              <Icon name="search" size={20} color={COLORS.grey} />
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : (
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <RenderProduct 
                  item={item} 
                  handleQuantityChange={handleQuantityChange} 
                  quantities={quantities} 
                />
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.productsList}
              numColumns={2}
              ListFooterComponent={renderFooter}
              getItemLayout={(data, index) => (
                { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
              )}
            />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, { flex: 1 }]} onPress={() => setNextScreen("SaleDetails")}>
              <Text style={styles.buttonText}>Immediately</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonSell, { flex: 1 }]} onPress={() => setNextScreen("SellOnCredit")}>
              <Text style={styles.buttonText}>Sell on Credit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default NewRegisteredSale;