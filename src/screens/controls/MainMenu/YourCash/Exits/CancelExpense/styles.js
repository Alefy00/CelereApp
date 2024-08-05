/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    scrollContainer: {
      paddingBottom: 20,
    },
    formContainer: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      color: '#000',
      marginBottom: 10,
    },
    input: {
      height: 50,
      borderColor: COLORS.lightGray2,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      backgroundColor: COLORS.lightGray2,
      marginBottom: 20,
    },
    searchButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    searchButtonText: {
      color: COLORS.black,
      fontWeight: 'bold',
    },
    expenseItem: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: COLORS.lightGray2,
      marginBottom: 10,
    },
    cancelButton: {
      backgroundColor: COLORS.red,
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    cancelButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  
  export default styles;