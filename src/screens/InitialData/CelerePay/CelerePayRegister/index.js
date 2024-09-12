/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView, Modal } from 'react-native';
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
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleConfirm = () => {
      setIsModalVisible(true); // Exibe o modal quando o usuário clicar em confirmar
  };

  const closeModal = () => {
      navigation.navigate('CelerePayBank');
      setIsModalVisible(false); // Fecha o modal
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
                <CheckBox 
                value={!hasCnpj} 
                onValueChange={() => setHasCnpj(!hasCnpj)}
                tintColors={{ true: COLORS.black, false: COLORS.grey }}
                />
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
                  style={[styles.input, styles.inputSmallRG]}
                  placeholder="Digite o n° do seu RG"
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
                    style={styles.inputCEP}
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChangeText={formatCep}
                    keyboardType="numeric"
                  />
  
                  {/* Rua, Número */}
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={[styles.input, styles.inputLargeRUA]}
                      placeholder="Digite o seu endereço"
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
                      style={[styles.input, styles.inputLargeComplemento]}
                      placeholder="Digite o Complemento"
                      value={complement}
                      onChangeText={setComplement}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmallBairro]}
                      placeholder="Bairro"
                      value={neighborhood}
                      onChangeText={setNeighborhood}
                    />
                  </View>
  
                  {/* Cidade, Estado */}
                  <View style={styles.rowContainer}>
                    <TextInput
                      style={[styles.input, styles.inputLargeComplemento]}
                      placeholder="Cidade"
                      value={city}
                      onChangeText={setCity}
                    />
                    <TextInput
                      style={[styles.input, styles.inputSmallBairro]}
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
                          {/* Modal de confirmação dos dados */}
                          <Modal visible={isModalVisible} transparent={true} animationType="slide">
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
        <TouchableOpacity onPress={closeModal}>
          <Icon name="close" size={24} color={COLORS.grey} />
        </TouchableOpacity>
      </View>

      {/* Exibição dos dados preenchidos em duas colunas */}
      <View style={styles.modalRow}>
        <View style={styles.modalColumn}>
          <Text style={styles.modalLabel}>CNPJ:</Text>
          <Text style={styles.modalValue}>{hasCnpj ? cnpj : 'Não tenho CNPJ'}</Text>

          <Text style={styles.modalLabel}>RG:</Text>
          <Text style={styles.modalValue}>{rg}</Text>

          <Text style={styles.modalLabel}>CEP:</Text>
          <Text style={styles.modalValue}>{cep}</Text>

          <Text style={styles.modalLabel}>Endereço:</Text>
          <Text style={styles.modalValue}>{street}</Text>

          <Text style={styles.modalLabel}>Complemento:</Text>
          <Text style={styles.modalValue}>{complement}</Text>

          <Text style={styles.modalLabel}>Cidade:</Text>
          <Text style={styles.modalValue}>{city}</Text>
        </View>

        <View style={styles.modalColumn}>
          <Text style={styles.modalLabel}>CPF:</Text>
          <Text style={styles.modalValue}>{cpf}</Text>

          <Text style={styles.modalLabel}>Expeditor:</Text>
          <Text style={styles.modalValue}>{expeditor}</Text>

          <Text style={styles.modalLabel}>UF:</Text>
          <Text style={styles.modalValue}>{uf}</Text>

          <Text style={styles.modalLabel}>Número:</Text>
          <Text style={styles.modalValue}>{number}</Text>

          <Text style={styles.modalLabel}>Bairro:</Text>
          <Text style={styles.modalValue}>{neighborhood}</Text>

          <Text style={styles.modalLabel}>Estado:</Text>
          <Text style={styles.modalValue}>{state}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
        <Icon name="checkmark-circle" size={24} color="#000" />
        <Text style={styles.modalButtonText}>Confirmar dados</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  
  export default CelerePayRegister;