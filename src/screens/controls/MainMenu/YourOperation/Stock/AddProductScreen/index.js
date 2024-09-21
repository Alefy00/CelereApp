/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal } from 'react-native';
import styles from './styles';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductValues from './componentes/ProductValues';
import { Picker } from '@react-native-picker/picker';

const AddProductScreen = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [minStock, setMinStock] = useState(0);
  const [productName, setProductName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false); // Estado do modal

  const handleAddCategory = () => {
    navigation.navigate('AddCategory');
  };
  const handleConfirm = () => {
    // Lógica para confirmação da categoria
    setIsModalVisible(true); // Exibir o modal após a confirmação
  };

  const closeModal = () => {
    setIsModalVisible(false); // Fechar o modal
  };



  return (
    <View style={styles.mainContainer}>
      {/* Barra Superior Fixa no Topo */}
      <View style={styles.barTopContainer}>
        <BarTop2
          titulo="Voltar"
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      {/* ScrollView para o Conteúdo Abaixo da Barra Superior */}
      <ScrollView style={styles.scrollContainer}>
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
            placeholderTextColor={COLORS.lightGray}
            value={productName}
            onChangeText={setProductName}
          />

          {/* Campo de Descrição do Serviço */}
          <TextInput
            style={styles.serviceDescriptionInput}
            placeholder="Descrição do Serviço"
            placeholderTextColor={COLORS.lightGray}
            value={serviceDescription}
            onChangeText={setServiceDescription}
            multiline={true}
          />
        </View>

        {/* Categoria do Produto */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Categoria do produto</Text>
          <View style={styles.categoryInputContainer}>
            <Picker
              selectedValue={selectedCategory}
              style={styles.categoryPicker}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Escolha uma categoria" value="" />
              <Picker.Item label="Categoria 1" value="categoria1" />
              <Picker.Item label="Categoria 2" value="categoria2" />
            </Picker>
            <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
              <Icon name="add" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Valores do Produto */}
        <View style={styles.containerProductValues}>
          <ProductValues />
        </View>

        {/* Botão de Cadastrar Produto */}
        <TouchableOpacity style={styles.registerButton} onPress={handleConfirm}>
            <Icon name="checkmark-circle" size={20} color="black" />
            <Text style={styles.buttonText}>Cadastrar produto</Text>
        </TouchableOpacity>
                        {/* Modal de confirmação */}
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Icon name="checkmark-circle" size={90} color={COLORS.green} />
              <Text style={styles.modalText}>Produto cadastrado{'\n'}com sucesso!</Text>

              {/* Botão Ok */}
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AddProductScreen;
