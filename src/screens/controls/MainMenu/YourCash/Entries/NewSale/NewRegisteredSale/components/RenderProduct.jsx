/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "../styles";

// Imagem fictícia para serviços
const fakeServiceImage = require('../../../../../../../../assets/images/png/placeholder.png');

const RenderProduct = memo(({ item, handleQuantityChange, quantities }) => {
  const isService = item.categoria === 'Serviços'; // Verifica se o item é um serviço
  const isSelected = quantities[item.id] > 0; // Verifica se o serviço ou produto já foi selecionado (quantidade maior que 0)

  // Lida com a exibição da imagem correta para produtos e serviços
  const imageSource = item.imagem
    ? { uri: `https://api.celereapp.com.br${item.imagem}` } // Imagem do produto vinda da API
    : isService
    ? fakeServiceImage // Imagem padrão para serviços
    : null; // Caso o produto não tenha imagem, usa null

  return (
    <View style={styles.productCard}>
      {/* Exibe imagem do produto ou serviço */}
      <Image source={imageSource} style={styles.productImage} />

      {/* Nome do produto ou serviço */}
      <Text style={styles.productName}>{item.nome}</Text>

      {/* Verifica se o item é um produto (com estoque) ou um serviço */}
      {!isService ? (
        <>
          {/* Exibe a disponibilidade de estoque para produtos */}
          <Text style={item.estoque > 0 ? styles.inStock : styles.outOfStock}>
            {item.estoque > 0 ? `Em estoque: ${item.estoque}` : 'Sem estoque'}
          </Text>
          {/* Exibe botões de controle de quantidade para produtos */}
          {item.estoque > 0 && (
            <View style={styles.productActions}>
              <TouchableOpacity
                style={styles.productActionButton}
                onPress={() => handleQuantityChange(item.id, -1)}
              >
                <Text style={styles.productActionButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productQuantity}>{quantities[item.id] || 0}</Text>
              <TouchableOpacity
                style={styles.productActionButton}
                onPress={() => handleQuantityChange(item.id, 1)}
              >
                <Text style={styles.productActionButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      ) : (
        /* Caso seja um serviço, exibe "Selecionar Serviço" ou "Remover Serviço" */
        <TouchableOpacity
          style={[styles.serviceButton, isSelected && styles.serviceButtonSelected]} // Estiliza como selecionado
          onPress={() => handleQuantityChange(item.id, isSelected ? -1 : 1)} // Alterna entre adicionar/remover serviço
        >
          <Text style={styles.serviceButtonText}>
            {isSelected ? 'Remover serviço' : 'Selecionar serviço'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default RenderProduct;
