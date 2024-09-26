/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginBottom: 150,
  },
  ContainerCarousel:{
    marginBottom:10
  },
  ContainerCircle:{
    marginHorizontal: 20,
  },
  label:{
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
    marginLeft:20,
  },
  label2:{
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.black,
    marginLeft:20,
    marginTop:10,
  },
  ContainerFilter:{
    marginHorizontal: 20,
  },
  containerBottons:{
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
    elevation: 5, // Para destacar a visualização
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: 'transparent',
    
  },
  pageContainer: {
    backgroundColor: COLORS.white,
    width: '90%',
    paddingVertical: 30,
    paddingHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',  // Cor da sombra
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,  // Opacidade da sombra, para uma sombra mais visível
    shadowRadius: 4,  // Raio da sombra
    elevation: 4,  // Elevação para Android, ajustando para criar uma sombra mais proeminente
    alignItems: 'center',
    marginHorizontal: 20,
  },
  title: {
  fontSize: 14,
  color: COLORS.black,
  textAlign:'center',
  justifyContent: 'center',
  alignItems: 'center',
  },
  amount: {
  fontSize: 28,
  fontWeight: '900',
  color: COLORS.green,
  textAlign:'center',
  justifyContent: 'center',
  alignItems: 'center',
  },

  //Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro para o modal
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Sombra leve
  },
  label22: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    fontSize: 16,
    color: COLORS.black,
    paddingVertical: 5,
  },
  totalBalanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.green,
    width: '100%',
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: COLORS.primary, // Botão amarelo
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 110,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  saveButton2: {
    borderRadius: 5,
    paddingVertical: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.black,
    paddingLeft: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  //modal sucesso
  successModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  successModalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  successMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.black,
  },
  successButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  successButtonText: {
    color: COLORS.black,
    fontSize: 16,
    fontWeight: 'bold',
  },

});

export default styles;