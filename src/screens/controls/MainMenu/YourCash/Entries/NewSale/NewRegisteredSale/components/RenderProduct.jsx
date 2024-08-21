/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "../styles";

const RenderProduct = memo(({ item, handleQuantityChange, quantities }) => (
  <View style={styles.productCard}>
    <Image source={{ uri: `https://api.celereapp.com.br${item.imagem}` }} style={styles.productImage} />
    <Text style={styles.productName}>{item.nome}</Text>
    <Text style={item.estoque > 0 ? styles.inStock : styles.outOfStock}>
      {item.estoque > 0 ? `em estoque: ${item.estoque}` : 'sem estoque'}
    </Text>
    {item.estoque > 0 && (
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
));

export default RenderProduct;
