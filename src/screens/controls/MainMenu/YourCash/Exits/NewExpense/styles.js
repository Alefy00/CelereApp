/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 10,
  },
  buttonActive: {
    padding: 10,
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  buttonTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray2,
    padding: 10,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: COLORS.lightGray2,
    borderRadius: 10,
  },
  input: {
    height: 50,
    borderColor: COLORS.lightGray2,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: COLORS.lightGray2,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: COLORS.yellow,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default styles;
