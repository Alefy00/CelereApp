/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styles from "./styles";
import BarTop2 from "../../../../components/BarTop2";
import { COLORS } from "../../../../constants";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

// Componente principal da tela de Frequência de Compra
const PurchaseFrequency = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // Opções de período de compra
    const options = [
        { id: 1, label: 'Todo dia' },
        { id: 2, label: 'Semanal' },
        { id: 3, label: 'Quinzenal' },
        { id: 4, label: 'Mensal' },
    ];

    // Função para selecionar uma opção
    const handleSelect = (id) => {
        setSelectedOption(id);
    };

    // Função para salvar os dados e navegar para a tela inicial
    const handleSave = () => {
        // TODO: lógica para salvar os dados no banco
        console.log("Período selecionado: ", selectedOption);
        navigation.navigate("Start"); // Navega para a tela inicial
    };

    // Retorna o layout principal do componente
    return (
       <KeyboardAvoidingView
           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           style={styles.container}
       >
           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={{ flex: 1 }}>
                   <View style={{ height: 50 }}>
                       <BarTop2
                           titulo={'Retorno'}
                           backColor={COLORS.primary}
                           foreColor={COLORS.black}
                           routeMailer={''}
                           routeCalculator={''}
                       />
                   </View>
                   <View style={styles.content}>
                       <Text style={styles.label}>Geralmente em qual período?</Text>
                       {options.map(option => (
                           <TouchableOpacity 
                               key={option.id}
                               style={[styles.option, selectedOption === option.id && styles.selectedOption]}
                               onPress={() => handleSelect(option.id)}
                           >
                               <Text style={styles.optionLabel}>{option.label}</Text>
                           </TouchableOpacity>
                       ))}
                       <TouchableOpacity style={styles.button} onPress={handleSave}>
                           <Text style={styles.buttonText}>Salvar</Text>
                       </TouchableOpacity>
                   </View>
               </View>
           </TouchableWithoutFeedback>
       </KeyboardAvoidingView> 
    );
};

export default PurchaseFrequency;
