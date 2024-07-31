/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      justifyContent: 'flex-start',
    },
    inputContainer: {
      padding: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
      justifyContent: 'center',
    },
    saveButton: {
      backgroundColor: COLORS.primary,
      padding: 12,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    saveButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    textEmprestimo:{
        color:'#000',
        fontSize:22,
        fontWeight:'bold',
        textAlign:"center",
        marginBottom:15,
    }
  });

export default styles;