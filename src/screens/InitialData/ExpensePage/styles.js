/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
      },
      label: {
        fontSize: 16,
        marginBottom: 5,
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
      picker: {
        flex: 1,
      },
      input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
      },
      addButton: {
        backgroundColor: '#26ab5c',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
      },
      addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#ffeb3b',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignSelf: 'center',
      },
      buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      title:{
        fontSize: 22,
        textAlign: "center",
        marginBottom:15,
        color:"#ffffff",
        fontWeight:'bold',
        backgroundColor: '#26ab5c',
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        paddingTop:10,
        borderRadius:15,
      }
});