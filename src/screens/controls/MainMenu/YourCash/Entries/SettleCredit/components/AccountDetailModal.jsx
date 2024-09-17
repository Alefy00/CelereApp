/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from './styles';

const AccountDetailModal = ({ visible, onClose }) => {
  const [partialValue, setPartialValue] = useState('');
  const [newDueDate, setNewDueDate] = useState(new Date());
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [isThirdModalVisible, setThirdModalVisible] = useState(false);
  const [isFirstModalVisible, setFirstModalVisible] = useState(visible);
  // Dados fictícios da lista de compras
  const products = [
    { id: '1', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
    { id: '2', nome: 'Cabo tipo-C Preto', valor: 'R$18,00' },
    { id: '3', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    { id: '4', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
    { id: '5', nome: 'Cabo Lightning para tipo-C Branco', valor: 'R$24,00' },
  ];

  const totalValue = 'R$84,00';  // Valor fictício

  const handlePartialLiquidation = () => {
    // Lógica para liquidar parcialmente
    console.log('Liquidar parcialmente:', partialValue);
  };

  const handleTotalLiquidation = () => {
    // Fecha o primeiro modal
    setFirstModalVisible(false);
    // Abre o segundo modal
    setSecondModalVisible(true);
  };
  const closeSecondModal = () => {
    // Fecha o segundo modal e abre o terceiro modal de confirmação
    setSecondModalVisible(false);
    setThirdModalVisible(true);
  };
  const closeThirdModal = () => {
    // Fecha o terceiro modal e confirma a liquidação
    setThirdModalVisible(false);
    onClose();  // Fecha o fluxo completo
  };




  const handleReminder = () => {
    // Lógica para ativar lembrete
    console.log('Lembrete ativado');
  };

  const handlePostpone = () => {
    // Lógica para adiar a conta
    console.log('Conta adiada para:', newDueDate);
  };

  const handleDelete = () => {
    // Lógica para excluir a conta
    console.log('Conta excluída');
  };

  return (
    <>
      {/* Primeiro Modal */}
      <Modal visible={isFirstModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Liquidar Contas a receber{'\n'}de Mariana Souza</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
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
                    <Text>{item.nome}</Text>
                    <Text>{item.valor}</Text>
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

            {/* Campo de valor parcial */}
            <TextInput
              style={styles.input}
              placeholder="Valor parcial"
              value={partialValue}
              onChangeText={setPartialValue}
              keyboardType="numeric"
            />
            <View style={styles.newTotalContainer}>
              <Text style={styles.newTotalLabel}>Novo valor total:</Text>
              <Text style={styles.newTotalValue}>R$46,00</Text>
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
              <Icon name="trash-outline" size={24} color="black" />
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
              <TouchableOpacity onPress={closeSecondModal}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Campo para selecionar a data */}
            <View style={styles.datePickerContainer}>
              <Text style={styles.dateLabel}>Hoje, {newDueDate.toLocaleDateString()}</Text>
              <Icon name="calendar-outline" size={24} color="gray" />
            </View>

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
    </>
  );
};

export default AccountDetailModal;
