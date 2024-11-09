/* eslint-disable prettier/prettier */
// CancelWarningModal.js
import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet} from "react-native";
import { COLORS } from "../../../../constants";


const CancelWarningModal = ({ visible, onClose, onNavigateToExpense }) => {
    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.warningText}>
                        Para cancelar, lance uma despesa como estorno de venda.
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={onNavigateToExpense}>
                            <Text style={styles.buttonText}>Fazer agora</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    warningText: {
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 5,
    },
    cancelButton: {
        flex: 1,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 5,
    },
    buttonText: {
        color: COLORS.black,
        fontSize: 14,
        fontWeight: 'bold',
    },
})

export default CancelWarningModal;
