/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

// Configurações do Tamanho do Item
const SLIDER_WIDTH = Dimensions.get('window').width;

const StockInfo = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('Todos os produtos');

  const filterOptions = [
    { id: '1', label: 'Todos os produtos' },
    { id: '2', label: 'Geral' },
    { id: '3', label: 'Acessórios' },
    { id: '4', label: 'Celular' },
  ];

  const renderFilterItem = ({ item }) => (
    <TouchableOpacity
      style={activeFilter === item.label ? styles.filterButtonActive : styles.filterButton}
      onPress={() => setActiveFilter(item.label)}
    >
      <Text
        style={activeFilter === item.label ? styles.filterButtonTextActive : styles.filterButtonText}
        numberOfLines={1}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
  const handleAddProduct = () => {
    navigation.navigate("AddProductScreen");
  }

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

      <View style={styles.scrollViewContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Seu estoque</Text>
          <View style={styles.gridContainer}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Qtd. Categorias</Text>
              <Text style={styles.cardValue}>4</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Preço de Compra</Text>
              <Text style={styles.cardValue}>R$12.500,00</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Qtd. Itens</Text>
              <Text style={styles.cardValue}>30</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Preço de Venda</Text>
              <Text style={styles.cardValue}>R$18.550,90</Text>
            </View>
          </View>
        </View>

        {/* FlatList para Filtros Horizontal */}
        <FlatList
          data={filterOptions}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
          snapToAlignment="start"
          decelerationRate="fast"
        />

        {/* Campo de Busca */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise um produto..."
            placeholderTextColor="#AAAAAA"
          />
          <TouchableOpacity style={styles.searchIcon}>
            <Icon name="search" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Lista de Produtos */}
        <View style={styles.productList}>
          <View style={styles.productItem}>
            <Image source={require('../../../../../assets/images/png/product2.png')} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.productTitle}>Capo tipo-C preto</Text>
                <Text style={styles.productAvailable}>Disponíveis: 3</Text>
              </View>
              <Text style={styles.productPrice}>R$18,00</Text>
            </View>
          </View>
          <View style={styles.productItem}>
            <Image source={require('../../../../../assets/images/png/product2.png')} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.productTitle}>Capo tipo-C preto</Text>
                <Text style={styles.productAvailable}>Disponíveis: 8</Text>
              </View>
              <Text style={styles.productPrice}>R$24,00</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Botões Fixos de Ação */}
      <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity style={styles.fixedButton}>
          <Icon name="barcode-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fixedButton2} onPress={handleAddProduct}>
          <Icon name="add-outline" size={30} color="#000" />
          <Text style={styles.textAdd}>Adicionar produto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StockInfo;
