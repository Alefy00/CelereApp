/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView
} from 'react-native';
import BarTop2 from '../../../../../components/BarTop2';
import { COLORS } from '../../../../../constants';
import styles from './styles';
import NewSaleIcon from '../../../../../assets/images/svg/Entries/NewSale.svg'; // SVG importado
import CancelSaleIcon from '../../../../../assets/images/svg/Entries/CancelSale.svg';
import ContasReceberIcon from '../../../../../assets/images/svg/Entries/ContasReceber.svg';
import AporteIcon from '../../../../../assets/images/svg/Entries/Aporte.svg';
import EmprestimoIcon from '../../../../../assets/images/svg/Entries/Emprestimo.svg';
import OutrasIcon from '../../../../../assets/images/svg/Entries/Outras.svg';
import RelatorioIcon from '../../../../../assets/images/svg/Entries/Relatorio.svg';

const Entries = ({ navigation }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleOptionPress = (screenName) => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate(screenName);
    }
  };

  const NewRegisteredSale = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.navigate('NewRegisteredSale');
    }
  };

  const options = [
    { id: 1, label: 'Nova venda', icon: NewSaleIcon, description: 'Registre uma nova venda', action: NewRegisteredSale },
    { id: 2, label: 'Cancelar venda', icon: CancelSaleIcon, description: 'Estorne uma venda efetuada', screen: 'CancelSale' },
    { id: 3, label: 'Contas a Receber', icon: ContasReceberIcon, description: 'Liquidar total ou parcial, adiar, cancelar ou excluir contas.', screen: 'SettleCredit' },
    { id: 4, label: 'Aporte', icon: AporteIcon, description: 'Registre um aporte financeiro', screen: 'Contribution' },
    { id: 5, label: 'Empréstimo', icon: EmprestimoIcon, description: 'Cadastre um empréstimo', screen: 'Loan' },
    { id: 6, label: 'Outras Entradas', icon: OutrasIcon, description: 'Cadastre uma entrada manualmente', screen: 'Others' },
    { id: 7, label: 'Relatórios', icon: RelatorioIcon, description: 'Veja os relatórios de suas entradas', screen: 'Report', disabled: true }, // Desativar o botão de relatórios
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsNavigating(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleBackPress = () => {
    if (!isNavigating) {
      setIsNavigating(true);
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 50 }}>
            <BarTop2
              titulo={'Menu'}
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              routeMailer={''}
              routeCalculator={''}
              onPress={handleBackPress}
            />
          </View>

          <View style={styles.header}>
            <Text style={styles.title}>Suas entradas</Text>
            <Text style={styles.subtitle}>Gerencie as entradas financeiras do seu negócio.</Text>
          </View>

          <View style={styles.grid}>
            {options.map(option => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  option.disabled && { backgroundColor: COLORS.grey, opacity: 0.5 }, // Alterar aparência do botão desativado
                ]}
                onPress={!option.disabled ? (option.action ? option.action : () => handleOptionPress(option.screen)) : null}
                disabled={option.disabled} // Desativar funcionalidade do botão
              >
                <option.icon width={40} height={40} />
                <View style={styles.optionTextContainer}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Entries;
