/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
      marginTop: 20,
    },
    stepText: {
      marginLeft: 10,
      fontSize: 12,
      color: '#000',
    },
    input: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
      color: '#000',
    },
    pickerContainer: {
      height: 50,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 20,
      justifyContent: 'center',
    },
    picker: {
      height: 50,
      width: '100%',
    },
    button: {
      height: 50,
      backgroundColor: '#FFEB3B',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: '#000',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Fundo escurecido
    },
    modalView: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      fontSize: 18,
      color: '#000',
      marginBottom: 20,
      textAlign: 'center',
    },
    modalButton: {
      height: 50,
      backgroundColor: '#FFEB3B',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    modalButtonText: {
      fontSize: 18,
      color: '#000',
    },
  });

export default styles;
