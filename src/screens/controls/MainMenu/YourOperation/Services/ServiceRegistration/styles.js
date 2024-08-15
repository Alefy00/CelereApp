/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    },
    content: {
      padding: 20,
      paddingBottom: 50, // Adicionando espaço extra para evitar sobreposição
    },
    imageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    imageWrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: COLORS.lightGray,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 20,
    },
    barcodeInput: {
      flex: 1,
      height: 40,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginRight: 10,
    },
    input: {
      height: 50,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    dropdown: {
      height: 50,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderRadius: 10,
      justifyContent: 'center',
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    halfWidth: {
      width: '48%',
    },
    textArea: {
      height: 100,
      borderColor: COLORS.lightGray,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      textAlignVertical: 'top',
      marginBottom: 20,
    },
    button: {
      height: 50,
      backgroundColor: COLORS.primary,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 18,
      color: COLORS.black,
    },
    picker: {
      width: '100%',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
      backgroundColor: '#fff',
      margin: 20,
      borderRadius: 10,
      padding: 20,
    },
    closeButton: {
      marginTop: 20,
      alignItems: 'center',
    },
    closeButtonText: {
      fontSize: 18,
      color: COLORS.primary,
    },
  });
  
  export default styles;