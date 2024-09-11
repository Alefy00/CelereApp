/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import BarTop3 from '../../../components/BarTop3';
import { COLORS } from '../../../constants';

const CustomerSupplierScreen = ({ navigation }) => {
  const [includeModalVisible, setIncludeModalVisible] = useState(false);
  const [consultModalVisible, setConsultModalVisible] = useState(false);

  const handleIncludeSupplier = () => {
    navigation.navigate("IncludeSupplier");
  };
  const handleIncludeClient = () => {
    navigation.navigate("IncludeClient");
  };

  const handleConsultClient = () => {
    navigation.navigate("ConsultClient");
  };

  const handleConsultSupplier = () => {
    navigation.navigate('ConsultSupplier');
  };


  return (
    <View style={styles.containerBase}>
        <View style={styles.containerBartop}>
          <BarTop3
            titulo={'Voltar'}
            backColor={COLORS.primary}
            foreColor={COLORS.black}
            routeMailer={''}
            routeCalculator={''}
          />
        </View>
      <View style={styles.container}>

        <Text style={styles.title}>Clientes e Fornecedores</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
          style={styles.includeButton}
          onPress={() => setIncludeModalVisible(true)}
          >
            <Icon name="add" size={26} color="black" />
            <Text style={styles.buttonText}>Incluir</Text>
          </TouchableOpacity>

          <TouchableOpacity
          style={styles.consultButton}
          onPress={() => setConsultModalVisible(true)}
          >
            <Icon name="search" size={26} color="black" />
            <Text style={styles.buttonText}>Consultar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal para o botão incluir */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={includeModalVisible}
        onRequestClose={() => setIncludeModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setIncludeModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Selecione uma opção abaixo:</Text>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() =>{
                setIncludeModalVisible(false);
                handleIncludeClient();
              }}>
              <Text style={styles.optionText}>Cliente</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButtonSecondary}
              onPress={() => {
                setIncludeModalVisible(false);
                handleIncludeSupplier();
              }}>
              <Text style={styles.optionText}>Fornecedor</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       {/* Modal para o botão Consultar */}
       <Modal
        animationType="slide"
        transparent={true}
        visible={consultModalVisible}
        onRequestClose={() => setConsultModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setConsultModalVisible(false)}>
              <Icon name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Selecione uma opção abaixo:</Text>

            <TouchableOpacity 
              style={styles.optionButton}
              onPress={() => {
                setConsultModalVisible(false);
                handleConsultClient();
              }}>
              <Text style={styles.optionText}>Clientes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.optionButtonSecondary}
              onPress={() => {
                setConsultModalVisible(false);
                handleConsultSupplier();
              }}>
              <Text style={styles.optionText}>Fornecedores</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomerSupplierScreen;
