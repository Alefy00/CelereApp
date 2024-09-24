/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';

const IncludeSupplier = ({ navigation }) => {
  const [supplierName, setSupplierName] = useState('');
  const [supplierPhone, setSupplierPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const resetFields = () => {
    setSupplierName('');
    setSupplierPhone('');
    setAdditionalInfo('');
  };

  const handleAddSupplier = () => {
    setModalVisible(true);
  };

  const handleAddNew = () => {
    resetFields();
    setModalVisible(false);
  };

  const handleMenu = () => {
    navigation.goBack();
  };

  const handleFocus = () => {
    setIsButtonVisible(false);
  };

  const handleBlur = () => {
    setIsButtonVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerBase}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={''}
          routeCalculator={''}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Incluir Fornecedor</Text>

        {/* Campo de nome do fornecedor */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome do Fornecedor</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: Transportadora segura"
            placeholderTextColor={COLORS.lightGray}
            value={supplierName}
            onChangeText={setSupplierName}
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
            value={supplierPhone}
            onChangeText={setSupplierPhone}
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

      {/* Botão para adicionar fornecedor visível condicionalmente */}
      {isButtonVisible && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddSupplier}>
            <Icon name="add" size={24} color={COLORS.black} />
            <Text style={styles.addButtonText}>Adicionar fornecedor</Text>
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
            <Text style={styles.modalTitle}>
              Inclusão de fornecedor realizada com sucesso!
            </Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleAddNew}>
              <Icon name="add" size={24} color={COLORS.black} />
              <Text style={styles.modalButtonText}>Incluir novo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButtonSecondary}
              onPress={handleMenu}
            >
              <Text style={styles.modalButtonText}>Retornar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default IncludeSupplier;
