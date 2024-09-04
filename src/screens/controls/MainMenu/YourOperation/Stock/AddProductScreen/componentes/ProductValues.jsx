/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';


const ProductValues = () => {
  const [costPrice, setCostPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [margin, setMargin] = useState(0);

  const increaseMargin = () => {
    setMargin(margin + 1);
  };

  const decreaseMargin = () => {
    if (margin > 0) {
      setMargin(margin - 1);
    }
  };

  return (
    <View style={styles.productValuesContainer}>
      <Text style={styles.productValuesTitle}>Valores do produto</Text>
      <View style={styles.productInputContainer}>
        <TextInput
          style={styles.productInput}
          placeholder="Preço de custo (R$)"
          placeholderTextColor={COLORS.lightGray}
          value={costPrice}
          onChangeText={setCostPrice}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.productInputContainer}>
        <TextInput
          style={styles.productInput}
          placeholder="Preço de venda (R$)"
          placeholderTextColor={COLORS.lightGray}
          value={salePrice}
          onChangeText={setSalePrice}
          keyboardType="numeric"
        />
        <Text style={styles.marginLabel}>Margem %</Text>
        <View style={styles.marginControls}>
          <TouchableOpacity onPress={decreaseMargin} style={styles.marginButton}>
            <Icon name="remove-outline" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.marginValue}>{margin}</Text>
          <TouchableOpacity onPress={increaseMargin} style={styles.marginButton}>
            <Icon name="add-outline" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    
  
    productValuesContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      marginHorizontal: 20,
      marginTop: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    productValuesTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
      marginBottom: 10,
    },
    productInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
    },
    productInput: {
      flex: 1,
      paddingVertical: 10,
      paddingRight: 0,
      color: COLORS.black,
      borderBottomWidth: 1,
      borderColor: COLORS.black,
    },
    marginLabel: {
      marginHorizontal:20,
      color: COLORS.lightGray,

    },
    marginControls: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    marginButton: {
      width: 25,
      height: 25,
      backgroundColor: COLORS.primary, // Ajuste a cor conforme o design
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      marginHorizontal: 5,
    },
    marginValue: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
      marginHorizontal: 5,
    },
});

export default ProductValues;
