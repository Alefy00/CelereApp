/* eslint-disable prettier/prettier */
import React, { memo } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from "../styles";

const RenderProduct = memo(({ item, handleQuantityChange, quantities }) => {
  const isService = item.categoria === 'Serviços'; // Verifica se o item é um serviço

  return (
    <View style={styles.productCard}>
      {/* Exibe imagem do produto ou serviço */}
      <Image source={{ uri: `https://api.celereapp.com.br${item.imagem}` }} style={styles.productImage} />

      {/* Nome do produto ou serviço */}
      <Text style={styles.productName}>{item.nome}</Text>

      {/* Verifica se o item é um produto (com estoque) ou um serviço */}
      {!isService ? (
        <>
          {/* Exibe a disponibilidade de estoque para produtos */}
          <Text style={item.estoque > 0 ? styles.inStock : styles.outOfStock}>
            {item.estoque > 0 ? `em estoque: ${item.estoque}` : 'sem estoque'}
          </Text>
          {/* Exibe botões de controle de quantidade para produtos */}
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
        </>
      ) : (
        /* Caso seja um serviço, não exibe estoque nem controle de quantidade */
        <TouchableOpacity 
          style={styles.serviceButton} 
          onPress={() => handleQuantityChange(item.id, 1)} // Redireciona diretamente ao selecionar serviço
        >
          <Text style={styles.serviceButtonText}>Selecionar Serviço</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export default RenderProduct;
