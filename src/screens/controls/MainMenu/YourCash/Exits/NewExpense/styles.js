/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // Cor de fundo semelhante ao design
  },
  scrollContainer: {
    padding: 16,
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  Title:{
    fontSize: 18,
    color:COLORS.black,
    fontWeight: '900',
    marginBottom:10,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 1,
    borderColor:COLORS.black
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.primary,
  },
  toggleButtonText: {
    fontWeight: 'bold',
    color: COLORS.black,
  },
  datePickerContainer: {
    marginBottom: 5,
  },
  datePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    paddingBottom: 8,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    marginBottom: 2,
  },
  hora:{
    color: COLORS.gray,
  },
  dateInput: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    color: COLORS.gray,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.black,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: COLORS.black,
    borderBottomWidth: 1,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.black,
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    color: COLORS.black,
  },
  containerDetalhes:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerButton:{
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: '80%',
    justifyContent: 'space-between',
  },
  pickerButtonText:{
    marginLeft:15,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    color: COLORS.black,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 25,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
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
    width: '100%',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '900',
    color:COLORS.black
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalItemIcon: {
    marginRight: 10,
  },
  modalItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  modalItemIconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //fornecedor
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.black,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    width: '82%',
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.gray,
  },
  dropdownContainer: {
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    marginTop: -9.5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    color: COLORS.black,
  },
  containerSupplier:{
    flexDirection: 'row',
  },
  addButton2: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    marginLeft: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    alignItems: "center",
    marginBottom: 10

  },
  
  
});

export default styles;
