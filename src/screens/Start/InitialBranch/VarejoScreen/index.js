/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, FlatList } from 'react-native';
import styles from './styles'; // Certifique-se de ajustar o arquivo de estilos
import BarTop3 from '../../../../components/BarTop3';
import { COLORS } from '../../../../constants';
import axios from 'axios';
import LojaIcon from '../../../../assets/images/svg/InitialBranch/LojaIcon.svg';
import FeiranteIcon from '../../../../assets/images/svg/InitialBranch/FeiranteIcon.svg';
import AmbulanteIcon from '../../../../assets/images/svg/InitialBranch/AmbulanteIcon.svg';
import InternetIcon from '../../../../assets/images/svg/InitialBranch/InternetIcon.svg';
import PortaPortaIcon from '../../../../assets/images/svg/InitialBranch/PortaPortaIcon.svg';
import ResidenciaIcon from '../../../../assets/images/svg/InitialBranch/ResidenciaIcon.svg';
import { API_BASE_URL } from '../../../../services/apiConfig';

const VarejoScreen = ({ route, navigation }) => {
    const { subcategories, userData } = route.params;
    const [loading, setLoading] = useState(false);
  
    const icons = {
      'Lojista': <LojaIcon width={50} height={50} />,
      'Feirante': <FeiranteIcon width={50} height={50} />,
      'Ambulante': <AmbulanteIcon width={50} height={50} />,
      'Internet': <InternetIcon width={50} height={50} />,
      'Em casa ou porta a porta': <PortaPortaIcon width={50} height={50} />,
      'Na própria residência': <ResidenciaIcon width={50} height={50} />
    };
  
    // Função para associar o ramo de atividade ao clicar em uma subcategoria
    const handleSubcategorySelect = async (subcategoryId) => {
      if (!userData || !userData.id) {
        Alert.alert('Erro', 'Dados do usuário não carregados. Tente novamente.');
        return;
      }
  
      try {
        setLoading(true);
        
        // Enviando a requisição para associar o ramo de atividade
        const response = await axios.post(
          `${API_BASE_URL}/cad/associar_ramo_atividade/`,
          {
            empresa_id: userData.id,
            ramo_atividade_id: subcategoryId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );
  
        if (response.status >= 200 && response.status < 300 && response.data.status && response.data.status.toLowerCase() === 'success') {
          // Navegar para a MainTab em caso de sucesso
          navigation.navigate('MainTab');
        } else {
          console.log('Resposta inesperada:', response.data);
          Alert.alert("Erro", response.data.message || 'Erro ao salvar o ramo de atividade. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao conectar à API:', error);
        if (error.response) {
          console.log('Erro na resposta da API:', error.response.data);
          Alert.alert("Erro", error.response.data.message || 'Erro ao conectar à API.');
        } else {
          Alert.alert("Erro", "Não foi possível conectar à API. Verifique sua conexão e tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    const renderSubcategoryItem = ({ item }) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.option}
            onPress={() => handleSubcategorySelect(item.id)} // Chamando a função ao clicar
          >
            {icons[item.nome]}
            <Text style={styles.optionText}>{item.nome}</Text>
          </TouchableOpacity>
        );
      };

      return (
        <View style={styles.container}>
          <View style={styles.barTopContainer}>
            <BarTop3
              titulo="Voltar"
              backColor={COLORS.primary}
              foreColor={COLORS.black}
              style={styles.barTop}
            />
          </View>

          <Text style={styles.title}>Varejo</Text>

           {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={subcategories}
              renderItem={renderSubcategoryItem}
              keyExtractor={(item) => `${item.id}`}
              numColumns={2}
              contentContainerStyle={styles.gridContainer}
            />
          )}
        </View>
      );
    };

  export default VarejoScreen;
