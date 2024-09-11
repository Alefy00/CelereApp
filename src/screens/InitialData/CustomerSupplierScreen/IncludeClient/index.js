/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';

const IncludeClient = ({ navigation }) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isFocused, setIsFocused] = useState(false); // Estado para controlar o foco
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal

  const handleFocus = () => {
    setIsFocused(true); // Ocultar botão quando qualquer input ganhar foco
  };

  const handleBlur = () => {
    setIsFocused(false); // Exibir botão quando o input perder o foco
  };

  const handleConfirm = () => {
    setModalVisible(true); // Exibe o modal ao confirmar
  };

  const handleIncludeNew = () => {
    // Limpa os campos de input
    setClientName('');
    setClientPhone('');
    setAdditionalInfo('');
    setModalVisible(false); // Fecha o modal
  };

  const handleReturnToMenu = () => {
    setModalVisible(false); // Fecha o modal
    navigation.navigate('CustomerSupplierScreen'); // Navega para a tela do menu
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.containerBase}>
          {/* Barra fixa no topo */}
          <View style={styles.containerBartop}>
            <BarTop3
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
            />
          </View>

          {/* Conteúdo rolável */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Incluir clientes</Text>

            {/* Botão de adicionar dos contatos */}
            <TouchableOpacity style={styles.addFromContactsButton}>
              <Icon name="person" size={24} color="black" />
              <Text style={styles.buttonText}>Adicionar dos seus contatos</Text>
            </TouchableOpacity>

            {/* Campo de nome do cliente */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Cliente</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Alexandre da Silva"
                placeholderTextColor={COLORS.lightGray}
                value={clientName}
                onChangeText={setClientName}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            {/* Campo de celular opcional */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Celular (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: (11) 91234-5678"
                placeholderTextColor={COLORS.lightGray}
                value={clientPhone}
                onChangeText={setClientPhone}
                keyboardType="phone-pad"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>

            {/* Campo de informações adicionais (Opcional) */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Informações adicionais (Opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: Cliente de Ribeirão Preto"
                placeholderTextColor={COLORS.lightGray}
                value={additionalInfo}
                onChangeText={setAdditionalInfo}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </View>
          </ScrollView>

          {/* Botão de confirmar visível condicionalmente */}
          {!isFocused && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Icon name="checkmark-circle" size={24} color={COLORS.black} />
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Modal de confirmação */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Icon name="checkmark-circle" size={80} color={COLORS.green} />
                <Text style={styles.modalTitle}>Inclusão de cliente realizada com sucesso!</Text>

                {/* Botão Incluir novo */}
                <TouchableOpacity style={styles.modalButton} onPress={handleIncludeNew}>
                  <Icon name="add" size={24} color={COLORS.black} />
                  <Text style={styles.modalButtonText}>Incluir novo</Text>
                </TouchableOpacity>

                {/* Botão Retornar para Menu */}
                <TouchableOpacity style={styles.modalButtonSecondary} onPress={handleReturnToMenu}>
                  <Text style={styles.modalButtonText}>Retornar para Menu</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default IncludeClient;
