/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, Button } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import styles from './styles';

const SettleCredit = ({ navigation }) => {
    const [dataVenda, setDataVenda] = useState('');
    const [valorVenda, setValorVenda] = useState('');
    const [vendas, setVendas] = useState([
      { id: '1', data: '2024-07-29', valor: '100.00' },
      { id: '2', data: '2024-07-28', valor: '200.00' },
      { id: '3', data: '2024-07-27', valor: '150.00' }
    ]);
    const [filteredVendas, setFilteredVendas] = useState(vendas);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedVenda, setSelectedVenda] = useState(null);
    const [abatimento, setAbatimento] = useState('');
  
    useEffect(() => {
      if (dataVenda || valorVenda) {
        const filtered = vendas.filter(venda => 
          venda.data.includes(dataVenda) && venda.valor.includes(valorVenda)
        );
        setFilteredVendas(filtered);
      } else {
        setFilteredVendas(vendas);
      }
    }, [dataVenda, valorVenda]);
  
    const handleAbater = (venda) => {
      setSelectedVenda(venda);
      setModalVisible(true);
    };
  
    const handleBaixar = (id) => {
      setVendas(vendas.filter(venda => venda.id !== id));
      setFilteredVendas(filteredVendas.filter(venda => venda.id !== id));
      Alert.alert("Baixa", "Venda baixada com sucesso!");
    };
  
    const confirmarAbatimento = () => {
      const valorAbatido = parseFloat(abatimento);
      setVendas(vendas.map(venda => 
        venda.id === selectedVenda.id 
          ? { ...venda, valor: (parseFloat(venda.valor) - valorAbatido).toFixed(2) } 
          : venda
      ));
      setFilteredVendas(filteredVendas.map(venda => 
        venda.id === selectedVenda.id 
          ? { ...venda, valor: (parseFloat(venda.valor) - valorAbatido).toFixed(2) } 
          : venda
      ));
      setModalVisible(false);
      setAbatimento('');
      Alert.alert("Abatimento", "Valor abatido com sucesso!");
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.vendaItem}>
        <View style={styles.vendaInfo}>
          <Text>Data: {item.data}</Text>
          <Text>Valor: {item.valor}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.abaterButton} onPress={() => handleAbater(item)}>
            <Text style={styles.buttonText}>Abater parte do valor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.baixarButton} onPress={() => handleBaixar(item.id)}>
            <Text style={styles.buttonText}>Baixar</Text>
          </TouchableOpacity>
        </View>
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
              <BarTop2
                titulo={'Entradas'}
                backColor={COLORS.primary}
                foreColor={COLORS.black}
                routeMailer={''}
                routeCalculator={''}
              />
            </View>
            <Text style={styles.textLiquida}>Liquidar Fiado</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Data da venda"
                value={dataVenda}
                onChangeText={setDataVenda}
              />
              <TextInput
                style={styles.input}
                placeholder="Valor da venda"
                value={valorVenda}
                onChangeText={setValorVenda}
              />
              <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
                <Text style={styles.searchButtonText}>Pesquisar</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.listTitle}>Lista</Text>
            <FlatList
              data={filteredVendas}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalView}>
                  <Text style={styles.modalTitle}>Abater parte do valor</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Valor a abater"
                    value={abatimento}
                    onChangeText={setAbatimento}
                    keyboardType="numeric"
                  />
                  <TouchableOpacity style={styles.confirmButton} onPress={confirmarAbatimento}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
};

export default SettleCredit;