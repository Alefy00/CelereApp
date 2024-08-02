/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from './styles'

const Others = ({navigation}) => {
    const [dataAporte, setDataAporte] = useState(new Date());
    const [valorAporte, setValorAporte] = useState('');
    const [origemAporte, setOrigemAporte] = useState('');
    const [showDataPicker, setShowDataPicker] = useState(false);

    const handleSave = () => {
        if(!dataAporte|| !valorAporte || !origemAporte){
            Alert.alert("Erro", "Todos os campos devem ser preenchidos.");
            return;
        }

        //TODO: lóogica pra salvar o aporte
        console.log('Aporte salvo: ', {dataAporte, valorAporte, origemAporte});
        Alert.alert('Sucesso', 'Aporte salvo com sucesso.')
    };

    const handleDataChance = (event, selectedDate) => {
        const currentDate = selectedDate || dataAporte;
        setShowDataPicker(false);
        setDataAporte(currentDate);
    };

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
                    <Text style={styles.textOutros} >Outros</Text>
                  <TouchableOpacity onPress={()=> setShowDataPicker(true)} style={styles.input}>
                    <Text>{formatDate(dataAporte)}</Text>
                  </TouchableOpacity>
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
                  onChangeText={setDataAporte}
                  keyboardType='numeric'
                  />
                  <TextInput
                  style={styles.input}
                  placeholder="Origem"
                  value={origemAporte}
                  onChangeText={setOrigemAporte}
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                 <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

export default Others;