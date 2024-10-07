/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente para o modal
    },
    modalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 20,
      width: '90%',
      alignItems: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: '900',
      color: COLORS.black,
      marginBottom: 10,
    },
    subTitle: {
      fontSize: 18,
      color: COLORS.black,
      marginBottom: 5,
    },
    description: {
      fontSize: 14,
      color: COLORS.black,
      textAlign: 'center',
      marginBottom: 20,
    },
    toggleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',

    },
    toggleButton: {
      flex: 1,
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: COLORS.black,
      marginHorizontal: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: COLORS.primary, // Cor de fundo para o botão selecionado
      borderWidth: 0,
    },
    toggleButtonText: {
      fontSize: 15,
      color: COLORS.black,
    },
    input: {
      width: '100%',
      height: 60,
      borderColor: COLORS.black,
      borderRadius: 8,
      paddingHorizontal: 10,
      fontSize: 16,
      color: COLORS.black,
      marginBottom: 20,
      borderBottomWidth: 1,
    },
    saveButton: {
      width: '100%',
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      paddingVertical: 25,
    },
    disabledButton: {
      backgroundColor: COLORS.gray, // Cor de fundo para o botão desabilitado
    },
    deferButton: {
      width: '100%',
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.black,
      padding: 15,
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 25,
    },
    buttonText: {
      fontSize: 16,
      color: COLORS.black,
      marginLeft: 10,
    },
    successModalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    successModalContent: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 30,
      alignItems: 'center',
      width: '85%',
    },
    successMessage: {
      fontSize: 18,
      color: COLORS.black,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 25,
    },
    successButton: {
      backgroundColor: COLORS.yellow,
      paddingVertical: 10,
      paddingHorizontal: 30,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    successButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: COLORS.black,
    },
  });

  export default styles;