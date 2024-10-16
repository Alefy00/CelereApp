/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, Modal } from "react-native";
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop2 from "../../../../../../components/BarTop2.jsx";
import { COLORS } from "../../../../../../constants/theme.js";
import RenderProduct from "../../../YourCash/Entries/NewSale/NewRegisteredSale/components/RenderProduct.jsx";
import styles from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const API_BASE_URL = 'https://api.celereapp.com.br';
const PRODUCTS_API = `${API_BASE_URL}/cad/produtos/`;
const CATEGORIES_API = `${API_BASE_URL}/mnt/categoriasprodutos/`;
const SERVICES_API = `${API_BASE_URL}/cad/servicos/`;



const NewBudgets = ({ navigation, route }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [generalFilter, setGeneralFilter] = useState('Todos'); // Filtro geral (Todos, Produtos, Serviços)
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fourthModalVisible, setFourthModalVisible] = useState(false);

    // Função para limpar o carrinho
    const clearCart = () => {
      setProducts([]);
      setFilteredProducts([]);
      setQuantities({});
      setTotalPrice(0);
    };

  // Função para mostrar alertas
  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  // Função para buscar o ID da empresa logada
  const getEmpresaId = useCallback(async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId); // Converte para número se estiver como string
      } else {
        showAlert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  }, []);

  const fetchProductImage = async (empresaId, productId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/mnt/imagensproduto/getImagemProd/?empresa=${empresaId}&produto=${productId}`
      );
      if (response.data && response.data.status === 'success') {
        return `${API_BASE_URL}${response.data.data.imagem}`;  // URL completa da imagem
      } else {
        return null;  // Retorna null se não houver imagem
      }
    } catch (error) {
      console.error('Erro ao buscar imagem do produto:', error);
      return null;  // Retorna null em caso de erro
    }
  };

  const fetchServiceImage = async (empresaId, serviceId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/mnt/imagensservico/getImagemServ/?empresa=${empresaId}&servico=${serviceId}`
      );
      if (response.data && response.data.status === 'success') {
        return `${API_BASE_URL}${response.data.data.imagem}`;  // URL completa da imagem
      } else {
        return null;  // Retorna null se não houver imagem
      }
    } catch (error) {
      console.error('Erro ao buscar imagem do serviço:', error);
      return null;  // Retorna null em caso de erro
    }
  };


  // Função para buscar produtos e serviços com suas imagens
  const fetchProductsAndServices = useCallback(async () => {
    setLoading(true);
    try {
      const empresaId = await getEmpresaId();
      if (empresaId) {
        // Busca produtos
        const productResponse = await axios.get(`${PRODUCTS_API}?page_size=100&empresa=${empresaId}`);
        const fetchedProducts = productResponse.data.data;

        // Busca serviços
        const serviceResponse = await axios.get(`${SERVICES_API}?page_size=100&empresa_id=${empresaId}`);
        const fetchedServices = serviceResponse.data.results.data;

        // Filtrar apenas os serviços que pertencem à empresa logada
        const filteredServices = fetchedServices.filter(service => service.empresa.id === empresaId);

        // Buscar imagens para produtos e serviços
        const productsWithImages = await Promise.all(fetchedProducts.map(async (product) => {
          const imageUrl = await fetchProductImage(empresaId, product.id);
          return { ...product, image_url: imageUrl };  // Adiciona o campo image_url com a imagem recuperada
        }));

        const servicesWithImages = await Promise.all(filteredServices.map(async (service) => {
          const imageUrl = await fetchServiceImage(empresaId, service.id);
          return {
            ...service,
            categoria: 'Serviços',
            qtd_estoque: null,
            image_url: imageUrl,  // Adiciona o campo image_url com a imagem recuperada
          };
        }));

        // Combina produtos e serviços
        setProducts([...productsWithImages, ...servicesWithImages]);
        setFilteredProducts([...productsWithImages, ...servicesWithImages]);
      }
    } catch (error) {
      showAlert("Erro", "Erro ao conectar à API.");
    } finally {
      setLoading(false);
    }
  }, [getEmpresaId]);

  // Recarregar produtos e serviços ao voltar para a tela
  useFocusEffect(
    useCallback(() => {
      fetchProductsAndServices(); // Recarrega a lista de produtos e serviços sempre que a tela ganha foco
    }, [fetchProductsAndServices])
  );

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
          showAlert('Erro', 'Falha ao recuperar categorias.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      showAlert('Erro', 'Ocorreu um erro ao buscar as categorias.');
    }
  }, [getEmpresaId]);

  useEffect(() => {
    fetchProductsAndServices();
    fetchCategories(); // Faz a requisição para as categorias também
  }, [fetchProductsAndServices, fetchCategories]);

  // Função para aplicar os filtros
  const applyFilters = useCallback(() => {
    let filtered = products;

    // Aplicar filtro geral (Todos, Produtos, Serviços)
    if (generalFilter === 'Produtos') {
      filtered = filtered.filter(product => product.categoria !== 'Serviços');
    } else if (generalFilter === 'Serviços') {
      filtered = filtered.filter(product => product.categoria === 'Serviços');
    }

    // Aplicar filtro secundário de categorias
    if (selectedCategory !== 'all' && generalFilter === 'Produtos') {
      filtered = filtered.filter(product => product.categoria.id.toString() === selectedCategory);
    }

    if (search) {
      filtered = filtered.filter(product => product.nome.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredProducts(filtered); // Atualiza a lista de produtos filtrados
  }, [generalFilter, selectedCategory, search, products]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Atualiza o preço total sempre que as quantidades mudam
  useEffect(() => {
    const total = Object.keys(quantities).reduce((sum, key) => {
      const product = products.find(p => p.id.toString() === key);
      return sum + (product.preco_venda * quantities[key]);
    }, 0);
    setTotalPrice(total);
  }, [quantities, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    applyFilters(); // Aplicar filtros quando uma nova categoria for selecionada
  };

  const handleGeneralFilterChange = (filter) => {
    setGeneralFilter(filter);
    setSelectedCategory('all'); // Redefinir o filtro de categoria ao mudar o filtro geral
    applyFilters();
  };

   // Função para limpar o carrinho
  useFocusEffect(
    useCallback(() => {
      // Verifica se há uma instrução para limpar o carrinho ao voltar para a tela
      if (route.params?.clearCart) {
        clearCart(); // Limpa o carrinho
      }
      fetchProductsAndServices(); // Recarrega os produtos
    }, [route.params?.clearCart, fetchProductsAndServices])
  );


  // Função para atualizar a quantidade dos produtos/serviços
  const handleQuantityChange = (id, delta) => {
    const product = products.find(p => p.id.toString() === id);
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [id]: (prevQuantities[id] || 0) + delta };
      if (newQuantities[id] === 0) delete newQuantities[id]; // Remove a quantidade se for zero
      return newQuantities;
    });
  };



  const handleNext = () => {
    const selectedItems = Object.keys(quantities).map(key => {
      const product = products.find(p => p.id.toString() === key);
  
      // Verificar se o produto existe e adicionar ao carrinho, mesmo com preço 0
      if (product) {
        return {
          ...product,
          amount: quantities[key],
          total: quantities[key] * (parseFloat(product.preco_venda) || 0), // Permitir preço 0
          imagem: product.image_url ? product.image_url : 'https://via.placeholder.com/150', // Certifique-se de que estamos usando a propriedade correta para a URL da imagem
        };
      }
      return null;
    }).filter(item => item !== null); // Garantir que nenhum item nulo seja adicionado
    const allSelectedItems = [...selectedItems];
  
    const totalPrice = allSelectedItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  
    navigation.navigate('DetailsBudgets', {
      products: allSelectedItems, // Envia tanto produtos quanto serviços juntos
      totalPrice
    });
  };
  

  const renderFooter = () => (
    
    <>
      {totalPrice > 0 && (
        <View style={styles.confirmationCard}>
          <Text style={styles.totalPrice}>Total: R${formatCurrency(totalPrice)}</Text>
          <TouchableOpacity style={styles.confirmButton} onPress={handleNext}>
            <Icon name="checkmark-circle" size={25} color={COLORS.black} />
            <Text style={styles.confirmButtonText}>Confirmar Orçamento</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.barcodeButton}>
        <Icon name="barcode" size={30} color={COLORS.black} />
      </TouchableOpacity>
    </>
  );

  const toggleFourthModal = () => setFourthModalVisible(!fourthModalVisible);
    // Certifique-se de que o modal é fechado corretamente
    const closeModalOnNavigate = () => {
      setFourthModalVisible(false); // Fecha o modal ao navegar
      navigation.navigate('AddProductScreen');
    };
    const closeModalOnNavigateService = () => {
      setFourthModalVisible(false); // Fecha o modal ao navegar
      navigation.navigate('AddService');
    };

    const formatCurrency = (value) => {
      if (!value) return '';
      return parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{height: 55}} >
            <BarTop2 titulo="Voltar" backColor={COLORS.primary} foreColor={COLORS.black}/>
          </View>
          <View style={styles.header}>
            <TouchableOpacity style={styles.registerButton} onPress={toggleFourthModal}>
              <Icon name="add" size={20} color={COLORS.black} />
              <Text style={styles.registerButtonText}>Cadastrar produto ou serviço</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Novo Orçamento</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Pesquise por um produto..."
                value={search}
                onChangeText={setSearch}
              />
              <Icon name="search" size={20} color={COLORS.grey} />
            </View>

            {/* Filtros Gerais */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
              {['Todos', 'Produtos', 'Serviços'].map(filter => (
                <TouchableOpacity
                  key={filter}
                  style={[styles.categoryButton, generalFilter === filter && styles.categoryButtonActive]}
                  onPress={() => handleGeneralFilterChange(filter)}
                >
                  <Text style={[styles.categoryText, generalFilter === filter && styles.categoryTextActive]}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Filtros de Categorias (apenas quando Produtos é selecionado) */}
            {generalFilter === 'Produtos' && (
              <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.categoriesContainer}>
                {categories.map(category => (
                  <TouchableOpacity
                    key={category.id}
                    style={[styles.categoryButton, selectedCategory === category.id && styles.categoryButtonActive]}
                    onPress={() => handleCategoryChange(category.id)}
                  >
                    <Text style={[styles.categoryText, selectedCategory === category.id && styles.categoryTextActive]}>{category.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
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
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.productsList}
              numColumns={2}
              ListFooterComponent={renderFooter}
            />

          )}

          {/* Modal para cadastrar produto ou serviço */}
          <Modal visible={fourthModalVisible} animationType="slide" transparent onRequestClose={toggleFourthModal}>
            <View style={styles.fourthModalOverlay}>
              <View style={styles.fourthModalContent}>
                <View style={styles.fourthModalHeader}>
                  <Text style={styles.fourthModalTitle}>Selecione uma opção:</Text>
                  <TouchableOpacity onPress={toggleFourthModal}>
                    <Icon name="close" size={25} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.fourthModalButton2} onPress={closeModalOnNavigate}>
                  <Text style={styles.fourthModalText}>Produtos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.fourthModalButton} onPress={closeModalOnNavigateService}>
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

export default NewBudgets;
