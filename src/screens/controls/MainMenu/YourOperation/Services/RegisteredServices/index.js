/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../../../components/BarTop3';
import { COLORS } from '../../../../../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constantes da API
const BASE_API_URL = 'https://api.celereapp.com.br';
const REGISTERED_SERVICES_API = `${BASE_API_URL}/cad/servicos/`;

const RegisteredServices = ({ navigation }) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [value, setValue] = useState('');
  const [nome, setNome] = useState('');
  const [services, setServices] = useState([]); // Serviços listados da API
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Função para buscar o ID da empresa logada
  const getEmpresaId = async () => {
    try {
      const storedEmpresaId = await AsyncStorage.getItem('empresaId');
      if (storedEmpresaId) {
        return Number(storedEmpresaId); // Converte para número se estiver como string
      } else {
        Alert.alert('Erro', 'ID da empresa não encontrado.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o ID da empresa:', error);
      return null;
    }
  };

  const fetchServiceImage = async (empresaId, serviceId) => {
    try {
      const response = await axios.get(
        `${BASE_API_URL}/mnt/imagensservico/getImagemServ/?empresa=${empresaId}&servico=${serviceId}`
      );
      if (response.data && response.data.status === 'success') {
        return `${BASE_API_URL}${response.data.data.imagem}`;  // URL completa da imagem
      } else {
        return null;  // Retorna null se não houver imagem
      }
    } catch (error) {
      console.error('Erro ao buscar imagem do serviço:', error);
      return null;  // Retorna null em caso de erro
    }
  };
  
  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);  // Inicia o loading
      const empresaId = await getEmpresaId();
      if (empresaId) {
        let query = `?page=1&page_size=100`;
  
        // Filtro por nome de serviço
        if (nome) {
          query += `&search=${nome}`;
        }
  
        const response = await axios.get(`${REGISTERED_SERVICES_API}${query}`);
  
        if (response.data && response.data.results && response.data.results.data) {
          const filteredServices = response.data.results.data.filter(service => service.empresa.id === empresaId);
  
          // Agora, para cada serviço, busca a imagem correspondente
          const servicesWithImages = await Promise.all(filteredServices.map(async (service) => {
            const imageUrl = await fetchServiceImage(empresaId, service.id);
            return { ...service, image_url: imageUrl };  // Adiciona o campo image_url com a imagem recuperada
          }));
  
          setServices(servicesWithImages);  // Popula a lista de serviços com as imagens
        } else {
          Alert.alert('Erro', 'Falha ao recuperar os serviços.');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao buscar os serviços.');
    } finally {
      setLoading(false);  // Finaliza o loading
    }
  }, [nome]);
  

  useEffect(() => {
    fetchServices(); // Chama a função ao carregar a tela
  }, [fetchServices]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const openFilterModal = () => {
    setFilterModalVisible(true);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  return (
    <View style={styles.containerBase}>
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Serviços registrados</Text>
        <Text style={styles.subtitle}>Veja e cadastre serviços que sua empresa opera.</Text>

        {/* Campo de Pesquisa */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquise um serviço..."
            value={nome}
            onChangeText={setNome} // Atualiza o estado de pesquisa
          />
          <Icon name="search" size={20} color={COLORS.gray} />
          <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
            <Icon name="filter" size={20} color={COLORS.black} />
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de Serviços */}
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.black} />
        ) : (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.serviceCard}>
                <Image
                  source={item.image_url ? { uri: item.image_url } : require('../../../../../../assets/images/png/placeholder.png')} // Imagem padrão se não houver
                  style={styles.serviceImage}
                />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.nome}</Text>
                  {/* Mudança para exibir unidade_medida */}
                  <Text style={styles.serviceType}>Unidade de Medida: {item.unidade_medida || 'Serviço livre'}</Text>
                </View>
                <Text style={styles.servicePrice}>R${parseFloat(item.preco_venda).toFixed(2)}</Text>
              </View>
            )}
            style={styles.serviceList}
          />
        )}

        {/* Botão Cadastrar Novo Serviço */}
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddService')}>
          <Icon name="add" size={25} color={COLORS.black} />
          <Text style={styles.addButtonText}>Cadastrar novo serviço</Text>
        </TouchableOpacity>

        {/* Modal de filtro */}
        <Modal
          visible={filterModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeFilterModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filtre por data, categoria, valor ou todos.</Text>
                <TouchableOpacity onPress={closeFilterModal}>
                  <Icon name="close" size={30} color={COLORS.black} />
                </TouchableOpacity>
              </View>

              {/* Campo de Data */}
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={showDatePicker}
              >
                <Text style={styles.input}>
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Data'}
                </Text>
                <Icon name="calendar" size={20} color={COLORS.grey} />
              </TouchableOpacity>

              {/* Date Picker Modal */}
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <View style={styles.inputContainer2}>
                <TextInput
                  style={styles.input}
                  placeholder="Nome"
                  value={nome}
                  onChangeText={setNome}
                />
              </View>

              {/* Campo de Valor */}
              <View style={styles.inputContainer2}>
                <TextInput
                  style={styles.input}
                  placeholder="Valor"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={setValue}
                />
              </View>

              {/* Botão Filtrar */}
              <TouchableOpacity style={styles.modalFilterButton} onPress={fetchServices}>
                <Icon name="filter" size={20} color={COLORS.black} />
                <Text style={styles.modalFilterButtonText}>Filtrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default RegisteredServices;
