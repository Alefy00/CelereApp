/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';


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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  option: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  optionSelected: {
    backgroundColor: '#d1e7dd',
  },
  optionText: {
    fontSize: 16,
  },
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  customInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#fadc00',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InitialBranch;
