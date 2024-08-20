/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
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
  });

export default styles;