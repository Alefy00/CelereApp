/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const AddProductScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [productName, setProductName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Barra Superior */}
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <Text style={styles.title}>Adicionar um produto no estoque</Text>

      {/* Primeira Parte do Design */}
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.imageContainer}>
            <TouchableOpacity style={styles.imageButton}>
              <Icon name="camera" size={30} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.imageLabel}>Imagem{"\n"}do produto</Text>
          </View>
        </View>

        <View style={styles.rightContainer}>
          {/* Campo de Código de Barras */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Código de barras"
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
            />
            <Icon name="barcode-outline" size={25} color={COLORS.black} />
          </View>

          {/* Controle de Quantidade */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Quantidade:</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity onPress={() => setQuantity(quantity - 1)} style={styles.controlButton}>
                <Icon name="remove-outline" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{quantity}</Text>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.controlButton}>
                <Icon name="add-outline" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Controle de Mínimo em Estoque */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Mínimo em estoque:</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity onPress={() => setMinStock(minStock - 1)} style={styles.controlButton}>
                <Icon name="remove-outline" size={20} color={COLORS.black} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{minStock}</Text>
              <TouchableOpacity onPress={() => setMinStock(minStock + 1)} style={styles.controlButton}>
                <Icon name="add-outline" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Segunda Parte do Design */}
      <View style={styles.productDetailsContainer}>
        <Text style={styles.sectionTitle}>Detalhes do Produto</Text>

        {/* Campo de Nome do Produto */}
        <TextInput
          style={styles.productNameInput}
          placeholder="Nome do produto"
          value={productName}
          onChangeText={setProductName}
        />

        {/* Campo de Descrição do Serviço */}
        <TextInput
          style={styles.serviceDescriptionInput}
          placeholder="Descrição do Serviço"
          value={serviceDescription}
          onChangeText={setServiceDescription}
          multiline={true}
        />
      </View>

      {/* Terceira Parte do Design */}
      <View style={styles.categoryContainer}>
        <Text style={styles.sectionTitle}>Categoria do produto</Text>

        {/* Seletor de Categoria */}
        <View style={styles.categorySelector}>
          <Text style={styles.categoryPlaceholder}>Escolha uma categoria</Text>
          <Icon name="chevron-down-outline" size={20} color={COLORS.black} />
        </View>

        {/* Botão de Adicionar Categoria */}
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add-outline" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddProductScreen;
