/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Fundo amarelo claro
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 18,
        color: COLORS.black,
        fontWeight: 'bold',
        width:'60%',
        textAlign: "center",
        marginBottom:5,
        marginTop: -10,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.black,
        marginBottom: 10,
        textAlign:'left',
    },
    inputContainer: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 1,
    },
    weekLabel: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight:'600',
    },
    input: {
        height: 38,
        fontSize: 16,
        paddingHorizontal: 10,
        textAlign:'right',
        color:COLORS.green,
        fontWeight:'600',
        marginBottom: -10,
    },
    totalContainer: {
        width: '100%',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        color: COLORS.green,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.green, // Cor verde para o total
        marginBottom: -8
    },
    button: {
        height: 70,
        backgroundColor: COLORS.primary, // Botão amarelo
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 17,
        flexDirection:'row'
    },
    buttonText: {
        fontSize: 18,
        color: COLORS.black, // Texto preto
        fontWeight: 'bold',
        marginLeft: 10,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
  },
  modalContent: {
      width: 350,
      padding: 15,
      backgroundColor: COLORS.white,
      borderRadius: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
  },
  modalTitle: {
      fontSize: 22,
      fontWeight: '800',
      color: COLORS.black,
  },
  modalText: {
      fontSize: 14,
      color: COLORS.black,
      textAlign: 'left',
      marginBottom: 15,
  },
  modalButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 20,
      paddingHorizontal: 110,
      borderRadius: 5,
  },
  modalButtonText: {
      fontSize: 17,
      color: COLORS.black,
  },
});

export default styles;
