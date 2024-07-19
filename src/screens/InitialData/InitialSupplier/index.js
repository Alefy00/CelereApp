/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from "react-native";
import styles from './styles';
import BarTop2 from "../../../components/BarTop2";
import { COLORS } from "../../../constants";


const InitialSupplier = ({ navigation }) => {
    const [name, setName] = useState(''); 
    const [category, setCategory] = useState(''); 


    const handleSave = () => {
        // TODO: lógica para salvar os dados no banco
        console.log("Nome: ", name);
        console.log("Categoria: ", category);
        navigation.navigate("Start"); // Navega para a tela inicial
    };

    // Retorna o layout principal do componente
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: Platform.OS === 'android' ? 55 : 105 }}>
                <BarTop2
                    titulo={'Retorno'}
                    backColor={COLORS.primary}
                    foreColor={COLORS.black}
                    routeMailer={''}
                    routeCalculator={''}
                />
            </View>
            <ScrollView contentContainerStyle={{ ...styles.container, paddingTop: Platform.OS === 'android' ? 0 : 50 }}>
                <Text style={styles.label}>Nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do Fornecedor"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Categoria:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={category}
                        onValueChange={(itemValue) => setCategory(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Selecione uma categoria" value='' />
                        <Picker.Item label="Aluguel" value="Aluguel" />
                        <Picker.Item label="Mercadoria" value="Mercadoria" />
                        <Picker.Item label="Limpeza" value="Limpeza" />
                        <Picker.Item label="Materia Prima" value="MateriaPrima" />
                    </Picker>
                </View>
                <Text style={styles.optionalText}>CADASTRO COMPLETO (OPCIONAL)</Text>

                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default InitialSupplier;
