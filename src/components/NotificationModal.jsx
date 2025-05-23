/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../services/apiConfig';

const NotificationModal = ({ visible, featureName, notify, setNotify, onClose }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isNotifiable, setIsNotifiable] = useState(true); // Novo estado para controlar exibição

    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfGZco1hzzoN53BKyz71eThn4rEc983XjSypf9n5omVOkLM4A/formResponse';
    const PHONE_FIELD_ID = 'entry.1318202489';
    const CELEREPAY_FIELD_ID = 'entry.1435310616';
    const CASH_FLOW_FIELD_ID = 'entry.1716468157';
    const NFE_FIELD_ID = 'entry.93110646';

    const fetchPhoneNumber = useCallback(async () => {
        try {
            const storedEmpresaId = await AsyncStorage.getItem('empresaId');
            if (storedEmpresaId) {
                const response = await fetch(`${API_BASE_URL}/cad/empresas/${storedEmpresaId}`);
                const data = await response.json();
                if (data.ddi && data.ddd && data.celular) {
                    const formattedPhoneNumber = `+${data.ddi}${data.ddd}${data.celular}`;
                    setPhoneNumber(formattedPhoneNumber);
                    console.log('Número de telefone recuperado:', formattedPhoneNumber);
                } else {
                    Alert.alert('Erro', 'Número de telefone não encontrado.');
                }
            } else {
                Alert.alert('Erro', 'ID da empresa não carregado. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao obter o número de telefone:', error);
        }
    }, []);

    const checkNotifiableStatus = useCallback(async () => {
        try {
            const notifiedFeatures = await AsyncStorage.getItem('notifiedFeatures');
            const notifiedList = notifiedFeatures ? JSON.parse(notifiedFeatures) : [];
            setIsNotifiable(!notifiedList.includes(featureName)); // Desabilita modal se já notificado
        } catch (error) {
            console.error('Erro ao verificar notificações salvas:', error);
        }
    }, [featureName]);

    useEffect(() => {
        if (visible) {
            fetchPhoneNumber();
            checkNotifiableStatus();
        }
    }, [visible, fetchPhoneNumber, checkNotifiableStatus]);

    useEffect(() => {
      if (visible) {
          setNotify(false); // Redefine o checkbox para desmarcado
          fetchPhoneNumber();
          checkNotifiableStatus();
      }
  }, [visible, fetchPhoneNumber, checkNotifiableStatus, setNotify]);
  

    const sendNotificationRequest = async () => {
        const formBody = [];
        formBody.push(`${encodeURIComponent(PHONE_FIELD_ID)}=${encodeURIComponent(phoneNumber)}`);

        if (featureName === 'CélerePay') {
            formBody.push(`${encodeURIComponent(CELEREPAY_FIELD_ID)}=${encodeURIComponent('Sim')}`);
        } else if (featureName === 'Fluxo de Caixa') {
            formBody.push(`${encodeURIComponent(CASH_FLOW_FIELD_ID)}=${encodeURIComponent('Sim')}`);
        } else if (featureName === 'NF-e') {
            formBody.push(`${encodeURIComponent(NFE_FIELD_ID)}=${encodeURIComponent('Sim')}`);
        }

        const formBodyString = formBody.join('&');

        try {
            const response = await fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                body: formBodyString,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (response.ok) {
                alert('Solicitação enviada com sucesso!');
                // Salvar a funcionalidade no AsyncStorage
                const notifiedFeatures = await AsyncStorage.getItem('notifiedFeatures');
                const notifiedList = notifiedFeatures ? JSON.parse(notifiedFeatures) : [];
                notifiedList.push(featureName);
                await AsyncStorage.setItem('notifiedFeatures', JSON.stringify(notifiedList));
            } else {
                console.error('Erro ao enviar: ', response.statusText);
                alert('Erro ao enviar solicitação. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar solicitação:', error);
            alert('Erro ao enviar solicitação. Tente novamente.');
        }
    };

    const handleSubmitNotification = () => {
        sendNotificationRequest();
        onClose();
    };
  
    if (!isNotifiable) {
      onClose();
      return null;
  }
    return (
        <Modal transparent={true} visible={visible} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#000" />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>{featureName} estará disponível em breve!</Text>
                    <Text style={styles.modalText}>Gostaria de ser notificado?</Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox value={notify} onValueChange={setNotify} tintColors={{ true: '#000', false: '#000' }} />
                        <Text style={styles.checkboxLabel}>Sim, me notifique</Text>
                    </View>

                    <TouchableOpacity
                        onPress={handleSubmitNotification}
                        style={[styles.sendButton, !notify && styles.sendButtonDisabled]}
                        disabled={!notify} // Desabilita o botão se o checkbox não estiver marcado
                    >
                        <Text style={styles.sendButtonText}>Enviar Notificação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 10,
    marginBottom:15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    paddingHorizontal: 25,
    paddingVertical: 18,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    marginVertical: 10,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default NotificationModal;
