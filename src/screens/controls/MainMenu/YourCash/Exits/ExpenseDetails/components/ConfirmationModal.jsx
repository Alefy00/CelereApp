/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../../../../../constants';


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

const styles = StyleSheet.create({
  confirmationModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  confirmationModalContent: {
    width: '85%',
    padding: 20,
    backgroundColor: COLORS.white, // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmationModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black, // Texto preto
    marginBottom: 10,
    textAlign: 'left',
    alignSelf:'flex-start',
  },
  confirmationModalMessage: {
    fontSize: 14,
    color: COLORS.black, // Texto cinza
    textAlign: 'left',
    marginBottom: 20,
  },
  confirmationModalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginLeft: 80,
  },
  confirmationCancelButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  confirmationConfirmButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.primary, // Cor do botão de confirmar
    borderRadius: 3,
    flexDirection: 'row', // Para ícone e texto ficarem lado a lado
    justifyContent: 'center',
  },
  confirmationCancelButtonText: {
    color: COLORS.black, // Cor do texto do botão de cancelar
    fontSize: 16,
    fontWeight: '500',
  },
  confirmationConfirmButtonText: {
    color: COLORS.black, // Cor do texto do botão de confirmar
    fontSize: 16,
    fontWeight: '500',
  },
  confirmationIcon: {
    marginRight: 5, // Espaçamento entre o ícone e o texto
  },
})

export default ConfirmationModal;
