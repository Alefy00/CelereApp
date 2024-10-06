/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,  // Cor de fundo amarela suave do design
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
    fontWeight:'700',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    marginBottom:120,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 80,
    backgroundColor: COLORS.primary, // Cor amarela do botão
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
    bottom:0,
    marginBottom:20,
    flexDirection:'row'
  },
  buttonText: {
    fontSize: 18,
    color: COLORS.black, // Cor preta do texto do botão
    fontWeight: 'bold',
    marginLeft:10,
  },
});

export default styles;
