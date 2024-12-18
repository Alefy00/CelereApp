/* eslint-disable prettier/prettier */
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../../../constants';

const ProminentDisclosureModal = ({ visible, onClose, onAgree }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Aviso Importante</Text>
          <Text style={styles.description}>
            Este aplicativo coleta e utiliza seus contatos para facilitar a inclusão de novos clientes no sistema. Ao permitir o acesso, iremos:
          </Text>
          <Text style={styles.item}>• Ler sua lista de contatos.</Text>
          <Text style={styles.item}>• Exibir seus contatos para que você possa selecionar um e adicionar facilmente ao cadastro de clientes.</Text>
          
          <Text style={styles.description}>
            Não compartilharemos esses dados com terceiros. A coleta é estritamente para facilitar a sua experiência ao incluir novos clientes.
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.agreeButton} onPress={onAgree}>
              <Text style={styles.agreeButtonText}>Concordo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { 
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  container: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
    color: COLORS.black,
  },
  item: {
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 10
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop: 20
  },
  agreeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    marginRight: 10
  },
  agreeButtonText: {
    color: COLORS.black, 
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: COLORS.lightGray,
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: COLORS.black
  }
});

export default ProminentDisclosureModal;
