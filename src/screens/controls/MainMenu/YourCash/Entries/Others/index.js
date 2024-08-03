/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from './styles'

const Others = ({ navigation }) => {
    // Estados para armazenar os valores de entrada do usuário
    const [dataAporte, setDataAporte] = useState(new Date());
    const [valorAporte, setValorAporte] = useState('');
    const [origemAporte, setOrigemAporte] = useState('');
    const [showDataPicker, setShowDataPicker] = useState(false);

    // Função para lidar com o salvamento dos dados de aporte
    const handleSave = () => {
        if (!dataAporte || !valorAporte || !origemAporte) {
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return;
        }

        // TODO: lógica pra salvar o aporte
        console.log('Aporte salvo: ', { dataAporte, valorAporte, origemAporte });
        Alert.alert('Sucesso', 'Aporte salvo com sucesso.');
    };

    // Função para lidar com a mudança da data no DateTimePicker
    const handleDataChance = (event, selectedDate) => {
        const currentDate = selectedDate || dataAporte;
        setShowDataPicker(false);
        setDataAporte(currentDate);
    };

    // Função para formatar a data para o formato 'pt-BR'
    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    <BarTop2
                        titulo={'Entradas'}
                        backColor={COLORS.primary}
                        foreColor={COLORS.black}
                        routeCalculator={''}
                        routeMailer={''}
                    />
                    <View style={styles.inputContainer}>
                        <Text style={styles.textOutros}>Outros</Text>
                        {/* Botão para abrir o DateTimePicker */}
                        <TouchableOpacity onPress={() => setShowDataPicker(true)} style={styles.input}>
                            <Text>{formatDate(dataAporte)}</Text>
                        </TouchableOpacity>
                        {/* Exibe o DateTimePicker se showDataPicker for verdadeiro */}
                        {showDataPicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dataAporte}
                                mode={'date'}
                                display="default"
                                onChange={handleDataChance}
                                locale="pt-BR"
                            />
                        )}
                        <TextInput
                            style={styles.input}
                            placeholder="Valor do aporte"
                            value={valorAporte}
                            onChangeText={setValorAporte}
                            keyboardType='numeric'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Origem"
                            value={origemAporte}
                            onChangeText={setOrigemAporte}
                        />
                    </View>
                    {/* Botão para salvar os dados de aporte */}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

export default Others;
