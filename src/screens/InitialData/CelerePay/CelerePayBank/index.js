/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Keyboard, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';

const CelerePayBank = ({ navigation }) => {
  const [isCnpjChecked, setIsCnpjChecked] = useState(false);
  const [isCpfChecked, setIsCpfChecked] = useState(false);
  const [bankNumber, setBankNumber] = useState('');
  const [agency, setAgency] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [isFirstModalVisible, setIsFirstModalVisible] = useState(false); // Controle do primeiro modal
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false); // Controle do segundo modal
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // Controle da visibilidade do teclado

  useEffect(() => {
    // Monitorando a exibição e ocultação do teclado
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      // Removendo os listeners quando o componente for desmontado
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleConfirm = () => {
    setIsFirstModalVisible(true); // Exibe o primeiro modal ao clicar em Confirmar
  };

  const handleFirstModalConfirm = () => {
    setIsFirstModalVisible(false); // Fecha o primeiro modal
    setIsSecondModalVisible(true); // Abre o segundo modal
  };
  const handleFirstModalConfirm2 = () => {
    setIsFirstModalVisible(false); // Fecha o primeiro modal

  };

  const handleSecondModalConfirm = () => {
    setIsSecondModalVisible(false); // Fecha o segundo modal
    navigation.navigate('MainTab'); // Navega para a próxima tela
  };

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
              Domicílio bancário para receber os valores de seus clientes.
            </Text>
            <Text style={styles.description}>
              O titular da conta deve ser, necessariamente, o seu CNPJ ou CPF.
            </Text>

            {/* Checkbox para CNPJ e CPF */}
            <Text style={styles.checkboxTitle}>Quem é o titular?</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox
                value={isCnpjChecked}
                onValueChange={() => {
                  setIsCnpjChecked(!isCnpjChecked);
                  setIsCpfChecked(false); // Desmarca o CPF se CNPJ for marcado
                }}
                tintColors={{ true: COLORS.black, false: COLORS.grey }}
              />
              <Text style={styles.checkboxLabel}>CNPJ</Text>
              <CheckBox
                value={isCpfChecked}
                onValueChange={() => {
                  setIsCpfChecked(!isCpfChecked);
                  setIsCnpjChecked(false); // Desmarca o CNPJ se CPF for marcado
                }}
                tintColors={{ true: COLORS.black, false: COLORS.grey }}
              />
              <Text style={styles.checkboxLabel}>CPF</Text>
            </View>

            {/* Inputs para dados bancários */}
            <TextInput
              style={styles.input}
              placeholder="Número do banco"
              value={bankNumber}
              onChangeText={setBankNumber}
              keyboardType="numeric"
            />
            <View style={styles.rowContainer}>
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Agência"
                value={agency}
                onChangeText={setAgency}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, styles.inputHalf]}
                placeholder="Número da conta"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Chave pix"
              value={pixKey}
              onChangeText={setPixKey}
            />
          </View>
        </ScrollView>

        {/* Botão de confirmar (oculto quando o teclado estiver visível) */}
        {!isKeyboardVisible && (
          <View style={styles.confirmButtonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Icon name="checkmark-circle" size={24} color={COLORS.black} />
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Primeiro Modal de confirmação */}
        <Modal
          visible={isFirstModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleFirstModalConfirm}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Confirme os seguintes dados</Text>
                <TouchableOpacity onPress={handleFirstModalConfirm2}>
                  <Icon name="close" size={24} color={COLORS.grey} />
                </TouchableOpacity>
              </View>

              {/* Exibição dos dados inseridos */}
              <View style={styles.modalDataContainer}>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Quem é o titular?</Text>
                  <Text style={styles.modalValue}>{isCnpjChecked ? 'CNPJ' : 'CPF'}</Text>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Número do banco:</Text>
                  <Text style={styles.modalValue}>{bankNumber}</Text>
                </View>
                <View style={styles.modalDataRow}>
                  <View style={styles.modalDataItem}>
                    <Text style={styles.modalText}>Agência:</Text>
                    <Text style={styles.modalValue}>{agency}</Text>
                  </View>
                  <View style={styles.modalDataItem}>
                    <Text style={styles.modalText}>Número da conta:</Text>
                    <Text style={styles.modalValue}>{accountNumber}</Text>
                  </View>
                </View>
                <View style={styles.modalDataItem}>
                  <Text style={styles.modalText}>Chave pix:</Text>
                  <Text style={styles.modalValue}>{pixKey}</Text>
                </View>
              </View>

              {/* Botão de confirmar dentro do modal */}
              <TouchableOpacity style={styles.modalButton} onPress={handleFirstModalConfirm}>
                <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                <Text style={styles.modalButtonText}>Confirmar dados</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Segundo Modal de sucesso */}
        <Modal
          visible={isSecondModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleSecondModalConfirm}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent2}>
              <View style={styles.modalHeader2}>
                <Icon name="checkmark-circle" size={88} color={COLORS.green} />
              </View>

              <Text style={styles.modalTitle2}>Pronto!</Text>
              <Text style={styles.modalText2}>Você receberá uma mensagem no seu whatsapp assim que seus dados tiverem atualizados.</Text>

              {/* Botão de OK no segundo modal */}
              <TouchableOpacity style={styles.modalButton2} onPress={handleSecondModalConfirm}>
                <Text style={styles.modalButtonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CelerePayBank;
