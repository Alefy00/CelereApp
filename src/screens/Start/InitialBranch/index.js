/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import  styles   from './styles'



const InitialBranch = ({ navigation }) => {
  // Lista de opções predefinidas
  const predefinedOptions = [
    'Varejo - revenda de produtos',
    'Preparo e venda de refeições, confeitaria, lanchonete, outros',
    'Fabricação ou artesanato',
    'Serviços de Beleza - cabelo, maquiagem, unhas, outros',
    'Serviços em Obras - alvenaria, serralheria, elétrica, outros',
  ];

  // Estado para armazenar as opções selecionadas e a opção customizada
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [customOption, setCustomOption] = useState('');

  // Função para adicionar ou remover uma opção da lista de selecionadas
  const toggleOption = (option) => {
    setSelectedOptions((prevSelected) => 
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option) // Remove a opção se já estiver selecionada
        : [...prevSelected, option] // Adiciona a opção se não estiver selecionada
    );
  };

  // Função para adicionar a opção customizada à lista de selecionadas
  const addCustomOption = () => {
    if (customOption) {
      setSelectedOptions((prevSelected) => [...prevSelected, customOption]);
      setCustomOption(''); // Limpa o campo de entrada
    }
  };

  // Função para prosseguir para a próxima tela com as opções selecionadas
  const handleNext = () => {

     //TODO: Lógica para prosseguir com as opções selecionadas
    console.log('Opções Selecionadas:', selectedOptions);
    navigation.navigate('Start'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Ramo de Atividade:</Text>
      <Text style={styles.label}>Qual seu ramo de atuação?</Text>
      <Text style={styles.description}>Se desejar, adicione uma descrição:</Text>

      {/* Renderiza as opções predefinidas */}
      {predefinedOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOptions.includes(option) && styles.optionSelected,
          ]}
          onPress={() => toggleOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Campo de entrada para a opção customizada e botão de adicionar */}
      <View style={styles.customInputContainer}>
        <TextInput
          style={styles.customInput}
          placeholder="Outro serviço"
          value={customOption}
          onChangeText={setCustomOption}
        />
        <TouchableOpacity style={styles.addButton} onPress={addCustomOption}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      {/* Botão para avançar para a próxima tela */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Avançar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};



export default InitialBranch;
