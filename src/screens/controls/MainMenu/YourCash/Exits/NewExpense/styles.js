/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    borderWidth:0.5,
    padding:10,
    marginHorizontal:30,
    borderRadius:10,
    borderColor:COLORS.gray,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  buttonActive: {
    padding: 10,
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
  buttonText: {
    color: COLORS.black,
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
    borderRadius: 10,
    paddingHorizontal:20,
    padding:10,
  },
  textDate:{
    marginRight:15,
    color:'black'
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
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color:'#000',
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal:80,
  },
  saveButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default styles;
