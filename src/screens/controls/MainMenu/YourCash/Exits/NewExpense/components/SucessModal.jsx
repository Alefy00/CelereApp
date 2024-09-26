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
                <Icon name="checkmark-circle" size={80} color={COLORS.green} />
              </View>
              <Text style={styles.title}>Sua despesa foi registrada!</Text>
              <TouchableOpacity style={styles.returnButton} onPress={onClose}>
                <Text style={styles.titleBack}>Voltar ao Menu</Text>
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
      color: '#000'
    },
    returnButton: {
      backgroundColor: COLORS.primary,
      padding: 25,
      borderRadius: 5,
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
    },
    returnButtonText: {
      color: COLORS.black,

    },
    titleBack:{
      fontSize: 15,
      color: COLORS.black,
      fontWeight: '500'
    },
    newExpenseButton: {
      backgroundColor: COLORS.green,
      padding: 25,
      borderRadius: 5,
      alignItems: 'center',
      width: '100%',
    },
    newExpenseButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500'

    },
  });

export default SucessModal;