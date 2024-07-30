/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import BarTop2 from "../../../../../../components/BarTop2";
import { COLORS } from "../../../../../../constants";
import styles from './styles'

const CancelSale = ({ navigation }) => {
    const [dataVenda, setDataVenda] = useState('');
    const [valorVenda, setValorVenda] = useState('');
    const [vendas, setVendas] = useState([
      { id: '1', data: '2024-07-29', valor: '100.00' },
      { id: '2', data: '2024-07-28', valor: '200.00' },
      { id: '3', data: '2024-07-27', valor: '150.00' }
    ]);
    const [filteredVendas, setFilteredVendas] = useState(vendas);
  
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
  
    const handleCancel = (id) => {
      //TODO: adicionar a lógica de cancelamento da venda
      setVendas(prevVendas => prevVendas.filter(venda => venda.id !== id));
      setFilteredVendas(prevFilteredVendas => prevFilteredVendas.filter(venda => venda.id !== id));
      Alert.alert("Cancelamento", "Venda cancelada com sucesso!");
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.vendaItem}>
        <Text>Data: {item.data}</Text>
        <Text>Valor: {item.valor}</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(item.id)}>
          <Text style={styles.cancelButtonText}>Cancelar</Text>
        </TouchableOpacity>
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
            <Text style={styles.textCancel}>Cancelar Venda</Text>
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  };

export default CancelSale;
