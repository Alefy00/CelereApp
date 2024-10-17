/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback  } from 'react-native';
import { COLORS } from '../constants';

// Botões memorizados para não re-renderizar desnecessariamente
const CalculatorButton = React.memo(({ onPress, style, textStyle, text }) => (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  ));
  
  const CalculatorModal = ({ visible, onClose }) => {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [secondValue, setSecondValue] = useState('');
  
    // Função de clique no número memorizada
    const handlePressNumber = useCallback((num) => {
      if (operator === null) {
        setFirstValue((prev) => prev + num);
        setDisplayValue((prev) => prev + num);
      } else {
        setSecondValue((prev) => prev + num);
        setDisplayValue((prev) => prev + num);
      }
    }, [operator]);
  
    // Função de clique do operador memorizada
    const handleOperatorPress = useCallback((op) => {
      setOperator(op);
      setDisplayValue(op);
    }, []);
  
    // Função de limpar memorizada
    const handleClear = useCallback(() => {
      setDisplayValue('0');
      setFirstValue('');
      setSecondValue('');
      setOperator(null);
    }, []);
  
    // Função para calcular o resultado memorizada
    const handleEqualPress = useCallback(() => {
      const first = parseFloat(firstValue);
      const second = parseFloat(secondValue);
  
      if (operator && firstValue && secondValue) {
        let result = 0;
        switch (operator) {
          case '+':
            result = first + second;
            break;
          case '-':
            result = first - second;
            break;
          case '*':
            result = first * second;
            break;
          case '/':
            result = first / second;
            break;
          default:
            return;
        }
        setDisplayValue(result.toString());
        setFirstValue(result.toString());
        setSecondValue('');
        setOperator(null);
      }
    }, [firstValue, secondValue, operator]);
  
    // Função para calcular porcentagem memorizada
    const handlePercentagePress = useCallback(() => {
      if (firstValue && !operator) {
        const result = parseFloat(firstValue) / 100;
        setDisplayValue(result.toString());
        setFirstValue(result.toString());
      } else if (secondValue) {
        const result = parseFloat(secondValue) / 100;
        setDisplayValue(result.toString());
        setSecondValue(result.toString());
      }
    }, [firstValue, secondValue, operator]);
  
    return (
      <Modal visible={visible} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.calculatorContainer}>
                <Text style={styles.display}>{displayValue}</Text>
  
                {/* Linhas dos botões */}
                <View style={styles.row}>
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={handleClear} text="AC" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handleOperatorPress('±')} text="±" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={handlePercentagePress} text="%" />
                  <CalculatorButton style={styles.buttonOperator} textStyle={styles.buttonText} onPress={() => handleOperatorPress('/')} text="÷" />
                </View>
  
                <View style={styles.row}>
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('7')} text="7" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('8')} text="8" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('9')} text="9" />
                  <CalculatorButton style={styles.buttonOperator} textStyle={styles.buttonText} onPress={() => handleOperatorPress('*')} text="×" />
                </View>
  
                <View style={styles.row}>
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('4')} text="4" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('5')} text="5" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('6')} text="6" />
                  <CalculatorButton style={styles.buttonOperator} textStyle={styles.buttonText} onPress={() => handleOperatorPress('-')} text="−" />
                </View>
  
                <View style={styles.row}>
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('1')} text="1" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('2')} text="2" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber('3')} text="3" />
                  <CalculatorButton style={styles.buttonOperator} textStyle={styles.buttonText} onPress={() => handleOperatorPress('+')} text="+" />
                </View>
  
                <View style={styles.row}>
                  <CalculatorButton style={[styles.button, { width: "50%" }]} textStyle={styles.buttonText} onPress={() => handlePressNumber('0')} text="0" />
                  <CalculatorButton style={styles.button} textStyle={styles.buttonText} onPress={() => handlePressNumber(',')} text="," />
                  <CalculatorButton style={styles.buttonOperator} textStyle={styles.buttonText} onPress={handleEqualPress} text="=" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo semitransparente
  },
  calculatorContainer: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    height: "80%"
  },
  display: {
    fontSize: 60,
    color: '#ffffff', // Texto branco
    marginBottom: 10,
    width: '100%',
    textAlign: 'right',
    paddingRight: 20,
    backgroundColor: '#000000', // Fundo preto para o display
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#333333', // Botões numéricos em cinza escuro
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonOperator: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#333333', // Botões de operação com a cor primary
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 30,
    color: '#ffffff', // Texto branco nos botões
  },
  equalButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: COLORS.primary, // Botão igual com cor primary
    justifyContent: 'center',
    alignItems: 'center',
  },
  equalButtonText: {
    fontSize: 30,
    color: '#ffffff',
  },
});


export default CalculatorModal;
