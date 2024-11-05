/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    marginBottom: 50,
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
    marginBottom: 10,
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
  updateButtonAttSaldo: {
    fontSize: 14,
    color: COLORS.green,
    marginTop: 5,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  updateButton:{
    width: '100%',

  },
  updateButtonText:{
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:25,
    color: COLORS.green,
    textDecorationLine:'underline'
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
    // Estilos do modal de confirmação
    confirmModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    },
    confirmModalContent: {
      width: '80%',
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    confirmMessage: {
      fontSize: 18,
      fontWeight: '500',
      color: '#333333',
      marginBottom: 10,
    },
    confirmAmount: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLORS.green, // Verde para o valor
      marginVertical: 10,
    },
    confirmButton: {
      width: '100%',
      backgroundColor: '#FFD700', // Amarelo para o botão de confirmação
      borderRadius: 8,
      paddingVertical: 22,
      alignItems: 'center',
      marginTop: 15,
      flexDirection: 'row',
      justifyContent:'center',
    },
    confirmButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333333',
    },
    backButton: {
      width: '100%',
      borderRadius: 8,
      paddingVertical: 22,
      alignItems: 'center',
      marginTop: 10,
      flexDirection:'row',
      justifyContent:'center',
    },
    backButtonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#333333',
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
  //tuor
  tooltipContainer: {
    position: 'absolute',
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 8,
    width: "75%",
    zIndex: 11,
    alignItems: 'center',
  },
  tooltipTriangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
  },
  tooltipTriangleRight: {
    left: -10,
    top: '50%',
    marginTop: -15,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderRightWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: COLORS.black,
  },
  tooltipTitle: {
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tooltipText: {
    color: COLORS.white,
    marginBottom: 15,
    textAlign: 'justify',
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  buttonTextTuor: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  tooltipTriangleTop: {
    position: 'absolute',
    top: -10,  // ajuste para que a seta aponte para cima
    left: '55%',
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#000',  // Cor da seta
  },
  tooltipTriangleBottom: {
    position: 'absolute',
    bottom: -10,  // ajuste para que a seta aponte para baixo
    left: '50%',
    marginLeft: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#000',  // Cor da seta
    zIndex:11
  },
  //blockscreen
  blockLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparência para escurecer o fundo
    zIndex: 1, // Coloca a camada sobre o conteúdo
  },
  
});

export default styles;