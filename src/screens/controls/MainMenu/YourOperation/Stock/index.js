/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions, Alert } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import UpdateStockModal from './components/UpdateStockModal';
import { API_BASE_URL } from '../../../../../services/apiConfig';

const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;
const IMAGE_API = `${API_BASE_URL}/mnt/imagensproduto/getImagemProd/`;

const StockInfo = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', label: 'Todos os produtos' }]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalCusto, setTotalCusto] = useState(0);
  const [totalVenda, setTotalVenda] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [empresaId, setEmpresaId] = useState(null);

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

  const fetchProductImage = async (empresaId, produtoId) => {
    try {
      console.log(`Fetching image for empresaId: ${empresaId}, produtoId: ${produtoId}`);
      const response = await axios.get(`${IMAGE_API}?empresa=${empresaId}&produto=${produtoId}`);
      if (response.data && response.data.status === 'success') {
        const imagePath = response.data.data.imagem;
        return imagePath.startsWith('/media') ? `${API_BASE_URL}${imagePath}` : imagePath;
      } else {
        console.error('Erro ao buscar imagem do produto:', response.data.message);
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar imagem do produto:', error.message);
      return null;
    }
  };

  // Memoize fetchProductsWithImages using useCallback
  const fetchProductsWithImages = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(`${PRODUCTS_API}?empresa=${empresaId}`);
        if (response.data && response.data.status === 200) {
          const productsData = response.data.data;

          const productsWithImages = await Promise.all(productsData.map(async (product) => {
            const imagePath = await fetchProductImage(empresaId, product.id);
            return {
              ...product,
              image_url: imagePath ? `${API_BASE_URL}${imagePath}` : null,
            };
          }));

          setProducts(productsWithImages);
          setFilteredProducts(productsWithImages);

          const totalCustoCalc = productsWithImages.reduce((sum, product) => sum + parseFloat(product.custo), 0);
          const totalVendaCalc = productsWithImages.reduce((sum, product) => sum + (parseFloat(product.preco_venda) * product.qtd_estoque), 0);
          const totalItemsCalc = productsWithImages.reduce((sum, product) => sum + product.qtd_estoque, 0);

          setTotalCusto(totalCustoCalc.toFixed(2));
          setTotalVenda(totalVendaCalc.toFixed(2));
          setTotalItems(totalItemsCalc);
        } else {
          Alert.alert('Erro', 'Falha ao recuperar produtos.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error.message);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os produtos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(`${CATEGORIES_API}?empresa_id=${empresaId}`);
        if (response.data && response.data.data) {
          const apiCategories = response.data.data
            .filter(cat => cat.empresa.id === empresaId)
            .map((cat) => ({
              id: cat.id.toString(),
              label: cat.nome,
            }));

          const uniqueCategories = Array.from(new Set(apiCategories.map(a => a.id)))
            .map(id => {
              return apiCategories.find(a => a.id === id);
            });

          setCategories([{ id: 'all', label: 'Todos os produtos' }, ...uniqueCategories]);
        } else {
          Alert.alert('Erro', 'Falha ao recuperar categorias.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as categorias.');
    }
  }, []);

  useEffect(() => {
    fetchProductsWithImages();
    fetchCategories();
  }, [fetchProductsWithImages, fetchCategories]);

  const applyFilters = useCallback(() => {
    let filtered = products;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.categoria.id.toString() === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [activeFilter, searchTerm, products]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleCategorySelect = (categoryId) => {
    setActiveFilter(categoryId);
  };

  // Função para selecionar o produto e abrir o modal
  const handleProductSelect = (product) => {
    console.log('Produto selecionado:', product);  // Verifica se o produto está sendo selecionado corretamente
    setSelectedProduct(product);  // Define o produto selecionado
    setIsModalVisible(true);  // Abre o modal
    console.log('Modal visível?', isModalVisible);  // Verifica o estado do modal
  };

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={activeFilter === item.id ? styles.filterButtonActive : styles.filterButton}
      onPress={() => handleCategorySelect(item.id)}
    >
      <Text
        style={activeFilter === item.id ? styles.filterButtonTextActive : styles.filterButtonText}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductSelect(item)}>
      <View style={styles.productItem}>
        <Image
          source={item.image_url ? { uri: item.image_url } : require('../../../../../assets/images/png/placeholder.png')}
          style={styles.productImage}
          onError={() => console.log('Erro ao carregar a imagem do produto', item.nome)}
        />
        <View style={styles.productInfo}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.productTitle}>{item.nome}</Text>
            <Text style={styles.productAvailable}>Disponíveis: {item.qtd_estoque}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAddProduct = () => {
    navigation.navigate("AddProductScreen");
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

      {/* Cabeçalho e dados de resumo */}
      <View style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Seu estoque</Text>
          <View style={styles.gridContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Qtd. Categorias</Text>
              <Text style={styles.cardValue}>{categories.length}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Preço de Custo</Text>
              <Text style={styles.cardValue}>R${totalCusto}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Qtd. Itens</Text>
              <Text style={styles.cardValue}>{totalItems}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Preço de Venda</Text>
              <Text style={styles.cardValue}>R${totalVenda}</Text>
            </View>
          </View>
        </View>

        <FlatList
          data={categories}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um produto..."
          placeholderTextColor="#AAAAAA"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={true}
      />

      <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity style={styles.fixedButton2} onPress={handleAddProduct}>
          <Icon name="add-outline" size={30} color="#000" />
          <Text style={styles.textAdd}>Adicionar produto</Text>
        </TouchableOpacity>
      </View>

      {selectedProduct && (
        <UpdateStockModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            fetchProductsWithImages();  // Atualiza a lista de produtos após fechar o modal
          }}
          product={selectedProduct}
          empresaId={empresaId}
        />
      )}
    </View>
  );
};

export default StockInfo;
