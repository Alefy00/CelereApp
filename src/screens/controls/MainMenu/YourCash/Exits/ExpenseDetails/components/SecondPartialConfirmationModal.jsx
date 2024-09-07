/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';

const SecondPartialConfirmationModal = ({ visible, onClose, onConfirm, remainingAmount, partialAmount }) => {

    // Garantir que os valores são válidos
    const formattedPartialAmount = partialAmount ? parseFloat(partialAmount).toFixed(2) : '0.00';
    const formattedRemainingAmount = remainingAmount ? parseFloat(remainingAmount).toFixed(2) : '0.00';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"  // Slide animation for a smooth transition
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>
                        Você está liquidando R$ {formattedPartialAmount}. {'\n'}
                        Restam ainda R$ {formattedRemainingAmount}
                    </Text>

                    <View style={styles.buttonContainer}>
                        {/* Botão de cancelar */}
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        {/* Botão de confirmar */}
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Icon name="checkmark-circle" size={20} color={COLORS.black} />
                            <Text style={styles.confirmButtonText}>Liquidar</Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darken background
    },
    modalContent: {
        width: '90%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
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
        fontWeight: 'bold',
        color: COLORS.black,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderColor: COLORS.lightGray,
        borderWidth: 1,
        borderRadius: 8,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: COLORS.black,
    },
    confirmButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        padding: 15,
    },
    confirmButtonText: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default SecondPartialConfirmationModal;
