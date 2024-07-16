/* eslint-disable prettier/prettier */
import React,{ useState } from "react";
import BarTop2 from "../../../../components/BarTop2";
import { COLORS } from "../../../../constants";
import styles from "./styles";
import {Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";


const HowBusiness = ({ navigation }) =>{
    const [selectedOption, setSelectedOption] = useState(null)

    const options = [
        { id: 1, label: 'Segunda à sexta e fecho nos feriados' },
        { id: 2, label: 'Segunda à sábado e abro nos feriados de meio de semana' },
        { id: 3, label: 'Segunda à sábado e fecho nos feriados' },
        { id: 4, label: '7 dias por semana' },
      ];

      const handleSelect = (id) => {
        setSelectedOption(id);
      };

      const handleNext = () =>{
        //TODO: lógica pra salvar os dados no banco
        console.log("Opção selecionada: " ,selectedOption);
        navigation.navigate("DistributionSales");
      };

      const handlePrevious = () =>{
        navigation.goBack();
      };

      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1}}>
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
                <Text style={styles.label}>Como funciona seu negócio?</Text>
                {options.map(option => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.option,
                      selectedOption === option.id && styles.selectedOption
                    ]}
                    onPress={() => handleSelect(option.id)}
                  >
                    <Text style={styles.optionLabel}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={handlePrevious}>
                    <Text style={styles.buttonText}>Anterior</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Próximo</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );

};

export default HowBusiness;