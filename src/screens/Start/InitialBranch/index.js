/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, Alert, Animated, Easing } from 'react-native';
import styles from './styles';

const subcategories = {
  varejo: ['Lojista', 'Ambulante', 'Feirante', 'Internet', 'Em casa ou porta a porta'],
  servicos: ['Beleza - Cabelo, maquiagem, unhas, outros', 'Obras - Alvenaria, serralheria, elétrica, outros', 'Manutenção - Ar condicionado, Celular, Carros, outros', 'Profissionais de app', 'Outros'],
  fabricacao: ['Artesanato', 'Indústria', 'Pães, bolos, doces ou outros', 'Outros'],
};

const InitialBranch = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSubcategories, setCurrentSubcategories] = useState([]);
  const [fadeAnim] = useState(new Animated.Value(0)); 

  const openModal = (category) => {
    setSelectedCategory(category);
    setCurrentSubcategories(subcategories[category]);
    setModalVisible(true);

    // Animação de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
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

  const handleSave = () => {
    if (!selectedSubcategory) {
      Alert.alert('Atenção', 'Por favor, selecione uma subcategoria antes de prosseguir.');
      return;
    }
    closeModal();
    navigation.navigate('Start', { selectedCategory, selectedSubcategory });
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
      >
        <Text style={styles.optionText}>Serviços</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          selectedCategory === 'fabricacao' && styles.optionSelected,
        ]}
        onPress={() => openModal('fabricacao')}
      >
        <Text style={styles.optionText}>Fabricação / Produção</Text>
      </TouchableOpacity>

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
        <Text style={styles.modalTitle}>Selecione uma Subcategoria</Text>
        
        {subcategories.map((subcategory, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.modalOption,
              selectedSubcategory === subcategory && styles.modalOptionSelected,
            ]}
            onPress={() => setSelectedSubcategory(subcategory)}
          >
            <Text style={styles.modalOptionText}>{subcategory}</Text>
          </TouchableOpacity>
        ))}

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
