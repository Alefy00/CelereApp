/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop3 from "../../../../components/BarTop3";
import { COLORS } from "../../../../constants";
import styles from "./styles";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import ProgressBar2 from "../components/ProgressBar2";
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';

const HowBusiness = ({ navigation }) => {
    const [selectedDays, setSelectedDays] = useState([]);
    const [includeHolidays, setIncludeHolidays] = useState(false);

    // Dias da semana disponíveis para seleção
    const daysOfWeek = [
        'Segundas', 'Terças', 'Quartas', 'Quintas', 'Sextas', 'Sábados', 'Domingos'
    ];

    // Função para selecionar/deselecionar os dias
    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter(d => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    // Função para salvar os dados e navegar para a próxima tela
    const handleNext = () => {
        console.log("Dias selecionados: ", selectedDays);
        console.log("Inclui feriados: ", includeHolidays);
        navigation.navigate("DistributionSales"); // Navega para a próxima tela
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={{ height: 50 }}>
                        <BarTop3
                            titulo={'Voltar'}
                            backColor={COLORS.primary}
                            foreColor={COLORS.black}
                            routeMailer={''}
                            routeCalculator={''}
                        />
                    </View>
                    
                    {/* Barra de progresso */}
                    <ProgressBar2 currentStep={2} totalSteps={3} />

                    <View style={styles.content}>
                        <Text style={styles.label}>Clique nos dias em que seu negócio funciona</Text>

                        {/* Botões dos dias da semana */}
                        <View style={styles.daysContainer}>
                            {daysOfWeek.map(day => (
                                <TouchableOpacity
                                    key={day}
                                    style={[
                                        styles.dayButton,
                                        selectedDays.includes(day) && styles.selectedDayButton
                                    ]}
                                    onPress={() => toggleDay(day)}
                                >
                                    <Text style={styles.dayButtonText}>{day}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Checkbox para incluir feriados */}
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={includeHolidays}
                                onValueChange={setIncludeHolidays}
                            />
                            <Text style={styles.checkboxLabel}>Incluindo feriados neste período</Text>
                        </View>

                        {/* Botão de continuar */}
                    </View>
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Icon name="arrow-forward" size={24} color={COLORS.black} />
                            <Text style={styles.buttonText}>Continuar</Text>
                        </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default HowBusiness;
