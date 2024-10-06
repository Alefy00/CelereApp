/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Cor de fundo clara
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: "center",
      },
      containerBartop:{
        height:50,
      },
      containerBase:{
        flex: 1,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom:20,
      },
      buttonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom:70,
      },
      includeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary, // Amarelo
        paddingVertical: 32,
        paddingHorizontal: 40,
        marginBottom: 20,
        borderRadius:5,
        width: '100%',
        justifyContent: 'center',
        elevation:1,
      },
      consultButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 32,
        paddingHorizontal: 40,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        elevation:1,
      },
      buttonText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: '400',
        color: 'black',
      },
      //Modal incluir
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: "85%",
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        alignItems: 'center',
      },
      closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.black,
        marginTop:15,
      },
      optionButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 25,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        elevation:1,
      },
      optionButtonSecondary: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 25,
        borderRadius: 5,
        alignItems: 'center',
        elevation:1,
      },
      optionText: {
        fontSize: 16,
        fontWeight: '400',
        color: 'black',
      },

  });

export default styles;
