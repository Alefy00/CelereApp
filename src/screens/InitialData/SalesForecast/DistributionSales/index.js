/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import BarTop3 from '../../../../components/BarTop3';
import ProgressBar2 from '../components/ProgressBar2';
import { COLORS } from '../../../../constants';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Modal
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const DistributionSales = ({ navigation }) => {
  const [week1, setWeek1] = useState(''); 
  const [week2, setWeek2] = useState(''); 
  const [week3, setWeek3] = useState(''); 
  const [week4, setWeek4] = useState(''); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Função para formatar o valor como moeda brasileira
  const formatCurrency = (value) => {
    const numberValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
    return numberValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Função para formatar o valor de input
  const handleInputChange = (value, setValue) => {
    const formattedValue = formatCurrency(value);
    setValue(formattedValue);
  };

  // Calcula o total das 4 semanas
  const calculateTotal = () => {
    const w1 = parseFloat(week1.replace(/[^\d,-]/g, '')) || 0;
    const w2 = parseFloat(week2.replace(/[^\d,-]/g, '')) || 0;
    const w3 = parseFloat(week3.replace(/[^\d,-]/g, '')) || 0;
    const w4 = parseFloat(week4.replace(/[^\d,-]/g, '')) || 0;
    return (w1 + w2 + w3 + w4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleSave = () => {
    console.log('Semana 1:', week1);
    console.log('Semana 2:', week2);
    console.log('Semana 3:', week3);
    console.log('Semana 4:', week4);
    console.log('Total:', calculateTotal());
    // Exibe o modal após salvar
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigation.navigate('Start'); // Navega para a tela inicial
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Barra de topo */}
          <View style={{ height: 50 }}>
            <BarTop3
              titulo={'Voltar'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
            />
          </View>

          {/* Barra de progresso */}
          <ProgressBar2 currentStep={3} totalSteps={3} />

          <View style={styles.content}>
            <Text style={styles.title}>Agora, distribua suas vendas por semana</Text>
            <Text style={styles.subtitle}>
              Você pode editar os valores. Não precisa ser exato, depois que tivermos seus históricos, projetaremos com exatidão para você.
            </Text>

            {/* Inputs das semanas */}
            {['Primeira semana do mês', 'Segunda semana do mês', 'Terceira semana do mês', 'Quarta semana do mês'].map((label, index) => (
              <View key={index} style={styles.inputContainer}>
                <Text style={styles.weekLabel}>{label}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="R$ 0,00"
                  keyboardType="numeric"
                  placeholderTextColor={COLORS.green}
                  value={index === 0 ? week1 : index === 1 ? week2 : index === 2 ? week3 : week4}
                  onChangeText={(value) =>
                    index === 0 ? handleInputChange(value, setWeek1) :
                    index === 1 ? handleInputChange(value, setWeek2) :
                    index === 2 ? handleInputChange(value, setWeek3) :
                    handleInputChange(value, setWeek4)
                  }
                />
              </View>
            ))}

            {/* Total previsto mensal */}
            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Total previsto mensal:</Text>
              <Text style={styles.totalValue}>{calculateTotal()}</Text>
            </View>

            {/* Botão de salvar */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Icon name="checkmark-circle" size={24} color={COLORS.black} />
              <Text style={styles.buttonText}>Salvar Tudo</Text>
            </TouchableOpacity>
          </View>

          {/* Modal de confirmação */}
          <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Icon name="checkmark-circle" size={70} color={COLORS.green} />
                <Text style={styles.modalTitle}>Pronto!</Text>
                <Text style={styles.modalText}>
                  Depois vá em menu e consulte seu fluxo de caixa. Nos meses seguintes, otimizaremos as previsões com base em seu histórico.
                </Text>
                <TouchableOpacity style={styles.modalButton} onPress={handleModalOk}>
                  <Text style={styles.modalButtonText}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DistributionSales;
