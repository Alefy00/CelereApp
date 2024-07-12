/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: {
        fontSize: 20,
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 10,
        marginLeft: 10,
        width: 50,
      },
      inputNumber:{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginLeft: 10,
        width: 100,
      },
});