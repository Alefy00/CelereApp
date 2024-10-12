/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal,StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../../../../../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomCalendar from '../../../../../../../components/CustomCalendar';


const TotalLiquidationModal = ({ visible, onClose, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Data selecionada pelo usuário
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);

    const handleDayPress = (day) => {
        setSelectedDate(new Date(day.dateString)); // Atualiza a data selecionada
      };

      const handleShowCalendar = () => {
        setIsCalendarVisible(true);
      };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Quando esta despesa foi liquidada?</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="close" size={24} color="#000" />
                        </TouchableOpacity>
                    </View>

                    {/* Botão de seleção de data */}
                    <TouchableOpacity 
                        style={styles.datePickerButton} 
                        onPress={handleShowCalendar}
                    >
                        <Text style={styles.dateText}>
                            {`Hoje, ${selectedDate.toLocaleDateString('pt-BR')}`}
                        </Text>
                        <Icon name="calendar" size={24} color={COLORS.lightGray} />
                    </TouchableOpacity>

                            <CustomCalendar
                            visible={isCalendarVisible}
                            onClose={() => setIsCalendarVisible(false)}
                            onDayPress={handleDayPress}
                        />
                    <TouchableOpacity style={styles.confirmButton} onPress={() => onConfirm(selectedDate)}>
                        <Icon name="checkmark-circle" size={24} color="#000" />
                        <Text style={styles.confirmButtonText}>Liquidar despesa</Text>
                    </TouchableOpacity>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalTitle: {
        fontSize: 18,
        color: COLORS.black,
    },
    datePickerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth:1,
        borderColor: COLORS.lightGray,
        borderRadius: 8,
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        color: COLORS.black,
    },
    confirmButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        padding: 15,
        width: '100%',
        height: 70,
    },
    confirmButtonText: {
        color: COLORS.black,
        fontSize: 16,
        marginLeft: 10,
    },
})

export default TotalLiquidationModal;
