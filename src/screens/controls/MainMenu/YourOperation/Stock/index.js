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

const SLIDER_WIDTH = Dimensions.get('window').width;

// Constantes para a API
const API_BASE_URL = 'https://api.celereapp.com.br';
const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;

const StockInfo = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all'); // Filtro "Todos os produtos" como padrão
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Para armazenar os produtos filtrados
  const [categories, setCategories] = useState([{ id: 'all', label: 'Todos os produtos' }]); // Todos os produtos
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de busca
  const [loading, setLoading] = useState(true);
  const [totalCusto, setTotalCusto] = useState(0);
  const [totalVenda, setTotalVenda] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false); // Controle da visibilidade do modal
  const [selectedProduct, setSelectedProduct] = useState(null); // Produto selecionado
  const [empresaId, setEmpresaId] = useState(null);



  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId); // Converte para número se estiver como string
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  };

  // Função para buscar os produtos da API e calcular os totais
// Função para buscar os produtos da API e calcular os totais
const fetchProducts = useCallback(async () => {
  try {
    const empresaId = await getEmpresaId();
    if (empresaId) {
      // Atualizando o parâmetro de empresa_id para empresa
      const response = await axios.get(`${PRODUCTS_API}?empresa=${empresaId}`);
      if (response.data && response.data.status === 200) {
        const productsData = response.data.data;
        setProducts(productsData);
        setFilteredProducts(productsData); // Inicialmente, todos os produtos são exibidos

        // ** Cálculos dos totais **
        const totalCustoCalc = productsData.reduce((sum, product) => sum + parseFloat(product.custo), 0);
        const totalVendaCalc = productsData.reduce((sum, product) => sum + (parseFloat(product.preco_venda) * product.qtd_estoque), 0);
        const totalItemsCalc = productsData.reduce((sum, product) => sum + product.qtd_estoque, 0);

        setTotalCusto(totalCustoCalc.toFixed(2)); // Atualiza o preço de custo
        setTotalVenda(totalVendaCalc.toFixed(2)); // Atualiza o preço de venda
        setTotalItems(totalItemsCalc); // Atualiza a quantidade de itens
      } else {
        Alert.alert('Erro', 'Falha ao recuperar produtos.');
      }
    }
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    Alert.alert('Erro', 'Ocorreu um erro ao buscar os produtos.');
  } finally {
    setLoading(false);
  }
}, []);

  // Função para buscar as categorias da API e remover duplicatas
  const fetchCategories = useCallback(async () => {
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        const response = await axios.get(`${CATEGORIES_API}?empresa_id=${empresaId}`);
        if (response.data && response.data.data) {
          const apiCategories = response.data.data
            .filter(cat => cat.empresa.id === empresaId)  // Filtrar categorias da empresa
            .map((cat) => ({
              id: cat.id.toString(),
              label: cat.nome,
            }));

          // Remover duplicatas
          const uniqueCategories = Array.from(new Set(apiCategories.map(a => a.id)))
            .map(id => {
              return apiCategories.find(a => a.id === id);
            });

          setCategories([{ id: 'all', label: 'Todos os produtos' }, ...uniqueCategories]); // Exibe as categorias filtradas e únicas
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
    fetchProducts();
    fetchCategories(); // Faz a requisição para as categorias também
  }, [fetchProducts, fetchCategories]);

  // Função para aplicar o filtro de categoria e de busca nos produtos
  const applyFilters = useCallback(() => {
    let filtered = products;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(product => product.categoria.id.toString() === activeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(product => product.nome.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredProducts(filtered); // Atualiza a lista de produtos filtrados
  }, [activeFilter, searchTerm, products]);

  // Chama o filtro sempre que o termo de busca ou o filtro de categoria mudarem
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Modificar a função que lida com a seleção de categorias
  const handleCategorySelect = (categoryId) => {
    setActiveFilter(categoryId);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product); // Define o produto selecionado
    setIsModalVisible(true);     // Abre o modal
  };
  
  useEffect(() => {
    const fetchEmpresaId = async () => {
      const id = await getEmpresaId();
      setEmpresaId(id);
    };
    
    fetchEmpresaId();
    fetchProducts();
    fetchCategories(); // Faz a requisição para as categorias também
  }, [fetchProducts, fetchCategories]);
  
  
  // Renderização dos botões de filtro de categorias
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
            {/* Exibindo os valores calculados */}
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

        {/* FlatList para Filtros Horizontal */}
        <FlatList
          data={categories} // Adiciona opção "Todos os produtos"
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
          snapToAlignment="start"
          decelerationRate="fast"
        />
      </View>

      {/* Campo de Busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquise um produto..."
          placeholderTextColor="#AAAAAA"
          value={searchTerm}
          onChangeText={setSearchTerm} // Atualiza o estado de busca
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Icon name="search" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Lista de Produtos (com scroll) */}
      <FlatList
        data={filteredProducts} // Exibimos os produtos filtrados
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={true} // Ativa o scroll vertical
      />

      <View style={styles.fixedButtonsContainer}>
      {/* Botões Fixos de Ação 
        <TouchableOpacity style={styles.fixedButton}>
          <Icon name="barcode-outline" size={30} color="#000" />
        </TouchableOpacity>
        */}
        <TouchableOpacity style={styles.fixedButton2} onPress={handleAddProduct}>
          <Icon name="add-outline" size={30} color="#000" />
          <Text style={styles.textAdd}>Adicionar produto</Text>
        </TouchableOpacity>
      </View>

      {selectedProduct && empresaId && (
        <UpdateStockModal
          isVisible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
            fetchProducts(); // Atualiza a lista de produtos após fechar o modal
          }}
          product={selectedProduct}
          empresaId={empresaId}
        />
      )}
    </View>
  );
};

export default StockInfo;
