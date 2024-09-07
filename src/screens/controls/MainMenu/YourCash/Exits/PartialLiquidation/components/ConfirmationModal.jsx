/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles'; // Certifique-se de importar o novo arquivo de estilos

const ConfirmationModal = ({ visible, onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);  // Adicionando estado para controlar o carregamento

  const handleConfirm = async () => {
    setLoading(true);  // Definir como "carregando" ao clicar em liquidar
    try {
      await onConfirm();  // Aguarde a função de confirmação
    } catch (error) {
      console.error('Erro ao confirmar a liquidação:', error);
    } finally {
      setLoading(false);  // Finalizar o carregamento após a requisição
      onClose();  // Fechar o modal após a confirmação
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent={true} animationType="fade">
      <View style={styles.confirmationModalOverlay}>
        <View style={styles.confirmationModalContent}>
          {/* Título e mensagem de confirmação */}
          <Text style={styles.confirmationModalTitle}>Tem certeza disso?</Text>
          <Text style={styles.confirmationModalMessage}>
            Liquidar esta despesa removerá ela da lista. Faça isso somente quando ela tiver sido devidamente paga.
          </Text>

          {/* Botões de Cancelar e Confirmar */}
          <View style={styles.confirmationModalButtonContainer}>
            <TouchableOpacity style={styles.confirmationCancelButton} onPress={onClose} disabled={loading}>
              <Text style={styles.confirmationCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            {/* Botão de confirmar com indicador de carregamento */}
            <TouchableOpacity style={styles.confirmationConfirmButton} onPress={handleConfirm} disabled={loading}>
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <>
                  <Icon name="checkmark-circle" size={20} color="#000" style={styles.confirmationIcon} />
                  <Text style={styles.confirmationConfirmButtonText}>Liquidar</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
