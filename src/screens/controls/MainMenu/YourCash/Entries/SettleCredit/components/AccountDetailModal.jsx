/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS } from "../../../../../../../constants";

const AccountDetailModal = ({ visible, onClose }) => {
  const [partialValue, setPartialValue] = useState('');
  const [newDueDate, setNewDueDate] = useState(null);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [isThirdModalVisible, setThirdModalVisible] = useState(false);
  const [isFirstModalVisible, setFirstModalVisible] = useState(visible);
  const [isFourthModalVisible, setFourthModalVisible] = useState(false); 
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Dados fictícios da lista de compras
  const products = [
    { id: '1', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
    { id: '2', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
    { id: '3', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    { id: '4', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    { id: '5', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
  ];

  const totalValue = 'R$84,00';  // Valor fictício


  const handleReminder = () => {
    console.log('Lembrete ativado');
  };

  const handlePostpone = () => {
    console.log('Conta adiada para:', newDueDate);
  };

  const handleDelete = () => {
    console.log('Conta excluída');
  };

  const handlePartialLiquidation = () => {
    console.log('Liquidar parcialmente:', partialValue);
  };

  const handleTotalLiquidation = () => {
    // Fecha o primeiro modal e abre o segundo modal
    setFirstModalVisible(false);
    setSecondModalVisible(true);
  };

  const closeFirstModal = () => {
    // Fecha apenas o primeiro modal
    setFirstModalVisible(false);
    onClose(); // Opcional: fechar o fluxo todo se o primeiro modal fechar tudo
  };

  const closeSecondModal = () => {
    // Fecha o segundo modal e abre o terceiro modal
    setSecondModalVisible(false);
    setThirdModalVisible(true);
  };

  const closeThirdModal = () => {
    // Fecha o terceiro modal e abre o quarto modal de confirmação de sucesso
    setThirdModalVisible(false);
    setFourthModalVisible(true);
  };

  const closeFourthModal = () => {
    // Fecha o quarto modal e retorna ao fluxo principal
    setFourthModalVisible(false);
    onClose(); // Voltar à tela principal ou ao fluxo anterior
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirmDate = (date) => {
    setNewDueDate(date);  // Salva a data selecionada
    hideDatePicker();
  };


  return (
    <>
      {/* Primeiro Modal */}
      <Modal visible={isFirstModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
            <Text style={styles.sectionTitle}>Detalhes da venda</Text>
              <TouchableOpacity onPress={closeFirstModal}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.sectionTitle}>Situação:</Text>
              <Text style={styles.sectionTitleRed}> Contas a pagar</Text>
            </View>

            {/* Lista de compras com scroll */}
            <Text style={styles.sectionTitle}>Lista de Compras</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productItem}>
                  <Icon name="pricetag-outline" size={24} color="gray" />
                  <View style={styles.productInfo}>
                    <Text style={styles.productNome}>{item.nome}</Text>
                    <Text style={{color: COLORS.black}}>{item.valor}</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.productList}
              style={{ maxHeight: 150 }} // Limitar a altura do FlatList para não ocupar a tela toda
            />

            {/* Valor total */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Valor total:</Text>
              <Text style={styles.totalValue}>{totalValue}</Text>
            </View>


            {/* Botões */}
            <TouchableOpacity style={styles.partialButton} onPress={handlePartialLiquidation}>
              <Text style={styles.buttonText}>Liquidar Parcialmente</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.totalButton} onPress={handleTotalLiquidation}>
              <Icon name="checkmark-circle" size={24} color="black" />
              <Text style={styles.buttonText}>Liquidar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.reminderButton} onPress={handleReminder}>
              <Icon name="share-social-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Lembrete de cobrança</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.postponeButton} onPress={handlePostpone}>
              <Icon name="calendar-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Adiar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Icon name="close-circle-outline" size={24} color="black" />
              <Text style={styles.buttonText}>Excluir conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Segundo Modal para escolher a data de liquidação */}
      <Modal visible={isSecondModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent2}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Liquidação total</Text>
              <TouchableOpacity onPress={() => setSecondModalVisible(false)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Campo para selecionar a data */}
            <TouchableOpacity onPress={showDatePicker} style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>
                {newDueDate ? newDueDate.toLocaleDateString() : 'Escolha a data'}
              </Text>
              <Icon name="calendar-outline" size={24} color="gray" />
            </TouchableOpacity>

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={hideDatePicker}
            />

            {/* Botão de confirmação */}
            <TouchableOpacity style={styles.confirmButton} onPress={closeSecondModal}>
              <Icon name="checkmark-circle" size={24} color="black" />
              <Text style={styles.buttonText}>Liquidar Conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Terceiro Modal para confirmação final */}
      <Modal visible={isThirdModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer3}>
          <View style={styles.modalContent3}>
            <Text style={styles.modalTitle3}>Tem certeza disso?</Text>
            <Text style={styles.modalSubtitle3}>Liquidar esta conta removerá ela da lista.</Text>

            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setThirdModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.confirmButton3} onPress={closeThirdModal}>
                <Icon name="checkmark-circle" size={24} color="black" />
                <Text style={styles.buttonText3}>Liquidar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Quarto Modal - Confirmação de Sucesso */}
      <Modal visible={isFourthModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer4}>
          <View style={styles.modalContent4}>
            {/* Ícone de Sucesso */}
            <Icon name="checkmark-circle" size={100} color={COLORS.green} />

            {/* Texto de Sucesso */}
            <Text style={styles.successText}>Conta liquidada com sucesso</Text>

            {/* Botão Voltar */}
            <TouchableOpacity style={styles.successButton} onPress={closeFourthModal}>
              <Icon name="arrow-back-outline" size={24} color="black" />
              <Text style={styles.buttonText4}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AccountDetailModal;
