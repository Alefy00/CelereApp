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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
    marginBottom: 10,
    alignItems: 'center',
  },
  modalOptionSelected: {
    backgroundColor: '#FFEB3B',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#CCC',
    marginHorizontal: 5,
  },
  modalSaveButton: {
    backgroundColor: '#FFEB3B',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#333',
  },
};

export default CustomModal;
