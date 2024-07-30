/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../../constants";


const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
      },
      searchButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
      },
      searchButtonText: {
        color: 'black',
      },
      listTitle: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      vendaItem: {
        flexDirection: 'column',
        padding: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 12,
      },
      vendaInfo: {
        marginBottom: 12,
        justifyContent: 'space-around',
        flexDirection: 'row'
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      abaterButton: {
        flex: 1,
        backgroundColor: 'orange',
        padding: 10,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      baixarButton: {
        flex: 1,
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: COLORS.black
      },
      modalInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginVertical: 8,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 8,
      },
      confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
      },
      confirmButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
      },
      cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
      },
      textLiquida:{
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: 15
      }
  });
  
export default styles;