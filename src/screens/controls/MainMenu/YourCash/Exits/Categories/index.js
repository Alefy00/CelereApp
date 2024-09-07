/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import BarTop2 from '../../../../../../components/BarTop2';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles'; // Arquivo de estilos que vamos criar depois

const CategoriesScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([
      // Dados fictícios de categorias para teste
      { id: '1', name: 'Fornecedores de matéria-prima, produtos ou suprimentos' },
      { id: '2', name: 'Marketing e Anúncios' },
      { id: '3', name: 'Folha de pagamento' },
      { id: '4', name: 'Taxas e Tributos' },
      { id: '5', name: 'Frete, Transporte e Logística' },
      { id: '6', name: 'Aluguel' },
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
  
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
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        {/* BarTop2 colado no topo */}
        <BarTop2
          titulo="Categorias de Despesas"
          backColor="#FFC700"
          foreColor="#000"
          style={{ width: '100%', position: 'absolute', top: 0 }}
        />
  
        {/* Container que inclui o campo de pesquisa, lista de categorias e botão de exclusão */}
        <View style={styles.contentContainer}>
          {/* Campo de pesquisa */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise um nome..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.searchButton}>
              <Icon name="search-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
  
          {/* Lista de categorias */}
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoryItem}
            style={styles.categoryList}
          />
  
          {/* Botão para excluir categorias */}
          <TouchableOpacity style={styles.deleteButton} disabled={selectedCategories.length === 0}>
            <Icon name="trash-outline" size={24} color="#000" />
            <Text style={styles.deleteButtonText}>Excluir selecionados</Text>
          </TouchableOpacity>
        </View>
  
        {/* Botão para cadastrar nova categoria fixado ao final da tela */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add-circle-outline" size={24} color="#000" />
            <Text style={styles.addButtonText}>Cadastrar nova categoria</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  export default CategoriesScreen;