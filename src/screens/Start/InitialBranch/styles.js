/* eslint-disable prettier/prettier */

import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
      },
      description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
      },
      input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
      },
      option: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,
      },
      optionSelected: {
        backgroundColor: '#d1e7dd',
      },
      optionText: {
        fontSize: 16,
      },
      customInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      },
      customInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
      },
      addButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginLeft: 10,
      },
      addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      nextButton: {
        backgroundColor: '#fadc00',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginTop: 20,
      },
      nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
})