/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert, Animated, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import styles from './styles';

const API_URL_RAMO_ATIVIDADE = 'https://api.celereapp.com.br/cad/ramosatividades/';
const API_URL_ASSOCIAR_RAMO = 'https://api.celereapp.com.br/cad/associar_ramo_atividade/';

const subcategories = {
  varejo: 'V',
  servicos: 'S',
  fabricacao: 'F',
};

const InitialBranch = ({ navigation, route }) => {
  const userData = route?.params?.userData;


  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(false);

  const openModal = async (category) => {
    setSelectedCategory(category);
    const tipo = subcategories[category];

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL_RAMO_ATIVIDADE}?page_size=100&max_page_size=100&tipo=${tipo}`);
      setCurrentSubcategories(response.data.data);
      setModalVisible(true);

      // Animação de entrada
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os ramos de atividades. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    // Animação de saída
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const handleSave = async () => {
    if (!selectedSubcategory) {
      Alert.alert('Atenção', 'Por favor, selecione um ramo de atividade antes de prosseguir.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(API_URL_ASSOCIAR_RAMO, {
        empreendedor_id: userData.id,
        ramo_atividade_id: selectedSubcategory,
      });

      if (response.status === 200 && response.data.status === 'success') {
        Alert.alert('Sucesso', 'Ramo de atividade associado com sucesso.', [
          { text: 'OK', onPress: () => navigation.navigate('Start') }
        ]);
      } else {
        Alert.alert("Sucesso", response.data.message || 'Erro ao salvar o ramo de atividade. Tente novamente.', [
          { text: 'OK', onPress: () => navigation.navigate('Start') }
        ])
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }

    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Qual seu ramo de atuação?</Text>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'varejo' && styles.optionSelected,
        ]}
        onPress={() => openModal('varejo')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Varejo</Text>
        <Text style={styles.optionSubText}>Revenda de produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'servicos' && styles.optionSelected,
        ]}
        onPress={() => openModal('servicos')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'fabricacao' && styles.optionSelected,
        ]}
        onPress={() => openModal('fabricacao')}
        disabled={loading}
      >
        <Text style={styles.optionText}>Fabricação / Produção</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#000" />}

      <CustomModal
        visible={modalVisible}
        fadeAnim={fadeAnim}
        subcategories={currentSubcategories}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        onClose={closeModal}
        onSave={handleSave}
      />
    </View>
  );
};

const CustomModal = ({ visible, fadeAnim, subcategories, selectedSubcategory, setSelectedSubcategory, onClose, onSave }) => (
  <Modal
    animationType="none"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione um Ramo de Atividade</Text>
        
        <ScrollView>
          {subcategories.map((subcategory, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.modalOption,
                selectedSubcategory === subcategory.id && styles.modalOptionSelected,
              ]}
              onPress={() => setSelectedSubcategory(subcategory.id)}
            >
              <Text style={styles.modalOptionText}>{subcategory.nome}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.modalButton} onPress={onClose}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.modalSaveButton]} onPress={onSave}>
            <Text style={styles.modalButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  </Modal>
);

export default InitialBranch;
