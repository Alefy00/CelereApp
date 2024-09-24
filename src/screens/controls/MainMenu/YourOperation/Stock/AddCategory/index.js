/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';

const AddCategory = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Geral', selected: false },
    { id: 2, name: 'Acessórios', selected: false },
    { id: 3, name: 'Celulares', selected: false },
    { id: 4, name: 'Periféricos PC', selected: false },
    { id: 5, name: 'Periféricos PC', selected: false },
  ]); // Dados fictícios

  const toggleSelectCategory = (id) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, selected: !category.selected } : category
    );
    setCategories(updatedCategories);
  };

  const handleIncludeCategoryProducts = () => {
    navigation.navigate("IncludeCategoryProducts");
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      {/* Container de categorias */}
      <View style={styles.categoryContainer}>
        <Text style={styles.title}>Categorias de produto registradas</Text>

        {/* Campo de pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise um nome..."
          />
          <Icon name="search" size={20} color={COLORS.grey} />
        </View>

        {/* Lista de categorias */}
        <ScrollView style={styles.categoryList}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <TouchableOpacity onPress={() => toggleSelectCategory(category.id)} style={styles.checkboxContainer}>
                <Icon name={category.selected ? "checkbox" : "square-outline"} size={24} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Botão excluir selecionados */}
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="close" size={25} color={COLORS.black} />
          <Text style={styles.deleteButtonText}>Excluir selecionados</Text>
        </TouchableOpacity>
      </View>

      {/* Botão adicionar nova categoria */}
      <TouchableOpacity style={styles.addButton} onPress={handleIncludeCategoryProducts}>
        <Icon name="add" size={25} color={COLORS.black} />
        <Text style={styles.addButtonText}>Adicionar nova categoria</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCategory;
