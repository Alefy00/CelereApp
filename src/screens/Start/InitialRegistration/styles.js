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
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    alignSelf: 'flex-start',
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
    width: '100%',
    marginBottom:20,
    justifyContent:'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  ddiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    paddingHorizontal: 2,
  },
  input: {
    marginLeft: 5,
  },
  inputDDD: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginHorizontal: 10,
    textAlign: 'center',
  },
  inputNumber: {
    flex: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginTop: 10,
    width: '100%',
   
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  loadingContainer:{
    flex: 1,
    backgroundColor:COLORS.primary,
    justifyContent:'center',
  },
  //privacida
  privacyContainer:{
    marginTop: -20,
    flexDirection: 'row',
    alignItems:'center'
  }
});
