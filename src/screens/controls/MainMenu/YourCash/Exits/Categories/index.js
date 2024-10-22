/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import BarTop2 from '../../../../../../components/BarTop2';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'; // Arquivo de estilos
import { COLORS } from '../../../../../../constants';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

const API_URL = `${API_BASE_URL}/mnt/categoriasdespesa/?page=1&page_size=30`;

const CategoriesScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de loading
    const [error, setError] = useState(null); // Estado de erro

    // Função para buscar categorias da API
    const fetchCategories = async () => {
      try {
          const response = await fetch(API_URL);
          const json = await response.json();
  
          // Verifica se o status da API é 'success' e se os dados existem
          if (response.ok && json.results && json.results.data && json.results.status === 'success') {
              setCategories(json.results.data);  // Carrega os dados
              setError(null); // Limpa o estado de erro ao carregar com sucesso

          } else {
              // Exibe uma mensagem genérica de erro
              setError('Não foi possível carregar as categorias. Tente novamente mais tarde.')
          }
      } catch (e) {
          console.error('Erro na requisição:', e.message);
          setError('Erro ao buscar dados. Verifique sua conexão e tente novamente.');
      } finally {
          setLoading(false);
      }
  };
  
    useEffect(() => {
        fetchCategories(); // Chama a API quando o componente é montado
    }, []);

    // Função para selecionar ou desmarcar categorias
    const toggleCategorySelection = (id) => {
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }
    };

    // Função para renderizar cada item da categoria
    const renderCategoryItem = ({ item }) => {
      // Certifique-se de que está acessando corretamente o campo 'descricao' de cada categoria
      return (
          <TouchableOpacity
              style={styles.categoryItem}
              onPress={() => toggleCategorySelection(item.id)}
          >
              <View style={styles.checkboxContainer}>
                  <Icon
                      name={selectedCategories.includes(item.id) ? 'checkbox-outline' : 'square-outline'}
                      size={24}
                      color="#000"
                  />
                  {/* Acessando o campo 'descricao' de cada objeto */}
                  <Text style={styles.categoryName}>{item.descricao}</Text>
              </View>
          </TouchableOpacity>
      );
  };

    // Renderizar a lista de categorias ou um indicador de loading
    return (
      <View style={styles.container}>
          <View style={styles.containerBartop2}>
              <BarTop2
                  titulo={'Voltar'}
                  backColor={COLORS.primary}
                  foreColor={COLORS.black}
                  routeMailer={''}
                  routeCalculator={''}
                  style={{ height: 50 }}
              />
          </View>
          <Text style={styles.title}>Categorias de Despesas</Text>
          <Text style={styles.subtitle}>Veja e cadastre suas categorias de despesas.</Text>
          <View style={styles.contentContainer}>
              <View style={styles.searchContainer}>
                  <TextInput
                      style={styles.searchInput}
                      placeholder="Pesquise um nome..."
                      placeholderTextColor={COLORS.lightGray}
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                  />
                  <TouchableOpacity style={styles.searchButton}>
                      <Icon name="search-outline" size={20} color={COLORS.lightGray} />
                  </TouchableOpacity>
              </View>
              {/* Exibe erro genérico se houver erro, caso contrário exibe a lista */}
              {loading ? (
                  <ActivityIndicator size="large" color={COLORS.primary} />
              ) : error ? (
                  <Text style={styles.errorText}>{error}</Text>
              ) : (
                  <FlatList
                      data={categories}
                      keyExtractor={(item) => item.id.toString()} // Certifica-se que o id é uma string
                      renderItem={renderCategoryItem}
                      style={styles.categoryList}
                  />
              )}
              <TouchableOpacity style={styles.deleteButton} disabled={selectedCategories.length === 0}>
                  <Icon name="close" size={24} color="#000" />
                  <Text style={styles.deleteButtonText}>Excluir selecionados</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.addButtonContainer}>
              <TouchableOpacity style={styles.addButton}>
                  <Icon name="add" size={24} color="#000" />
                  <Text style={styles.addButtonText}>Cadastrar nova categoria</Text>
              </TouchableOpacity>
          </View>
      </View>
  );
};

export default CategoriesScreen;
