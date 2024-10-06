/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Modal, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons'; // Usar ícones de filtro

const CancelSale = ({ navigation }) => {
    const [valorVenda, setValorVenda] = useState('');
    const [vendas, setVendas] = useState([
      { id: '1', data: '19/10/2024, 16:47', produtos: 3, valor: '247.90' },
      { id: '2', data: '19/10/2024, 14:21', produtos: 1, valor: '34.99' },
      { id: '3', data: '19/10/2024, 11:57', produtos: 2, valor: '47.90' }
    ]);
    const [filteredVendas, setFilteredVendas] = useState(vendas); // Estado para armazenar as vendas filtradas
    const [modalVisible, setModalVisible] = useState(false);

        // Função para abrir o modal de filtro
        const openFilterModal = () => {
          setModalVisible(true);
      };
  
      // Função para fechar o modal de filtro
      const closeFilterModal = () => {
          setModalVisible(false);
      };

    // Efeito que filtra as vendas com base no valor fornecido pelo usuário
    useEffect(() => {
      if (valorVenda) {
        const filtered = vendas.filter(venda => 
          venda.valor.includes(valorVenda)
        );
        setFilteredVendas(filtered);
      } else {
        setFilteredVendas(vendas);
      }
    }, [valorVenda, vendas]);

    // Função para lidar com o cancelamento de uma venda
    const handleCancel = (id) => {
      // TODO: adicionar a lógica de cancelamento da venda
      setVendas(prevVendas => prevVendas.filter(venda => venda.id !== id));
      setFilteredVendas(prevFilteredVendas => prevFilteredVendas.filter(venda => venda.id !== id));
      Alert.alert("Cancelamento", "Venda cancelada com sucesso!");
    };

    // Função para renderizar cada item da lista de vendas
    const renderItem = ({ item }) => (
      <View style={styles.vendaItem}>
        <View>
          <Text style={styles.vendaData}>{item.data}</Text>
          <Text style={styles.vendaProdutos}>{item.produtos} produto{item.produtos > 1 ? 's' : ''}</Text>
        </View>
        <Text style={styles.vendaValor}>R${item.valor}</Text>
      </View>
    );

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <View style={{ height: 50 }}>
              {/* Componente de barra superior personalizado */}
              <BarTop2
                titulo={'Cancelar Venda'}
                backColor={COLORS.primary}
                foreColor={COLORS.black}
                routeMailer={''}
                routeCalculator={''}
                onPress={() => navigation.goBack()}
              />
            </View>
            <Text style={styles.Title}>Cancele uma venda</Text>
            <Text style={styles.subTitle}>Cancele uma venda concretizada anteriormente.</Text>
            
            <View style={styles.inputContainer}>
              <View style={styles.containerInput}>
              <TextInput
                style={styles.input}
                placeholder="Pesquise uma venda recente..."
                placeholderTextColor={COLORS.gray}
                value={valorVenda}
                onChangeText={setValorVenda}
              />
              <Icon name="search" size={20} color={COLORS.gray} />
              </View>
              <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
                <Icon name="filter-outline" size={20} color={COLORS.black} />
                <Text style={styles.filterButtonText}>Filtrar</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={filteredVendas}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              style={styles.list}
            />
                        {/* Modal de Filtro */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={closeFilterModal}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Filtre por data, valor ou ambos.</Text>
                    <TouchableOpacity onPress={closeFilterModal}>
                      <Icon name="close" size={24} color={COLORS.black} />
                    </TouchableOpacity>
                  </View>
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
                  </View>
                  <TouchableOpacity style={styles.modalFilterButton}>
                    <Icon name="filter-outline" size={20} color={COLORS.black} />
                    <Text style={styles.modalFilterButtonText}>Filtrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
};

export default CancelSale;
