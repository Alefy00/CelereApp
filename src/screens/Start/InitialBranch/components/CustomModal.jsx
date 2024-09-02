/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const CustomModal = ({
  visible,
  fadeAnim,
  subcategories,
  selectedSubcategory,
  setSelectedSubcategory,
  onClose,
  onSave,
}) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Selecione um Ramo de Atividade</Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
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

CustomModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  fadeAnim: PropTypes.object.isRequired,
  subcategories: PropTypes.array.isRequired,
  selectedSubcategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setSelectedSubcategory: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Aumentando a opacidade para um efeito mais escuro
  },
  modalContent: {
    width: '85%', // Ligeiramente mais largo para melhor usabilidade
    padding: 25,
    backgroundColor: '#FFF',
    borderRadius: 15, // Arredondamento maior para um visual mais moderno
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4, // Sombra mais profunda
    },
    shadowOpacity: 0.3, // Sombra mais pronunciada
    shadowRadius: 5,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Cores mais escuras para melhor contraste
  },
  scrollViewContent: {
    alignItems: 'center', // Alinhar os itens no centro para uma apresentação limpa
  },
  modalOption: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#F7F7F7', // Cor de fundo mais clara
    marginBottom: 10,
    alignItems: 'center',
  },
  modalOptionSelected: {
    backgroundColor: '#FFEB3B', // Cor destacada para seleção
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500', // Peso da fonte para legibilidade
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#DDD', // Fundo mais claro para o botão 'Fechar'
    marginHorizontal: 5,
  },
  modalSaveButton: {
    backgroundColor: '#FFEB3B', // Mantendo a cor consistente com o tema do aplicativo
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold', // Textos dos botões mais destacados
  },
};

export default CustomModal;
