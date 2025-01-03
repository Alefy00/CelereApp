/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  barTopContainer: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    marginBottom:20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 20,
    color: '#000',
    textAlign: 'left',
    width:"80%",
    alignItems:'flex-start',
    marginRight:40,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '90%',
    marginBottom:10
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  codeInput: {
    borderBottomWidth:2,  // Barrinha abaixo de cada dígito
    borderBottomColor: '#000',
    textAlign: 'center',
    fontSize: 24,
    marginHorizontal: 5, // Espaçamento entre os dígitos
    width: 48, // Ajuste da largura para cada dígito
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 28,
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    marginLeft: 10,
    fontSize:14,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
});
