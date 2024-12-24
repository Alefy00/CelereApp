/* eslint-disable prettier/prettier */
import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants";

const styles = StyleSheet.create({
  containerBase: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  containerBartop: {
    height: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 20,
    color: COLORS.black,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: COLORS.black,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputCEP: {
    height: 40,
    borderColor: COLORS.black,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width:'50%'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    color: COLORS.black,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.black,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputSmall: {
    width: '21%',
  },
  inputSmallBairro: {
    width: '47%',
  },
  inputSmallRG: {
    width: '50%',
  },
  inputLarge: {
    width: '65%',
  },
  inputLargeComplemento: {
    width: '47%',
  },
  inputLargeRUA: {
    width: '75%',
  },
  confirmButtonContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
    
  },
  confirmButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    color: COLORS.black,
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  modalColumn: {
    flex: 1,
    marginRight: 10,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 5,
  },
  modalValue: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 8,
  },
  modalButton: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 22,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.black,
    marginLeft: 10,
  },
  
  
});

export default styles;
