/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Adiciona um fundo branco para melhor contraste
  },
  innerContainer: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5, // Adiciona bordas arredondadas para consistência com o picker
    backgroundColor: '#f8f8f8', // Fundo claro para melhor legibilidade
    justifyContent: 'center',
  },
  pickerContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8', // Cor de fundo para combinar com os inputs
  },
  picker: {
    height: 40,
    width: '100%',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 20, // Adiciona margem superior para espaçamento
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16, // Aumenta o tamanho da fonte para melhor legibilidade
  },
  textAporte: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 15,
  },
});

export default styles;
