/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BarTop3 from '../../../components/BarTop3';
import MEI from './components/MEI';
import SimpleNational from './components/SimpleNational';
import LucroPresumido from './components/LucroPresumido';
import { COLORS } from '../../../constants';
import styles from './styles';

const TaxRegime = ({ navigation }) => {
  const [selectedRegime, setSelectedRegime] = useState(null);  // Controle da opção selecionada

  // Função para selecionar o regime tributário
  const handleSelect = (regime) => {
    setSelectedRegime(regime);
  };

  return (
    <View style={styles.screenContainer}>
      {/* Barra superior */}
      <View style={styles.containerBartop}>
        <BarTop3
          titulo={'Voltar'}
          backColor={COLORS.primary}
          foreColor={COLORS.black}
          routeMailer={'Mailer'}
          routeCalculator={'Calculator'}
        />
      </View>

      {/* Conteúdo principal */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Regime tributário</Text>
        <Text style={styles.subtitle}>
          Apenas para projetarmos a despesa em seu fluxo de caixa e você ter previsibilidade.
        </Text>

        {/* Botões de seleção de regime tributário */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, selectedRegime === 'MEI' && styles.selectedButton]}
            onPress={() => handleSelect('MEI')}
          >
            <Text style={styles.buttonText}>MEI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedRegime === 'Simples Nacional' && styles.selectedButton]}
            onPress={() => handleSelect('Simples Nacional')}
          >
            <Text style={styles.buttonText}>Simples nacional</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, selectedRegime === 'Lucro Presumido' && styles.selectedButton]}
            onPress={() => handleSelect('Lucro Presumido')}
          >
            <Text style={styles.buttonText}>Lucro presumido</Text>
          </TouchableOpacity>
        </View>

        {/* Renderização dos componentes específicos baseados no regime selecionado */}
        {selectedRegime === 'MEI' && <MEI navigation={navigation} />}
        {selectedRegime === 'Simples Nacional' && <SimpleNational navigation={navigation} />}
        {selectedRegime === 'Lucro Presumido' && <LucroPresumido navigation={navigation} />}
      </View>
    </View>
  );
};

export default TaxRegime;
