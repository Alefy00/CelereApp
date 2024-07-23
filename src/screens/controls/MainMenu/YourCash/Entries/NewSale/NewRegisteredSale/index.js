/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import BarTop2 from "../../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import { Image, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from "react-native";

const NewRegisteredSale = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    { id: 1, name: 'Type-C Cable - Black', stock: 99, price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'OTG Cable P3', stock: 0, price: 15, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Type A Cable - Black', stock: 6, price: 8, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Lightning Cable USB-C', stock: 6, price: 12, image: 'https://via.placeholder.com/150' },
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [quantities, setQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [nextScreen, setNextScreen] = useState("SaleDetails"); // Estado para controlar a próxima tela

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

  useEffect(() => {
    const total = Object.keys(quantities).reduce((sum, key) => {
      const product = products.find(p => p.id.toString() === key);
      return sum + (product.price * quantities[key]);
    }, 0);
    setTotalPrice(total);
  }, [quantities]);

  const handleSearch = (text) => {
    setSearch(text);
  };

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

  const handleQuantityChange = (id, delta) => {
    setQuantities(prevQuantities => {
      const newQuantities = { ...prevQuantities, [id]: (prevQuantities[id] || 0) + delta };
      if (newQuantities[id] < 0) newQuantities[id] = 0;
      if (newQuantities[id] === 0) delete newQuantities[id];
      return newQuantities;
    });
  };



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
              <Text style={styles.registerButtonText}>+ Register a new product</Text>
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
