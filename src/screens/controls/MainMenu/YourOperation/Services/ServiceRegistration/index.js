/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Modal, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import BarTop2 from '../../../../../../components/BarTop2';
import { COLORS } from '../../../../../../constants';
import styles from './styles';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../../services/apiConfig';

const UNIT_MEASURE_API_ENDPOINT = `${API_BASE_URL}/api/und_medida_servico/?page=1&page_size=100`;
const REGISTER_SERVICE_API_ENDPOINT = `${API_BASE_URL}/cad/servicos/`;
const IMAGE_UPLOAD_API = `${API_BASE_URL}/mnt/imagensservico/`;

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
  const [photo, setPhoto] = useState(null);  // Estado para armazenar a foto selecionada
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal de sucesso
  const [cost, setCost] = useState('');  // Novo estado para o valor dos custos
  const defaultImageUrl = require('../../../../../../assets/images/png/placeholder.png'); // URL da imagem padrão

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {

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

  // Função para buscar as unidades de medida da API
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

  const handleSave = async () => {
    if (!name || (!price && !isPriceDisabled) || !unitMeasure || !cost) {
      Alert.alert('Erro', 'Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }
  
    if (!empresaId) {
      Alert.alert('Erro', 'ID da empresa não disponível. Tente novamente mais tarde.');
      return;
    }
  
    const currentDate = new Date().toISOString().split('T')[0];
    const finalPrice = isPriceDisabled ? 0 : removeCurrencyFormatting(price);
    const finalCost = removeCurrencyFormatting(cost);  // Adiciona o valor do custo
  
    const serviceData = {
      empresa_id: empresaId,
      dt_servico: currentDate,
      nome: name,
      descricao: description || null,
      custo_servico: finalCost,  // Custo do serviço adicionado
      preco_venda: finalPrice,
      status: 'ativo',
      unidade_medida: unitMeasure,
      is_cobrar_na_hora_da_venda: true,  // Valor fixo
      ean: barcode || null,
    };
  
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
        const serviceId = result.data.id;  // Obtém o ID do serviço recém-cadastrado
        if (photo) {
          await uploadServiceImage(serviceId, empresaId);  // Faz o upload da imagem, se houver
        }
        setModalVisible(true);  // Exibe o modal de sucesso
        clearForm();  // Limpa o formulário
      } else {
        Alert.alert('Erro', result.message || 'Ocorreu um erro ao registrar o serviço.');
      }
    } catch (error) {
      console.error('Erro ao salvar o serviço:', error);
      Alert.alert('Erro', 'Não foi possível registrar o serviço. Verifique sua conexão e tente novamente.');
    }
  };
  
  
// Função para enviar a imagem do produto
const uploadServiceImage = async (serviceId, empresaId) => {
  if (!photo) return;  // Certifique-se de que a imagem existe

  const formData = new FormData();
  formData.append('servico', serviceId);  // ID do produto
  formData.append('empresa', empresaId);  // ID da empresa
  formData.append('arquivo', {
    uri: photo.uri,  // Use o 'uri' da imagem
    type: photo.type,  // Tipo da imagem, como 'image/jpeg'
    name: photo.name,  // Nome do arquivo
  });
  formData.append('usuario', 1);  // ID do usuário (se aplicável)

  try {
    const response = await axios.post(IMAGE_UPLOAD_API, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Define o tipo como multipart
      },
    });

    if (response.data.status === 'success') {
      console.log('Imagem do produto registrada com sucesso:', response.data);
    } else {
      Alert.alert('Erro', 'Falha ao enviar a imagem.');
    }
  } catch (error) {
    console.error('Erro ao enviar imagem:', error.response?.data || error.message);
    Alert.alert('Erro', 'Erro ao enviar a imagem.');
  }
};

// Função para selecionar imagem da galeria
const handleSelectImage = async () => {
  launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
    if (response.didCancel) {
      console.log('Usuário cancelou a seleção da imagem');
    } else if (response.errorCode) {
      console.error('Erro ao selecionar imagem:', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const selectedPhoto = response.assets[0];
      setPhoto({
        uri: selectedPhoto.uri,
        type: selectedPhoto.type || 'image/jpeg',  // Define o tipo como 'image/jpeg' por padrão, caso não esteja presente
        name: selectedPhoto.fileName || `photo_${Date.now()}.jpg`,  // Define um nome padrão se 'fileName' estiver ausente
      });
    }
  });
};

  const clearForm = () => {
    setBarcode('');
    setName('');
    setUnitMeasure('');
    setPrice('');
    setDescription('');
    setIsPriceDisabled(false);
    setPhoto(null);  // Limpa a imagem
    setCost('')
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
    navigation.goBack() // Redireciona para a próxima tela
  };
  const handleNewService = () => {
    setModalVisible(false); // Fecha o modal
  };

  const handlePriceCheckboxChange = () => {
    setIsPriceDisabled(!isPriceDisabled);
    if (!isPriceDisabled) {
      setPrice('0.00'); // Define o preço como 0 ao marcar o checkbox
      setUnitMeasure('und'); // Define o código da unidade como "und" automaticamente
      setUnitsOfMeasure([{ id: 1, cod: 'und', nome: 'Unidade' }]); // Define a unidade "und" com o código correto
    } else {
      setPrice(''); // Limpa o preço quando o checkbox é desmarcado
      setUnitMeasure(''); // Limpa a unidade de medida quando o checkbox é desmarcado
      fetchUnitsOfMeasure(empresaId); // Recarrega as unidades de medida da API ao desmarcar o checkbox
    }
  };

  const formatPriceToBRL = (value) => {
    const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100;
    if (isNaN(numericValue)) return '';

    return numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const removeCurrencyFormatting = (formattedValue) => {
    const numericValue = formattedValue.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(numericValue);
  };

  const handlePriceChange = (text) => {
    const formattedValue = formatPriceToBRL(text);
    setPrice(formattedValue);
  };

  const handleCostChange = (text) => {
    const formattedValue = formatPriceToBRL(text);
    setCost(formattedValue);
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
            <TouchableOpacity style={styles.imageWrapper} onPress={handleSelectImage}>
              {photo ? (
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 120, height: 120, resizeMode: 'contain', borderRadius: 10, }}
                  onError={(error) => console.error('Erro ao carregar a imagem:', error.nativeEvent.error)}
                />
              ) : (
                <Icon name="camera" size={40} color={COLORS.black} />
              )}
            </TouchableOpacity>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Código (opcional)"
              value={barcode}
              onChangeText={setBarcode}
              keyboardType="numeric"
              />
          </View>
          <Text style={styles.imageLabel}>  Imagem{"\n"}do serviço</Text>
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
            placeholder="Descrição do Serviço (opcional)"
            value={description}
            onChangeText={setDescription}
            multiline
            />
        </View>
            {/*
              <View style={styles.checkboxContainer}>
                <TouchableOpacity onPress={handlePriceCheckboxChange} style={styles.checkbox}>
                  <Icon name={isPriceDisabled ? 'checkbox' : 'square-outline'} size={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.checkboxLabel}>Não inserir preço neste momento</Text>
              </View>*/}

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Valores do Serviço</Text>

  <View style={styles.row}>
    {/* Preço de Venda */}
    <TextInput
      style={[styles.input, styles.halfWidthInput]}
      placeholder="Preço de Venda (R$)"
      value={price}
      onChangeText={handlePriceChange}
      keyboardType="numeric"
    />

    {/* Unidade de Medida */}
    <TouchableOpacity style={[styles.input, styles.halfWidthInput]} onPress={toggleUnitMeasureDropdown}>
      <Text style={styles.MedidaText}>{unitMeasure || 'Un. de Medida'}</Text>
      <Icon name={isUnitMeasureDropdownVisible ? 'arrow-up' : 'arrow-down'} size={24} color={COLORS.lightGray} style={{marginTop:10}} />
    </TouchableOpacity>
  </View>


  {/* Dropdown da Unidade de Medida */}
  {isUnitMeasureDropdownVisible && (
    <View style={[styles.dropdownContainer, { maxHeight: 150, marginTop: 10 }]}>
      <ScrollView nestedScrollEnabled={true}>
        {unitsOfMeasure.map((unit) => (
          <TouchableOpacity key={unit.id} style={styles.dropdownItem} onPress={() => selectUnitMeasure(unit)}>
            <Text style={styles.dropdownItemText}>{unit.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )}
  {/* Campo de Custo */}
  <Text style={styles.costSectionTitle}>Custos (apenas para estimativa de lucro bruto)</Text>
  <TextInput
    style={styles.input}
    placeholder="Valor dos Custos (R$)"
    value={cost}
    onChangeText={handleCostChange}
    keyboardType="numeric"
  />
</View>

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Icon name="checkmark-circle" size={25} color={COLORS.black} />
          <Text style={styles.buttonText}>Cadastrar serviço</Text>
        </TouchableOpacity>
      </ScrollView>

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
            <TouchableOpacity style={styles.confirmButton} onPress={handleNewService}>
              <Text style={styles.confirmButtonText}>Cadastrar novo serviço</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButtonReturn} onPress={handleCloseModal}>
              <Text style={styles.confirmButtonText}>Retorna</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddService;
