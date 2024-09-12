/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const Others = ({ navigation }) => {
    const [entries, setEntries] = useState([
        { id: '1', data: '02/08/2024', justificativa: 'Processo trabalhista liquidado a favor da empresa, dinheiro da indenização.', valor: '8000,00' }
    ]);


    // Função para renderizar cada item da lista de entradas
    const renderItem = ({ item }) => (
        <View style={styles.entryItem}>
            <View>
                <Text style={styles.entryData}>{item.data}</Text>
                <Text style={styles.entryJustificativa}>{item.justificativa}</Text>
            </View>
            <Text style={styles.entryValor}>R${item.valor}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    {/* BarTop2 ocupando a largura total da tela */}
                    <View style={styles.barTopContainer}>
                        <BarTop2
                            titulo={'Voltar'}
                            backColor={COLORS.primary}
                            foreColor={COLORS.black}
                            routeCalculator={''}
                            routeMailer={''}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Outras Entradas</Text>
                        <Text style={styles.subtitle}>Cadastre manualmente entradas fora dos escopos anteriores aqui.</Text>

                        {/* Lista de entradas */}
                        <FlatList
                            data={entries}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            style={styles.list}
                        />
                    </View>

                    {/* Botão para cadastrar nova entrada, fixado no final da tela */}
                    <TouchableOpacity style={styles.addButton}>
                         <Icon name="add" size={24} color="black" />
                        <Text style={styles.addButtonText}>Cadastrar nova entrada</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Others;
