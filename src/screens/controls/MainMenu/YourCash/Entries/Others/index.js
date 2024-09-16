/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import { FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';


const Others = ({ navigation }) => {
    const [entries, setEntries] = useState([
        { id: '1', data: '02/08/2024', justificativa: 'Processo trabalhista liquidado a favor da empresa, dinheiro da indenização.', valor: '8000,00' }
    ]);
    const [modalVisible, setModalVisible] = useState(false);

        // Função para abrir o modal de filtro
        const openFilterModal = () => {
            setModalVisible(true);
        };
    
        // Função para fechar o modal de filtro
        const closeFilterModal = () => {
            setModalVisible(false);
        };


    // Função para renderizar cada item da lista de entradas
    const renderItem = ({ item }) => (
        <View style={styles.entryItem}>
            <View>
                <Text style={styles.entryData}>{item.data}</Text>
                <Text style={styles.entryJustificativa}>{item.justificativa}</Text>
            </View>
            <Text style={styles.entryValor}>R${item.valor}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>
                    {/* BarTop2 ocupando a largura total da tela */}
                    <View style={styles.barTopContainer}>
                        <BarTop2
                            titulo={'Voltar'}
                            backColor={COLORS.primary}
                            foreColor={COLORS.black}
                            routeCalculator={''}
                            routeMailer={''}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    
                    <View style={styles.contentContainer}>
                        <Text style={styles.title}>Outras Entradas</Text>
                        <Text style={styles.subtitle}>Cadastre manualmente entradas fora dos escopos anteriores aqui.</Text>

                        {/* Lista de entradas */}
                        <FlatList
                            data={entries}
                            keyExtractor={item => item.id}
                            renderItem={renderItem}
                            style={styles.list}
                        />
                    </View>

                    {/* Botão para cadastrar nova entrada, fixado no final da tela */}
                    <TouchableOpacity style={styles.addButton}  onPress={openFilterModal}>
                         <Icon name="add" size={24} color="black" />
                        <Text style={styles.addButtonText}>Cadastrar nova entrada</Text>
                    </TouchableOpacity>
                    <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={closeFilterModal}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Detalhes da nova entrada</Text>
                    <TouchableOpacity onPress={closeFilterModal}>
                      <Icon name="close" size={26} color={COLORS.gray} />
                    </TouchableOpacity>
                  </View>
                    <Text style={styles.modalSubTitle}>Antes de preencher os campos abaixo, observe adequadamente se a nova entrada não cabe em alguma das seções anteriores, isso ajuda a manter a organização do seu negócio.</Text>
                  <View style={styles.modalInputContainer}>
                    <View style={styles.modalInputRow}>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Data"
                        placeholderTextColor={COLORS.gray}
                      />
                      <Icon name="calendar" size={24} color={COLORS.gray} />
                    </View>
                    <View style={styles.modalInputRow}>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Valor"
                        placeholderTextColor={COLORS.gray}
                      />
                    </View>
                    <View style={styles.modalInputRow}>
                      <TextInput
                        style={styles.modalInput}
                        placeholder="Origem"
                        placeholderTextColor={COLORS.gray}
                      />
                    </View>
                  </View>
                  <TouchableOpacity style={styles.modalFilterButton}>
                    <Icon name="checkmark-circle" size={20} color={COLORS.black} />
                    <Text style={styles.modalFilterButtonText}>Cadastrar nova entrada manual</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>


                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Others;
