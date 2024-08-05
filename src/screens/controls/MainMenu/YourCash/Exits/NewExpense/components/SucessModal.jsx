/* eslint-disable prettier/prettier */
import React from "react";
import { COLORS } from "../../../../../../../constants";
import Icon from 'react-native-vector-icons/Ionicons';
import { Modal, View, StyleSheet, Text, TouchableOpacity } from "react-native";

const SucessModal = ({visible, onClose, onRegisterNew}) => {
    return (
        <Modal 
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <View style={styles.iconContainer}>
                <Icon name="checkmark-circle-outline" size={80} color={COLORS.green} />
              </View>
              <Text style={styles.title}>Sua despesa foi registrada!</Text>
              <TouchableOpacity style={styles.returnButton} onPress={onClose}>
                <Text>Voltar ao Menu de Saídas</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.newExpenseButton} onPress={onRegisterNew}>
                <Text style={styles.newExpenseButtonText}> Registrar nova despesa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    iconContainer: {
      width: 100,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: '#fff',
      fontSize: 24,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    returnButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    returnButtonText: {
      color: COLORS.black,
      fontWeight: 'bold',
    },
    newExpenseButton: {
      backgroundColor: COLORS.green,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      width: '100%',
    },
    newExpenseButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default SucessModal;