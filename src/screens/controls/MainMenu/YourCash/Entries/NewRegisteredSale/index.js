/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./styles";
import { Image, Text, View,KeyboardAvoidingView,Platform, TouchableWithoutFeedback, Keyboard,TextInput,FlatList,TouchableOpacity} from "react-native";


const NewRegisteredSale = () => {
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([
        { id: 1, name: 'Type-C Cable - Black', stock: 99, image: 'https://via.placeholder.com/150', },
        { id: 2, name: 'OTG Cable P3', stock: 0, image: 'https://via.placeholder.com/150', },
        { id: 3, name: 'Type A Cable - Black', stock: 6, image: 'https://via.placeholder.com/150', },
        { id: 4, name: 'Lightning Cable USB-C', stock: 6, image: 'https://via.placeholder.com/150', },
    ]);

    const [filteredProducts, setFilteredProducts] = useState(products);
    useEffect(()=>{
        if (search) {
            const filtered = products.filter(products => 
                products.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(filtered);
        }else{
            setFilteredProducts(products);
        }
    },[search]);

    const handleSearch = (text) =>{
        setSearch(text);
    };

    const renderProduct = ({item}) =>(
        <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <Text style={styles.productName} >{item.name}</Text>
            <Text style={item.stock > 0 ? styles.inStock: styles.outOfStock}>
                {item.stock > 0 ? `on stock: ${item.stock}` : 'none on stock'} 
            </Text>
            <View style={styles.productActions}>
                <TouchableOpacity style={styles.productActionButton}>
                    <Text style={styles.productActionButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.productQuantity}>0</Text>
                <TouchableOpacity style={styles.productActionButton}>
                    <Text style={styles.productActionButtonText}>+</Text>
                </TouchableOpacity>
            </View>

        </View>
    )

    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <View style={{ height: 50 }}>
                <BarTop2
                  titulo={'Return'}
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
                <Text style={styles.title}>New sale</Text>
                <View style={styles.searchContainer}>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for a product..."
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
              />
              <TouchableOpacity style={styles.barcodeButton}>
                <Icon name="barcode" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
}

export default NewRegisteredSale;