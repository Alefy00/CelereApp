/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import styles from "./styles";
import BarTop2 from "../../../../components/BarTop2";
import { COLORS } from "../../../../constants";
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const BuyPrevision = ({navigation}) => {
    const [averagePurchase, setAveragePurchase] = useState('');
    
    const handleNext = ()=>{
        //TODO: lógica para salvar dados no banco
        console.log('Média de compra do fornecedor: ', averagePurchase);
        navigation.navigate("PurchaseFrequency");
    };

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? 'padding' : 'height'}
        style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    <View style={{height: 50}}>
                        <BarTop2
                        titulo={'Retorno'}
                        backColor={COLORS.primary}
                        foreColor={COLORS.black}
                        routeMailer={''}
                        routeCalculator={''}
                        />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.label}>Quanto em média você compra do seu fornecedor?</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                            style={styles.input}
                            placeholder="R$ 0,00"
                            keyboardType='numeric'
                            value={averagePurchase}
                            onChangeText={setAveragePurchase}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleNext}>
                            <Text style={styles.buttonText}>Próximo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default BuyPrevision;