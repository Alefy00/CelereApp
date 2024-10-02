/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "../styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../../constants';

// Imagem fictícia para itens sem imagem
const placeholderImage = require('../../../../../../../../assets/images/png/placeholder.png');

const RenderProduct = memo(({ item, handleQuantityChange, quantities }) => {
  const isService = item.categoria === 'Serviços'; // Verifica se o item é um serviço
  const isSelected = quantities[item.id] > 0; // Verifica se o item foi selecionado (quantidade maior que 0)

  // Lida com a exibição da imagem correta para produtos e serviços
  const imageSource = item.imagem
    ? { uri: item.imagem } // Exibe a imagem do produto/serviço se houver
    : placeholderImage; // Placeholder caso não tenha imagem

  const handleIncrement = () => {
    if (!isService && (quantities[item.id] || 0) >= item.qtd_estoque) {
      return; // Limite de estoque atingido
    }
    handleQuantityChange(item.id, 1);
  };

  const handleDecrement = () => {
    if (quantities[item.id] > 0) {
      handleQuantityChange(item.id, -1); // Evita valores negativos
    }
  };

  return (
    <View style={styles.productCard}>
      {/* Exibe imagem do produto ou serviço */}
      <Image source={imageSource} style={styles.productImage} />

      {/* Nome do produto ou serviço */}
      <Text style={styles.productName}>{item.nome}</Text>

        <View style={styles.containerProduct}>
        <Text style={styles.productPrice}>R$ {parseFloat(item.preco_venda).toFixed(2)}</Text>
        {!isService && (
          <Text style={item.qtd_estoque > 0 ? styles.inStock : styles.outOfStock}>
            {item.qtd_estoque > 0 ? `Estoque: ${item.qtd_estoque}` : 'Sem estoque'}
          </Text>
        )}
        {isService && (
          <Text style={styles.inStock}>Serviço disponível</Text> // Nova linha para serviços
        )}
      </View>

      {/* Exibe botões de controle de quantidade para produtos e serviços */}
      <View style={styles.productActions}>
        <TouchableOpacity
          style={styles.productActionButton}
          onPress={handleDecrement}
        >
          <Icon name="remove" size={15} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.productQuantity}>{quantities[item.id] || 0}</Text>
        <TouchableOpacity
          style={styles.productActionButton}
          onPress={handleIncrement}
        >
          <Icon name="add" size={15} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default RenderProduct;
