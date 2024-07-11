import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg'; // Pacote react-native-svg

const SearchInput = ({onSearch}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query); // Chama a função de pesquisa passando o texto da consulta
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSearch} style={styles.icon}>
        <Svg width={36} height={36} viewBox="0 0 24 24">
          <Path
            fill="#999999"
            d="M19.39 18.97l-4.42-4.42a6.5 6.5 0 1 0-1.18 1.18l4.42 4.42a.83.83 0 0 0 1.18-1.18zM4.5 10.5a5 5 0 1 1 10 0 5 5 0 0 1-10 0z"
          />
        </Svg>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        onChangeText={text => setQuery(text)}
        onSubmitEditing={handleSearch} // Chamado quando o usuário pressiona "Enter" ou "Done" no teclado
        value={query}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#999999',
    borderWidth: 1,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 20,
  },
  icon: {
    padding: 8,
    borderColor: '#999999',
  },
});

export default SearchInput;
