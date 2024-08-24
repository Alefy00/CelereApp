/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from './styles';  // Importa os estilos do arquivo separado
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const StockInfo = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
      {/* Barra Superior */}
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Estoque"
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
        
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButtonActive}>
            <Text style={styles.filterButtonTextActive}>Todos os produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Geral</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Acessórios</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.productList}>
          <View style={styles.productItem}>
            <Image source={require('../../../../../assets/images/png/product2.png')} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.productTitle}>Capo tipo-C preto</Text>
                <Text style={styles.productAvailable}>Disponíveis: 3</Text>
              </View>
              <Text style={styles.productPrice}>R$18,00</Text>
            </View>
          </View>
          <View style={styles.productItem}>
            <Image source={require('../../../../../assets/images/png/product2.png')} style={styles.productImage} />
            <View style={styles.productInfo}>
              <View style={{flexDirection: 'column'}}>
                <Text style={styles.productTitle}>Capo tipo-C preto</Text>
                <Text style={styles.productAvailable}>Disponíveis: 8</Text>
              </View>
              <Text style={styles.productPrice}>R$24,00</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.fixedButtonsContainer}>
        <TouchableOpacity style={styles.fixedButton}>
          <Icon name="barcode-outline" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.fixedButton}>
          <Icon name="add-outline" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StockInfo;
