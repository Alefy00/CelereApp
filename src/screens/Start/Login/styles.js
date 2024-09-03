/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants'; // Importando constantes de cores, se houver

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary, // Usando a cor primária do design
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 20, // Espaçamento para o logo
  },
  presentationImage: {
    marginBottom: 20, // Espaçamento para a imagem de apresentação
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: '#212121', // Botão preto conforme o design
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft:5,
  },
  loginButton: {
    borderColor: '#000', // Botão com contorno preto
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000', // Cor da sombra
    shadowOffset: { width: 0, height: 10 }, // Deslocamento da sombra
    shadowOpacity: 0.3, // Opacidade da sombra
    shadowRadius: 5, // Raio de desfoque da sombra
    elevation: 5, // Sombra para Android
    backgroundColor: COLORS.primary,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft:5,

  },
  linkButton: {
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkButtonText: {
    color: '#000',
    fontSize: 16,
    marginLeft:10
  },
});

export default styles;
