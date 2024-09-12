/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../components/BarTop3';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../../../../constants';

const CelerePayRegister = ({ navigation }) => {
    const [cnpj, setCnpj] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [rg, setRg] = useState('');
    const [expeditor, setExpeditor] = useState('');
    const [uf, setUf] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [hasCnpj, setHasCnpj] = useState(true); // Estado para controlar se o usuário tem CNPJ
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Estado para controlar a visibilidade do teclado
  
    const handleConfirm = () => {
      navigation.navigate('NextScreen');
    };
  
    // Função para formatar o CNPJ com limite de 14 dígitos
    const formatCnpj = (text) => {
      const cleaned = text.replace(/\D/g, '').slice(0, 14); // Remove tudo que não for número e limita a 14 dígitos
      const formatted = cleaned.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      setCnpj(formatted);
    };
  
    // Função para formatar o CPF com limite de 11 dígitos
    const formatCpf = (text) => {
      const cleaned = text.replace(/\D/g, '').slice(0, 11); // Remove tudo que não for número e limita a 11 dígitos
      const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      setCpf(formatted);
    };
  
    // Função para formatar o CEP com limite de 8 dígitos
    const formatCep = (text) => {
      const cleaned = text.replace(/\D/g, '').slice(0, 8); // Remove tudo que não for número e limita a 8 dígitos
      const formatted = cleaned.replace(/(\d{5})(\d{3})/, '$1-$2');
      setCep(formatted);
    };
  
    // Monitorar quando o teclado é exibido ou oculto
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setIsKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setIsKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
  
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerBase}>
          {/* Barra superior */}
          <View style={styles.containerBartop}>
            <BarTop3
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
            />
          </View>
  
          {/* Conteúdo principal com ScrollView */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.container}>
              <Text style={styles.title}>Célere Pay</Text>
              <Text style={styles.subTitle}>
                Você recebe o valor da suas transações <Text style={styles.boldText}>no dia útil seguinte.</Text>
              </Text>
  
              {/* Campo de CNPJ */}
              <TextInput
                style={styles.input}
                placeholder="Digite seu CNPJ"
                value={cnpj}
                onChangeText={formatCnpj}
                keyboardType="numeric"
              />
              <View style={styles.checkboxContainer}>
                <CheckBox value={!hasCnpj} onValueChange={() => setHasCnpj(!hasCnpj)} />
                <Text style={styles.checkboxLabel}>Não tenho CNPJ</Text>
              </View>
  
              {/* CPF, RG, Expeditor e UF (sempre visíveis) */}
              <TextInput
                style={styles.input}
                placeholder="Digite seu CPF"
                value={cpf}
                onChangeText={formatCpf}
                keyboardType="numeric"
              />
              <View style={styles.rowContainer}>
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  placeholder="RG"
                  value={rg}
                  onChangeText={setRg}
                />
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  placeholder="Expeditor"
                  value={expeditor}
                  onChangeText={setExpeditor}
                />
                <TextInput
                  style={[styles.input, styles.inputSmall]}
                  placeholder="UF"
                  value={uf}
                  onChangeText={setUf}
                />
              </View>
  
              {/* Campos adicionais (exibidos apenas quando o checkbox está marcado) */}
              {!hasCnpj && (
                <>
                  {/* CEP */}
                  <TextInput
                    style={styles.input}
                    placeholder="CEP"
                    value={cep}
                    onChangeText={formatCep}
                    keyboardType="numeric"
                  />
  
                  {/* Rua, Número */}
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={[styles.input, styles.inputLarge]}
                      placeholder="Rua"
                      value={street}
                      onChangeText={setStreet}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Número"
                      value={number}
                      onChangeText={setNumber}
                      keyboardType="numeric"
                    />
                  </View>
  
                  {/* Complemento, Bairro */}
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={[styles.input, styles.inputLarge]}
                      placeholder="Complemento"
                      value={complement}
                      onChangeText={setComplement}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Bairro"
                      value={neighborhood}
                      onChangeText={setNeighborhood}
                    />
                  </View>
  
                  {/* Cidade, Estado */}
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={[styles.input, styles.inputLarge]}
                      placeholder="Cidade"
                      value={city}
                      onChangeText={setCity}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmall]}
                      placeholder="Estado"
                      value={state}
                      onChangeText={setState}
                    />
                  </View>
                </>
              )}
            </View>
          </ScrollView>
  
          {/* Botão de confirmar (oculto quando o teclado estiver visível) */}
          {!isKeyboardVisible && (
            <View style={styles.confirmButtonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Icon name="checkmark-circle" size={24} color="#000" />
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default CelerePayRegister;