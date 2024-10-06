/* eslint-disable prettier/prettier */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';

// Usamos forwardRef para permitir o uso de ref pelo componente pai
const ProductValues = forwardRef(({ onCustoChange, onPrecoVendaChange }, ref) => {
  const [costPrice, setCostPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [grossMargin, setGrossMargin] = useState('');

  const formatCurrency = (value) => {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
    return formatted;
  };

  const handleCostPriceChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    const formattedValue = (numericValue / 100).toFixed(2); // Ajusta centavos
    setCostPrice(formatCurrency(formattedValue));
    calculateGrossMargin(parseFloat(formattedValue), parseFloat(salePrice.replace(/[^\d,.-]/g, '')));
    onCustoChange(formattedValue);  // Atualizando o valor no componente pai
  };

  const handleSalePriceChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove caracteres não numéricos
    const formattedValue = (numericValue / 100).toFixed(2); // Ajusta centavos
    setSalePrice(formatCurrency(formattedValue));
    calculateGrossMargin(parseFloat(costPrice.replace(/[^\d,.-]/g, '')), parseFloat(formattedValue));
    onPrecoVendaChange(formattedValue);  // Atualizando o valor no componente pai
  };

  const handleGrossMarginChange = (text) => {
    const marginValue = parseFloat(text);
    setGrossMargin(text);

    if (marginValue >= 0 && costPrice !== '') {
      const cost = parseFloat(costPrice.replace(/[^\d,.-]/g, '')); // Remove caracteres de moeda
      const newSalePrice = (cost / (1 - marginValue / 100)).toFixed(2);
      setSalePrice(formatCurrency(newSalePrice)); // Atualiza o preço de venda
      onPrecoVendaChange(newSalePrice);  // Atualizando o valor no componente pai
    }
  };

  const calculateGrossMargin = (cost, sale) => {
    if (cost > 0 && sale > 0 && sale > cost) {
      const margin = ((sale - cost) / sale) * 100;
      setGrossMargin(margin.toFixed(2)); // Calcula margem bruta
    } else {
      setGrossMargin('');
    }
  };

  const handleIncrement = () => {
    if (grossMargin !== '') {
      const newMargin = parseFloat(grossMargin) + 1;
      handleGrossMarginChange(newMargin.toString());
    }
  };

  const handleDecrement = () => {
    if (grossMargin !== '') {
      const newMargin = parseFloat(grossMargin) - 1;
      if (newMargin >= 0) {
        handleGrossMarginChange(newMargin.toString());
      }
    }
  };

  // Definindo a função clearValues acessível pelo ref
  useImperativeHandle(ref, () => ({
    clearValues() {
      setCostPrice('');
      setSalePrice('');
      setGrossMargin('');
    }
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Valores do produto</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Preço de custo"
          keyboardType="numeric"
          value={costPrice}
          onChangeText={handleCostPriceChange} // Formata e calcula dinamicamente
        />
      </View>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Preço de venda"
          keyboardType="numeric"
          value={salePrice}
          onChangeText={handleSalePriceChange} // Formata e calcula dinamicamente
        />
        <Text style={styles.marginLabel}>Margem{'\n'} Bruta %</Text>
        <View style={styles.marginControl}>
          <TouchableOpacity style={styles.marginButton} onPress={handleDecrement}>
            <Icon name="remove" size={20} color={COLORS.black} />
          </TouchableOpacity>
          <TextInput
            style={styles.marginInput}
            keyboardType="numeric"
            value={grossMargin}
            onChangeText={handleGrossMarginChange} // Permite inserção manual da margem
          />
          <TouchableOpacity style={styles.marginButton} onPress={handleIncrement}>
            <Icon name="add" size={20} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    fontSize: 16,
    paddingHorizontal: 10,
    color: COLORS.black,
  },
  marginLabel: {
    marginHorizontal: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  marginControl: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
  },
  marginInput: {
    width: 50,
    height: 40,
    textAlign: 'center',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  marginButton: {
    backgroundColor: '#FFD700',
    borderRadius: 4,
    padding: 5,
  },
});

export default ProductValues;
