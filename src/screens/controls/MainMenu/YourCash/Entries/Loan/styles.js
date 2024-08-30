/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Adicionei um fundo branco para melhor contraste
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
    justifyContent: 'center',
    borderRadius: 5, // Adicionei bordas arredondadas para um design mais moderno
    backgroundColor: '#f8f8f8', // Cor de fundo para campos de entrada
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: '#333', // Cor de texto para melhor contraste
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 20, // Adicionei margem superior para espaçamento
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textEmprestimo: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center",
    marginBottom: 15,
  },
});

export default styles;
