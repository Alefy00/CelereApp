/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import styles from './styles';

const BASE_API_URL = 'https://api.celereapp.com.br';
const UNIT_MEASURE_API_ENDPOINT = `${BASE_API_URL}/api/und_medida_servico/?page=1&page_size=100`;
const REGISTER_SERVICE_API_ENDPOINT = `${BASE_API_URL}/cad/servicos/`;

const AddService = ({ navigation }) => {
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [unitMeasure, setUnitMeasure] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [unitsOfMeasure, setUnitsOfMeasure] = useState([]);
  const [isUnitMeasureDropdownVisible, setIsUnitMeasureDropdownVisible] = useState(false);
  const [isPriceDisabled, setIsPriceDisabled] = useState(false); // Estado para controlar o checkbox
  const [imageUri, setImageUri] = useState(null); // Para controlar a imagem do serviço
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal de sucesso
  const defaultImageUrl = require('../../../../../../assets/images/png/placeholder.png'); // URL da imagem padrão


  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        console.log("ID da empresa encontrado:", storedEmpresaId); // Log do ID da empresa
        return Number(storedEmpresaId);
      } else {
        Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
        console.log('ID da empresa não encontrado no AsyncStorage.');
      }
    } catch (error) {
      console.error('Erro ao obter o ID da empresa do AsyncStorage:', error);
    }
    return null;
  };

  const fetchUnitsOfMeasure = async (empresa_id) => {
    try {
      const response = await fetch(`${UNIT_MEASURE_API_ENDPOINT}&empresa_id=${empresa_id}`);
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        setUnitsOfMeasure(result.data);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar as unidades de medida.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar as unidades de medida.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const empresaData = await getEmpresaId();
      if (empresaData) {
        setEmpresaId(empresaData);
        await fetchUnitsOfMeasure(empresaData);
      } else {
        Alert.alert('Erro', 'Não foi possível carregar os dados da empresa. Tente novamente mais tarde.');
      }
    };
    fetchData();
  }, []);

  // Função que lida com a requisição para salvar o serviço
  const handleSave = async () => {
    if (!name || (!price && !isPriceDisabled) || !unitMeasure) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
  
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }
  
    const currentDate = new Date().toISOString().split('T')[0];
  
    // Definir o preço como 0 se o checkbox estiver marcado
    const finalPrice = isPriceDisabled ? 0 : removeCurrencyFormatting(price); // Remover formatação para garantir que seja numérico
  
    // Corrigir o valor de `image_url` para garantir que seja um URL válido ou imagem padrão
    const imageUrl = imageUri ? imageUri : "https://via.placeholder.com/150"; // Defina aqui uma URL válida ou imagem padrão
  
    const serviceData = {
      empresa_id: empresaId,
      dt_servico: currentDate,
      nome: name,
      descricao: description || null,
      preco_venda: finalPrice, // Agora garantindo que o valor seja numérico
      status: 'ativo',
      unidade_medida: unitMeasure,
      ean: barcode || null,
      image_url: imageUrl,
    };
  
    // Adicionando log do corpo da requisição
    console.log('Corpo da requisição:', serviceData);
  
    try {
      const response = await fetch(REGISTER_SERVICE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setModalVisible(true); // Exibe o modal de sucesso
        // Limpa os campos do formulário
        setBarcode('');
        setName('');
        setUnitMeasure('');
        setPrice('');
        setDescription('');
        setIsPriceDisabled(false); // Restaura o estado do checkbox
        setImageUri(null); // Limpa a imagem
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o serviço.');
      }
    } catch (error) {
      console.error('Erro ao salvar o serviço:', error);
      Alert.alert('Erro', 'Não foi possível registrar o serviço. Verifique sua conexão e tente novamente.');
    }
  };
 
  

  const toggleUnitMeasureDropdown = () => {
    setIsUnitMeasureDropdownVisible(!isUnitMeasureDropdownVisible);
  };

  const selectUnitMeasure = (unit) => {
    setUnitMeasure(unit.cod); // Armazenar o código da unidade de medida selecionada
    setIsUnitMeasureDropdownVisible(false);
  };
  
  const handleCloseModal = () => {
    setModalVisible(false); // Fecha o modal
    navigation.navigate('RegisteredServices'); // Redireciona para a próxima tela
  };

  // Atualiza o valor do preço para 0 quando o checkbox é marcado
  const handlePriceCheckboxChange = () => {
    setIsPriceDisabled(!isPriceDisabled);
    if (!isPriceDisabled) {
      setPrice('0.00'); // Define o preço como 0 ao marcar o checkbox
      setUnitMeasure('Unidade'); // Define a unidade como "Unidade" ao marcar o checkbox
      setUnitsOfMeasure([{ id: 1, nome: 'Unidade' }]); // Define apenas "Unidade" como opção
    } else {
      setPrice(''); // Limpa o preço quando o checkbox é desmarcado
      fetchUnitsOfMeasure(empresaId); // Recarrega as unidades de medida da API ao desmarcar o checkbox
    }
  };

  // Função para formatar o valor como moeda Real Brasileiro
const formatPriceToBRL = (value) => {
  const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100; // Remove caracteres não numéricos e divide por 100 para ajustar centavos
  if (isNaN(numericValue)) return ''; // Caso o valor seja inválido, retorna uma string vazia

  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const removeCurrencyFormatting = (formattedValue) => {
  // Remove tudo que não seja número, ponto ou vírgula
  const numericValue = formattedValue.replace(/[^\d,]/g, '').replace(',', '.');
  return parseFloat(numericValue); // Converte a string para número float
};


// Função para lidar com a mudança no campo de preço
const handlePriceChange = (text) => {
  const formattedValue = formatPriceToBRL(text);
  setPrice(formattedValue); // Atualiza o estado com o valor formatado
};

  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <BarTop2
        titulo="Voltar"
        backColor={COLORS.primary}
        foreColor={COLORS.black}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabelTitle}>Adicionar um novo serviço</Text>
          <View style={styles.containerColor}>
            <View style={styles.imageWrapper}>
              <Icon name="camera" size={40} color={COLORS.black} />
            </View>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Código (opcional)"
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.imageLabel}>Imagem{'\n'}do serviço</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detalhes do Serviço</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome do serviço"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.textArea}
            placeholder="Descrição do Serviço"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Valores do Serviço</Text>

          {/* Checkbox para desativar o campo de preço */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={handlePriceCheckboxChange} style={styles.checkbox}>
              <Icon name={isPriceDisabled ? 'checkbox' : 'square-outline'} size={24} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Não inserir preço neste momento</Text>
          </View>

          {/* Input de preço que é desativado quando o checkbox está marcado */}
          <TextInput
            style={[styles.input, isPriceDisabled && { backgroundColor: COLORS.lightGray }]}
            placeholder="Preço de Venda (R$)"
            value={price}
            onChangeText={handlePriceChange}
            editable={!isPriceDisabled} // Desabilita o campo se o checkbox estiver marcado
            keyboardType="numeric"
          />

          <View style={styles.clientContainer}>
            <TouchableOpacity style={styles.clientPicker} onPress={toggleUnitMeasureDropdown}>
              <Text style={styles.clientText}>{unitMeasure || 'Un. de Medida'}</Text>
              <Icon name={isUnitMeasureDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color={COLORS.lightGray} />
            </TouchableOpacity>
          </View>
          {isUnitMeasureDropdownVisible && (
            <View style={[styles.dropdownContainer, { maxHeight: 150 }]}>
              <ScrollView nestedScrollEnabled={true}>
                {unitsOfMeasure.map((unit) => (
                  <TouchableOpacity key={unit.id} style={styles.dropdownItem} onPress={() => selectUnitMeasure(unit)}>
                    <Text style={styles.dropdownItemText}>{unit.nome}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.buttonText}>Cadastrar serviço</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de sucesso */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="checkmark-circle" size={90} color={COLORS.green} />
            <Text style={styles.modalText}>Serviço cadastrado com sucesso!</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleCloseModal}>
              <Text style={styles.confirmButtonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddService;
