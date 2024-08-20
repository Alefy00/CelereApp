/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import { Image, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from "react-native";

const NewRegisteredSale = ({ navigation }) => {
  // Estados para armazenar dados da tela
  const [search, setSearch] = useState(''); // Estado para armazenar a busca do usuário
  const [products, setProducts] = useState([
    { id: 1, name: 'Type-C Cable - Black', stock: 99, price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'OTG Cable P3', stock: 0, price: 15, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Type A Cable - Black', stock: 6, price: 8, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Lightning Cable USB-C', stock: 6, price: 12, image: 'https://via.placeholder.com/150' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products); // Estado para armazenar os produtos filtrados
  const [quantities, setQuantities] = useState({}); // Estado para armazenar as quantidades dos produtos
  const [totalPrice, setTotalPrice] = useState(0); // Estado para armazenar o preço total
  const [nextScreen, setNextScreen] = useState("SaleDetails"); // Estado para controlar a próxima tela

  // useEffect para filtrar os produtos com base na busca
  useEffect(() => {
    if (search) {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search]);

  // useEffect para calcular o preço total com base nas quantidades
  useEffect(() => {
    const total = Object.keys(quantities).reduce((sum, key) => {
      const product = products.find(p => p.id.toString() === key);
      return sum + (product.price * quantities[key]);
    }, 0);
    setTotalPrice(total);
  }, [quantities]);

  // Função para lidar com a busca
  const handleSearch = (text) => {
    setSearch(text);
  };

  // Função para navegar para a próxima tela com os produtos selecionados
  const handleNext = () => {
    const selectedProducts = Object.keys(quantities).map(key => {
      const product = products.find(p => p.id.toString() === key);
      return {
        ...product,
        amount: quantities[key],
        total: quantities[key] * product.price,
      };
    });
    navigation.navigate(nextScreen, { products: selectedProducts, totalPrice });
  };

  // Função para alterar a quantidade dos produtos
  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [id]: (prevQuantities[id] || 0) + delta };
      if (newQuantities[id] < 0) newQuantities[id] = 0;
      if (newQuantities[id] === 0) delete newQuantities[id];
      return newQuantities;
    });
  };

  // Função para renderizar cada produto
  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={item.stock > 0 ? styles.inStock : styles.outOfStock}>
        {item.stock > 0 ? `on stock: ${item.stock}` : 'none on stock'}
      </Text>
      {item.stock > 0 && (
        <View style={styles.productActions}>
          <TouchableOpacity style={styles.productActionButton} onPress={() => handleQuantityChange(item.id, -1)}>
            <Text style={styles.productActionButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.productQuantity}>{quantities[item.id] || 0}</Text>
          <TouchableOpacity style={styles.productActionButton} onPress={() => handleQuantityChange(item.id, 1)}>
            <Text style={styles.productActionButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  // Função para renderizar o rodapé com o botão de confirmar a venda
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
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productsList}
            numColumns={2}
            ListFooterComponent={renderFooter}
          />
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
