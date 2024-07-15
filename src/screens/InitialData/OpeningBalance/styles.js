/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

// eslint-disable-next-line no-undef
export default styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      label: {
        fontSize: 16,
        marginBottom: 10,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: '100%',
      },
      currency: {
        marginRight: 10,
      },
      input: {
        flex: 1,
      },
      button: {
        backgroundColor: '#fadc00',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});