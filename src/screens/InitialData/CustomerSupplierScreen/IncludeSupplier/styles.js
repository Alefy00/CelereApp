/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    height: 55,
  },
  scrollContent: {
    paddingHorizontal: 20,

  },
  title:{
    fontSize:18,
    color: COLORS.black,
    fontWeight: '800',
    textAlign: 'center',
    marginTop:70,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1, // Para Android
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    fontSize: 16,
    paddingVertical: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary, // Cor amarela para o botão
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
    color: COLORS.black,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
    elevation:1,
  },
  modalButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    marginTop: 10,
    elevation:1,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  });

export default styles;
