/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BarTop3 from '../../../../components/BarTop3';
import styles from './styles';
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../../../../constants';
import ConfirmationModal from './components/ConfirmationModal';
import CustomCalendar from '../../../../components/CustomCalendar';

const CelerePayRegister = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
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
      setIsModalVisible(true);
    };
  
    const closeModal = () => {
      navigation.navigate('CelerePayBank');
      setIsModalVisible(false);
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
                        {/* Primeiro e Último Nome */}
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu Primeiro Nome"
                            value={firstName}
                            onChangeText={setFirstName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu Último Nome"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                            <CustomCalendar
                            placeholder="Selecione sua Data de Nascimento"
                            value={birthDate}
                            onChange={(date) => setBirthDate(date)}
                        />

                        {/* CPF, RG, Expeditor e UF */}
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
                    </View>
                {/* Botão de confirmar (oculto quando o teclado estiver visível) */}
                {!isKeyboardVisible && (
                    <View style={styles.confirmButtonContainer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Icon name="checkmark-circle" size={24} color="#000" />
                            <Text style={styles.confirmButtonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                )}
                </ScrollView>
                <ConfirmationModal
                  visible={isModalVisible}
                  onClose={closeModal}
                  data={{
                    firstName,
                    lastName,
                    cnpj,
                    hasCnpj,
                    cpf,
                    rg,
                    expeditor,
                    uf,
                    cep,
                    street,
                    number,
                    complement,
                    neighborhood,
                    city,
                    state,
                  }}
                />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CelerePayRegister;
